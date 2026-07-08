# Database Model

## Objetivo

Este documento describe el modelo de datos conceptual de SaleOps. No contiene migraciones, SQL ni modelos Prisma. Sirve como puente entre el modelo de dominio y la implementacion futura.

## Modelo conceptual

La base de datos debe sostener una instalacion single-tenant con datos de tienda, usuarios internos, clientes, catalogo, inventario, carritos, pedidos, pagos, entregas, ventas, reportes, IA, auditoria y notificaciones.

Como el MVP no es multiempresa, no se requiere `tenantId` en todas las tablas. Sin embargo, las entidades deben evitar supuestos que impidan una evolucion futura.

## Entidades principales

- StoreSettings.
- User.
- Role.
- Customer.
- Product.
- Category.
- Brand.
- ProductImage.
- InventoryMovement.
- Cart.
- CartItem.
- Order.
- OrderItem.
- Payment.
- DeliveryMethod.
- Address.
- Sale.
- SaleItem.
- Report.
- AiInsight.
- AuditLog.
- Notification.

## Relaciones principales

- Role tiene muchos User.
- Customer tiene muchas Address, Cart, Order y Sale.
- Category tiene muchos Product.
- Brand tiene muchos Product.
- Product tiene muchas ProductImage e InventoryMovement.
- Cart tiene muchos CartItem.
- Order tiene muchos OrderItem.
- Order puede tener Payment, DeliveryMethod y Address.
- Order puede vincularse con Sale cuando se completa comercialmente.
- Sale tiene muchos SaleItem y puede tener Payment.
- User puede registrar Sale, validar Payment, generar AiInsight y producir AuditLog.

## Reglas importantes

- Un producto eliminado no debe borrar historial de pedidos o ventas.
- Un pedido debe conservar snapshots de nombre, SKU y precio de productos.
- Una venta debe conservar snapshots aunque el producto cambie despues.
- Un cambio de stock debe producir InventoryMovement.
- Un pago manual debe guardar metodo, estado, referencia y usuario validador si aplica.
- Un cliente solo puede acceder a sus propios pedidos.
- Un invitado solo puede consultar un pedido con datos de verificacion.
- La IA no debe acceder a datos fuera del alcance del rol del usuario interno.

## Estados

### Order

- Pending: pedido creado y pendiente de revision.
- Confirmed: pedido aceptado por Admin o Vendedor.
- Preparing: pedido en preparacion.
- ReadyForPickup: pedido listo para recojo.
- OutForDelivery: pedido en ruta para delivery local.
- Delivered: pedido entregado al cliente.
- Completed: pedido cerrado comercialmente.
- Cancelled: pedido cancelado.

### Payment

- Pending: pago pendiente de validacion o ejecucion.
- Paid: pago confirmado.
- Failed: pago fallido.
- Cancelled: pago cancelado.
- Refunded: pago devuelto.

### InventoryMovement

- In: entrada de stock.
- Out: salida de stock.
- Reservation: reserva por pedido.
- Release: liberacion de reserva.
- Adjustment: ajuste manual.

### Cart

- Active: carrito vigente.
- Converted: carrito convertido en pedido.
- Abandoned: carrito expirado o abandonado.

## Soft delete

Debe considerarse soft delete para entidades criticas:

- Product;
- Category;
- Brand;
- Customer;
- User;
- DeliveryMethod;
- StoreSettings historico si se versiona.

El soft delete evita romper relaciones historicas y permite auditoria. En listados publicos se muestran solo registros activos.

## Auditoria

AuditLog debe registrar acciones sensibles:

- cambios de pedido;
- ajustes de inventario;
- validacion manual de pagos;
- cambios de usuarios y roles;
- cambios de configuracion de tienda;
- acciones relevantes de IA si contienen decisiones operativas.

Los logs deben evitar datos sensibles innecesarios y no guardar contrasenas, tokens ni secretos.

## Consideraciones para inventario

Inventario debe ser consistente y trazable. El campo `stockActual` de Product puede existir para lectura rapida, pero debe estar respaldado por InventoryMovement.

La regla recomendada para MVP:

- al confirmar el pedido, reservar stock;
- al completar venta o entrega, convertir reserva en salida definitiva;
- al cancelar pedido, liberar reserva;
- si no hay stock suficiente, bloquear confirmacion o solicitar ajuste manual.

## Consideraciones para pedidos

Order debe conservar el estado operativo. No todos los pedidos son ventas finalizadas. Un pedido cancelado no debe contar como ingreso.

Debe existir codigo de pedido unico para confirmacion y consulta. Los cambios de estado deben validar transiciones permitidas.

## Consideraciones para pagos manuales

Los pagos manuales requieren trazabilidad:

- metodo seleccionado;
- monto esperado;
- estado;
- referencia manual;
- comprobante opcional;
- usuario que valido;
- fecha de validacion.

Un pago manual no debe marcarse como `Paid` automaticamente salvo pago al recoger o contra entrega confirmado por usuario interno.

## Consideraciones para futuras pasarelas reales

Payment debe permitir campos como provider, providerPaymentId, providerStatus, rawResponse seguro y timestamps de confirmacion. Estos campos pueden quedar conceptuales hasta integrar proveedor real.

La arquitectura debe evitar que Order dependa de detalles especificos de un proveedor.

## Recommended Improvements

- Usar restricciones unicas para slugs, SKU y codigos de pedido.
- Definir indices para busqueda de productos, listados de pedidos, estados y fechas.
- Mantener timestamps `createdAt`, `updatedAt` y, cuando aplique, `deletedAt`.
- Evitar borrar fisicamente entidades que participen en reportes.

## Open Questions

- El stock se reservara al crear Order o solo al pasar a Confirmed?
- Se guardaran comprobantes de pago como archivos locales, cloud storage o solo URLs?
- La direccion usada en un pedido sera snapshot independiente aunque el cliente actualice su Address?
