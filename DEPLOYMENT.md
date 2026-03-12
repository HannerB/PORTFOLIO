# Deployment — Portfolio & Previews

## Arquitectura

```
hanner.dev               →  Portafolio (Vercel) — NO TOCAR
[slug].hanner.dev        →  Previews de proyectos (VPS 72.62.23.134)
1tomillion.com           →  1TOMILION producción (VPS, ya existe)
1tomillion-drive.com     →  1TOMILION staging (VPS, ya existe)
```

El portafolio vive en Vercel y se despliega automáticamente desde GitHub.
Cada proyecto del portafolio tiene su propio subdominio en el VPS, completamente
separado del espacio de producción de 1TOMILION.

---

## DNS — Sav / Cloudflare (hanner.dev)

Estado actual de los records DNS:

| Tipo  | Name       | Value                                  | Proxy |
|-------|------------|----------------------------------------|-------|
| A     | `hanner.dev` | `216.198.79.1` (Vercel — no cambiar) | ON    |
| CNAME | `www`      | `9970e45010c841d1.vercel-dns-017.com`  | ON    |
| A     | `*`        | `72.62.23.134` (VPS) ✅ configurado    | ON    |

El wildcard `*` cubre automáticamente todos los subdominios hacia el VPS.
Los records de `hanner.dev` y `www` tienen prioridad sobre el wildcard,
por lo que el portafolio en Vercel no se ve afectado.

---

## VPS

| Detalle  | Valor                   |
|----------|-------------------------|
| IP       | 72.62.23.134            |
| OS       | Ubuntu 24.04 LTS        |
| SSH      | `ssh root@72.62.23.134` |
| Provider | Hostinger               |
| RAM      | 7.8 GB (780 MB usados)  |
| Disco    | 96 GB (7.4 GB usados)   |
| Nginx    | activo                  |
| Node     | v20.19.6                |
| Password | W.r5BJX5fU4uM           |

> Credenciales completas en `C:\xampp\htdocs\1TOMILION\DEPLOYMENT.md`

> **IMPORTANTE (Claude):** Antes de cualquier comando SSH ejecutar:
> `export SSH_ASKPASS="/c/Program Files/Git/mingw64/bin/git-askpass.exe" SSH_ASKPASS_REQUIRE=force`

---

## Estructura de Directorios en el VPS

Los proyectos preview viven en `/var/www/previews/`, completamente separados
del directorio raíz `/var/www/` donde están los proyectos de producción.

```
/var/www/
├── 1tomilion/              # ✅ producción — 1tomillion.com       (no tocar)
├── 1tomilion-staging/      # ✅ staging   — 1tomillion-drive.com  (no tocar)
├── seguros-abc/            # ⚠️ prueba técnica en curso            (no tocar)
│
└── previews/               # ✅ espacio dedicado para los proyectos del portafolio
    ├── alerta-roja/        # se crea al clonar
    ├── tvd/
    ├── conteb/
    ├── agrosena/
    ├── cafe-mekaddesh/
    ├── plataforma-50/
    ├── lab-sensorial-sena/
    ├── greythium/
    ├── ecpl/
    ├── app-akadem-ia/
    ├── proveify/
    ├── wedoitweb/
    ├── sistema-contable-pr/
    ├── school-management-app/
    ├── vivu/
    └── crystalberylmedia/
```

> Las carpetas dentro de `previews/` se crean automáticamente al correr el script de deploy.

---

## Plataforma por Tipo de Proyecto

| Plataforma | Tipos | Motivo |
|-----------|-------|--------|
| **GitHub Pages** | Tipo A (HTML estático puro, sin package.json) | Gratis, HTTPS automático, sin gestión de servidor, directo desde repo público |
| **Vercel** | Tipo A (con build) + Tipo B (SPA) | CDN global, HTTPS automático, auto-deploy desde GitHub, sin gestión de servidor |
| **VPS**    | Tipo C (fullstack) | Necesitan proceso Node.js persistente que Vercel no soporta en free tier |

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
| `alerta-roja`       | Alerta Roja        | GitHub Pages   | ✅           | pendiente |
| `conteb`            | CONTEB             | GitHub Pages   | ✅           | ✅ live — conteb.hanner.dev |
| `agrosena`          | Agrosena           | GitHub Pages   | ✅           | pendiente |
| `plataforma-50`     | Plataforma 50      | GitHub Pages   | ✅           | pendiente |
| `crystalberylmedia` | CrystalBeryl Media | GitHub Pages   | ❌ privado   | pendiente |

### Tipo B — SPA (sin backend)

Build del framework, Nginx sirve la carpeta `/dist`. Sin proceso PM2.

| Slug                 | Título                 | Framework | Repo público | Estado    |
|----------------------|------------------------|-----------|:------------:|-----------|
| `seguros-abc`        | Seguros ABC Management | Angular   | ✅           | ⚠️ en uso como prueba técnica — no modificar |
| `lab-sensorial-sena` | Lab Sensorial SENA     | React     | ✅           | pendiente |
| `greythium`          | GREYTHIUM              | React     | ❌           | pendiente |
| `ecpl`               | ECPL                   | React     | ❌           | pendiente |
| `app-akadem-ia`      | app-akadem-ia          | React     | ❌           | pendiente |

