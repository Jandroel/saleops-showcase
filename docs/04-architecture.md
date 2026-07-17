# Arquitectura

## Repositorios

SaleOps se divide en cuatro repositorios con responsabilidades explícitas:

| Repositorio | Responsabilidad | Ejecución |
| --- | --- | --- |
| `saleops-showcase` | Vitrina pública, capturas y demo simulada | Sitio estático |
| `saleops-frontend` | Storefront, cuenta y panel operativo | Next.js |
| `saleops-backend` | API, reglas de negocio y persistencia | NestJS + PostgreSQL |
| `saleops-docs` | Arquitectura, producto y operación | Markdown |

## Aplicación web

Un único proyecto Next.js separa tienda pública, cuenta de cliente y panel interno mediante grupos de rutas y layouts. TanStack Query administra estado remoto, React Hook Form y Zod validan formularios, y Playwright cubre recorridos de navegador.

La tienda prioriza claridad de compra y adaptación móvil. El panel usa navegación y controles densos para trabajo repetido. Los permisos visibles mejoran la experiencia, pero no sustituyen la autorización del servidor.

## API

NestJS funciona como monolito modular. Los dominios comparten un despliegue y una base PostgreSQL, mientras conservan controladores, servicios, DTOs y reglas de autorización propios.

Prisma modela persistencia y migraciones. Las operaciones que afectan stock, pedidos, ventas, cancelaciones o caja usan transacciones y bloqueos cuando existe riesgo de concurrencia.

## Seguridad

- Personal y clientes tienen autenticación y refresh tokens separados.
- RBAC protege catálogo interno, inventario, ventas, caja, reportes y configuración.
- Los endpoints públicos omiten costos, auditoría y datos privados.
- El correo se procesa mediante outbox después de confirmar la operación principal.
- Swagger se deshabilita en producción.

## IA y servicios externos

La IA no forma parte del camino crítico. El frontend contiene un laboratorio opcional con escenarios locales aislados; el backend no expone endpoints de IA ni llama a proveedores. Los reportes operativos son consultas deterministas sobre datos reales.

La media admite almacenamiento local y una configuración opcional de Cloudinary. El correo admite previews locales y un transporte configurable. Los pagos actuales son manuales o referencias externas y no reciben datos de tarjeta.

## Límites

El sistema es single-tenant: una tienda por despliegue. No implementa microservicios, marketplace, multiempresa, pagos reales, promociones, OAuth, facturación electrónica ni tracking en vivo.
