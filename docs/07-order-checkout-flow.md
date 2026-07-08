# Order And Checkout Flow

## Objetivo

Este documento define el flujo de compra y operacion de pedidos en SaleOps. La meta es que tienda, panel interno, inventario, pagos y ventas trabajen con una misma logica.

## Flujo de cliente

1. Ver home.
2. Buscar producto o navegar categorias.
3. Ver detalle de producto.
4. Agregar producto al carrito.
5. Revisar carrito.
6. Iniciar checkout.
7. Elegir compra como Cliente invitado o cuenta de Cliente registrado.
8. Ingresar o confirmar datos de contacto.
9. Elegir metodo de entrega.
10. Ingresar direccion si aplica delivery local.
11. Elegir metodo de pago.
12. Confirmar pedido.
13. Recibir codigo de pedido.
14. Consultar estado basico del pedido.

## Flujo interno

1. El pedido entra como Pending.
2. Admin o Vendedor revisa datos, stock y metodo de pago.
3. Admin o Vendedor confirma el pedido.
4. El pedido pasa a Confirmed.
5. Se reserva stock si la politica definida usa reserva en confirmacion.
6. El pedido pasa a Preparing.
7. Si es recojo, pasa a ReadyForPickup.
8. Si es delivery, pasa a OutForDelivery.
9. Cuando el cliente recibe o recoge, pasa a Delivered.
10. Cuando el pago y la entrega estan cerrados, pasa a Completed.
11. Se registra Sale o se vincula la Sale al Order.

## Estados de pedido

### Pending

Pedido creado por el cliente y pendiente de revision interna. Puede requerir validacion de stock, datos de contacto o pago manual.

### Confirmed

Pedido aceptado por Admin o Vendedor. En este punto el negocio se compromete a atenderlo.

### Preparing

Pedido en preparacion. El equipo interno separa productos y coordina entrega o recojo.

### ReadyForPickup

Pedido listo para que el cliente lo recoja en tienda.

### OutForDelivery

Pedido en camino para delivery local. No implica tracking en mapa.

### Delivered

Pedido entregado al cliente o recogido correctamente.

### Completed

Pedido cerrado comercialmente. El pago esta confirmado y la venta queda registrada.

### Cancelled

Pedido cancelado. Deben liberarse reservas de stock y registrarse motivo cuando aplique.

## Transiciones recomendadas

| Desde | Hacia | Quien | Nota |
| --- | --- | --- | --- |
| Pending | Confirmed | Admin, Vendedor | Requiere validacion basica de stock y datos |
| Pending | Cancelled | Admin, Vendedor, sistema futuro | Por falta de stock, error o solicitud |
| Confirmed | Preparing | Admin, Vendedor | Inicia preparacion |
| Confirmed | Cancelled | Admin, Vendedor | Libera stock reservado |
| Preparing | ReadyForPickup | Admin, Vendedor | Solo recojo |
| Preparing | OutForDelivery | Admin, Vendedor | Solo delivery |
| ReadyForPickup | Delivered | Admin, Vendedor | Cliente recoge |
| OutForDelivery | Delivered | Admin, Vendedor | Entrega realizada |
| Delivered | Completed | Admin, Vendedor | Pago y venta cerrados |
| Cualquier estado operativo | Cancelled | Admin, Vendedor | Debe validar impacto de stock y pago |

## Diferencia entre Order y Sale

Order representa la solicitud y operacion del pedido. Contiene datos de cliente, productos solicitados, metodo de entrega, metodo de pago y estado operativo.

Sale representa una venta reconocida como ingreso. Puede originarse desde un Order completado o desde una venta presencial registrada por Vendedor.

Esta separacion evita contar pedidos pendientes o cancelados como ventas reales.

## Stock: reserva y descuento

La decision recomendada para MVP es:

- validar disponibilidad al crear Order;
- reservar stock al pasar de Pending a Confirmed;
- descontar definitivamente al crear Sale o completar el pedido;
- liberar reserva si el pedido se cancela antes de completarse.

Esta regla protege stock sin bloquear inventario por carritos abandonados.

## Como evitar inconsistencias de inventario

- No descontar stock desde el carrito.
- Validar stock nuevamente en checkout.
- Validar stock antes de confirmar pedido.
- Registrar todo cambio como InventoryMovement.
- Usar transacciones en backend al confirmar, cancelar o completar pedidos.
- Evitar doble procesamiento de un mismo pedido.
- Bloquear transiciones invalidas de estado.

## Si un pedido se cancela

Si el pedido estaba Pending, se cancela sin impacto de stock salvo que se haya hecho alguna reserva especial.

Si estaba Confirmed o Preparing, se libera la reserva de stock.

Si ya estaba Delivered o Completed, la cancelacion debe tratarse como devolucion o ajuste futuro, no como una simple cancelacion operativa.

## Si no hay stock

En checkout, el sistema debe informar que no hay stock suficiente y no permitir confirmar la cantidad solicitada.

En confirmacion interna, si el stock cambio entre checkout y revision, Admin o Vendedor puede:

- reducir cantidades y coordinar con el cliente;
- cancelar el pedido;
- ajustar inventario si hubo error de registro.

El MVP debe priorizar consistencia sobre prometer disponibilidad falsa.

## Compra como invitado

Cliente invitado debe proporcionar datos minimos:

- nombre;
- email o telefono;
- metodo de entrega;
- direccion si aplica delivery;
- metodo de pago.

El pedido debe generar un codigo. La consulta posterior debe requerir codigo y un dato de verificacion como email o telefono.

## Cuenta de Cliente registrado

Cliente registrado puede guardar datos basicos, direcciones y revisar historial. Sus pedidos se vinculan a su Customer y no dependen solo del codigo de consulta.

## Recommended Improvements

- Definir una maquina de estados formal antes de implementar Orders.
- Crear pruebas automatizadas para transiciones de pedido e inventario.
- Mostrar al usuario mensajes claros cuando el stock cambia durante checkout.
- Registrar motivo obligatorio al cancelar pedidos confirmados.

## Open Questions

- La reserva de stock ocurrira al confirmar pedido o al crearlo?
- Un Vendedor puede cancelar pedidos ya pagados o solo Admin?
- Completed debe ser automatico al marcar Delivered con pago Paid o siempre manual?
