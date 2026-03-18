# Deployment — Portfolio & Previews

## Arquitectura

```
hanner.dev               →  Portafolio (Vercel) — NO TOCAR
[slug].hanner.dev        →  Previews de proyectos (VPS 72.60.214.49)
1tomillion.com           →  1TOMILION producción (VPS 72.60.214.49)
```

El portafolio vive en Vercel y se despliega automáticamente desde GitHub.
Cada proyecto del portafolio tiene su propio subdominio en el VPS, completamente
separado del espacio de producción de 1TOMILION.

> ⚠️ **Incidente 2026-03-15:** El VPS anterior (72.62.23.134) fue comprometido por
> SSH brute force — el atacante instaló un minero XMRig. Hostinger lo detuvo.
> Se migró todo al nuevo VPS (72.60.214.49) con SSH hardening completo.
> La causa NO fueron los proyectos sino una contraseña débil en SSH.
> Ver detalles en `C:\xampp\htdocs\1TOMILION\DEPLOYMENT.md`.

---

## DNS — Sav / Cloudflare (hanner.dev)

Estado actual de los records DNS:

| Tipo  | Name       | Value                                  | Proxy |
|-------|------------|----------------------------------------|-------|
| A     | `hanner.dev` | `216.198.79.1` (Vercel — no cambiar) | ON    |
| CNAME | `www`      | `9970e45010c841d1.vercel-dns-017.com`  | ON    |
| A     | `*`        | `72.60.214.49` (VPS nuevo) ✅          | ON    |

El wildcard `*` cubre automáticamente todos los subdominios hacia el VPS.
Los records de `hanner.dev` y `www` tienen prioridad sobre el wildcard,
por lo que el portafolio en Vercel no se ve afectado.

---

## VPS

| Detalle      | Valor                                                        |
|--------------|--------------------------------------------------------------|
| IP           | `72.60.214.49`                                               |
| Puerto SSH   | `2277` (no el default 22)                                    |
| OS           | Ubuntu 24.04 LTS                                             |
| SSH          | `ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49`        |
| Provider     | Hostinger KVM 8                                              |
| RAM          | 32 GB                                                        |
| Auth         | Solo clave SSH — contraseña desactivada                      |

> Credenciales y claves completas en `C:\xampp\htdocs\1TOMILION\DEPLOYMENT.md`

> **IMPORTANTE (Claude):** Usar la clave `/tmp/github_actions_key` para conectar:
> `ssh -i /tmp/github_actions_key -p 2277 -o StrictHostKeyChecking=no root@72.60.214.49`

---

## Estructura de Directorios en el VPS

```
/var/www/
└── 1tomilion/    # producción — 1tomillion.com (NO TOCAR)

/home/srvp/       # todos los previews del portafolio — usuario srvp
├── p01/          # lab-sensorial-sena  ✅ live
├── p02/          # proveify
├── p03/          # greythium
├── p04/          # ecpl
├── p05/          # app-akadem-ia
├── p06/          # sistema-contable-pr
├── p07/          # school-management-app
├── p08/          # vivu
└── p09/          # seguros-abc
```

> Todos los proyectos preview viven bajo `/home/srvp/` — no son identificables desde
> `/var/www/` ni desde `ps aux`. El pool PHP-FPM aparece como `srvp`, sin revelar qué proyecto es.
> Los configs de Nginx se llaman `p01`, `p02`, etc. (sin nombre de proyecto).
>
> **Proyectos en GitHub Pages / Vercel** (Tipo A estático) no tienen carpeta en el VPS.

### Tabla de mapping

| ID  | Proyecto             | Tipo | Subdominio                          | Estado  |
|-----|----------------------|------|-------------------------------------|---------|
| p01 | lab-sensorial-sena   | D    | lab-sensorial-sena.hanner.dev       | ✅ live |
| p02 | proveify             | C    | proveify.hanner.dev                 | pendiente |
| p03 | greythium            | B    | greythium.hanner.dev                | pendiente |
| p04 | ecpl                 | E    | ecpl.hanner.dev                     | ✅ live   |
| p05 | app-akadem-ia        | B    | app-akadem-ia.hanner.dev            | pendiente |
| p06 | sistema-contable-pr  | C    | sistema-contable-pr.hanner.dev      | ✅ live   |
| p07 | school-management-app| C    | school-management-app.hanner.dev    | pendiente |
| p08 | vivu                 | E    | vivu.hanner.dev                     | ✅ live   |
| p09 | seguros-abc          | B    | seguros-abc.hanner.dev              | pendiente (prueba técnica) |

---

## Plataforma por Tipo de Proyecto

| Plataforma | Tipos | Motivo |
|-----------|-------|--------|
| **GitHub Pages** | Tipo A (HTML estático puro, sin package.json) | Gratis, HTTPS automático, sin gestión de servidor, directo desde repo público |
| **Vercel** | Tipo A (con build) + Tipo B (SPA) | CDN global, HTTPS automático, auto-deploy desde GitHub, sin gestión de servidor |
| **VPS**    | Tipo C (fullstack) + Tipo D (Laravel) | Necesitan proceso persistente o PHP-FPM que Vercel no soporta en free tier |

## Stack instalado en el VPS (nuevo)

| Componente | Versión | Uso |
|------------|---------|-----|
| PHP        | 8.2     | Laravel (Tipo D) |
| PHP-FPM    | 8.2     | Pool `labsrv` para el lab |
| MySQL      | 8.0     | DB del lab (`laravel_lab_sensorial_sena`) |
| Composer   | 2.9.5   | Dependencias PHP |
| Node.js    | 20.x    | Build de frontends |
| Nginx      | —       | Proxy + static files |
| Certbot    | —       | SSL automático |
| PM2        | 6.x     | Backend Node.js (1tomillion) |
| fail2ban   | —       | Protección SSH |
| UFW        | —       | Firewall (puertos: 2277, 80, 443) |

