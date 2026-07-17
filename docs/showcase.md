# Showcase público

## Propósito

Este repositorio presenta SaleOps sin exponer secretos, datos operativos ni depender de servicios privados. La portada usa capturas de la aplicación real y la sección `/demo/` ofrece una experiencia estática independiente.

## Contenido verificable

- Capturas de storefront, dashboard, reportes y punto de venta reales.
- Enlaces a frontend, backend, documentación y showcase.
- Stack y arquitectura vigentes.
- Estado explícito de capacidades reales, opcionales y futuras.
- Indicadores cuantitativos obtenidos del código: 41 rutas web y 108 operaciones API.

## Demo estática

| Ruta | Propósito |
| --- | --- |
| `/demo/store/` | Inicio de tienda simulado |
| `/demo/store/products/` | Catálogo local |
| `/demo/store/products/:slug/` | Detalle de producto |
| `/demo/store/cart/` | Carrito en `localStorage` |
| `/demo/store/checkout/` | Checkout sin transacción externa |
| `/demo/store/order-success/` | Confirmación local |
| `/demo/admin/` | Dashboard de ejemplo |
| `/demo/admin/products/` | Productos de ejemplo |
| `/demo/admin/orders/` | Pedidos de ejemplo |
| `/demo/admin/reports/` | Reportes ilustrativos |
| `/demo/admin/ai-insights/` | Escenarios opcionales simulados |

La demo no autentica, no consulta PostgreSQL, no envía información, no procesa tarjetas y no ejecuta IA.

## Aplicación real

La aplicación funcional vive en `saleops-frontend` y `saleops-backend`. Incluye autenticación, autorización, persistencia, stock transaccional, pedidos, ventas, caja y reportes. Se valida de forma independiente con pruebas unitarias, integración y Playwright.

## Actualización de capturas

Las imágenes en `public/assets/screenshots/` deben capturarse desde la aplicación local conectada al backend y con datos del seed. Antes de reemplazarlas se verifica que no muestren secretos ni información personal real.
