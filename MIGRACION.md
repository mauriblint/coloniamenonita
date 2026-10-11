# Plan de migración

Fuente: sitemaps de Yoast + base de datos `coloniamenonita` (server-1), 2026-10-11.
SC = Search Console, últimos 12 meses (clics / impresiones / posición media). `–` = sin datos.

## Decisiones

- **URLs planas**: sin categorías ni IDs (`/vestimenta-menonita/`). Cada URL vieja hace **301** a la nueva. Con ~42 clics/año al contenido real, el riesgo es mínimo.
- Única URL que no cambia: `/como-visitar-la-colonia-menonita/` (la que más rinde y ya es plana).
- **Sin categorías**: la portada lista los artículos agrupados por tema (Historia, Costumbres, Cultura).
- Los posts de videos (muy cortos) se juntan en **`/videos/`**; las dos galerías en **`/fotos/`**.
- **Sin AdSense** (se borra `ads.txt`) y **sin comentarios**.
- Hosting previsto: Cloudflare Pages; los 301 van en `_redirects`.

## Estructura nueva

### Páginas

| URL nueva | Contenido | Viene de |
|---|---|---|
| `/` | Portada (diseño v3: intro, ficha, visita, FAQ, artículos por tema) | `/` |
| `/como-visitar-la-colonia-menonita/` | Cómo visitar (revisar vigencia del hotel; agregar link a Google Maps) | igual |
| `/videos/` | 8 videos (Visión Siete son 2 partes), con título, autor y descripción | posts 42, 47, 49, 56, 58, 116, 320 |
| `/fotos/` | Las 39 fotos en una galería con texto introductorio y `alt` descriptivos | posts 346, 375 |

El 53 ("Domingo típico") no se migra: el video ya no existe. Redirige a `/videos/`.

### Artículos (18)

| ID | URL nueva | Título | Palabras | SC (URL vieja) |
|---:|---|---|---:|---|
| **Historia** |||||
| 15 + 35 | `/historia-de-los-menonitas/` | Historia de los menonitas: origen y creencias | 1287 | 1 / 70 / 79,8 · **el 15 y el 35 eran el mismo texto: se fusionaron** |
| 18 | `/antecedentes-historicos-menonitas/` | Antecedentes históricos | 1008 | – |
| 32 | `/historia-colonia-nueva-esperanza/` | Historia de la Colonia Nueva Esperanza | 244 | 1 / 13 / 13,1 |
| 169 | `/colonia-menonita-guatrache/` | La Colonia | 229 | 0 / 10 / 22,5 |
| 455 | `/menonitas-del-imperio-ruso-a-la-pampa/` | Menonitas: del imperio ruso a La Pampa | 837 | – |
| 93 | `/exodo-de-los-menonitas/` | El éxodo de los menonitas | 2222 | – |
| **Costumbres** |||||
| 69 | `/costumbres-menonitas/` | Costumbres típicas | 933 | – |
| 71 | `/vestimenta-menonita/` | Su vestimenta | 154 | 0 / 95 / 5,3 · mejorar título y descripción |
| 73 | `/casas-menonitas/` | Sus viviendas | 180 | 4 / 55 / 11,6 |
| 63 | `/comida-menonita/` | Comidas y alimentación | 208 | 0 / 23 / 18,7 |
| 65 | `/educacion-menonita/` | Su educación | 304 | 0 / 15 / 9,8 |
| 60 | `/agricultura-menonita/` | Agricultura y agropecuaria | 647 | 0 / 11 / 9,6 |
| 67 | `/rito-de-fallecimiento-menonita/` | Rito de fallecimiento | 275 | 4 / 157 / 8,0 |
| **Cultura y relatos** |||||
| 421 | `/cultura-menonita/` | Introducción a la cultura menonita | 892 | – |
| 109 | `/menonitas-un-estilo-de-vida/` | Menonitas: un estilo de vida | 1308 | 0 / 64 / 25,3 |
| 425 | `/menonitas-un-pueblo-detenido-en-el-tiempo/` | Menonitas, un pueblo detenido en el tiempo | 1041 | 0 / 11 / 50,4 |
| 430 | `/relato-de-un-viajero-en-la-colonia/` | Relato de un viajero en la Colonia | 2122 | 0 / 7 / 32,6 |
| 464 | `/colonia-menonita-experiencia-increible/` | Colonia Menonita, una experiencia increíble | 435 | – |

## Redirects 301

