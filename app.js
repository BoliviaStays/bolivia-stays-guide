(() => {
  const content = window.GUIDE_CONTENT;
  const icons = ["⌂", "⌁", "●", "▣", "↻", "◇", "☼", "↔"];
  let language = localStorage.getItem("bolivia-stays-language") || "es";
  let property = "7e";
  let placeFilter = "all";

  if (!content[language]) language = "es";
  const get = (path) => path.split(".").reduce((value, key) => value?.[key], content[language]);

  function applyStaticTranslations() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = get(element.dataset.i18n);
      if (value) element.textContent = value;
    });
    document.querySelectorAll(".lang-btn").forEach((button) => {
      const active = button.dataset.lang === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderProperty() {
    const data = content[language].properties[property];
    document.getElementById("property-floor").textContent = data.floor;
    document.getElementById("property-name").textContent = data.name;
    document.getElementById("property-description").textContent = data.description;
    document.getElementById("property-capacity").textContent = data.capacity;
    document.getElementById("property-notice").textContent = data.notice;
    document.getElementById("property-features").innerHTML = data.features.map(([title, description], index) => `
      <div class="feature-card">
        <span class="feature-icon" aria-hidden="true">${icons[index % icons.length]}</span>
        <strong>${title}</strong><p>${description}</p>
      </div>`).join("");
    document.getElementById("property-panel").setAttribute("aria-labelledby", `tab-${property}`);
    document.querySelectorAll(".property-tab").forEach((tab) => {
      const active = tab.dataset.property === property;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
  }

  function renderEssentials() {
    document.getElementById("essentials-grid").innerHTML = content[language].essentials.cards.map(([title, description], index) => `
      <article class="info-card"><span class="info-icon" aria-hidden="true">${index + 1}</span><h3>${title}</h3><p>${description}</p></article>`).join("");
  }

  function renderRules() {
    const symbols = ["×", "○", "☾", "♡", "+", "♧"];
    document.getElementById("rules-grid").innerHTML = content[language].rules.items.map(([title, description], index) => `
      <article class="rule-card"><span class="rule-icon" aria-hidden="true">${symbols[index]}</span><div><strong>${title}</strong><p>${description}</p></div></article>`).join("");
  }

  function renderPlaces() {
    const labels = content[language].nearby.filters;
    document.getElementById("place-filters").innerHTML = Object.entries(labels).map(([key, label]) => `<button class="filter-button ${placeFilter === key ? "is-active" : ""}" type="button" data-filter="${key}">${label}</button>`).join("");
    const places = content[language].places.filter((place) => placeFilter === "all" || place.category === placeFilter);
    document.getElementById("places-grid").innerHTML = places.map((place) => {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.query)}`;
      return `<a class="place-card" href="${url}" target="_blank" rel="noopener"><span class="place-type">${place.type}</span><h3>${place.name}</h3><p>${place.description}</p><span>${content[language].actions.viewMap} →</span></a>`;
    }).join("");
    document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => {
      placeFilter = button.dataset.filter;
      renderPlaces();
    }));
  }

  function renderContacts() {
    document.getElementById("contact-list").innerHTML = content[language].contacts.map(([name, description, value, href]) => `
      <a class="contact-card" href="${href}" ${href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}><div><strong>${name}</strong><span>${description}</span></div><b>${value}</b></a>`).join("");
  }

  function renderFaq() {
    document.getElementById("faq-list").innerHTML = content[language].faq.items.map(([question, answer]) => `
      <div class="faq-item"><button class="faq-question" type="button" aria-expanded="false"><span>${question}</span><span aria-hidden="true">+</span></button><div class="faq-answer">${answer}</div></div>`).join("");
    document.querySelectorAll(".faq-question").forEach((button) => button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.lastElementChild.textContent = open ? "−" : "+";
    }));
  }

  function renderAll() {
    applyStaticTranslations();
    renderProperty();
    renderEssentials();
    renderRules();
    renderPlaces();
    renderContacts();
    renderFaq();
  }

  document.querySelectorAll(".lang-btn").forEach((button) => button.addEventListener("click", () => {
    language = button.dataset.lang;
    localStorage.setItem("bolivia-stays-language", language);
    renderAll();
  }));
  document.querySelectorAll(".property-tab").forEach((tab) => tab.addEventListener("click", () => {
    property = tab.dataset.property;
    renderProperty();
  }));

  renderAll();
})();
