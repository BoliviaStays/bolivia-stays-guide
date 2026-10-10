(() => {
  const config = window.BOLIVIA_STAYS;
  const properties = config.properties;
  const params = new URLSearchParams(location.search);
  const translations = {
    es: {
      skip: "Saltar al contenido", stays: "Alojamientos", details: "Detalles", quote: "Cotizar", language: "Idioma", currency: "Moneda",
      heroTitle: "Tu espacio en el corazón de la ciudad.", heroText: "Elige el departamento que mejor se adapte a tu viaje, revisa fechas y recibe una cotización clara al instante.", viewStays: "Ver alojamientos", photosLabel: "Fotografías de los departamentos", twoApartments: "2 departamentos", primeLocation: "Una ubicación privilegiada",
      chooseStay: "Elige tu estadía", twoWays: "Dos formas de sentirte en casa", bothIntro: "Ambos alojamientos están en Sky Recoleta, cerca de restaurantes, cafés y los principales puntos del norte de Cochabamba.", apartments: "Departamentos", share: "↗ Compartir",
      about: "Acerca de este alojamiento", offers: "Lo que ofrece este lugar", locationTitle: "Una ubicación práctica y segura", locationBody: "Av. Uyuni y Melchor Urquidi, a pasos del Boulevard, la Recoleta y la Av. Pando.",
      perNight: "por noche", payBob: "Quiero pagar en Bs", checkin: "Llegada", checkout: "Salida", select: "Seleccionar", guests: "Huéspedes", guest: "huésped", guestsLower: "huéspedes", garage: "Garaje", garageFree: "Sin costo · sujeto a confirmación", guestCount: "Cantidad de huéspedes", removeGuest: "Quitar huésped", addGuest: "Añadir huésped",
      chooseDatesPrice: "Selecciona tus fechas para calcular el precio.", bookWhatsapp: "Reservar por WhatsApp", bookAirbnb: "Reservar por Airbnb", shareQuote: "Compartir cotización", bookingNote: "La cotización y el garaje están sujetos a confirmación. Airbnb verificará nuevamente disponibilidad y precio.", footerNote: "Cotización informativa. La reserva queda confirmada únicamente después de coordinar con el anfitrión o finalizarla en Airbnb.",
      selectDates: "Selecciona fechas", yourStay: "Tu estadía", chooseArrivalDeparture: "Elige llegada y salida.", unavailable: "No disponible", done: "Listo", gallery: "Galería", close: "Cerrar", prevMonth: "Mes anterior", nextMonth: "Mes siguiente",
      bedroom: "dormitorio", bedrooms: "dormitorios", room: "habitación", rooms: "habitaciones", bed: "cama", beds: "camas", bath: "baño", baths: "baños", upTo: "Hasta", from: "Desde", photo: "Foto", openGallery: "Abrir galería de", seePhotos: "Ver las {count} fotos",
      departureAfterArrival: "La salida debe ser posterior a la llegada.", unavailableRange: "Estas fechas incluyen noches no disponibles. Elige otro rango.", monthlyDiscount: "15% estancia mensual", weeklyDiscount: "10% estancia semanal", lastMinuteDiscount: "5% última hora", extraWhatsapp: "5% extra por WhatsApp",
      syncedDates: "Fechas disponibles según la última sincronización.", confirmAvailability: "Cotización lista. La disponibilidad se confirmará antes de reservar.", night: "noche", nights: "noches", regular: "regular", weekend: "fin de semana", extraGuest: "Huésped adicional", discount: "Descuento", stayTotal: "Total de la estadía", directDiscount: "5% por reservar directo en WhatsApp", whatsappTotal: "Total por WhatsApp", longStay: "¿Te quedas 7 noches o más? Consulta con el anfitrión otros descuentos disponibles.",
      syncActive: "Disponibilidad de Airbnb sincronizada el {date} · Las fechas ocupadas aparecen bloqueadas.", syncInactive: "La sincronización con Airbnb aún no está activa. Puedes cotizar fechas, pero confirma la disponibilidad con el anfitrión.", copied: "Enlace copiado", shareError: "No se pudo compartir el enlace", blockedRange: "Ese rango incluye fechas no disponibles.",
      exchange: "Conversión referencial: 1 USD = Bs {rate}.", source: "Fuente: Banco Central de Bolivia ↗", cutDate: "Fecha de corte", lastCheck: "Última consulta", pending: "pendiente", directBooking: "Reserva directa"
    },
    en: {
      skip: "Skip to content", stays: "Stays", details: "Details", quote: "Get a quote", language: "Language", currency: "Currency",
      heroTitle: "Your place in the heart of the city.", heroText: "Choose the apartment that best fits your trip, check dates, and get a clear quote instantly.", viewStays: "View stays", photosLabel: "Apartment photos", twoApartments: "2 apartments", primeLocation: "A privileged location",
      chooseStay: "Choose your stay", twoWays: "Two ways to feel at home", bothIntro: "Both apartments are in Sky Recoleta, close to restaurants, cafés, and the main destinations in northern Cochabamba.", apartments: "Apartments", share: "↗ Share",
      about: "About this stay", offers: "What this place offers", locationTitle: "A convenient and safe location", locationBody: "Uyuni Ave. and Melchor Urquidi, steps from the Boulevard, Recoleta, and Pando Ave.",
      perNight: "per night", payBob: "I want to pay in Bs", checkin: "Check-in", checkout: "Checkout", select: "Select", guests: "Guests", guest: "guest", guestsLower: "guests", garage: "Parking", garageFree: "Free · subject to confirmation", guestCount: "Number of guests", removeGuest: "Remove guest", addGuest: "Add guest",
      chooseDatesPrice: "Select your dates to calculate the price.", bookWhatsapp: "Book via WhatsApp", bookAirbnb: "Book on Airbnb", shareQuote: "Share quote", bookingNote: "The quote and parking are subject to confirmation. Airbnb will verify availability and price again.", footerNote: "Informational quote. The booking is confirmed only after coordinating with the host or completing it on Airbnb.",
      selectDates: "Select dates", yourStay: "Your stay", chooseArrivalDeparture: "Choose check-in and checkout.", unavailable: "Unavailable", done: "Done", gallery: "Gallery", close: "Close", prevMonth: "Previous month", nextMonth: "Next month",
      bedroom: "bedroom", bedrooms: "bedrooms", room: "room", rooms: "rooms", bed: "bed", beds: "beds", bath: "bathroom", baths: "bathrooms", upTo: "Up to", from: "From", photo: "Photo", openGallery: "Open gallery for", seePhotos: "View all {count} photos",
      departureAfterArrival: "Checkout must be after check-in.", unavailableRange: "These dates include unavailable nights. Choose another range.", monthlyDiscount: "15% monthly stay", weeklyDiscount: "10% weekly stay", lastMinuteDiscount: "5% last-minute", extraWhatsapp: "5% extra via WhatsApp",
      syncedDates: "Dates available according to the latest sync.", confirmAvailability: "Quote ready. Availability will be confirmed before booking.", night: "night", nights: "nights", regular: "regular", weekend: "weekend", extraGuest: "Additional guest", discount: "Discount", stayTotal: "Stay total", directDiscount: "5% for booking directly via WhatsApp", whatsappTotal: "WhatsApp total", longStay: "Staying 7 nights or more? Ask the host about other available discounts.",
      syncActive: "Airbnb availability synced on {date} · Booked dates are blocked.", syncInactive: "Airbnb sync is not active yet. You can quote dates, but confirm availability with the host.", copied: "Link copied", shareError: "The link could not be shared", blockedRange: "That range includes unavailable dates.",
      exchange: "Reference conversion: 1 USD = Bs {rate}.", source: "Source: Central Bank of Bolivia ↗", cutDate: "Rate date", lastCheck: "Last checked", pending: "pending", directBooking: "Direct booking"
    },
    pt: {
      skip: "Pular para o conteúdo", stays: "Hospedagens", details: "Detalhes", quote: "Fazer cotação", language: "Idioma", currency: "Moeda",
      heroTitle: "Seu espaço no coração da cidade.", heroText: "Escolha o apartamento ideal para sua viagem, consulte as datas e receba uma cotação clara na hora.", viewStays: "Ver hospedagens", photosLabel: "Fotos dos apartamentos", twoApartments: "2 apartamentos", primeLocation: "Uma localização privilegiada",
      chooseStay: "Escolha sua estadia", twoWays: "Duas formas de se sentir em casa", bothIntro: "Os dois apartamentos ficam no Sky Recoleta, perto de restaurantes, cafés e dos principais pontos da zona norte de Cochabamba.", apartments: "Apartamentos", share: "↗ Compartilhar",
      about: "Sobre esta hospedagem", offers: "O que este lugar oferece", locationTitle: "Uma localização prática e segura", locationBody: "Av. Uyuni e Melchor Urquidi, a poucos passos do Boulevard, da Recoleta e da Av. Pando.",
      perNight: "por noite", payBob: "Quero pagar em Bs", checkin: "Entrada", checkout: "Saída", select: "Selecionar", guests: "Hóspedes", guest: "hóspede", guestsLower: "hóspedes", garage: "Garagem", garageFree: "Grátis · sujeito a confirmação", guestCount: "Quantidade de hóspedes", removeGuest: "Remover hóspede", addGuest: "Adicionar hóspede",
      chooseDatesPrice: "Selecione as datas para calcular o preço.", bookWhatsapp: "Reservar pelo WhatsApp", bookAirbnb: "Reservar pelo Airbnb", shareQuote: "Compartilhar cotação", bookingNote: "A cotação e a garagem estão sujeitas a confirmação. O Airbnb verificará novamente a disponibilidade e o preço.", footerNote: "Cotação informativa. A reserva só é confirmada após coordenar com o anfitrião ou finalizá-la no Airbnb.",
      selectDates: "Selecione as datas", yourStay: "Sua estadia", chooseArrivalDeparture: "Escolha a entrada e a saída.", unavailable: "Indisponível", done: "Pronto", gallery: "Galeria", close: "Fechar", prevMonth: "Mês anterior", nextMonth: "Próximo mês",
      bedroom: "quarto", bedrooms: "quartos", room: "quarto", rooms: "quartos", bed: "cama", beds: "camas", bath: "banheiro", baths: "banheiros", upTo: "Até", from: "A partir de", photo: "Foto", openGallery: "Abrir galeria de", seePhotos: "Ver todas as {count} fotos",
      departureAfterArrival: "A saída deve ser depois da entrada.", unavailableRange: "Estas datas incluem noites indisponíveis. Escolha outro período.", monthlyDiscount: "15% para estadia mensal", weeklyDiscount: "10% para estadia semanal", lastMinuteDiscount: "5% de última hora", extraWhatsapp: "5% extra pelo WhatsApp",
      syncedDates: "Datas disponíveis conforme a última sincronização.", confirmAvailability: "Cotação pronta. A disponibilidade será confirmada antes da reserva.", night: "noite", nights: "noites", regular: "regular", weekend: "fim de semana", extraGuest: "Hóspede adicional", discount: "Desconto", stayTotal: "Total da estadia", directDiscount: "5% por reservar diretamente pelo WhatsApp", whatsappTotal: "Total pelo WhatsApp", longStay: "Vai ficar 7 noites ou mais? Consulte o anfitrião sobre outros descontos disponíveis.",
      syncActive: "Disponibilidade do Airbnb sincronizada em {date} · As datas ocupadas aparecem bloqueadas.", syncInactive: "A sincronização com o Airbnb ainda não está ativa. Você pode fazer uma cotação, mas confirme a disponibilidade com o anfitrião.", copied: "Link copiado", shareError: "Não foi possível compartilhar o link", blockedRange: "Esse período inclui datas indisponíveis.",
      exchange: "Conversão de referência: 1 USD = Bs {rate}.", source: "Fonte: Banco Central da Bolívia ↗", cutDate: "Data da cotação", lastCheck: "Última consulta", pending: "pendente", directBooking: "Reserva direta"
    }
  };
  const localeByLanguage = { es: "es-BO", en: "en-US", pt: "pt-BR" };
  const savedLanguage = safeRead("bolivia-stays-booking-language");
  const today = toISO(startOfDay(new Date()));
  const validProperty = value => Object.hasOwn(properties, value);
  const savedCurrency = safeRead("bolivia-stays-booking-currency");

  const state = {
    lang: ["es", "en", "pt"].includes(params.get("lang")) ? params.get("lang") : (["es", "en", "pt"].includes(savedLanguage) ? savedLanguage : "es"),
    property: validProperty(params.get("apartment")) ? params.get("apartment") : "7e",
    currency: ["USD", "BOB"].includes(params.get("currency")) ? params.get("currency") : (savedCurrency || "USD"),
    guests: Number(params.get("guests")) || 2,
    parking: params.get("parking") === "yes",
    checkin: validISO(params.get("checkin")) ? params.get("checkin") : null,
    checkout: validISO(params.get("checkout")) ? params.get("checkout") : null,
    galleryOpen: params.get("gallery") === "open",
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
  const propertyTranslations = {
    en: {
      "7e": {
        name: "Memories · cozy and central", floor: "7th floor · Apartment 7E",
        description: "A modern and welcoming two-bedroom apartment with a balcony and open city views. Its comfortable layout, equipped kitchen, and excellent location make it a great choice for couples, families, or business trips.",
        amenities: [["Entire place", "Privacy and full access"], ["Wi-Fi", "Connection for work and entertainment"], ["Equipped kitchen", "Everything you need for your stay"], ["Workspace", "A comfortable and private area"], ["Balcony and view", "City and mountain views"], ["Free parking", "Available with prior coordination"], ["Elevator", "Easy access to the seventh floor"], ["Washer", "Ideal for longer stays"]]
      },
      "11f": {
        name: "The Renoir apartment", floor: "11th floor · Apartment 11F",
        description: "An elegant, bright space inspired by Renoir, with a privileged view of Cristo de la Concordia. It includes a private bedroom, sofa bed, equipped kitchen, and everything needed for a comfortable stay in Recoleta.",
        amenities: [["Entire place", "The apartment will be all yours"], ["Wi-Fi", "Connection for work and entertainment"], ["Equipped kitchen", "Compact, practical, and complete"], ["City view", "Cristo de la Concordia and mountain views"], ["Television", "In the bedroom and living area"], ["Free parking", "Available with prior coordination"], ["Elevator", "Easy access to the eleventh floor"], ["Hair dryer", "Included among the amenities"]]
      }
    },
    pt: {
      "7e": {
        name: "Memories · aconchegante e central", floor: "7º andar · Apartamento 7E",
        description: "Um apartamento moderno e aconchegante com dois quartos, varanda e vista aberta para a cidade. A distribuição confortável, a cozinha equipada e a excelente localização fazem dele uma ótima opção para casais, famílias ou viagens de trabalho.",
        amenities: [["Espaço inteiro", "Privacidade e acesso completo"], ["Wi-Fi", "Conexão para trabalho e entretenimento"], ["Cozinha equipada", "Tudo o que você precisa para sua estadia"], ["Espaço de trabalho", "Uma área confortável e privativa"], ["Varanda e vista", "Vista da cidade e das montanhas"], ["Garagem gratuita", "Disponível mediante coordenação prévia"], ["Elevador", "Acesso fácil ao sétimo andar"], ["Máquina de lavar", "Ideal para estadias longas"]]
      },
      "11f": {
        name: "O apartamento de Renoir", floor: "11º andar · Apartamento 11F",
        description: "Um espaço elegante e iluminado inspirado em Renoir, com vista privilegiada para o Cristo de la Concordia. Possui quarto privativo, sofá-cama, cozinha equipada e tudo o que é necessário para uma estadia confortável na Recoleta.",
        amenities: [["Espaço inteiro", "O apartamento será só seu"], ["Wi-Fi", "Conexão para trabalho e entretenimento"], ["Cozinha equipada", "Compacta, prática e completa"], ["Vista da cidade", "Cristo de la Concordia e montanhas"], ["Televisão", "No quarto e na área social"], ["Garagem gratuita", "Disponível mediante coordenação prévia"], ["Elevador", "Acesso fácil ao décimo primeiro andar"], ["Secador de cabelo", "Incluído entre as comodidades"]]
      }
    }
  };

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

  function t(key, values = {}) {
    return String(translations[state.lang]?.[key] ?? translations.es[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
  }
  function locale() { return localeByLanguage[state.lang]; }
  function unit(count, singular, plural) { return `${count} ${t(count === 1 ? singular : plural)}`; }
  function localizedProperty(property) {
    const translated = propertyTranslations[state.lang]?.[property.id];
    if (!translated) return property;
    return {
      ...property,
      ...translated,
      amenities: property.amenities.map(([icon], index) => [icon, ...translated.amenities[index]])
    };
  }

  function renderStaticTranslations() {
    document.documentElement.lang = state.lang === "pt" ? "pt-BR" : state.lang;
    const text = (selector, key) => { const element = document.querySelector(selector); if (element) element.textContent = t(key); };
    text(".skip-link", "skip");
    ["stays", "details", "quote"].forEach((key, index) => text(`.main-nav a:nth-child(${index + 1})`, key));
    document.querySelector(".main-nav")?.setAttribute("aria-label", t("details"));
    document.querySelector(".currency-switcher")?.setAttribute("aria-label", t("currency"));
    document.querySelector(".language-switcher")?.setAttribute("aria-label", t("language"));
    text(".hero h1", "heroTitle"); text(".hero-text", "heroText"); text(".hero .button.primary", "viewStays");
    document.querySelector(".hero-collage")?.setAttribute("aria-label", t("photosLabel"));
    text(".hero-note strong", "twoApartments"); text(".hero-note span", "primeLocation");
    text("#alojamientos .eyebrow", "chooseStay"); text("#alojamientos h2", "twoWays"); text("#alojamientos .section-heading > p", "bothIntro");
    document.querySelector(".property-selector")?.setAttribute("aria-label", t("apartments"));
    text(".share-link", "share"); text(".description-block h3", "about");
    text(".description-block + hr + section h3", "offers"); text(".location-card h3", "locationTitle"); text(".location-card p:not(.eyebrow)", "locationBody");
    text(".price-lead span", "perNight"); text(".currency-quick", "payBob");
    text('[data-date-target="checkin"] small', "checkin"); text('[data-date-target="checkout"] small', "checkout"); text(".guest-field small", "guests"); text(".parking-field small", "garage"); text(".parking-field strong", "garageFree");
    document.querySelector(".stepper")?.setAttribute("aria-label", t("guestCount"));
    document.querySelector('[data-action="guest-minus"]')?.setAttribute("aria-label", t("removeGuest")); document.querySelector('[data-action="guest-plus"]')?.setAttribute("aria-label", t("addGuest"));
    text('[data-action="whatsapp"]', "bookWhatsapp"); text('[data-action="airbnb"]', "bookAirbnb"); text('.action-stack [data-action="share"]', "shareQuote"); text(".booking-note", "bookingNote"); text(".privacy-note", "footerNote");
    text("#calendar-dialog .modal-header .eyebrow", "selectDates"); text("#calendar-title", "yourStay"); text(".calendar-footer .button", "done");
    const legend = document.querySelector(".calendar-footer span"); if (legend) legend.innerHTML = `<i class="legend-dot blocked"></i> ${escapeHTML(t("unavailable"))}`;
    text("#gallery-dialog .eyebrow", "gallery");
    document.querySelectorAll('[data-action="close-calendar"], [data-action="close-gallery"]').forEach(button => button.setAttribute("aria-label", t("close")));
    document.querySelector('[data-action="calendar-prev"]')?.setAttribute("aria-label", t("prevMonth")); document.querySelector('[data-action="calendar-next"]')?.setAttribute("aria-label", t("nextMonth"));
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
  function dateLabel(value) { return value ? new Intl.DateTimeFormat(locale(), { day: "numeric", month: "short" }).format(parseISO(value)) : t("select"); }
  function longDate(value) { return new Intl.DateTimeFormat(locale(), { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(parseISO(value)); }
  function assetUrl(property, file) { return `assets/${property}/${encodeURIComponent(file)}`; }
  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char])); }

  function formatUSD(value) { return `US$ ${Number(value).toFixed(2)}`; }
  function formatMoney(valueUSD) {
    if (state.currency === "BOB") return `Bs ${Math.round(valueUSD * state.exchange.rate).toLocaleString("es-BO")}`;
    return formatUSD(valueUSD);
  }

  function renderAll() {
    renderStaticTranslations();
    renderLanguage();
    renderCurrency();
    renderPropertySelector();
    renderProperty();
    renderQuote();
    updateURL(false);
    if (state.galleryOpen && !galleryDialog.open) galleryDialog.showModal();
  }

  function renderCurrency() {
    document.querySelectorAll("[data-currency]").forEach(button => {
      const active = button.dataset.currency === state.currency;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderLanguage() {
    document.querySelectorAll("[data-lang]").forEach(button => {
      const active = button.dataset.lang === state.lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderPropertySelector() {
    document.querySelector(".property-selector").innerHTML = Object.values(properties).map(property => `
      <button type="button" class="property-card ${property.id === state.property ? "is-active" : ""}" data-property="${property.id}" role="tab" aria-selected="${property.id === state.property}">
        <img src="${assetUrl(property.id, property.images[0])}" alt="${escapeHTML(property.shortName)}" width="340" height="256">
        <span><strong>${escapeHTML(property.shortName)}</strong><span>${unit(property.bedrooms, "bedroom", "bedrooms")} · ${t("upTo")} ${unit(property.capacity, "guest", "guestsLower")}</span></span>
        <b>${t("from")} ${formatMoney(property.weekdayRate)} ${t("perNight")}</b>
      </button>`).join("");
  }

  function renderProperty() {
    const property = properties[state.property];
    const content = localizedProperty(property);
    document.title = `${property.shortName} · ${t("directBooking")} · Bolivia Stays`;
    document.querySelector(".property-kicker").textContent = content.floor;
    document.querySelector(".property-name").textContent = content.name;
    document.querySelector(".property-description").textContent = content.description;
    document.querySelector(".fact-line").innerHTML = [
      `${t("upTo")} ${unit(property.capacity, "guest", "guestsLower")}`,
      unit(property.bedrooms, "room", "rooms"),
      unit(property.beds, "bed", "beds"),
      unit(property.baths, "bath", "baths")
    ].map(text => `<span>${text}</span>`).join("");
    document.querySelector(".amenities-grid").innerHTML = content.amenities.map(([icon, title, body]) => `
      <div class="amenity"><span class="amenity-icon" aria-hidden="true">${icon}</span><div><strong>${escapeHTML(title)}</strong><small>${escapeHTML(body)}</small></div></div>`).join("");
    document.querySelector(".night-price").textContent = `${t("from")} ${formatMoney(property.weekdayRate)}`;
    renderMosaic(property);
    renderGallery(property);
  }

  function renderMosaic(property) {
    const firstFive = property.images.slice(0, 5);
    document.querySelector(".photo-mosaic").innerHTML = firstFive.map((file, index) => `
      <button type="button" class="photo-button" data-action="open-gallery" aria-label="${t("openGallery")} ${escapeHTML(property.shortName)}">
        <img src="${assetUrl(property.id, file)}" alt="${t("photo")} ${index + 1} · ${escapeHTML(property.shortName)}" ${index ? 'loading="lazy"' : ''}>
        ${index === 4 ? `<span class="show-all">▦ ${t("seePhotos", { count: property.images.length })}</span>` : ""}
      </button>`).join("");
  }

  function renderGallery(property) {
    document.getElementById("gallery-title").textContent = property.shortName;
    document.querySelector(".gallery-grid").innerHTML = property.images.map((file, index) => `
      <figure><img src="${assetUrl(property.id, file)}" alt="${t("photo")} ${index + 1} · ${escapeHTML(property.shortName)}" loading="lazy"></figure>`).join("");
  }

  function calculateQuote() {
    if (!state.checkin || !state.checkout) return null;
    const nights = daysBetween(state.checkin, state.checkout);
    if (nights < 1) return { error: t("departureAfterArrival") };
    if (!rangeAvailable(state.checkin, state.checkout)) return { error: t("unavailableRange") };

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
    if (nights >= 28) { discountPercent = 15; discountLabel = t("monthlyDiscount"); }
    else if (nights >= 7) { discountPercent = 10; discountLabel = t("weeklyDiscount"); }
    else if (leadDays >= 0 && leadDays <= 2) { discountPercent = 5; discountLabel = t("lastMinuteDiscount"); }
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
    document.getElementById("guest-label").textContent = unit(state.guests, "guest", "guestsLower");
    document.getElementById("parking").checked = state.parking;
    document.querySelector(".night-price").textContent = `${t("from")} ${formatMoney(property.weekdayRate)}`;
    document.querySelector(".currency-quick").hidden = state.currency !== "USD";

    const quote = calculateQuote();
    const status = document.querySelector(".quote-status");
    const discounts = document.querySelector(".discounts");
    const breakdown = document.querySelector(".price-breakdown");
    const whatsapp = document.querySelector('[data-action="whatsapp"]');
    const airbnb = document.querySelector('[data-action="airbnb"]');

    status.classList.remove("error");
    if (!quote) {
      status.textContent = t("chooseDatesPrice");
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
      status.textContent = state.availability.updatedAt ? t("syncedDates") : t("confirmAvailability");
      discounts.innerHTML = `${quote.discountPercent ? `<span class="discount-badge">✓ ${quote.discountLabel}</span>` : ""}<span class="discount-badge whatsapp-badge">${t("extraWhatsapp")}</span>`;
      const nightlyText = `${unit(quote.nights, "night", "nights")} (${quote.weekdayNights} ${t("regular")} · ${quote.weekendNights} ${t("weekend")})`;
      breakdown.hidden = false;
      breakdown.innerHTML = `
        <div class="price-row"><span>${nightlyText}</span><span>${formatMoney(quote.lodging)}</span></div>
        ${quote.extraGuest ? `<div class="price-row"><span>${t("extraGuest")}</span><span>${formatMoney(quote.extraGuest)}</span></div>` : ""}
        ${quote.discount ? `<div class="price-row discount"><span>${t("discount")}</span><span>− ${formatMoney(quote.discount)}</span></div>` : ""}
        <div class="price-row total"><span>${t("stayTotal")}</span><span>${quote.discount ? `<span class="old-total">${formatMoney(quote.subtotal)}</span>` : ""}${formatMoney(quote.total)}</span></div>
        <div class="whatsapp-saving">
          <div class="price-row discount"><span>${t("directDiscount")}</span><span>− ${formatMoney(quote.whatsappDiscount)}</span></div>
          <div class="price-row whatsapp-total"><span>${t("whatsappTotal")}</span><span>${formatMoney(quote.whatsappTotal)}</span></div>
        </div>
        ${quote.nights >= 7 ? `<p class="long-stay-note">${t("longStay")}</p>` : ""}`;
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
    const hostDiscountLabel = quote.discountPercent === 15 ? "15% estancia mensual" : quote.discountPercent === 10 ? "10% estancia semanal" : quote.discountPercent === 5 ? "5% última hora" : "";
    const lines = [
      "Hola, quisiera consultar esta reserva:", "",
      `Departamento: ${property.shortName}`,
      `Entrada: ${longDate(state.checkin)}`,
      `Salida: ${longDate(state.checkout)}`,
      `Noches: ${quote.nights}`,
      `Huéspedes: ${state.guests}`,
      `Garaje gratuito solicitado: ${state.parking ? "Sí" : "No"}`,
      hostDiscountLabel ? `Descuento aplicado: ${hostDiscountLabel}` : null,
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
    url.searchParams.set("lang", state.lang);
    if (state.galleryOpen) url.searchParams.set("gallery", "open");
    return url.toString();
  }

  function updateURL(push) {
    const url = shareURL();
    history[push ? "pushState" : "replaceState"](null, "", url);
  }

  function renderExchangeNote() {
    const date = validISO(state.exchange.sourceDate) ? new Intl.DateTimeFormat(locale(), { day: "numeric", month: "long", year: "numeric" }).format(parseISO(state.exchange.sourceDate)) : state.exchange.sourceDate;
    const fetched = state.exchange.fetchedAt ? new Intl.DateTimeFormat(locale(), { dateStyle: "short", timeStyle: "short", timeZone: "America/La_Paz" }).format(new Date(state.exchange.fetchedAt)) : t("pending");
    const rate = Number(state.exchange.rate).toFixed(2).replace(".", state.lang === "en" ? "." : ",");
    document.querySelector(".exchange-note").innerHTML = `${t("exchange", { rate })} <a href="${escapeHTML(state.exchange.sourceUrl)}" target="_blank" rel="noopener noreferrer">${t("source")}</a><br>${t("cutDate")}: ${escapeHTML(date)} · ${t("lastCheck")}: ${escapeHTML(fetched)} BOT.`;
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
    const formatter = new Intl.DateTimeFormat(locale(), { month: "long", year: "numeric" });
    const second = addMonths(state.calendarMonth, 1);
    document.getElementById("calendar-range-label").textContent = `${formatter.format(state.calendarMonth)} — ${formatter.format(second)}`;
    const availabilityStatus = document.getElementById("calendar-availability");
    if (state.availability.updatedAt) {
      const synced = new Intl.DateTimeFormat(locale(), { dateStyle: "medium", timeStyle: "short", timeZone: "America/La_Paz" }).format(new Date(state.availability.updatedAt));
      availabilityStatus.textContent = t("syncActive", { date: synced });
      availabilityStatus.classList.remove("is-warning");
    } else {
      availabilityStatus.textContent = t("syncInactive");
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
    const weekdays = { es: ["Lu","Ma","Mi","Ju","Vi","Sá","Do"], en: ["Mo","Tu","We","Th","Fr","Sa","Su"], pt: ["Se","Te","Qu","Qu","Se","Sá","Do"] }[state.lang];
    return `<section class="month"><h3>${new Intl.DateTimeFormat(locale(), { month: "long", year: "numeric" }).format(month)}</h3><div class="weekdays">${weekdays.map(day => `<span>${day}</span>`).join("")}</div><div class="days">${cells.join("")}</div></section>`;
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
      showToast(t("blockedRange"));
    }
    renderCalendar();
    renderQuote();
  }

  async function shareQuote() {
    const property = properties[state.property];
    const quote = calculateQuote();
    const text = quote && !quote.error ? `${property.shortName}: ${unit(quote.nights, "night", "nights")} · ${unit(state.guests, "guest", "guestsLower")} · ${formatMoney(quote.whatsappTotal)} WhatsApp` : property.shortName;
    const data = { title: `${property.shortName} · Bolivia Stays`, text, url: shareURL() };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); showToast(t("copied")); }
    } catch (error) {
      if (error?.name !== "AbortError") showToast(t("shareError"));
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
    const language = event.target.closest("[data-lang]");
    if (language) {
      state.lang = language.dataset.lang;
      safeWrite("bolivia-stays-booking-language", state.lang);
      renderAll();
      if (calendarDialog.open) renderCalendar();
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
    if (action === "open-gallery") { state.galleryOpen = true; updateURL(false); galleryDialog.showModal(); }
    if (action === "close-gallery") galleryDialog.close();
    if (action === "share") shareQuote();
  });

  document.addEventListener("click", event => {
    const day = event.target.closest("[data-date]");
    if (day && !day.disabled) selectDate(day.dataset.date);
  });

  document.getElementById("parking").addEventListener("change", event => { state.parking = event.target.checked; renderQuote(); });
  [calendarDialog, galleryDialog].forEach(dialog => dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); }));
  galleryDialog.addEventListener("close", () => {
    if (!state.galleryOpen) return;
    state.galleryOpen = false;
    updateURL(false);
  });

  renderAll();
})();
