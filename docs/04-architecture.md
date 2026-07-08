# Architecture

## Objetivo

Este documento define la arquitectura general propuesta para SaleOps en Fase 0. No implementa codigo, pero orienta la separacion de repositorios, modulos, responsabilidades y decisiones tecnicas.

## Arquitectura de tres repositorios

SaleOps se organizara en tres repositorios:

- `saleops-showcase`: publico, orientado a presentacion, demo visual y documentacion publica.
- `saleops-frontend`: privado, contiene tienda real y panel administrativo.
- `saleops-backend`: privado, contiene API, base de datos, autenticacion, roles, logica de negocio, reportes e IA interna.

## Por que separar el showcase publico

El showcase debe poder publicarse como portafolio sin exponer logica sensible, secretos, estructuras internas o endpoints reales. Sirve para contar el producto, mostrar experiencia visual y simular flujos.

Separarlo evita que la demo publica arrastre riesgos de seguridad del sistema real y permite adaptar el discurso del proyecto sin afectar la implementacion privada.

## Por que frontend y backend reales seran privados

El frontend y backend reales contienen decisiones de negocio, integraciones, configuracion de seguridad, contratos API y potencialmente adaptaciones para clientes. Mantenerlos privados reduce exposicion de superficie sensible y permite trabajar con datos e infraestructura reales de forma mas controlada.

## Arquitectura frontend propuesta

Stack:

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

La aplicacion frontend debe separar dos areas:

- tienda publica: home, catalogo, producto, carrito, checkout, cuenta de cliente y consulta de pedido;
- panel admin: dashboard, productos, inventario, pedidos, clientes, ventas, reportes, IA y configuracion.

La separacion puede hacerse por grupos de rutas. La tienda prioriza rendimiento, SEO basico y conversion. El panel prioriza densidad informativa, estados claros y eficiencia operativa.

## Arquitectura backend propuesta

Stack:

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

El backend iniciara como API modular monolitica. Cada modulo tendra controladores, servicios, DTOs, validaciones y reglas de autorizacion propias, pero compartira una misma base de datos y despliegue.

Modulos esperados:

- Auth;
- Users;
- Customers;
- Products;
- Categories;
- Brands;
- Inventory;
- Cart;
- Orders;
- Payments;
- Delivery;
- Sales;
- Reports;
- AI Insights;
- Store Settings;
- Audit Logs;
- Notifications.

## API modular monolitica

Una API modular monolitica permite avanzar rapido sin perder estructura. Para el MVP, microservicios agregarian complejidad innecesaria en autenticacion, observabilidad, despliegues y consistencia de datos.

La modularidad interna debe dejar limites claros para que, si el producto crece, algunos dominios puedan separarse mas adelante.

## Base de datos

PostgreSQL sera la base de datos principal. Es adecuada para datos relacionales como productos, pedidos, inventario, pagos, clientes y auditoria.

Prisma puede usarse como ORM para modelar entidades, migraciones y consultas con TypeScript. Las decisiones de modelo se documentan primero de forma conceptual antes de escribir schema real.

## Autenticacion y autorizacion

La autenticacion interna usara credenciales seguras, password hashing y JWT con refresh tokens. La autorizacion usara RBAC con roles Admin y Vendedor en el MVP.

Clientes registrados tendran autenticacion separada del panel interno. Cliente invitado no tendra cuenta, pero sus pedidos deben consultarse con un mecanismo de verificacion.

## Separacion entre tienda publica y panel admin

La tienda publica consume endpoints seguros para catalogo, carrito, checkout y pedidos propios. El panel admin consume endpoints protegidos por rol.

No debe existir acceso de clientes al modulo de IA interna, reportes internos, auditoria ni configuracion del negocio.

## Diseno futuro para pagos reales

Aunque el MVP usa pagos manuales o simulados, Payment debe modelarse con una abstraccion de proveedor. La API no debe depender de un proveedor especifico como Stripe, Mercado Pago, Culqi o PayPal.

La abstraccion debe permitir:

- crear intento de pago;
- confirmar o validar pago;
- recibir estado;
- registrar referencia externa;
- conciliar pago con Order o Sale.

## Diseno futuro para delivery avanzado

El MVP solo incluye recojo y delivery local basico. DeliveryMethod debe permitir evolucionar hacia zonas, tarifas, repartidores, ventanas horarias o integraciones externas sin redisenar Order.

No se implementa tracking en vivo ni gestion de repartidores en tiempo real en el MVP.

## Diseno de IA interna

La IA sera un modulo interno que consulta datos agregados y genera insights para Admin y, de forma limitada, Vendedor.

Debe basarse en datos reales del sistema:

- ventas por periodo;
- productos mas vendidos;
- productos con bajo stock;
- productos con poca rotacion;
- pedidos online;
- recomendaciones de reposicion.

Se deben controlar permisos, costos, rate limits y registro de consultas relevantes.

## Escalabilidad sin sobredisenar

SaleOps debe ser escalable de forma razonable:

- indices para consultas frecuentes;
- paginacion en listados;
- separacion clara de modulos;
- jobs futuros para tareas pesadas;
- backups;
- logs y metricas basicas;
- contratos API documentados.

No se debe introducir multitenancy, microservicios o colas complejas hasta que el flujo principal este validado.

## Recommended Improvements

- Generar OpenAPI desde el backend y usarlo como contrato con frontend.
- Mantener una capa de servicios por dominio para centralizar reglas de negocio.
- Definir convenciones de errores API desde Fase 3.
- Usar feature flags simples para activar modulos futuros sin romper MVP.

## Open Questions

- Se usara un solo proyecto frontend para tienda y admin o dos apps dentro de un monorepo privado?
- El backend se desplegara inicialmente en un VPS, PaaS o contenedores administrados?
- La IA usara un proveedor externo desde el inicio o primero respuestas simuladas basadas en reportes?