WordPress resolvía un post bajo cualquier categoría (p. ej. `/videos-colonia-menonita/la-colonia/169/`), así que los redirects de posts se hacen por **ID**, con cualquier categoría y slug delante: `/:cat/:slug/<ID>/` → URL nueva (con y sin `/` final).

| Vieja | Nueva |
|---|---|
| `/:cat/:slug/15/` | `/historia-de-los-menonitas/` |
| `/:cat/:slug/18/` | `/antecedentes-historicos-menonitas/` |
| `/:cat/:slug/32/` | `/historia-colonia-nueva-esperanza/` |
| `/:cat/:slug/35/` | `/historia-de-los-menonitas/` (fusionado) |
| `/:cat/:slug/169/` | `/colonia-menonita-guatrache/` |
| `/:cat/:slug/455/` | `/menonitas-del-imperio-ruso-a-la-pampa/` |
| `/:cat/:slug/93/` | `/exodo-de-los-menonitas/` |
| `/:cat/:slug/69/` | `/costumbres-menonitas/` |
| `/:cat/:slug/71/` | `/vestimenta-menonita/` |
| `/:cat/:slug/73/` | `/casas-menonitas/` |
| `/:cat/:slug/63/` | `/comida-menonita/` |
| `/:cat/:slug/65/` | `/educacion-menonita/` |
| `/:cat/:slug/60/` | `/agricultura-menonita/` |
| `/:cat/:slug/67/` | `/rito-de-fallecimiento-menonita/` |
| `/:cat/:slug/421/` | `/cultura-menonita/` |
| `/:cat/:slug/109/` | `/menonitas-un-estilo-de-vida/` |
| `/:cat/:slug/425/` | `/menonitas-un-pueblo-detenido-en-el-tiempo/` |
| `/:cat/:slug/430/` | `/relato-de-un-viajero-en-la-colonia/` |
| `/:cat/:slug/464/` | `/colonia-menonita-experiencia-increible/` |
| `/:cat/:slug/42/`, `/47/`, `/49/`, `/53/`, `/56/`, `/58/`, `/116/`, `/320/` | `/videos/` |
| `/:cat/:slug/481/` (Howard, video borrado) | `/colonia-menonita-experiencia-increible/` |
| `/:cat/:slug/346/`, `/375/` | `/fotos/` |
| `/:cat/:slug/416/` (fábrica de silos, ya no existe) | `/` |
| `/historia-menonitas-argentina/` | `/` |
| `/costumbres-colonia-menonita/` | `/` |
| `/mas-informacion-sobre-los-menonitas-argentina/` | `/` |
| `/relatos-de-viajeros/` | `/colonia-menonita-experiencia-increible/` |
| `/videos-colonia-menonita/` | `/videos/` |
| `/imagenes-colonia-menonita/` | `/fotos/` |
| `/page/*` | `/` |
| `/ubicacion/`, `/nueva-ubicacion/` (ya existían) | `/como-visitar-la-colonia-menonita/` |

**Sin redirect (404/410):** `/view/…`, `/reviews/…`, `/cp/…`, `/help`, `/all-departments` (spam del malware) y cualquier ruta de WordPress (`/wp-admin`, `/wp-login.php`, `/xmlrpc.php`, `/feed/`…).

## Archivos sueltos

- Conservar: `google2bf2ffef8287b8af.html` (Search Console), `favicon.ico`, `logo.png`.
- Nuevos: `robots.txt` apuntando a `sitemap.xml` (solo las URLs nuevas).
- Se borra: `ads.txt`.

## Después de publicar

1. Search Console: enviar el sitemap nuevo y pedir remoción por prefijo de `/view/`, `/reviews/`, `/cp/`.
2. Revisar "Seguridad y acciones manuales"; si hay algo, pedir revisión.
3. Probar todos los redirects de esta tabla (script con curl).

## Estado (2026-10-11)

- Sitio Astro en `site/` (contenido en `site/src/content/articulos/`, redirects en `site/public/_redirects`). `npm --prefix site run build` genera `site/dist/`.
- Export de WordPress en `_export/` (`db.json`, `uploads/`, `convert.py` regenera el contenido desde cero).
- Limpieza hecha al exportar: link de spam en el 421, embeds muertos (Flash, Facebook, video de Howard) y 9 imágenes enlazadas a dominios que ya no existen (estaban rotas en el sitio viejo).
- Falta: confirmar datos del Residencial "La Chacra", publicar en Cloudflare Pages, cambiar DNS, pasos de "Después de publicar".