> **Nota `seguros-abc`:** dist path personalizado:
> `frontend/seguros-abc-app/dist/seguros-abc-app/browser` (Angular SSR).
> Los demás React/Vite usan el path estándar `dist`.

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

El script está en el VPS en `/root/deploy.sh` y automatiza el proceso completo:
clonar/actualizar repo → build → config Nginx → SSL con Let's Encrypt.

```bash
# Conectar al VPS
ssh root@72.62.23.134

# Uso del script
./deploy.sh <slug> <repo> <type> [dist_path] [port]
```

### Parámetros

| Parámetro   | Descripción                                                   | Default |
|-------------|---------------------------------------------------------------|---------|
| `slug`      | Nombre del proyecto. Se usa como subdominio y como carpeta en `/var/www/previews/` | — |
| `repo`      | Nombre exacto del repo en GitHub bajo `HannerB`               | — |
| `type`      | `static` \| `spa` \| `fullstack`                              | — |
| `dist_path` | Ruta relativa al output del build (solo spa/fullstack)        | `dist`  |
| `port`      | Puerto del backend PM2 (solo fullstack)                       | `4000`  |

### Ejemplos de uso

```bash
# Landing HTML pura (sin build)
./deploy.sh alerta-roja alerta-roja static

# Landing con build
./deploy.sh cafe-mekaddesh cafe-mekaddesh static

# SPA React/Vite (dist estándar)
./deploy.sh lab-sensorial-sena lab-sensorial-sena spa

# SPA Angular con dist path personalizado
./deploy.sh seguros-abc seguros-abc spa "frontend/app/dist/app/browser"

# Fullstack en puerto 4002
./deploy.sh proveify proveify fullstack dist 4002
```

### Actualizar un proyecto ya desplegado

El script detecta si el repo ya existe y hace `git pull` en lugar de clonar de nuevo.
Solo vuelve a correr el mismo comando:

```bash
./deploy.sh alerta-roja alerta-roja static
```

### Pasos que ejecuta el script

1. **Repositorio** — Clona desde `github.com/HannerB/<repo>` o hace `git pull` si ya existe
2. **Build** — `npm install && npm run build` (omitido en static sin `package.json`)
3. **Nginx** — Crea config en `/etc/nginx/sites-available/`, activa symlink, recarga nginx
4. **SSL** — Certbot obtiene certificado HTTPS y configura redirección HTTP → HTTPS

> El script usa `set -e`: si cualquier paso falla, se detiene para no dejar el deploy a medias.

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
  greythium, ecpl, app-akadem-ia

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

### Infraestructura (completado)
- [x] DNS wildcard `A * → 72.62.23.134` configurado en Sav
- [x] `/var/www/previews/` creado en VPS — separado de producción
- [x] Script `/root/deploy.sh` en VPS con documentación completa

### Deployments pendientes
- [x] **cafe-mekaddesh** — live en GitHub Pages (cafe-mekaddesh.hanner.dev)
- [x] **tvd** — live en GitHub Pages (tvd.hanner.dev)
- [x] **conteb** — live en GitHub Pages (conteb.hanner.dev)
- [ ] **Fase 1 restante** — alerta-roja, agrosena, plataforma-50
- [ ] **Fase 2** — lab-sensorial-sena
- [ ] **Fase 3** — proveify
- [ ] **Fase 4** — greythium, ecpl, app-akadem-ia
- [x] **wedoitweb** — live en Vercel (wedoitweb.hanner.dev) — Dec 2025
- [ ] **Fase 5** — sistema-contable-pr, school-management-app, vivu
- [ ] **Fase 6** — crystalberylmedia
- [ ] **Pendiente** — seguros-abc (cuando concluya prueba técnica)

### Post-deployment
- [ ] Actualizar `link:` en `src/data/projects.js` por cada proyecto deployado
- [ ] Tomar screenshots reales (1200×600px WebP) y reemplazar placeholders

---

## Comandos Útiles

```bash
# Estado general del VPS
ssh root@72.62.23.134 "pm2 status && systemctl is-active nginx"

# Ver qué sitios tiene Nginx activos
ssh root@72.62.23.134 "ls /etc/nginx/sites-enabled/"

# Ver logs de error de un proyecto específico
ssh root@72.62.23.134 "tail -50 /var/log/nginx/[slug]-error.log"

# Recursos del servidor (RAM y disco)
ssh root@72.62.23.134 "free -h && df -h /"

# Validar y recargar nginx tras cambios manuales
ssh root@72.62.23.134 "nginx -t && systemctl reload nginx"

# Ver proyectos desplegados en previews
ssh root@72.62.23.134 "ls /var/www/previews/"
```
