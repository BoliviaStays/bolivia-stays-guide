(() => {
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ } };
  const params = new URLSearchParams(location.search);
  const validProperty = value => ['7e', '11f'].includes(value);
  let property = params.get('apartment');
  if (!validProperty(property)) property = read('bolivia-stays-apartment');
  if (!validProperty(property)) property = null;
  let language = params.get('lang') || read('bolivia-stays-language') || navigator.language.slice(0, 2);
  if (!window.GUIDE_CONTENT[language]) language = 'es';
  let filter = 'all';
  let expanded = false;
  const esc = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const maps = query => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const external = (url, label, css = '') => `<a class="${css}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
  const detail = (title, body) => `<details class="instruction"><summary>${esc(title)}</summary><p>${esc(body)}</p></details>`;
  function updateURL() {
    const url = new URL(location.href);
    if (property) url.searchParams.set('apartment', property);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
  }
  function renderPlaces() {
    const ui = window.GUEST_UI[language];
    const entries = window.GUEST_PLACES.filter(p => filter === 'all' || p.category === filter);
    const visible = expanded ? entries : entries.slice(0, 6);
    document.getElementById('place-filters').innerHTML = Object.entries(ui.filters).map(([key, label]) => `<button type="button" data-filter="${key}" aria-pressed="${filter === key}" class="chip ${filter === key ? 'active' : ''}">${esc(label)}</button>`).join('');
    document.getElementById('places-grid').innerHTML = visible.map(p => {
      const photo = window.PLACE_PHOTOS?.[p.photo || p.category];
      const name = typeof p.name === 'string' ? p.name : p.name[language];
      const mapUrl = p.mapUrl || maps(p.query);
      return `<article class="place-card">${photo ? `<div class="place-photo"><img class="${photo.fit === 'contain' ? 'contain' : ''}" src="${esc(photo.url)}" alt="${esc(photo.real ? name : ui.illustrative)}" loading="lazy" width="640" height="400">${photo.real ? '' : `<span>${esc(ui.illustrative)}</span>`}</div>` : ''}<div class="place-body"><span class="category">${esc(ui.filters[p.category])}</span><h3>${esc(name)}</h3><p>${esc(p.description[language])}</p><div class="place-links">${external(mapUrl, p.search ? ui.findMaps : ui.viewMaps)}${p.source ? external(p.source, ui.source, 'source-link') : ''}</div></div></article>`;
    }).join('');
    document.getElementById('show-more').hidden = entries.length <= 6;
    document.getElementById('show-more').textContent = expanded ? ui.less : `${ui.more} (${entries.length - 6})`;
    document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; expanded = false; renderPlaces(); }));
    document.querySelectorAll('.place-photo img').forEach(img => img.addEventListener('error', () => { img.closest('.place-photo').hidden = true; }, {once:true}));
  }
  function render() {
    const ui = window.GUEST_UI[language];
    const base = window.GUIDE_CONTENT[language];
    document.documentElement.lang = language;
    document.title = `${property ? base.properties[property].name + ' · ' : ''}Bolivia Stays`;
    document.querySelector('.skip-link').textContent = {es:'Saltar al contenido',en:'Skip to content',fr:'Aller au contenu'}[language];
    document.querySelectorAll('[data-lang]').forEach(b => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === language));
      b.classList.toggle('is-active',b.dataset.lang === language);
      b.setAttribute('aria-label', {es:'Español',en:'English',fr:'Français'}[b.dataset.lang]);
    });
    const nav = [['top',ui.home],['stay',ui.apartment],['nearby',ui.nearby],['help',ui.help]].map(([id,label]) => `<a href="#${id}">${esc(label)}</a>`).join('');
    document.querySelector('.main-nav').innerHTML = nav;
    document.querySelector('.mobile-nav').innerHTML = nav;
    document.querySelector('footer').innerHTML = `<span class="brand">Bolivia Stays</span><p>Sky Recoleta · Av. Uyuni 919 · Cochabamba</p><a href="photo-credits.html">${esc(ui.credits)}</a>`;
    const choices = ['7e','11f'].map(key => `<button type="button" class="property-choice" data-property="${key}" aria-pressed="${key === property}"><strong>${key.toUpperCase()}</strong><span>${esc(base.properties[key].name)}</span></button>`).join('');
    if (!property) {
      document.querySelector('main').innerHTML = `<section class="welcome" id="top"><p class="eyebrow">Sky Recoleta · Cochabamba</p><h1>${esc(ui.choose)}</h1><p>${esc(ui.chooseBody)}</p><div class="property-choices">${choices}</div></section>`;
      document.querySelector('.main-nav').hidden = true;
      document.querySelector('.mobile-nav').hidden = true;
      bindChoices(); return;
    }
    document.querySelector('.main-nav').hidden = false;
    document.querySelector('.mobile-nav').hidden = false;
    const p = base.properties[property];
    const hiddenFeatures = property === '7e' ? [0, 1, 2, 4, 6] : [0, 1, 2, 6, 7];
    const features = p.features.filter((entry, index) => !hiddenFeatures.includes(index));
    const rules = base.rules.items.map(([title,body],i) => [title, i === 1 && property === '11f' ? ui.noSmoking : body]);
    document.querySelector('main').innerHTML = `
      <section class="welcome" id="top"><p class="eyebrow">${esc(p.floor)} · Sky Recoleta</p><h1>${esc(ui.welcome)}<br><span>${esc(p.name)}</span></h1>
        <details class="property-switch"><summary>${esc(ui.change)} · ${property.toUpperCase()}</summary><div class="property-choices">${choices}</div></details>
        <div class="quick-actions">${[['wifi','Wi-Fi'],['stay',ui.equipment],['help',ui.contact],['checkout',ui.checkout]].map(([id,label],i) => `<a href="#${id}"><span aria-hidden="true">${['⌁','⌂','✉','→'][i]}</span>${esc(label)}</a>`).join('')}</div>
        <div class="address-line">${external(maps('Edificio Sky Recoleta Avenida Uyuni 919 Cochabamba'), ui.returnHome)}<span>${esc(ui.checkout)} · 11:00</span></div>
      </section>
      <section class="wifi-card" id="wifi"><div><p class="eyebrow">Wi-Fi</p><h2>${esc(ui.connect)}</h2><p>${esc(ui.wifi)}</p></div><a class="button secondary" href="#help">${esc(ui.needHelp)}</a></section>
      <section class="section" id="stay"><div class="section-heading"><p class="eyebrow">${esc(ui.apartment)} · ${property.toUpperCase()}</p><h2>${esc(ui.equipment)}</h2><p>${esc(ui.tap)}</p></div><div class="instructions">${features.map(([title,body]) => detail(title,body)).join('')}</div>
        <details class="instruction secondary-detail"><summary>${esc(ui.about)}</summary><p>${esc(p.features[0][1])} ${esc(p.capacity)}.</p></details>
        <details class="instruction secondary-detail"><summary>${esc(ui.arrival)}</summary><p>${esc(base.essentials.cards[0][1])}</p><p>${esc(base.essentials.cards[1][1])}</p><p>${esc(p.features[1][1])}</p><p>Check-in: 15:00. ${esc(base.faq.items[0][1])}</p></details>
        <details class="instruction secondary-detail"><summary>${esc(ui.parking)}</summary><p>${esc(ui.parkingBody)}</p><p>${esc(base.essentials.cards[2][1])}</p><p>${esc(base.essentials.cards[3][1])}</p></details>
      </section>
      <section class="section" id="nearby"><div class="section-heading"><p class="eyebrow">Cochabamba</p><h2>${esc(ui.nearbyTitle)}</h2><p>${esc(ui.nearbyBody)}</p></div><div id="place-filters" class="place-filters" role="group" aria-label="${esc(ui.categories)}"></div><div class="places-grid" id="places-grid"></div><button class="button secondary more-button" id="show-more" type="button"></button></section>
      <section class="section rules" id="rules"><div class="section-heading"><h2>${esc(base.rules.title)}</h2><p>${esc(base.rules.body)}</p></div><div class="rules-grid">${rules.map(([title,body]) => `<div><h3>${esc(title)}</h3><p>${esc(body)}</p></div>`).join('')}</div></section>
      <section class="section" id="checkout"><div class="section-heading"><p class="eyebrow">${esc(ui.checkout)}</p><h2>${esc(ui.beforeLeaving)} <span class="time">11:00</span></h2></div><ul class="checkout-list">${ui.checkoutItems.map(text => `<li>${esc(text)}</li>`).join('')}${property === '11f' ? `<li>${esc(p.notice)}</li>` : ''}</ul>${detail(base.faq.items[1][0],base.faq.items[1][1])}${detail(base.faq.items[2][0],base.faq.items[2][1])}<aside class="review-card"><div class="review-stars" aria-hidden="true">★★★★★</div><h3>${esc(ui.reviewTitle)}</h3><p>${esc(ui.reviewBody)}</p>${external('https://www.airbnb.com/trips',ui.reviewButton,'button')}<small>${esc(ui.reviewNote)}</small></aside></section>
      <section class="section help" id="help"><div class="section-heading"><p class="eyebrow">${esc(ui.help)}</p><h2>${esc(ui.needHelp)}</h2><p>${esc(ui.helpBody)}</p>${external('https://www.airbnb.com/trips',ui.contact,'button')}<small>${esc(ui.airbnbHint)}</small></div>${detail(ui.report,base.faq.items[4][1])}${property === '11f' ? detail(base.faq.items[3][0],base.faq.items[3][1]) : ''}<details class="emergency"><summary>${esc(ui.emergency)}</summary><div class="contact-list">${base.contacts.slice(1).map(([name,description,value,href]) => `<a href="${href}"><strong>${esc(name)}</strong><span>${value}</span></a>`).join('')}</div></details></section>`;
    bindChoices(); renderPlaces();
    document.getElementById('show-more').addEventListener('click', () => { expanded = !expanded; renderPlaces(); });
  }
  function bindChoices() {
    document.querySelectorAll('[data-property]').forEach(button => button.addEventListener('click', () => {
      property = button.dataset.property; save('bolivia-stays-apartment', property); updateURL(); render();
    }));
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.lang; save('bolivia-stays-language',language); updateURL(); render();
  }));
  if (property) save('bolivia-stays-apartment', property);
  render();
})();
