(() => {
  const config = window.BOLIVIA_STAYS;
  const properties = config.properties;
  const params = new URLSearchParams(location.search);
  const today = toISO(startOfDay(new Date()));
  const validProperty = value => Object.hasOwn(properties, value);
  const savedCurrency = safeRead("bolivia-stays-booking-currency");

  const state = {
    property: validProperty(params.get("apartment")) ? params.get("apartment") : "7e",
    currency: ["USD", "BOB"].includes(params.get("currency")) ? params.get("currency") : (savedCurrency || "USD"),
    guests: Number(params.get("guests")) || 2,
    parking: params.get("parking") === "yes",
    checkin: validISO(params.get("checkin")) ? params.get("checkin") : null,
    checkout: validISO(params.get("checkout")) ? params.get("checkout") : null,
    selecting: "checkin",
    calendarMonth: firstOfMonth(validISO(params.get("checkin")) ? parseISO(params.get("checkin")) : new Date()),
    exchange: {
      rate: 11.73,
      sourceDate: "2026-10-09",
      validFrom: "2026-10-10",
      validTo: "2026-10-12",
      fetchedAt: "2026-10-10T16:41:07-04:00",
      sourceUrl: "https://www.bcb.gob.bo/bcb_tco_publico_ultima_cotizacion.php"
    },
    availability: { updatedAt: null, properties: { "7e": [], "11f": [] } }
  };

  state.guests = clamp(state.guests, 1, properties[state.property].capacity);
  if (state.checkin && state.checkout && state.checkout <= state.checkin) state.checkout = null;

  const calendarDialog = document.getElementById("calendar-dialog");
  const galleryDialog = document.getElementById("gallery-dialog");

  Promise.allSettled([
    fetch("data/exchange-rate.json", { cache: "no-store" }).then(r => r.ok ? r.json() : Promise.reject(new Error("exchange"))),
    fetch("data/availability.json", { cache: "no-store" }).then(r => r.ok ? r.json() : Promise.reject(new Error("availability")))
  ]).then(([exchange, availability]) => {
    if (exchange.status === "fulfilled" && Number(exchange.value.rate) > 0) state.exchange = exchange.value;
    if (availability.status === "fulfilled" && availability.value.properties) state.availability = availability.value;
    renderAll();
  });

  function safeRead(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function safeWrite(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Preference storage is optional. */ }
  }

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function pad(value) { return String(value).padStart(2, "0"); }
  function startOfDay(date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate()); }
  function firstOfMonth(date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
  function addMonths(date, amount) { return new Date(date.getFullYear(), date.getMonth() + amount, 1); }
  function addDays(date, amount) { const next = new Date(date); next.setDate(next.getDate() + amount); return next; }
  function toISO(date) { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`; }
  function parseISO(value) { const [year, month, day] = value.split("-").map(Number); return new Date(year, month - 1, day); }
  function validISO(value) { return /^\d{4}-\d{2}-\d{2}$/.test(value || "") && !Number.isNaN(parseISO(value).valueOf()); }
  function daysBetween(start, end) { return Math.round((parseISO(end) - parseISO(start)) / 86400000); }
  function dateLabel(value) { return value ? new Intl.DateTimeFormat("es-BO", { day: "numeric", month: "short" }).format(parseISO(value)) : "Seleccionar"; }
  function longDate(value) { return new Intl.DateTimeFormat("es-BO", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(parseISO(value)); }
  function assetUrl(property, file) { return `assets/${property}/${encodeURIComponent(file)}`; }
  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char])); }

  function formatUSD(value) { return `US$ ${Number(value).toFixed(2)}`; }
  function formatMoney(valueUSD) {
    if (state.currency === "BOB") return `Bs ${Math.round(valueUSD * state.exchange.rate).toLocaleString("es-BO")}`;
    return formatUSD(valueUSD);
  }

  function renderAll() {
    renderCurrency();
    renderPropertySelector();
    renderProperty();
    renderQuote();
    updateURL(false);
  }

  function renderCurrency() {
    document.querySelectorAll("[data-currency]").forEach(button => {
      const active = button.dataset.currency === state.currency;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderPropertySelector() {
    document.querySelector(".property-selector").innerHTML = Object.values(properties).map(property => `
      <button type="button" class="property-card ${property.id === state.property ? "is-active" : ""}" data-property="${property.id}" role="tab" aria-selected="${property.id === state.property}">
        <img src="${assetUrl(property.id, property.images[0])}" alt="${escapeHTML(property.shortName)}" width="340" height="256">
        <span><strong>${escapeHTML(property.shortName)}</strong><span>${property.bedrooms} ${property.bedrooms === 1 ? "dormitorio" : "dormitorios"} · Hasta ${property.capacity} huéspedes</span></span>
        <b>Desde ${formatMoney(property.weekdayRate)} por noche</b>
      </button>`).join("");
  }

  function renderProperty() {
    const property = properties[state.property];
    document.title = `${property.shortName} · Reserva directa · Bolivia Stays`;
    document.querySelector(".property-kicker").textContent = property.floor;
    document.querySelector(".property-name").textContent = property.name;
    document.querySelector(".property-description").textContent = property.description;
    document.querySelector(".fact-line").innerHTML = [
      `Hasta ${property.capacity} huéspedes`,
      `${property.bedrooms} ${property.bedrooms === 1 ? "habitación" : "habitaciones"}`,
      `${property.beds} ${property.beds === 1 ? "cama" : "camas"}`,
      `${property.baths} ${property.baths === 1 ? "baño" : "baños"}`
    ].map(text => `<span>${text}</span>`).join("");
    document.querySelector(".amenities-grid").innerHTML = property.amenities.map(([icon, title, body]) => `
      <div class="amenity"><span class="amenity-icon" aria-hidden="true">${icon}</span><div><strong>${escapeHTML(title)}</strong><small>${escapeHTML(body)}</small></div></div>`).join("");
    document.querySelector(".night-price").textContent = `Desde ${formatMoney(property.weekdayRate)}`;
    renderMosaic(property);
    renderGallery(property);
  }

  function renderMosaic(property) {
    const firstFive = property.images.slice(0, 5);
    document.querySelector(".photo-mosaic").innerHTML = firstFive.map((file, index) => `
      <button type="button" class="photo-button" data-action="open-gallery" aria-label="Abrir galería de ${escapeHTML(property.shortName)}">
        <img src="${assetUrl(property.id, file)}" alt="Foto ${index + 1} de ${escapeHTML(property.shortName)}" ${index ? 'loading="lazy"' : ''}>
        ${index === 4 ? `<span class="show-all">▦ Ver las ${property.images.length} fotos</span>` : ""}
      </button>`).join("");
  }

  function renderGallery(property) {
    document.getElementById("gallery-title").textContent = property.shortName;
    document.querySelector(".gallery-grid").innerHTML = property.images.map((file, index) => `
      <figure><img src="${assetUrl(property.id, file)}" alt="Foto ${index + 1} de ${escapeHTML(property.shortName)}" loading="lazy"></figure>`).join("");
  }

  function calculateQuote() {
    if (!state.checkin || !state.checkout) return null;
    const nights = daysBetween(state.checkin, state.checkout);
    if (nights < 1) return { error: "La salida debe ser posterior a la llegada." };
    if (!rangeAvailable(state.checkin, state.checkout)) return { error: "Estas fechas incluyen noches no disponibles. Elige otro rango." };

    const property = properties[state.property];
    let weekdayNights = 0;
    let weekendNights = 0;
    for (let date = parseISO(state.checkin); date < parseISO(state.checkout); date = addDays(date, 1)) {
      const day = date.getDay();
      if (day === 5 || day === 6) weekendNights += 1;
      else weekdayNights += 1;
    }
    const lodging = weekdayNights * property.weekdayRate + weekendNights * property.weekendRate;
    const extraGuest = property.extraGuestFrom && property.extraGuestRate && state.guests >= property.extraGuestFrom
      ? nights * property.extraGuestRate
      : 0;
    const subtotal = lodging + extraGuest;
    const leadDays = daysBetween(today, state.checkin);
    let discountPercent = 0;
    let discountLabel = "";
    if (nights >= 28) { discountPercent = 15; discountLabel = "15% estancia mensual"; }
    else if (nights >= 7) { discountPercent = 10; discountLabel = "10% estancia semanal"; }
    else if (leadDays >= 0 && leadDays <= 2) { discountPercent = 5; discountLabel = "5% última hora"; }
    const discount = subtotal * discountPercent / 100;
    const total = subtotal - discount;
    const whatsappDiscountPercent = 5;
    const whatsappDiscount = total * whatsappDiscountPercent / 100;
    const whatsappTotal = total - whatsappDiscount;
    return { nights, weekdayNights, weekendNights, lodging, extraGuest, subtotal, discountPercent, discountLabel, discount, total, whatsappDiscountPercent, whatsappDiscount, whatsappTotal };
  }

  function renderQuote() {
    const property = properties[state.property];
    document.getElementById("checkin-label").textContent = dateLabel(state.checkin);
    document.getElementById("checkout-label").textContent = dateLabel(state.checkout);
    document.getElementById("guest-count").textContent = state.guests;
    document.getElementById("guest-label").textContent = `${state.guests} ${state.guests === 1 ? "huésped" : "huéspedes"}`;
    document.getElementById("parking").checked = state.parking;
    document.querySelector(".night-price").textContent = `Desde ${formatMoney(property.weekdayRate)}`;
    document.querySelector(".currency-quick").hidden = state.currency !== "USD";

    const quote = calculateQuote();
    const status = document.querySelector(".quote-status");
    const discounts = document.querySelector(".discounts");
    const breakdown = document.querySelector(".price-breakdown");
    const whatsapp = document.querySelector('[data-action="whatsapp"]');
    const airbnb = document.querySelector('[data-action="airbnb"]');

    status.classList.remove("error");
    if (!quote) {
      status.textContent = "Selecciona tus fechas para calcular el precio.";
      discounts.innerHTML = "";
      breakdown.hidden = true;
      setActionState(whatsapp, null);
      setActionState(airbnb, null);
    } else if (quote.error) {
      status.textContent = quote.error;
      status.classList.add("error");
      discounts.innerHTML = "";
      breakdown.hidden = true;
      setActionState(whatsapp, null);
      setActionState(airbnb, null);
    } else {
      status.textContent = state.availability.updatedAt ? "Fechas disponibles según la última sincronización." : "Cotización lista. La disponibilidad se confirmará antes de reservar.";
      discounts.innerHTML = `${quote.discountPercent ? `<span class="discount-badge">✓ ${quote.discountLabel}</span>` : ""}<span class="discount-badge whatsapp-badge">5% extra por WhatsApp</span>`;
      const nightlyText = `${quote.nights} ${quote.nights === 1 ? "noche" : "noches"} (${quote.weekdayNights} regular · ${quote.weekendNights} fin de semana)`;
      breakdown.hidden = false;
      breakdown.innerHTML = `
        <div class="price-row"><span>${nightlyText}</span><span>${formatMoney(quote.lodging)}</span></div>
        ${quote.extraGuest ? `<div class="price-row"><span>Huésped adicional</span><span>${formatMoney(quote.extraGuest)}</span></div>` : ""}
        ${quote.discount ? `<div class="price-row discount"><span>Descuento</span><span>− ${formatMoney(quote.discount)}</span></div>` : ""}
        <div class="price-row total"><span>Total de la estadía</span><span>${quote.discount ? `<span class="old-total">${formatMoney(quote.subtotal)}</span>` : ""}${formatMoney(quote.total)}</span></div>
        <div class="whatsapp-saving">
          <div class="price-row discount"><span>5% por reservar directo en WhatsApp</span><span>− ${formatMoney(quote.whatsappDiscount)}</span></div>
          <div class="price-row whatsapp-total"><span>Total por WhatsApp</span><span>${formatMoney(quote.whatsappTotal)}</span></div>
        </div>
        ${quote.nights >= 7 ? `<p class="long-stay-note">¿Te quedas 7 noches o más? Consulta con el anfitrión otros descuentos disponibles.</p>` : ""}`;
      setActionState(whatsapp, whatsappURL(property, quote));
      setActionState(airbnb, airbnbURL(property));
    }
    renderExchangeNote();
    renderCurrency();
    renderPropertySelector();
    updateURL(false);
  }

  function setActionState(element, href) {
    element.classList.toggle("disabled", !href);
    element.setAttribute("aria-disabled", String(!href));
    if (href) { element.href = href; element.target = "_blank"; element.rel = "noopener noreferrer"; }
    else { element.removeAttribute("href"); element.removeAttribute("target"); }
  }

  function whatsappURL(property, quote) {
    const selectedTotal = formatMoney(quote.whatsappTotal);
    const bobTotal = `Bs ${Math.round(quote.whatsappTotal * state.exchange.rate).toLocaleString("es-BO")}`;
    const lines = [
      "Hola, quisiera consultar esta reserva:", "",
      `Departamento: ${property.shortName}`,
      `Entrada: ${longDate(state.checkin)}`,
      `Salida: ${longDate(state.checkout)}`,
      `Noches: ${quote.nights}`,
      `Huéspedes: ${state.guests}`,
      `Garaje gratuito solicitado: ${state.parking ? "Sí" : "No"}`,
      quote.discountLabel ? `Descuento aplicado: ${quote.discountLabel}` : null,
      "Descuento por reserva directa en WhatsApp: 5% adicional",
      "",
      `Total estimado por WhatsApp: ${selectedTotal}`,
      state.currency === "USD" ? `Equivalente referencial: ${bobTotal}` : `Precio base: ${formatUSD(quote.whatsappTotal)}`,
      `Tipo de cambio BCB: 1 USD = Bs ${Number(state.exchange.rate).toFixed(2).replace(".", ",")}`,
      "",
      `Cotización: ${shareURL()}`,
      "",
      "Entiendo que la disponibilidad y el total deben ser confirmados."
    ].filter(line => line !== null);
    return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  function airbnbURL(property) {
    if (!state.checkin || !state.checkout) return null;
    const url = new URL(property.airbnb);
    url.searchParams.set("check_in", state.checkin);
    url.searchParams.set("check_out", state.checkout);
    url.searchParams.set("adults", String(state.guests));
    url.searchParams.set("guests", String(state.guests));
    return url.toString();
  }

  function shareURL() {
    const url = new URL(location.href);
    url.search = "";
    url.searchParams.set("apartment", state.property);
    if (state.checkin) url.searchParams.set("checkin", state.checkin);
    if (state.checkout) url.searchParams.set("checkout", state.checkout);
    url.searchParams.set("guests", String(state.guests));
    url.searchParams.set("parking", state.parking ? "yes" : "no");
    url.searchParams.set("currency", state.currency);
    return url.toString();
  }

  function updateURL(push) {
    const url = shareURL();
    history[push ? "pushState" : "replaceState"](null, "", url);
  }

  function renderExchangeNote() {
    const date = validISO(state.exchange.sourceDate) ? new Intl.DateTimeFormat("es-BO", { day: "numeric", month: "long", year: "numeric" }).format(parseISO(state.exchange.sourceDate)) : state.exchange.sourceDate;
    const fetched = state.exchange.fetchedAt ? new Intl.DateTimeFormat("es-BO", { dateStyle: "short", timeStyle: "short", timeZone: "America/La_Paz" }).format(new Date(state.exchange.fetchedAt)) : "pendiente";
    document.querySelector(".exchange-note").innerHTML = `Conversión referencial: 1 USD = Bs ${Number(state.exchange.rate).toFixed(2).replace(".", ",")}. <a href="${escapeHTML(state.exchange.sourceUrl)}" target="_blank" rel="noopener noreferrer">Fuente: Banco Central de Bolivia ↗</a><br>Fecha de corte: ${escapeHTML(date)} · Última consulta: ${escapeHTML(fetched)} BOT.`;
  }

  function availabilityRanges() { return state.availability.properties?.[state.property] || []; }
  function isBlocked(iso) { return availabilityRanges().some(range => iso >= range.start && iso < range.end); }
  function rangeAvailable(start, end) {
    if (!start || !end || end <= start) return false;
    for (let date = parseISO(start); date < parseISO(end); date = addDays(date, 1)) {
      if (isBlocked(toISO(date))) return false;
    }
    return true;
  }

  function openCalendar(target) {
    state.selecting = target === "checkout" && state.checkin ? "checkout" : "checkin";
    state.calendarMonth = firstOfMonth(parseISO(state.selecting === "checkout" && state.checkout ? state.checkout : (state.checkin || today)));
    renderCalendar();
    calendarDialog.showModal();
  }

  function renderCalendar() {
    const formatter = new Intl.DateTimeFormat("es-BO", { month: "long", year: "numeric" });
    const second = addMonths(state.calendarMonth, 1);
    document.getElementById("calendar-range-label").textContent = `${formatter.format(state.calendarMonth)} — ${formatter.format(second)}`;
    const availabilityStatus = document.getElementById("calendar-availability");
    if (state.availability.updatedAt) {
      const synced = new Intl.DateTimeFormat("es-BO", { dateStyle: "medium", timeStyle: "short", timeZone: "America/La_Paz" }).format(new Date(state.availability.updatedAt));
      availabilityStatus.textContent = `Disponibilidad de Airbnb sincronizada el ${synced} · Las fechas ocupadas aparecen bloqueadas.`;
      availabilityStatus.classList.remove("is-warning");
    } else {
      availabilityStatus.textContent = "La sincronización con Airbnb aún no está activa. Puedes cotizar fechas, pero confirma la disponibilidad con el anfitrión.";
      availabilityStatus.classList.add("is-warning");
    }
    document.querySelector(".calendars").innerHTML = [state.calendarMonth, second].map(renderMonth).join("");
  }

  function renderMonth(month) {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const mondayOffset = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
    const cells = Array.from({ length: mondayOffset }, () => '<span class="day empty"></span>');
    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = toISO(new Date(year, monthIndex, day));
      const past = iso < today;
      const blocked = isBlocked(iso);
      const selectableCheckout = state.selecting === "checkout" && state.checkin && iso > state.checkin && rangeAvailable(state.checkin, iso);
      const disabled = past || (blocked && !selectableCheckout);
      const selected = iso === state.checkin || iso === state.checkout;
      const inRange = state.checkin && state.checkout && iso > state.checkin && iso < state.checkout;
      cells.push(`<button type="button" class="day ${selected ? "selected" : ""} ${inRange ? "in-range" : ""}" data-date="${iso}" ${disabled ? "disabled" : ""} aria-label="${escapeHTML(longDate(iso))}">${day}</button>`);
    }
    return `<section class="month"><h3>${new Intl.DateTimeFormat("es-BO", { month: "long", year: "numeric" }).format(month)}</h3><div class="weekdays">${["Lu","Ma","Mi","Ju","Vi","Sá","Do"].map(day => `<span>${day}</span>`).join("")}</div><div class="days">${cells.join("")}</div></section>`;
  }

  function selectDate(iso) {
    if (state.selecting === "checkin" || !state.checkin) {
      state.checkin = iso;
      state.checkout = null;
      state.selecting = "checkout";
    } else if (iso <= state.checkin) {
      state.checkin = iso;
      state.checkout = null;
    } else if (rangeAvailable(state.checkin, iso)) {
      state.checkout = iso;
    } else {
      showToast("Ese rango incluye fechas no disponibles.");
    }
    renderCalendar();
    renderQuote();
  }

  async function shareQuote() {
    const property = properties[state.property];
    const quote = calculateQuote();
    const text = quote && !quote.error ? `${property.shortName}: ${quote.nights} noches para ${state.guests} huéspedes · ${formatMoney(quote.whatsappTotal)} reservando por WhatsApp` : `Conoce ${property.shortName} en Bolivia Stays`;
    const data = { title: `${property.shortName} · Bolivia Stays`, text, url: shareURL() };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); showToast("Enlace copiado"); }
    } catch (error) {
      if (error?.name !== "AbortError") showToast("No se pudo compartir el enlace");
    }
  }

  let toastTimer;
  function showToast(message) {
    const toast = document.querySelector(".toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.addEventListener("click", event => {
    const propertyButton = event.target.closest("[data-property]");
    if (propertyButton) {
      state.property = propertyButton.dataset.property;
      state.guests = clamp(state.guests, 1, properties[state.property].capacity);
      state.checkin = null;
      state.checkout = null;
      renderAll();
      document.getElementById("detalles").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const currency = event.target.closest("[data-currency]");
    if (currency) {
      state.currency = currency.dataset.currency;
      safeWrite("bolivia-stays-booking-currency", state.currency);
      renderQuote();
      return;
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    if (action === "guest-minus") { state.guests = clamp(state.guests - 1, 1, properties[state.property].capacity); renderQuote(); }
    if (action === "guest-plus") { state.guests = clamp(state.guests + 1, 1, properties[state.property].capacity); renderQuote(); }
    if (action === "currency-bob") { state.currency = "BOB"; safeWrite("bolivia-stays-booking-currency", state.currency); renderQuote(); }
    if (action === "open-calendar") openCalendar(event.target.closest("[data-date-target]").dataset.dateTarget);
    if (action === "close-calendar") calendarDialog.close();
    if (action === "calendar-prev") { const previous = addMonths(state.calendarMonth, -1); if (previous >= firstOfMonth(new Date())) state.calendarMonth = previous; renderCalendar(); }
    if (action === "calendar-next") { state.calendarMonth = addMonths(state.calendarMonth, 1); renderCalendar(); }
    if (action === "open-gallery") galleryDialog.showModal();
    if (action === "close-gallery") galleryDialog.close();
    if (action === "share") shareQuote();
  });

  document.addEventListener("click", event => {
    const day = event.target.closest("[data-date]");
    if (day && !day.disabled) selectDate(day.dataset.date);
  });

  document.getElementById("parking").addEventListener("change", event => { state.parking = event.target.checked; renderQuote(); });
  [calendarDialog, galleryDialog].forEach(dialog => dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); }));

  renderAll();
})();
