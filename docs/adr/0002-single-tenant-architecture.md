# ADR 0002: Single-Tenant Architecture

## Status

Accepted.

## Context

SaleOps busca servir a negocios especificos con una tienda por despliegue. El MVP debe validar ecommerce, pedidos, inventario, ventas, reportes e IA interna sin cargar la complejidad de una plataforma multiempresa.

Un modelo multi-tenant exigiria resolver aislamiento de datos, configuraciones por negocio, limites por tenant, billing, permisos mas complejos, migraciones compartidas y mayor riesgo de fuga de informacion.

## Decision

SaleOps sera single-tenant por instalacion en el MVP:

- una tienda por despliegue;
- una base de datos por instalacion;
- una configuracion de negocio por instancia;
- adaptacion manual para nuevos negocios;
- sin marketplace ni multiempresa.

## Advantages

- Menor complejidad inicial.
- Mejor claridad de dominio.
- Menor riesgo de fuga entre negocios.
- Despliegues adaptables por cliente.
- Mas facil de explicar como portafolio y como base comercial.
- Permite concentrarse en calidad del flujo ecommerce-operativo.

## Disadvantages

- Escalar a muchos clientes requiere mas despliegues.
- Las actualizaciones deben coordinarse por instancia.
- No hay panel central para administrar multiples negocios.
- Algunas configuraciones pueden duplicarse entre instalaciones.

## Why Not Multi-Tenant In MVP

Multi-tenant no es necesario para validar el valor central. Agregaria trabajo de infraestructura y seguridad antes de tener flujo de compra, pedidos e inventario maduros.

El MVP debe probar que una instalacion funciona bien para un negocio. Despues se puede evaluar si el mercado justifica una plataforma multiempresa.

## Future Evolution

SaleOps podria evolucionar hacia multi-tenant si:

- existen varios clientes activos;
- se repiten necesidades entre instalaciones;
- mantener despliegues separados se vuelve costoso;
- se requiere onboarding automatizado;
- hay recursos para endurecer aislamiento y administracion.

Evolucion posible:

1. Mantener single-tenant con plantillas de despliegue.
2. Agregar tooling para provisionar nuevas instancias.
3. Estandarizar configuracion por negocio.
4. Evaluar multi-tenant con `tenantId` y aislamiento estricto.
5. Crear panel de administracion global solo si el producto lo justifica.

## Recommended Improvements

- Evitar hardcodear datos del negocio en codigo.
- Centralizar StoreSettings para facilitar adaptaciones.
- Documentar pasos de provisionamiento por instalacion.
- Mantener migraciones reproducibles.

## Open Questions

- Cuantas instalaciones reales justificarian evaluar multi-tenant?
- Se priorizara automatizar despliegues single-tenant antes de considerar multiempresa?
