# Bolivia Stays Guest Guide

Guía digital trilingüe para huéspedes de Memories Apartment 7E y Renoir's Apartment 11F, en Sky Recoleta, Cochabamba.

## Editar la información

Las instrucciones originales están en `content.js`; los textos de la guía durante la estadía están en `guest-content.js`. Las traducciones usan `es`, `en` y `fr`.

Los lugares, enlaces y fotos están en `places.js`. Las fichas `search: true` abren búsquedas de servicios; no representan un establecimiento verificado. Las imágenes ilustrativas se etiquetan como tales. Los créditos y licencias están en `photo-credits.html`.

Los estilos base están en `styles.css` y los ajustes para huéspedes en `guest.css`. La lógica activa es `guest-app.js`; el antiguo `app.js` ya no se carga.

## Enlaces por departamento

- Memories 7E: https://boliviastays.github.io/bolivia-stays-guide/?apartment=7e
- Renoir’s 11F: https://boliviastays.github.io/bolivia-stays-guide/?apartment=11f

El parámetro del enlace tiene prioridad sobre el departamento recordado. La página sin parámetro muestra un selector en la primera visita. El idioma se detecta y recuerda; puede fijarse añadiendo `&lang=es`, `&lang=en` o `&lang=fr`.

Los códigos QR en `qr-7e.svg` y `qr-11f.svg` abren los enlaces correspondientes sin fijar idioma.

## Publicación en GitHub Pages

1. Abre **Settings → Pages** en el repositorio.
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. Elige la rama `main` y la carpeta `/ (root)`.
4. Guarda la configuración.

El sitio quedará disponible en `https://boliviastays.github.io/bolivia-stays-guide/`.

## Seguridad

No publiques contraseñas de Wi-Fi, códigos de cerraduras, ubicación de llaves de emergencia, documentos de huéspedes ni datos privados. Esa información debe enviarse directamente mediante Airbnb o WhatsApp al titular de la reserva. Un enlace por departamento no restringe el acceso: toda la guía y su repositorio son públicos.
