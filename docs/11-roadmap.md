# Roadmap

## Objetivo

Este roadmap organiza SaleOps por fases para avanzar con foco. Cada fase debe cerrar un bloque verificable sin ampliar el alcance del MVP de forma accidental.

## Fase 0: Documentacion y decisiones base

Objetivo: definir la columna vertebral del proyecto antes de programar.

Incluye:

- product brief;
- alcance MVP;
- roles y permisos;
- modelo de dominio;
- arquitectura;
- modelo conceptual de datos;
- contratos API de alto nivel;
- flujo de checkout y pedidos;
- pagos y delivery;
- modulo de IA;
- seguridad y privacidad;
- roadmap;
- ADRs;
- flujo Git.

Criterio de salida: documentacion base creada y versionada.

## Fase 1: Showcase publico inicial

Objetivo: crear el repositorio publico de presentacion.

Incluye:

- landing del producto;
- narrativa visual;
- demo simulada de compra;
- explicacion tecnica publica;
- documentacion de portafolio;
- sin backend real ni datos sensibles.

Criterio de salida: showcase navegable y publicable.

## Fase 2: Frontend real base

Objetivo: crear la base privada de frontend.

Incluye:

- Next.js con App Router;
- estructura de rutas para tienda y admin;
- sistema visual base;
- layout publico;
- layout admin;
- manejo inicial de formularios, validacion y llamadas API mockeadas;
- pruebas E2E iniciales si aplica.

Criterio de salida: app frontend base lista para conectar API.

## Fase 3: Backend real base

Objetivo: crear API privada base.

Incluye:

- NestJS;
- PostgreSQL;
- Prisma;
- Docker;
- autenticacion;
- roles;
- validacion de DTOs;
- Swagger/OpenAPI;
- logging;
- rate limiting basico;
- estructura modular.

Criterio de salida: backend base seguro y documentado.

## Fase 4: Catalogo, productos e inventario

Objetivo: implementar catalogo operativo.

Incluye:

- productos;
- categorias;
- marcas;
- imagenes;
- stock;
- movimientos de inventario;
- busqueda;
- catalogo publico;
- administracion interna.

Criterio de salida: productos publicables y stock trazable.

## Fase 5: Carrito, checkout y pedidos

Objetivo: implementar el flujo ecommerce principal.

Incluye:

- carrito;
- checkout;
- compra invitada;
- cuenta de cliente;
- metodos de entrega;
- metodos de pago manual o simulado;
- creacion de pedidos;
- consulta basica de pedido;
- estados de pedido;
- reserva o descuento de stock segun decision final.

Criterio de salida: cliente puede completar pedido y negocio puede verlo.

## Fase 6: Panel interno operativo

Objetivo: habilitar operacion diaria desde panel.

Incluye:

- dashboard;
- gestion de pedidos;
- gestion de clientes;
- ventas presenciales;
- validacion manual de pagos;
- atencion de recojo;
- atencion de delivery;
- configuracion de tienda;
- auditoria basica visible para Admin.

Criterio de salida: el negocio puede operar pedidos y ventas desde el panel.

## Fase 7: Reportes e IA interna

Objetivo: agregar inteligencia operativa.

Incluye:

- reportes de ventas;
- productos mas vendidos;
- bajo stock;
- poca rotacion;
- resumen de pedidos;
- modulo de IA interna;
- recomendaciones de reposicion;
- resumen semanal o mensual.

Criterio de salida: Admin obtiene insights utiles basados en datos reales.

## Fase 8: Calidad profesional, tests, CI, documentacion y despliegue

Objetivo: endurecer el proyecto para portafolio y uso real.

Incluye:

- tests unitarios y E2E;
- CI;
- revision de seguridad;
- documentacion de despliegue;
- backups;
- monitoreo basico;
- manejo de errores;
- optimizacion UX;
- demo final.

Criterio de salida: SaleOps listo para presentacion profesional y primeras adaptaciones reales.

## Roadmap futuro

- Pagos reales.
- Facturacion.
- WhatsApp.
- Cupones.
- Reviews.
- Programa de fidelidad.
- Analitica avanzada.
- Multiempresa.
- App movil.
- Integraciones externas.
- Delivery avanzado.
- IA predictiva.

## Recommended Improvements

- Mantener un changelog por fase.
- Definir criterios de aceptacion antes de iniciar cada fase.
- Hacer PRs por fase aunque el proyecto sea personal.
- No iniciar Fase 2 o 3 sin cerrar decisiones abiertas de Fase 0.

## Open Questions

- Fase 1 se construira primero como sitio estatico o como demo interactiva completa?
- El frontend real y backend real empezaran en repositorios separados desde el primer commit?
- Que entorno de despliegue se usara para la primera demo publica?