### Backup automático

Cron diario a las 3am: comprime `uploads/` de 1tomillion y guarda en `/root/backups/`.
Retención: 7 días. Script en `/root/backup-diario.sh`.

---

## Deploy en Vercel — Proceso Completo

### Prerequisitos por proyecto
1. El repo debe estar en GitHub bajo `HannerB`
2. Vercel token disponible (ver sección credenciales)
3. Rama `main` limpia y buildeable

### Paso 0 — Verificar si el proyecto ya existe en Vercel

Antes de crear uno nuevo, listar proyectos existentes:

```bash
curl -s "https://api.vercel.com/v9/projects?limit=100" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"'
```

Si el proyecto ya existe, obtener su ID y saltar al Paso 4:

```bash
curl -s "https://api.vercel.com/v9/projects/<slug>" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"id":"[^"]*"' | head -1
```

### Paso 1 — Crear proyecto en Vercel vía API

```bash
VERCEL_TOKEN="<token>"

curl -s -X POST "https://api.vercel.com/v10/projects" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<slug>",
    "framework": "vite",
    "buildCommand": "vite build",
    "gitRepository": {
      "type": "github",
      "repo": "HannerB/<repo>"
    }
  }'
# Guardar el "id" del proyecto: prj_XXXXX
```

> **Importante:** usar `"buildCommand": "vite build"` (no `tsc -b && vite build`).
> Los proyectos React/Vite suelen tener errores TS estrictos que rompen el build en Vercel.

### Paso 2 — Agregar dominio personalizado

```bash
curl -s -X POST "https://api.vercel.com/v10/projects/<PROJECT_ID>/domains" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "<slug>.hanner.dev"}'
```

### Paso 3 — Obtener el repoId de GitHub

```bash
GH_TOKEN="<token>"
curl -s "https://api.github.com/repos/HannerB/<repo>" \
  -H "Authorization: Bearer $GH_TOKEN" | grep '"id"' | head -1
# Anotar el número: 1234567890
```

### Paso 4 — Disparar primer deployment

```bash
curl -s -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<slug>",
    "gitSource": {
      "type": "github",
      "repoId": "<REPO_ID_NUMERICO>",
      "ref": "main"
    }
  }'
# Guardar el "id" del deployment: dpl_XXXXX
```

### Paso 5 — Verificar estado del deployment

```bash
curl -s "https://api.vercel.com/v13/deployments/<DEPLOY_ID>" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"readyState":"[^"]*"\|"errorMessage":"[^"]*"'
# readyState: READY = éxito | ERROR = revisar logs
```

### Paso 6 — Ver logs si falla

```bash
curl -s "https://api.vercel.com/v2/deployments/<DEPLOY_ID>/events" \
  -H "Authorization: Bearer $VERCEL_TOKEN" > logs.json
# Buscar líneas con "error" o "Error" en el JSON
```

### Paso 7 — Agregar CNAME en Cloudflare

En Cloudflare → zona `hanner.dev` → DNS → agregar:

| Tipo | Name | Value | Proxy |
|------|------|-------|-------|
| `CNAME` | `<slug>` | `cname.vercel-dns.com` | **OFF** (DNS only) |

> Proxy debe estar **OFF**. Con proxy ON, Vercel no puede gestionar el SSL del subdominio.
> El registro específico tiene prioridad sobre el wildcard `*`, así que el VPS no se ve afectado.

### Auto-deploy tras cada push

Una vez configurado, cada `git push origin main` dispara un deploy automático en Vercel.
No hay que correr nada manualmente.

---

## Credenciales Vercel

| Detalle | Valor |
|---------|-------|
| Token | Guardado en `C:\xampp\htdocs\PORTFOLIO\SECRETS.md` (no commitear) |
| Team ID | `team_jP8qUReAXQ8mQY5LTZzCLxa2` |
| Cuenta | hanner.dev |

> **IMPORTANTE:** El token de Vercel nunca va en el código ni en archivos commiteados.
> Guardarlo localmente en `SECRETS.md` (está en `.gitignore`) o en el gestor de contraseñas.
> Se obtiene desde Vercel Dashboard → Settings → Tokens.

---

## Proyecto de Referencia — WeDoItBranding (completado)

Primer proyecto desplegado en Vercel. Sirve como ejemplo real del proceso completo.

| Campo | Valor |
|-------|-------|
| Slug | `wedoitweb` |
| Repo | `HannerB/WeDoItWeb` (privado) |
| Project ID | `prj_vTp4SJ5sUAtVze9zCqK3utKHtc9g` |
| Team ID | `team_jP8qUReAXQ8mQY5LTZzCLxa2` |
| URL producción | `wedoitweb.hanner.dev` |
| Framework | Vite + React + TypeScript |
| Build command | `vite build` (NO `tsc -b && vite build`) |
| Deployed | Mar 2026 |

### Problemas encontrados y resueltos durante este deploy

1. **`terser not found`** → `vite.config.ts` usaba `minify: 'terser'` sin terser instalado. Solución: `minify: 'esbuild'`.
2. **CSS `@import` order error** → `@import` de fuentes aparecía después de `@tailwind base`. Solución: mover `@import` al inicio del archivo.
3. **Logos rotos en producción** → rutas absolutas a `/src/assets/logos/` solo funcionan en dev. Solución: mover logos a `public/logos/` y actualizar rutas.
4. **Build command TypeScript** → el build command default incluye `tsc -b` que falla con errores TS estrictos. Solución: usar solo `vite build`.

