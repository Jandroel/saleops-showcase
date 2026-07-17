# Despliegue del showcase

El showcase es un sitio estático. No requiere backend, base de datos, secretos ni variables de entorno.

## Build verificable

```bash
npm ci
npm run build
npm run check
npm audit --audit-level=high
```

La salida está en `out/`. El build genera un `index.html` por ruta para evitar depender de redirects del proveedor.

## Plataformas

En Vercel, Cloudflare Pages o Netlify usa:

- Build command: `npm run build`
- Output directory: `out`
- Root directory: raíz del repositorio

GitHub Pages también puede publicar `out/`. Si se utiliza un subpath, deben ajustarse los paths absolutos `/assets/...` o configurarse un dominio raíz.

## Verificación previa

1. Ejecutar `npm run build` y `npm run check`.
2. Revisar la portada en escritorio y móvil.
3. Confirmar que las capturas corresponden a la aplicación real y no muestran secretos.
4. Recorrer tienda, carrito, checkout y panel de la demo estática.
5. Comprobar los cuatro enlaces de repositorio.
6. Confirmar que cada capacidad está rotulada como real, opcional, simulada o futura.

El workflow de CI repite build, comprobación estática y auditoría de dependencias en cada push y pull request.
