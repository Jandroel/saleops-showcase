# API Contract

## Objetivo

Este documento propone contratos API a alto nivel para SaleOps. No implementa endpoints ni DTOs reales. Sirve para alinear frontend, backend y reglas de seguridad antes de escribir codigo.

## Convenciones generales

- La API usara JSON.
- Los endpoints administrativos requieren autenticacion interna.
- Los endpoints de cliente registrado requieren autenticacion de cliente.
- Los endpoints publicos solo exponen datos necesarios para comprar.
- Las respuestas de listados deben soportar paginacion.
- Los errores deben tener formato consistente.
- Las entradas deben validarse con DTOs y reglas de negocio.
- Los endpoints sensibles deben registrar AuditLog cuando aplique.

## Auth

Responsabilidad: autenticacion de usuarios internos y clientes registrados.

Endpoints principales:

- `POST /auth/admin/login`
- `POST /auth/admin/refresh`
- `POST /auth/admin/logout`
- `POST /auth/customer/login`
- `POST /auth/customer/register`
- `POST /auth/customer/refresh`
- `POST /auth/customer/logout`

Acceso: publico para login/register; autenticado para logout.

Validacion: email valido, password obligatorio, politica minima de contrasena.

Seguridad: password hashing, refresh tokens seguros, rate limiting e invalidacion de tokens.

## Users

Responsabilidad: gestion de usuarios internos.

Endpoints principales:

- `GET /users`
- `POST /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `PATCH /users/:id/status`

Acceso: Admin.

Validacion: email unico, rol valido, estado permitido.

Seguridad: no exponer password hash; auditar cambios.

## Customers

Responsabilidad: gestion de clientes y datos basicos.

Endpoints principales:

- `GET /customers`
- `POST /customers`
- `GET /customers/:id`
- `PATCH /customers/:id`
- `GET /customers/:id/orders`
- `GET /me/customer`
- `PATCH /me/customer`

Acceso: Admin; Vendedor para creacion/edicion basica; Cliente registrado para datos propios.

Validacion: email y telefono segun flujo, datos minimos para pedido.

Seguridad: proteger datos personales y limitar acceso a informacion propia.

## Products

Responsabilidad: catalogo de productos.

Endpoints principales:

- `GET /public/products`
- `GET /public/products/:slug`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`

Acceso: publico para lectura publica; Admin para gestion; Vendedor para lectura interna.

Validacion: SKU unico, slug unico, precio valido, categoria existente.

Seguridad: soft delete, validacion de imagenes y auditoria en cambios.

## Categories

Responsabilidad: organizacion del catalogo.

Endpoints principales:

- `GET /public/categories`
- `GET /categories`
- `POST /categories`
- `PATCH /categories/:id`
- `DELETE /categories/:id`

Acceso: publico para lectura; Admin para gestion.

Validacion: slug unico, nombre obligatorio, parentId valido.

Seguridad: no eliminar si rompe navegacion; preferir soft delete.

## Brands

Responsabilidad: gestion opcional de marcas.

Endpoints principales:

- `GET /public/brands`
- `GET /brands`
- `POST /brands`
- `PATCH /brands/:id`
- `DELETE /brands/:id`

Acceso: publico para lectura si se muestra; Admin para gestion.

Validacion: nombre y slug unicos.

Seguridad: soft delete si hay productos asociados.

## Inventory

Responsabilidad: stock y movimientos.

Endpoints principales:

- `GET /inventory`
- `GET /inventory/products/:productId/movements`
- `POST /inventory/movements`
- `POST /inventory/products/:productId/adjust`

Acceso: Admin para ajustes; Vendedor para lectura.

Validacion: cantidad positiva, motivo obligatorio, producto activo.

Seguridad: auditar todos los ajustes; evitar stock negativo salvo regla explicita.

## Cart

Responsabilidad: carrito de Cliente registrado o Cliente invitado.

Endpoints principales:

- `GET /cart`
- `POST /cart/items`
- `PATCH /cart/items/:id`
- `DELETE /cart/items/:id`
- `POST /cart/clear`

Acceso: Cliente registrado o invitado con token de carrito.

Validacion: producto activo, cantidad disponible, precio snapshot.

Seguridad: token invitado seguro, expiracion y validacion de propiedad.

## Orders

Responsabilidad: creacion y operacion de pedidos.

Endpoints principales:

- `POST /orders`
- `GET /orders/lookup`
- `GET /me/orders`
- `GET /me/orders/:id`
- `GET /orders`
- `GET /orders/:id`
- `PATCH /orders/:id/status`
- `POST /orders/:id/cancel`

Acceso: publico/cliente para crear y consultar lo propio; Admin y Vendedor para gestion interna.

Validacion: stock, direccion si delivery, metodo de pago, metodo de entrega, transiciones de estado.

Seguridad: no exponer pedidos de otros clientes; auditar cambios de estado.

## Payments

Responsabilidad: registro y validacion de pagos manuales o simulados.

Endpoints principales:

- `GET /payments`
- `GET /payments/:id`
- `POST /payments/:id/validate`
- `POST /payments/:id/cancel`
- `POST /payments/simulated-card`

Acceso: Admin; Vendedor segun permiso para validar pagos operativos; cliente solo ve estado de su pago.

Validacion: metodo permitido, monto esperado, referencia manual si aplica.

Seguridad: no almacenar datos reales de tarjeta; auditar validaciones.

## Delivery

Responsabilidad: metodos y datos de entrega.

Endpoints principales:

- `GET /public/delivery-methods`
- `GET /delivery-methods`
- `POST /delivery-methods`
- `PATCH /delivery-methods/:id`
- `DELETE /delivery-methods/:id`

Acceso: publico para metodos activos; Admin para configuracion.

Validacion: tipo permitido, costo valido, metodo activo.

Seguridad: no prometer tracking si no existe; validar direccion minima para delivery.

## Sales

Responsabilidad: ventas completadas y ventas presenciales.

Endpoints principales:

- `GET /sales`
- `POST /sales`
- `GET /sales/:id`
- `POST /sales/from-order/:orderId`

Acceso: Admin y Vendedor.

Validacion: productos activos o snapshots validos, total correcto, pago asociado si aplica.

Seguridad: auditar creacion y evitar doble venta para un mismo pedido.

## Reports

Responsabilidad: reportes basicos de ventas, pedidos e inventario.

Endpoints principales:

- `GET /reports/sales-summary`
- `GET /reports/top-products`
- `GET /reports/low-stock`
- `GET /reports/slow-moving-products`
- `GET /reports/orders-summary`

Acceso: Admin; Vendedor si se habilitan reportes limitados.

Validacion: rango de fechas, filtros permitidos.

Seguridad: no exponer datos personales innecesarios en agregados.

## AI Insights

Responsabilidad: analisis interno asistido por IA.

Endpoints principales:

- `POST /ai/insights/sales-summary`
- `POST /ai/insights/restock-recommendations`
- `POST /ai/insights/slow-moving-products`
- `GET /ai/insights/history`

Acceso: Admin; Vendedor con funciones limitadas.

Validacion: periodo, tipo de insight, permisos por rol.

Seguridad: rate limiting, cost control, datos agregados, registro de consultas relevantes.

## Store Settings

Responsabilidad: configuracion global de tienda.

Endpoints principales:

- `GET /public/store-settings`
- `GET /store-settings`
- `PATCH /store-settings`

Acceso: publico para datos visibles; Admin para edicion.

Validacion: datos de contacto, moneda, metodos activos.

Seguridad: no exponer configuracion interna o secretos.

## Audit Logs

Responsabilidad: consulta de acciones sensibles.

Endpoints principales:

- `GET /audit-logs`
- `GET /audit-logs/:id`

Acceso: Admin.

Validacion: filtros por usuario, entidad, accion y fecha.

Seguridad: solo lectura, no incluir secretos ni tokens.

## Notifications

Responsabilidad: avisos internos y mensajes transaccionales basicos.

Endpoints principales:

- `GET /notifications`
- `PATCH /notifications/:id/read`
- `POST /notifications/test`

Acceso: usuarios internos autenticados; Admin para pruebas o configuracion futura.

Validacion: canal permitido, destinatario valido.

Seguridad: evitar informacion sensible en notificaciones visibles.

## Recommended Improvements

- Generar documentacion Swagger/OpenAPI desde los controladores reales.
- Crear convencion de errores antes de integrar frontend.
- Definir `requestId` para trazabilidad.
- Implementar rate limiting en Auth, checkout, lookup de pedidos e IA.

## Open Questions

- La API sera versionada desde el inicio con `/v1`?
- Cliente registrado e interno usaran tablas y estrategias de auth separadas desde Fase 3?
- El lookup de pedido usara email, telefono o ambos como verificacion?
