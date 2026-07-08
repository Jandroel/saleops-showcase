# Showcase Publico

## Objetivo

Este repositorio funciona como `saleops-showcase`: la vitrina publica de SaleOps. Su objetivo es presentar el producto, mostrar un flujo ecommerce simulado y explicar la arquitectura sin exponer implementacion privada.

## Que muestra

- Landing comercial de SaleOps.
- Demo visual de tienda online.
- Catalogo de `NovaTech Store`.
- Flujo mock de carrito, checkout y confirmacion.
- Panel interno simulado.
- Productos, pedidos, reportes e IA interna mock.
- Roadmap y resumen tecnico.

## Rutas

| Ruta | Proposito |
| --- | --- |
| `/` | Landing comercial |
| `/demo/store/` | Home de tienda demo |
| `/demo/store/products/` | Catalogo mock |
| `/demo/store/products/:slug/` | Detalle visual de producto |
| `/demo/store/cart/` | Carrito simulado |
| `/demo/store/checkout/` | Checkout simulado |
| `/demo/store/order-success/` | Confirmacion mock |
| `/demo/admin/` | Dashboard interno simulado |
| `/demo/admin/products/` | Tabla visual de productos |
| `/demo/admin/orders/` | Tabla visual de pedidos |
| `/demo/admin/reports/` | Reportes mock |
| `/demo/admin/ai-insights/` | IA interna simulada |
| `/docs/` | Resumen tecnico publico |
| `/roadmap/` | Roadmap visual |

## Datos simulados

Los datos viven en:

```text
public/assets/mock-data.js
```

Incluyen productos, categorias, pedidos, metricas, serie de ventas e insights de IA mock.

## Diferencia con la app real

El showcase:

- no autentica usuarios;
- no procesa pagos;
- no consulta una base de datos;
- no envia informacion a servidores;
- no ejecuta IA real;
- no representa el frontend privado completo.

La app real debera vivir en `saleops-frontend` y conectarse con `saleops-backend`.

## Decisiones de Fase 1

El showcase se implemento como sitio estatico sin dependencias para asegurar ejecucion local con Node aunque no haya package manager disponible. Esto no cambia la decision tecnica de la version real, que sigue documentada con Next.js, React, TypeScript, NestJS y PostgreSQL.

## Recommended Improvements

- Agregar capturas reales del sitio despues de deploy.
- Migrar el showcase a Next.js si se requiere SSR, MDX o integracion avanzada de docs.
- Agregar animaciones sutiles solo si mejoran claridad y rendimiento.

## Open Questions

- El showcase final se publicara en Vercel, Cloudflare Pages, Netlify o GitHub Pages?
- Se agregara un enlace publico a GitHub cuando el repositorio remoto exista?