### Comandos usados para este deploy

```bash
# Verificar estado del proyecto
curl -s "https://api.vercel.com/v9/projects/prj_vTp4SJ5sUAtVze9zCqK3utKHtc9g" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"readyState":"[^"]*"'

# Forzar un nuevo deployment tras push
curl -s -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "wedoitweb",
    "gitSource": {
      "type": "github",
      "repoId": "<REPO_ID>",
      "ref": "main"
    }
  }'
```

---

## Errores Comunes en Vercel — Soluciones

### ❌ `tsc: error TS...` — TypeScript estricto rompe el build

**Causa:** el build command por defecto `tsc -b && vite build` ejecuta el compilador TS estricto.
**Solución:** cambiar el build command del proyecto a solo `vite build`:

```bash
curl -s -X PATCH "https://api.vercel.com/v9/projects/<PROJECT_ID>" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"buildCommand": "vite build"}'
```

---

### ❌ `terser not found` — minificador no instalado

**Causa:** `vite.config.ts` con `minify: 'terser'` pero terser no está en `package.json`.
Desde Vite v3, terser es dependencia opcional.
**Solución:** cambiar a `minify: 'esbuild'` en `vite.config.ts` (integrado en Vite, sin instalación).
Eliminar también el bloque `terserOptions`.

---

### ❌ `@import must precede all other statements` — CSS mal ordenado

**Causa:** `@import` en el CSS aparece después de `@tailwind` directives.
**Solución:** mover todos los `@import` al inicio del archivo, antes de `@tailwind base`.

```css
/* ✅ Correcto */
@import './assets/fonts/fonts.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### ❌ Assets no cargan en producción (`/src/assets/...`)

**Causa:** rutas absolutas a `src/assets/` solo funcionan en desarrollo.
Vite sirve `src/` directamente en dev, pero en producción esa ruta no existe.
**Solución:** mover los archivos a `public/` y actualizar las rutas:

```bash
# Mover archivos
cp -r src/assets/logos/ public/logos/

# Actualizar rutas en el componente
# Antes:  /src/assets/logos/brands/spotify.svg
# Después: /logos/brands/spotify.svg
```

> Regla: archivos importados con `import logo from './logo.svg'` → pueden estar en `src/assets/`.
> Archivos referenciados como strings en rutas (`src="/ruta"`) → deben estar en `public/`.

---

## Clasificación de Proyectos

### Tipo A — Landing / Sitio Estático

**HTML puro (sin package.json):** GitHub Pages — CNAME + subdominio `[slug].hanner.dev`.
**Con build (package.json):** Vercel — mismo flujo que Tipo B.

#### Tipo A en GitHub Pages — Proceso completo

**Paso 0 — Verificar el `build_type` del repo**

```bash
curl -s "https://api.github.com/repos/HannerB/<REPO>/pages" \
  -H "Authorization: Bearer $GH_TOKEN" | grep '"build_type"'
```

- `"legacy"` → GitHub gestiona el deploy directamente desde la rama (sin Actions propio)
- `"workflow"` → el repo tiene un `.github/workflows/` que hace el deploy via Actions

El `build_type` determina qué trick usar si el SSL no se emite.

**Paso 1 — Crear `CNAME` y hacer push**

```bash
echo "<slug>.hanner.dev" > CNAME
git add CNAME && git commit -m "config: add CNAME for <slug>.hanner.dev"
git push origin main
```

**Paso 2 — Configurar custom domain via API**

```bash
curl -s -X PUT "https://api.github.com/repos/HannerB/<REPO>/pages" \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"cname": "<slug>.hanner.dev"}'
```

**Paso 3 — DNS en Cloudflare**

| Tipo | Name | Value | Proxy |
|------|------|-------|-------|
| `CNAME` | `<slug>` | `hannerb.github.io` | **OFF** (DNS only) |

> Proxy debe estar **OFF**. Con proxy ON, GitHub no puede emitir el certificado SSL.

**Paso 4 — Verificar estado del cert**

```bash
curl -s "https://api.github.com/repos/HannerB/<REPO>/pages/health" \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Accept: application/vnd.github.switcheroo-preview+json" \
  | grep -E '"responds_to_https"|"https_error"|"is_https_eligible"'
```

- `is_https_eligible: true` → todo bien, GitHub puede emitir el cert
- `responds_to_https: true` → cert emitido, listo para activar
- `https_error: "peer_failed_verification"` → cert aún no emitido (esperar o usar fix abajo)

**Paso 5 — Si el SSL no se emite (fix según `build_type`)**

**`build_type: legacy`** — El trigger es forzar Delete + Create CNAME vía API.
GitHub hace auto-commits en el repo que disparan un rebuild fresco, lo que inicia la emisión del cert:

```bash
# 1. Delete
curl -s -X PUT "https://api.github.com/repos/HannerB/<REPO>/pages" \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"cname": null}'

# 2. Esperar 4-5 segundos

# 3. Re-add
curl -s -X PUT "https://api.github.com/repos/HannerB/<REPO>/pages" \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"cname": "<slug>.hanner.dev"}'

# Verificar que GitHub hizo los auto-commits:
curl -s "https://api.github.com/repos/HannerB/<REPO>/commits?per_page=3" \
  -H "Authorization: Bearer $GH_TOKEN" | grep '"message"'
