# coloniamenonita.com

Proyecto para migrar https://coloniamenonita.com/ de WordPress a un sitio **100% estático (HTML)** y eliminar el WordPress.

**Estado: el sitio estático está online desde 2026-10-11** (Astro en `site/`, Cloudflare Pages, push a `main` publica). Ver `MIGRACION.md`. El WordPress de server-1 ya no recibe tráfico pero todavía no se borró.

## Por qué

- El WordPress estuvo **hackeado** (malware + backdoors desde ~junio 2025). Se limpió el 2026-10-11 (ver "Incidente" abajo), pero el punto de entrada no se identificó, así que puede reinfectarse.
- No se publican posts nuevos desde **octubre 2018**. Mantener WordPress es solo superficie de ataque.
- Objetivo: cada ruta actual responde con HTML estático, sin PHP ni base de datos.

## Estado actual del sitio (origen)

- Servidor: `ssh server-1` (Linode, Ubuntu). Webroot: `/var/www/coloniamenonita.com`
- Apache 2 (mpm_event) + PHP 7.4-FPM (pool `www` compartido con todos los sitios del server, usuario `www-data`), MySQL, Redis.
- Delante hay **Cloudflare** (proxy). El vhost (`/etc/apache2/sites-available/coloniamenonita.conf`) no tiene log propio: el tráfico va a `/var/log/apache2/other_vhosts_access.log`.
- WordPress **6.0.11**, DB `coloniamenonita`, prefijo `wp_`.
- Tema activo: `simplemag`. Plugins activos: wordpress-seo (Yoast), really-simple-ssl, insert-post-ads, forget-spam-comment.
- Contenido publicado: **31 posts, 1 página**, 29 comentarios aprobados, 1 post type `video`, sliders. Uploads: ~72 MB.
- Permalinks: `/%category%/%postname%/%post_id%/` (ej. `/costumbres-colonia-menonita/su-educacion/65/`). **Decidido (2026-10-11): pasar a URLs planas con 301** desde las viejas, sin categorías, sin AdSense ni comentarios. El plan y el mapa de redirects están en `MIGRACION.md`.
- Redirects en `.htaccess` a conservar:
  - `/ubicacion/` → `/como-visitar-la-colonia-menonita/` (301)
  - `/nueva-ubicacion/` → `/como-visitar-la-colonia-menonita/` (301)
- Archivos sueltos en la raíz a conservar: `ads.txt`, `google2bf2ffef8287b8af.html` (verificación Search Console), `favicon.ico`, `logo.png`, `robots.txt` (lo genera WP, es virtual). Hay AdSense (ads.txt + insert-post-ads).
- Otros archivos/carpetas viejos en la raíz: `images/`, `meta/`, `instagram-api/`, `player.php`, `licencia.txt`, `error_log`. Revisar si algo se usa.

## Incidente de seguridad (2026-10-11)

Síntoma: notificaciones de downtime y 504 (PHP colgado esperando conexión saliente a `69.197.135.2:80` inyectada por el malware).

Encontrado y limpiado:
- 7 archivos del core modificados (`wp-settings.php`, `wp-includes/load.php`, `plugin.php`, `functions.php`, `general-template.php`, `pomo/mo.php` (WP-VCD), `pomo/translations.php`) → restaurados desde 6.0.11 limpio.
- Loader `wp-includes/blocks/post-title-application.php` + archivos `.bt` (listas de IPs para cloaking SEO).
- Plugin backdoor `wp-compat` y bloque inyectado al inicio de `themes/simplemag/functions.php` → creaban admin oculto `adminbackup` (borrado de la DB).
- Temas falsos con webshells: `custom_functions_1748854027` (`lndex.php`), `post_1751655764`, `error-404-1757857910` (`4O4.php`).
- `xmlrpc.php` bloqueado en `.htaccess`.

Backups y cuarentena en server-1:
- Backup pre-limpieza: `/root/backups/coloniamenonita-2026-10-11/` (`files.tgz`, `db.sql.gz`)
- Archivos maliciosos movidos a: `/root/quarantine/coloniamenonita-2026-10-11/`

Pendientes de seguridad:
- Cambiar contraseña del usuario `admin` de WP, la de MySQL del sitio y las salts (el atacante pudo leer `wp-config.php`).
- Usuario `test` (editor, 2012, `maaasuri@msn.com`): confirmar con Mauricio si se borra.
- Los otros sitios de server-1 comparten usuario `www-data`; el malware no apareció en ellos (grep de las firmas), pero conviene revisarlos.

## Cuidado al exportar

El malware hacía **cloaking** (mostraba spam a ciertas IPs/bots). Ya está limpio, pero al generar el HTML estático **revisar que no haya scripts, iframes o links externos inyectados** antes de publicar.

## SEO (Search Console, export oct 2025 – oct 2026 en `search_console/`)

- Solo 78 clics en 12 meses. **967 de las 1000 páginas top son spam del malware** indexado por Google: `/view/...`, `/reviews/product/...`, `/cp/...`, `/help`, `/all-departments` (clones de tiendas tipo Walmart, aparecen como "Fragmentos de productos", ~24k impresiones). El contenido real tuvo ~42 clics.
- Rankings malos aun para la marca ("menonitas guatrache" pos. 82, "colonia menonita la pampa" pos. 80): señal de pérdida de confianza por el hackeo. Solo "como llegar a la colonia menonita guatraché" rinde (pos. 5).
- Al migrar: esas rutas spam deben dar 404/410 (nunca redirigir), sitemap limpio solo con URLs reales, y pedir remoción por prefijo en Search Console.
- Diseño elegido: mockup v3 minimalista orientado a SEO (`mockup/rediseno.html`, una columna, ficha de datos, FAQ, schema).

## Próximo paso

Decidir el enfoque de migración:
1. **Mirror/crawl** del WordPress limpio (wget/httrack o similar) → HTML idéntico al actual, rápido.
2. **Remaquetar**: exportar el contenido (posts, imágenes, comentarios) a Markdown/JSON y rehacer el sitio con un generador estático (Astro, Eleventy, Hugo…) con diseño nuevo.

Y el hosting: **Cloudflare Pages** (recomendado: ya usan Cloudflare, gratis, saca el sitio de server-1) o seguir en server-1 sirviendo estáticos con Apache.

Al terminar: apuntar el tráfico al estático, guardar backup del WordPress fuera del webroot y eliminar el WordPress (y su DB) de server-1.
