# SaleOps

SaleOps es una plataforma ecommerce-first para negocios que necesitan vender online y operar sus procesos comerciales desde una misma base. Combina una tienda publica para clientes con un panel interno privado para gestionar productos, inventario, pedidos, ventas, clientes, reportes e insights internos con IA.

El objetivo no es crear solo una tienda visualmente atractiva. SaleOps busca demostrar criterio de producto, arquitectura mantenible, UX operativa, seguridad, documentacion clara y una base adaptable para negocios reales.

## Problema que resuelve

Muchos negocios pequenos y medianos venden por canales dispersos: redes sociales, mensajes, hojas de calculo, ventas presenciales y pagos manuales. Eso dificulta mantener stock confiable, atender pedidos, revisar ventas y tomar decisiones con datos.

SaleOps centraliza el flujo principal:

- publicar productos;
- recibir pedidos online;
- operar recojo en tienda o delivery local;
- registrar pagos manuales o simulados;
- administrar inventario;
- consultar ventas y clientes;
- generar reportes e insights internos.

## Enfoque ecommerce-first

La tienda online es el punto de entrada principal del producto. Desde ahi, el cliente puede navegar el catalogo, buscar productos, revisar detalles, agregar al carrito y completar un checkout simple. El panel interno existe para que el negocio pueda cumplir y controlar las operaciones que nacen desde esa tienda.

Esto evita que SaleOps se convierta en un ERP generico. El MVP se concentra en vender, cobrar de forma manual o simulada, preparar pedidos, entregar y aprender de los datos de venta.

## Modelo single-tenant

SaleOps sera single-tenant por instalacion:

- una tienda por despliegue;
- una configuracion de negocio por instancia;
- una base de datos por instalacion;
- adaptaciones puntuales por cliente si el producto se usa comercialmente.

No se implementara multiempresa en el MVP. Esa decision reduce complejidad inicial, mejora la claridad del dominio y permite construir una base solida antes de pensar en tenancy compartida.

## Repositorios planeados

### saleops-showcase

Repositorio publico para landing, demo visual, flujo simulado de compra, documentacion publica y presentacion tecnica. No debe contener backend real, base de datos real, secretos ni logica sensible.

### saleops-frontend

Repositorio privado para el frontend real de la tienda online y el panel administrativo. Debe contener la experiencia de cliente y las interfaces operativas internas.

### saleops-backend

Repositorio privado para API real, base de datos, autenticacion, roles, logica de negocio, reportes, IA interna, seguridad, tests y documentacion tecnica.

## MVP

El MVP incluye:

- home de tienda;
- catalogo, categorias, busqueda y detalle de producto;
- carrito y checkout;
- compra como Cliente invitado;
- cuenta de Cliente registrado;
- recojo en tienda y delivery local basico;
- pagos manuales o simulados;
- confirmacion y consulta basica de pedido;
- panel interno con productos, categorias, inventario, pedidos, clientes, ventas, reportes basicos, configuracion e IA interna.

Queda fuera del MVP:

- marketplace;
- multiempresa;
- pasarela real de pagos;
- tracking con mapa;
- gestion en tiempo real de repartidores;
- facturacion electronica;
- ERP avanzado;
- chatbot publico para clientes;
- reviews, puntos, cupones avanzados e integracion real con WhatsApp API.

## Stack tecnologico propuesto

Frontend:

- Next.js estable con App Router;
- React;
- TypeScript;
- Tailwind CSS;
- shadcn/ui;
- TanStack Query;
- React Hook Form;
- Zod;
- Recharts;
- Playwright.

Backend:

- NestJS;
- TypeScript;
- PostgreSQL;
- Prisma;
- JWT con refresh tokens;
- RBAC;
- Swagger/OpenAPI;
- Docker;
- Jest;
- validacion de DTOs;
- logging;
- rate limiting basico.

## Estado actual

El proyecto esta en Fase 0: documentacion y decisiones base. En esta fase no se implementan pantallas, endpoints, modelos Prisma ni logica de aplicacion. La meta es dejar una columna vertebral tecnica y de producto antes de programar.

## Fases de trabajo

1. Fase 0: documentacion y decisiones base.
2. Fase 1: showcase publico inicial.
3. Fase 2: frontend real base.
4. Fase 3: backend real base.
5. Fase 4: catalogo, productos e inventario.
6. Fase 5: carrito, checkout y pedidos.
7. Fase 6: panel interno operativo.
8. Fase 7: reportes e IA interna.
9. Fase 8: calidad profesional, tests, CI, documentacion y despliegue.

## Uso como portafolio y base comercial

SaleOps debe funcionar como proyecto de portafolio tecnico y como base adaptable para clientes reales. El showcase publico demostrara vision, experiencia y arquitectura sin exponer codigo sensible. Los repositorios privados contendran la implementacion real reutilizable para instalaciones especificas.

## Recommended Improvements

- Mantener decisiones relevantes como ADRs desde el inicio.
- Documentar flujos de pedido, pago e inventario antes de modelar la base de datos.
- Definir criterios de seguridad y privacidad antes de exponer endpoints reales.
- Preparar contratos API de alto nivel antes de acoplar frontend y backend.

## Open Questions

- Que tipo de negocio sera el primer caso de referencia para adaptar la UX y los datos de ejemplo?
- El primer despliegue real usara dominio propio, subdominio o entorno local de demostracion?
- Que proveedor de hosting se priorizara para frontend, backend y base de datos?