# Debe aparecer "Delete CNAME" y "Create CNAME" hechos por GitHub
```

> Confirmado funcionando en: `cafe-mekaddesh`, `tvd`.
> El cert aparece ~5–10 min después del Delete/Create.

**`build_type: workflow`** — No hay auto-commits. El trigger es re-disparar el workflow manualmente:

```bash
# 1. Obtener workflow ID
curl -s "https://api.github.com/repos/HannerB/<REPO>/actions/workflows" \
  -H "Authorization: Bearer $GH_TOKEN" | grep -E '"id"|"name"'

# 2. Dispatch manual
curl -s -X POST "https://api.github.com/repos/HannerB/<REPO>/actions/workflows/<WORKFLOW_ID>/dispatches" \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ref": "main"}'

# 3. Verificar que arrancó
curl -s "https://api.github.com/repos/HannerB/<REPO>/actions/runs?per_page=1" \
  -H "Authorization: Bearer $GH_TOKEN" | grep -E '"status"|"conclusion"'
```

> Si el workflow dispatch tampoco funciona, el cert puede simplemente tardar más.
> Esperar 15–30 min y volver a verificar con el health endpoint.
> En último caso: hacer un push vacío para forzar un nuevo run del workflow.

**Paso 6 — Activar HTTPS una vez que `responds_to_https: true`**

```bash
curl -s -X PUT "https://api.github.com/repos/HannerB/<REPO>/pages" \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"https_enforced": true}'

# Verificar
curl -s "https://api.github.com/repos/HannerB/<REPO>/pages" \
  -H "Authorization: Bearer $GH_TOKEN" | grep -E '"https_enforced"|"html_url"'
# html_url debe mostrar https://
```

> Token de GitHub: guardado en `SECRETS.md`

| Slug                | Título             | Plataforma     | Repo público | Estado    |
|---------------------|--------------------|----------------|:------------:|-----------|
| `cafe-mekaddesh`    | Café Mekaddesh     | GitHub Pages   | ✅           | ✅ live — cafe-mekaddesh.hanner.dev |
| `tvd`               | TVD                | GitHub Pages   | ✅           | ✅ live — tvd.hanner.dev |
| `alerta-roja`       | Alerta Roja        | GitHub Pages   | ✅           | ✅ live — alerta-roja.hanner.dev |
| `conteb`            | CONTEB             | GitHub Pages   | ✅           | ✅ live — conteb.hanner.dev |
| `agrosena`          | Agrosena           | GitHub Pages   | ✅           | pendiente |
| `plataforma-50`     | Plataforma 50      | GitHub Pages   | ✅           | ✅ live — plataforma-50.hanner.dev |
| `crystalberylmedia` | CrystalBeryl Media | GitHub Pages   | ❌ privado   | ✅ live — crystalberylmedia.hanner.dev |

### Tipo B — SPA (sin backend)

Build del framework, Nginx sirve la carpeta `/dist`. Sin proceso PM2.

| Slug                 | Título                 | Framework | Repo público | Estado    |
|----------------------|------------------------|-----------|:------------:|-----------|
| `seguros-abc`        | Seguros ABC Management | Angular   | ✅           | ⚠️ en uso como prueba técnica — no modificar |
| `greythium`          | GREYTHIUM              | React     | ❌           | pendiente |
| `app-akadem-ia`      | app-akadem-ia          | React     | ❌           | pendiente |

> **Nota `seguros-abc`:** dist path personalizado:
> `frontend/seguros-abc-app/dist/seguros-abc-app/browser` (Angular SSR).
> Los demás React/Vite usan el path estándar `dist`.

### Tipo D — Laravel (PHP + MySQL)

PHP-FPM + Nginx + MySQL. Sin PM2. Nginx sirve desde `/public` con `fastcgi_pass` al socket de PHP-FPM.
Corre bajo el usuario `labsrv` con su propio pool (`/etc/php/8.2/fpm/pool.d/labsrv.conf`).

| Slug                 | Título             | PHP  | Repo público | DB                           | Estado |
|----------------------|--------------------|------|--------------|------------------------------|--------|
| `lab-sensorial-sena` | Lab Sensorial SENA | 8.2  | ✅           | `laravel_lab_sensorial_sena` | ✅ live — lab-sensorial-sena.hanner.dev |

**Ruta en VPS:** `/home/srvp/p01/`
**Config Nginx:** `/etc/nginx/sites-available/p01`
**PHP-FPM socket:** `/run/php/php8.2-srvp.sock` (pool compartido `srvp`)
**DB:** `laravel_lab_sensorial_sena` — credenciales en `/home/srvp/p01/.env`

**Para actualizar p01 (lab-sensorial-sena):**
```bash
ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49
cd /home/srvp/p01
git pull
COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader
npm install && npm run build && rm -rf node_modules
php8.2 artisan migrate --force
php8.2 artisan config:cache && php8.2 artisan route:cache
```

> Siempre borrar `node_modules` después del build. Los assets quedan en `public/build/`.

**Para deployar un nuevo proyecto Laravel (Tipo D) en pXX:**
```bash
# 1. Clonar en la carpeta asignada
git clone --depth=1 https://github.com/HannerB/<repo> /home/srvp/pXX

# 2. Configurar .env, instalar dependencias
cd /home/srvp/pXX
cp .env.example .env
# editar .env con DB, APP_URL, etc.
COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader
php8.2 artisan key:generate
npm install && npm run build && rm -rf node_modules
php8.2 artisan migrate --force
php8.2 artisan config:cache && php8.2 artisan route:cache

