import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "data");
const bcbUrl = "https://www.bcb.gob.bo/bcb_tco_publico_ultima_cotizacion.php";

await mkdir(dataDir, { recursive: true });

function cleanText(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function parseSpanishDate(text) {
  const months = { enero:1, febrero:2, marzo:3, abril:4, mayo:5, junio:6, julio:7, agosto:8, septiembre:9, octubre:10, noviembre:11, diciembre:12 };
  const match = text.toLowerCase().match(/(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})/i);
  if (!match || !months[match[2]]) return null;
  return `${match[3]}-${String(months[match[2]]).padStart(2, "0")}-${String(match[1]).padStart(2, "0")}`;
}

async function updateExchangeRate() {
  const response = await fetch(bcbUrl, { headers: { "user-agent": "BoliviaStays/1.0 (+GitHub Pages data updater)" } });
  if (!response.ok) throw new Error(`BCB respondió ${response.status}`);
  const html = await response.text();
  const valueMatch = html.match(/tco-public-value[^>]*>\s*Bs\s*([\d.,]+)\s*\/\s*\$us/i);
  const cutMatch = html.match(/tco-public-date[^>]*>([\s\S]*?)<\/span>/i);
  const validityMatch = html.match(/tco-public-vigencia[^>]*>([\s\S]*?)<\/span>/i);
  if (!valueMatch) throw new Error("No se encontró la cotización oficial del BCB");
  const validityText = validityMatch ? cleanText(validityMatch[1]) : "";
  const validityDates = [...validityText.matchAll(/\d{1,2}\s+de\s+[a-záéíóúñ]+\s+de\s+\d{4}/gi)].map(match => parseSpanishDate(match[0]));
  const output = {
    base: "USD",
    quote: "BOB",
    rate: Number(valueMatch[1].replace(/\./g, "").replace(",", ".")),
    sourceDate: cutMatch ? parseSpanishDate(cleanText(cutMatch[1])) : null,
    validFrom: validityDates[0] || null,
    validTo: validityDates[1] || null,
    fetchedAt: new Date().toISOString(),
    sourceUrl: bcbUrl
  };
  await writeFile(path.join(dataDir, "exchange-rate.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
}

function unfoldICS(text) { return text.replace(/\r?\n[ \t]/g, ""); }
function parseICSDate(value) {
  const match = value.match(/^(\d{4})(\d{2})(\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
}

function parseAvailability(text) {
  return unfoldICS(text).split("BEGIN:VEVENT").slice(1).map(block => {
    const start = block.match(/\nDTSTART(?:;[^:]*)?:(\d{8})/i);
    const end = block.match(/\nDTEND(?:;[^:]*)?:(\d{8})/i);
    return start && end ? { start: parseICSDate(start[1]), end: parseICSDate(end[1]) } : null;
  }).filter(Boolean).sort((a, b) => a.start.localeCompare(b.start));
}

async function updateAvailability() {
  const feeds = { "7e": process.env.AIRBNB_ICAL_7E, "11f": process.env.AIRBNB_ICAL_11F };
  if (!feeds["7e"] || !feeds["11f"]) throw new Error("Faltan los secretos AIRBNB_ICAL_7E o AIRBNB_ICAL_11F");
  const entries = await Promise.all(Object.entries(feeds).map(async ([id, url]) => {
    const response = await fetch(url, { headers: { "user-agent": "BoliviaStays/1.0 calendar updater" } });
    if (!response.ok) throw new Error(`Calendario ${id} respondió ${response.status}`);
    return [id, parseAvailability(await response.text())];
  }));
  const output = { updatedAt: new Date().toISOString(), properties: Object.fromEntries(entries) };
  await writeFile(path.join(dataDir, "availability.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
}

const results = await Promise.allSettled([updateExchangeRate(), updateAvailability()]);
const failures = results.filter(result => result.status === "rejected");
if (failures.length) {
  failures.forEach(result => console.error(result.reason?.message || result.reason));
  if (failures.length === results.length) process.exitCode = 1;
}
