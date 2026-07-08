# Deployment Showcase

## Objetivo

SaleOps Showcase puede desplegarse como sitio estatico. No necesita backend, base de datos, variables de entorno sensibles ni servicios externos.

## Build

Ejecutar:

```bash
node scripts/build.mjs
```

Salida:

```text
out/
```

## Vercel

Configuracion sugerida:

- Framework preset: Other.
- Build command: `node scripts/build.mjs`.
- Output directory: `out`.
- Install command: vacio o `npm install` si el entorno lo exige.

No se requieren variables de entorno.

## Cloudflare Pages

Configuracion sugerida:

- Build command: `node scripts/build.mjs`.
- Build output directory: `out`.
- Root directory: raiz del repositorio.

No se requiere Functions ni Workers para esta fase.

## Netlify

Configuracion sugerida:

- Build command: `node scripts/build.mjs`.
- Publish directory: `out`.

No se necesitan redirects para las rutas generadas por el build, porque el script crea `index.html` por ruta.

## GitHub Pages

Opcion recomendada:

1. Ejecutar build local o en GitHub Actions.
2. Publicar el contenido de `out/`.

Nota: si el sitio se publica bajo subpath, puede requerir ajustar paths absolutos `/assets/...` o configurar Pages en dominio raiz del proyecto.

## Verificacion antes de deploy

- Correr servidor local.
- Revisar landing.
- Revisar `/demo/store/products/`.
- Agregar producto al carrito.
- Completar checkout simulado.
- Revisar `/demo/admin/`.
- Ejecutar build.
- Confirmar que no existan prompts locales trackeados.

## Recommended Improvements

- Agregar GitHub Actions para construir y publicar `out/`.
- Agregar capturas de Playwright en una fase de calidad.
- Definir dominio o subdominio publico para portafolio.

## Open Questions

- Cual sera la plataforma de despliegue inicial?
- El showcase se publicara en dominio propio o subdominio del proveedor?