# 3. Permisos
chown -R srvp:www-data /home/srvp/pXX
chmod -R 775 /home/srvp/pXX/storage /home/srvp/pXX/bootstrap/cache

# 4. Config Nginx (nombre del archivo: pXX, sin revelar el proyecto)
cat > /etc/nginx/sites-available/pXX << 'EOF'
server {
    listen 80;
    server_name <slug>.hanner.dev;
    root /home/srvp/pXX/public;
    index index.php;
    location / { try_files $uri $uri/ /index.php?$query_string; }
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.2-srvp.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    location ~ /\.(?!well-known).* { deny all; }
}
EOF
ln -s /etc/nginx/sites-available/pXX /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 5. SSL
certbot --nginx -d <slug>.hanner.dev --non-interactive --agree-tos -m hannerb48@gmail.com

# 6. Crear DB si aplica
mysql -e "CREATE DATABASE IF NOT EXISTS <dbname> CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "GRANT ALL PRIVILEGES ON <dbname>.* TO 'srvp'@'localhost';"
```

### Tipo E — PHP puro (PHPRunner / sin framework)

PHP-FPM + Nginx + MySQL. Sin PM2, sin artisan. Nginx sirve directamente desde el directorio `output/` del proyecto.
Web root: `output/` (contiene los archivos PHPRunner generados + módulos custom en `output/ECPL/`).
Conexión a BD hardcodeada en `output/connections/ConnectionManager.php` — actualizar credenciales al deployar.

| Slug   | Título | PHP | Repo público | DB         | Estado    |
|--------|--------|-----|:------------:|------------|-----------|
| `ecpl` | ECPL   | 8.2 | ❌           | `ecpl_db`  | ✅ live — ecpl.hanner.dev |
| `vivu` | VIVU   | 8.2 | ❌           | `vivu_db`  | ✅ live — vivu.hanner.dev |

**Ruta en VPS:** `/home/srvp/p04/`
**Web root Nginx:** `/home/srvp/p04/output`
**Config Nginx:** `/etc/nginx/sites-available/p04`
**PHP-FPM socket:** `/run/php/php8.2-srvp.sock`
**DB:** `ecpl_db` — credenciales en `output/connections/ConnectionManager.php`

**Para deployar ECPL (p04):**
```bash
# 1. Clonar repo privado
git clone --depth=1 git@github.com:HannerB/ECPL.git /home/srvp/p04

# 2. Crear DB e importar estructura + datos geográficos
mysql -e "CREATE DATABASE IF NOT EXISTS ecpl_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER IF NOT EXISTS 'ecpl_user'@'localhost' IDENTIFIED BY '<password>';"
mysql -e "GRANT ALL PRIVILEGES ON ecpl_db.* TO 'ecpl_user'@'localhost'; FLUSH PRIVILEGES;"
mysql ecpl_db < /home/srvp/p04/database/ecpl_db_structure.sql
mysql ecpl_db < /home/srvp/p04/database/ubicaciones_colombia.sql
# NO importar ecpl_db_backup.sql — contiene datos reales de candidatos

# 3. Actualizar credenciales DB en ConnectionManager.php
# Cambiar: root / "" → ecpl_user / <password>
# Archivo: /home/srvp/p04/output/connections/ConnectionManager.php línea ~126 y ~142-146

# 4. Permisos
chown -R srvp:www-data /home/srvp/p04
chmod -R 755 /home/srvp/p04
chmod -R 775 /home/srvp/p04/output/pdf /home/srvp/p04/output/templates_c

# 5. Config Nginx
cat > /etc/nginx/sites-available/p04 << 'EOF'
server {
    listen 80;
    server_name ecpl.hanner.dev;
    root /home/srvp/p04/output;
    index index.htm index.php;
    location / { try_files $uri $uri/ /index.htm; }
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.2-srvp.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    location ~ /\.(?!well-known).* { deny all; }
}
EOF
ln -s /etc/nginx/sites-available/p04 /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 6. SSL
certbot --nginx -d ecpl.hanner.dev --non-interactive --agree-tos -m hannerb48@gmail.com
```

> **Notas ECPL:**
> - El web root es `output/` — no la raíz del repo
> - `templates_c/` necesita permisos de escritura (Smarty compila templates ahí)
> - `pdf/` necesita escritura para guardar PDFs generados
> - No importar `ecpl_db_backup.sql` en el VPS de preview — solo estructura + ubicaciones
> - Para demo: crear un usuario admin manualmente en la tabla `usuarios` con contraseña en texto plano

---

## Proyecto de Referencia — ECPL (Tipo E completado)

Primer proyecto PHP puro / PHPRunner deployado. Sirve como referencia para futuros proyectos de este tipo.

| Campo | Valor |
|-------|-------|
| Slug | `ecpl` |
| Ruta VPS | `/home/srvp/p04/` |
| URL | `https://ecpl.hanner.dev` |
| DB | `ecpl_db` (MySQL 8.0) |
| Framework | PHPRunner (generado) + módulos custom MVC |
| Deployed | Mar 2026 |

### Arquitectura del proyecto PHPRunner + módulos custom

PHPRunner genera una capa base de admin panel en el directorio `output/`. ECPL la extiende con 5 módulos MVC propios en `output/ECPL/modules/` (candidates, projects, normas, dashboard, assets). Cada módulo sigue el patrón Controller → Service → Page.

**Cómo se integran los módulos custom con PHPRunner:**
- PHPRunner tiene páginas propias (`candidatos_list.php`, `proyectos_list.php`, etc.) en la raíz de `output/`
- Esas páginas usan `events.php` para inyectar contenido custom en la zona "above-grid"
- El contenido custom se incrusta como **iframe** apuntando a `ECPL/modules/.../pages/...`
- El iframe y la página padre son dominios iguales → sin CORS, pero el JS del iframe corre aislado del JS de la página padre

```php
// include/events.php — así PHPRunner inyecta el módulo custom como iframe
function event_candidatos_snippet(&$params) {
    echo '<iframe src="ECPL\modules\candidates\pages\candidate_list.php"
        width="100%" height="1550px" scrolling="auto" style="border:none;"></iframe>';
}
```

**Implicación clave:** cuando el usuario está en `ecpl.hanner.dev/candidatos_list.php`, el HTML real con la lógica vive DENTRO del iframe, no en la página padre de PHPRunner.

### Mapping de rutas: local vs VPS

El directorio local `output/` mapea directamente a la raíz de `p04/` en el VPS:

| Local | VPS |
|-------|-----|
| `output/ECPL/modules/candidates/js/candidate_list.js` | `/home/srvp/p04/ECPL/modules/candidates/js/candidate_list.js` |
| `output/connections/ConnectionManager.php` | `/home/srvp/p04/connections/ConnectionManager.php` |
| `output/candidatos_list.php` | `/home/srvp/p04/candidatos_list.php` |

> **NO** existe `output/` como directorio dentro de `/home/srvp/p04/`. `output/` es solo la carpeta local.

### Importar la BD — problemas y soluciones

phpMyAdmin genera un `.sql` con varios problemas al exportar bases de datos que tienen VIEWs:

**Problema 1: VIEWs exportadas como tablas vacías**

phpMyAdmin crea stand-ins `CREATE TABLE \`nombre_vista\` (\n);` para cada VIEW. Al importar, MySQL los acepta como tablas vacías, corrompiendo el esquema.

**Problema 2: VIEWs con columnas de esquema antiguo**

Las vistas `CREATE ALGORITHM=UNDEFINED...` pueden referenciar columnas que ya no existen, causando errores.

**Solución — filtrar antes de importar con Python en el VPS:**

```python
import re, sys

sql = open('ecpl_db.sql').read()

# Eliminar stand-ins de vistas (CREATE TABLE vacíos de 1-2 líneas)
sql = re.sub(
    r'CREATE TABLE `[^`]+` \(\n\);',
    '',
    sql
)

# Eliminar todas las VIEWs (referencian columnas de esquema antiguo)
sql = re.sub(
    r'CREATE ALGORITHM=UNDEFINED.*?;\n',
    '',
    sql,
    flags=re.DOTALL
)

open('ecpl_db_clean.sql', 'w').write(sql)
print("Listo")
```

```bash
python3 - << 'PYEOF'
# (pegar script arriba)
PYEOF
mysql ecpl_db < ecpl_db_clean.sql
```

**Problema 3: Data truncation en columnas ENUM**

Las columnas `estado_civil`, `tipo_vivienda`, etc. tienen ENUMs estrictos. Insertar un valor fuera del ENUM produce `ERROR 1265: Data truncated`. Verificar los valores válidos antes de insertar datos de demo:

```sql
SHOW COLUMNS FROM candidatos LIKE 'estado_civil';
-- El campo Type muestra los valores válidos del enum
```

### ConnectionManager.php — actualizar credenciales

Las credenciales de BD están hardcodeadas en `output/connections/ConnectionManager.php`. Al deployar en VPS, cambiar el usuario `root`/`""` por el usuario `srvp` con su contraseña:

```php
// Línea ~126 y ~142-146 en ConnectionManager.php
$connInfo[0] = "localhost";
$connInfo[1] = "srvp";          // ← usuario MySQL
$connInfo[2] = "TU_PASSWORD";  // ← contraseña
$connInfo[3] = "ecpl_db";       // ← nombre de la DB
```

Las constantes `ODBCUID`, `ODBCPWD` y `ODBCString` también usan estas credenciales — actualizar todas.

> En ECPL live: usuario `srvp`, contraseña en `C:\xampp\htdocs\1TOMILION\DEPLOYMENT.md`.

### Tablas many-to-many importantes

Los candidatos tienen relaciones N:N con proyectos, NCLs y tipos de población:

| Tabla | Relación |
|-------|----------|
| `candidatos_proyectos` | candidato ↔ proyecto |
| `candidatos_ncl` | candidato ↔ norma de competencia |
| `candidatos_tipos_poblacion` | candidato ↔ tipo de población |

**Error frecuente:** buscar `FROM candidatos WHERE proyecto_id = X` → falla porque `candidatos` no tiene `proyecto_id`. Siempre usar `FROM candidatos_proyectos WHERE proyecto_id = X`.

### Datos de demo — notas

- Contraseñas en **texto plano** en la tabla `usuarios` (PHPRunner así lo implementa, no hay hash)
- Usuarios creados para demo: `admin` / `admin2024` (Administrador), `formulador` / `formulador2024` (Formulador)
- Candidatos de demo: 28 total en 4 proyectos, con NCLs y regionales asignadas
- Al insertar candidatos de demo, poblar también las tablas junction (`candidatos_proyectos`, `candidatos_ncl`)

### Bugs encontrados y solucionados

**1. SQL: tabla equivocada en conteo de candidatos por proyecto**

`project_service.php` usaba `FROM candidatos WHERE proyecto_id` — esa columna no existe en `candidatos`, la relación es N:N vía `candidatos_proyectos`.

```php
// ❌ Antes
(SELECT COUNT(*) FROM candidatos WHERE proyecto_id = p.id)
// ✅ Después
(SELECT COUNT(*) FROM candidatos_proyectos WHERE proyecto_id = p.id)
```

Afectaba: `obtenerProyectosConPaginacion()` y `tieneCandidatos()` en `project_service.php`.

**2. JS pisaba el total renderizado por PHP**

`calcularEstadisticas()` en `candidate_list.js` contaba solo las filas visibles en la página actual (10) y sobreescribía `#totalCandidatos`, ignorando el total real del servidor.

```javascript
// ❌ Línea eliminada de calcularEstadisticas():
document.getElementById('totalCandidatos').textContent = filasVisibles.length;
```

El valor correcto viene del PHP: `<?php echo $totalRegistros; ?>` donde `$totalRegistros` = `COUNT(DISTINCT c.id)` de la DB completa.

**3. Caché del navegador servía el JS viejo**

Incluso después de subir el JS corregido al VPS, el navegador seguía usando la versión cacheada que tenía el bug. El fix visible: PHP mostraba 28 brevemente, luego el JS cacheado lo pisaba con 10.

**Solución: cache-busting con query param en el script:**

```php
// candidate_list.php
$pageScripts = [
    'modules/candidates/js/candidate_list.js?v=3',  // ← versión bumpeada
    'modules/candidates/js/candidate_projects.js'
];
```

> **Regla para futuros proyectos PHPRunner:** cada vez que se modifique un JS custom, incrementar la versión `?v=X` en el `$pageScripts` del PHP correspondiente. Sin esto, los usuarios con caché verán el comportamiento viejo.

### Subir archivos al VPS (sin rsync)

`rsync` no está disponible por defecto localmente en Windows. Usar `scp`:

```bash
# Subir un archivo
scp -i ~/.ssh/id_ed25519 -P 2277 local/path/file.php root@72.60.214.49:/home/srvp/p04/ruta/destino/

# Subir directorio completo
scp -i ~/.ssh/id_ed25519 -P 2277 -r local/directorio/ root@72.60.214.49:/home/srvp/p04/ruta/destino/
```

> Recordar: local `output/archivo.php` → VPS `/home/srvp/p04/archivo.php` (sin el prefijo `output/`).

---

### Tipo C — Full-stack (frontend + backend + PM2)

Frontend SPA + backend Node.js. PM2 mantiene el backend corriendo.
Nginx sirve el frontend y redirige `/api/` al backend.

| Slug                    | Título                 | Repo público | Puerto PM2 | Estado    |
|-------------------------|------------------------|:------------:|:----------:|-----------|
| `1tomilion`             | 1TOMILION              | ❌           | 3000 ✅    | ✅ live   |
| `proveify`              | Proveify               | ✅           | 4002       | pendiente |
| `wedoitweb`             | WeDoItBranding         | ✅ privado   | —          | ✅ live en Vercel → wedoitweb.hanner.dev |
| `sistema-contable-pr`   | Sistema Contable PR    | ❌           | 4001       | pendiente |
| `school-management-app` | School Management App  | ❌           | 4003       | pendiente |
| `vivu`                  | VIVU                   | ❌           | 4004       | pendiente |

> Proyectos Tipo C con repo privado: evaluar hacer un demo mode con datos
> mockeados para evitar exponer credenciales o servicios reales.

---

## Puertos PM2

Los puertos 3000 y 3001 son de 1TOMILION y no deben usarse.
Los previews fullstack empiezan desde el 4000.

| Proceso                   | Puerto | Estado    |
|---------------------------|:------:|-----------|
| `1tomilion-api`           | 3000   | ✅ activo |
| `1tomilion-staging-api`   | 3001   | ✅ activo |
| `wedoitweb-api`           | 4000   | pendiente |
| `sistema-contable-pr-api` | 4001   | pendiente |
| `proveify-api`            | 4002   | pendiente |
| `school-management-api`   | 4003   | pendiente |
| `vivu-api`                | 4004   | pendiente |

---

## Script de Deploy — `/root/deploy.sh`

> ⚠️ Pendiente recrear en el nuevo VPS. El script del VPS viejo usaba `/var/www/previews/`
> y debe actualizarse para usar `/home/srvp/pXX/`.

El script automatiza: clonar/actualizar repo → build → config Nginx (como `pXX`) → SSL.

```bash
# Conectar al VPS
ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49

# Uso del script
./deploy.sh <id> <slug> <repo> <type> [dist_path] [port]
```

### Parámetros

| Parámetro   | Descripción                                                    | Default |
|-------------|----------------------------------------------------------------|---------|
| `id`        | ID asignado (`p02`, `p03`...). Carpeta en `/home/srvp/` y nombre del config Nginx | — |
| `slug`      | Subdominio: `<slug>.hanner.dev`                                | — |
| `repo`      | Nombre exacto del repo en GitHub bajo `HannerB`                | — |
| `type`      | `static` \| `spa` \| `fullstack`                               | — |
| `dist_path` | Ruta relativa al output del build (solo spa/fullstack)         | `dist`  |
| `port`      | Puerto del backend PM2 (solo fullstack)                        | `4000`  |

### Ejemplos de uso

```bash
# SPA React/Vite
./deploy.sh p03 greythium greythium spa

# SPA Angular con dist path personalizado
./deploy.sh p09 seguros-abc seguros-abc spa "frontend/seguros-abc-app/dist/seguros-abc-app/browser"

# Fullstack en puerto 4002
./deploy.sh p02 proveify proveify fullstack dist 4002
```

### Pasos que ejecuta el script

1. **Repositorio** — Clona en `/home/srvp/<id>/` o hace `git pull` si ya existe
2. **Build** — `npm install && npm run build && rm -rf node_modules`
3. **Nginx** — Config en `/etc/nginx/sites-available/<id>` (nombre neutro, sin revelar proyecto)
4. **SSL** — Certbot obtiene certificado para `<slug>.hanner.dev`

---

## Orden de Deployment

```
Fase 1 — Landings públicas (Tipo A)        ← más rápido, impacto inmediato
  alerta-roja, tvd, conteb, agrosena, cafe-mekaddesh, plataforma-50

Fase 2 — SPA pública (Tipo B)
  lab-sensorial-sena

Fase 3 — Full-stack público (Tipo C)
  proveify

Fase 4 — SPAs privadas (Tipo B)
  greythium, app-akadem-ia

Fase 4b — PHP puro privado (Tipo E)
  ecpl

Fase 5 — Full-stack privados (Tipo C)
  wedoitweb, sistema-contable-pr, school-management-app, vivu
  (evaluar demo/mock mode antes de deployar)

Fase 6 — Landing privada
  crystalberylmedia

Pendiente — cuando concluya la prueba técnica
  seguros-abc → ./deploy.sh seguros-abc seguros-abc spa "frontend/seguros-abc-app/dist/seguros-abc-app/browser"
```

---

## Actualizar el Portafolio

Al completar cada deployment, actualizar `src/data/projects.js` con la URL real:

```js
// Antes
link: "",

// Después
link: "https://[slug].hanner.dev",
```

Y opcionalmente reemplazar la imagen placeholder con un screenshot real:

```js
// Antes
image: "https://picsum.photos/seed/[slug]/1200/600",

// Después
image: "/screenshots/[slug].webp",  // archivo en /public/screenshots/[slug].webp
```

> Screenshots recomendados: 1200×600px, formato WebP para menor peso.

---

## Checklist

### Infraestructura
- [x] VPS nuevo hardeneado (SSH port 2277, solo clave, fail2ban, UFW)
- [x] DNS wildcard `A * → 72.60.214.49` actualizado en Cloudflare
- [x] PHP 8.2 + MySQL + Composer + PHP-FPM instalados
- [ ] **`/var/www/previews/`** — pendiente crear en nuevo VPS
- [ ] **Script `/root/deploy.sh`** — pendiente recrear en nuevo VPS (para Tipo A/B/C)

### Deployments
- [x] **cafe-mekaddesh** — GitHub Pages (cafe-mekaddesh.hanner.dev) ✅
- [x] **tvd** — GitHub Pages (tvd.hanner.dev) ✅
- [x] **alerta-roja** — GitHub Pages (alerta-roja.hanner.dev) ✅
- [x] **conteb** — GitHub Pages (conteb.hanner.dev) ✅
- [x] **plataforma-50** — GitHub Pages (plataforma-50.hanner.dev) ✅
- [x] **crystalberylmedia** — GitHub Pages (crystalberylmedia.hanner.dev) ✅
- [x] **wedoitweb** — Vercel (wedoitweb.hanner.dev) ✅
- [x] **lab-sensorial-sena** — VPS nuevo (lab-sensorial-sena.hanner.dev) ✅ — Mar 2026
- [ ] **agrosena** — GitHub Pages — pendiente
- [ ] **proveify** — VPS Tipo C — pendiente
- [ ] **greythium, app-akadem-ia** — VPS Tipo B — pendiente
- [x] **ecpl** — VPS Tipo E (PHP puro / PHPRunner) — ✅ live — ecpl.hanner.dev
- [x] **vivu** — VPS Tipo E (PHP puro / PHPRunner) — ✅ live — vivu.hanner.dev — Mar 2026
- [x] **sistema-contable-pr** — VPS Tipo C (Docker) — ✅ live — sistema-contable-pr.hanner.dev — Mar 2026
- [ ] **school-management-app** — VPS Tipo C — pendiente
- [ ] **seguros-abc** — VPS Tipo B — pendiente (cuando concluya prueba técnica)

### Post-deployment
- [ ] Actualizar `link:` en `src/data/projects.js` por cada proyecto deployado
- [ ] Tomar screenshots reales (1200×600px WebP) y reemplazar placeholders

---

## Gestión de Espacio en Disco

El principal consumidor al deployar proyectos es `node_modules`. Regla:

```bash
# Siempre borrar node_modules tras el build en el VPS
npm install && npm run build && rm -rf node_modules
```

Limpieza general cuando el disco crezca:
```bash
# Cache de APT (paquetes instalados)
apt-get clean && apt-get autoremove -y

# Logs de Nginx viejos
find /var/log/nginx/ -name "*.gz" -delete

# Ver top consumidores
du -sh /* 2>/dev/null | sort -rh | head -15
```

---

## Comandos Útiles

```bash
# Conectar al VPS
ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49

# Estado general
ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49 "pm2 status && systemctl is-active nginx php8.2-fpm"

# Sitios Nginx activos
ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49 "ls /etc/nginx/sites-enabled/"

# Logs de error de un proyecto
ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49 "tail -50 /var/log/nginx/error.log"

# Logs del lab-sensorial (Laravel)
ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49 "tail -50 /home/labsrv/app/storage/logs/laravel.log"

# RAM y disco
ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49 "free -h && df -h /"

# Recargar Nginx
ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49 "nginx -t && systemctl reload nginx"

# Proyectos en previews
ssh -i ~/.ssh/id_ed25519 -p 2277 root@72.60.214.49 "ls /var/www/previews/"
```
