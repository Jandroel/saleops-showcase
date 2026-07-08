# Payments And Delivery

## Objetivo

Este documento define pagos y entrega para el MVP de SaleOps. El enfoque es soportar operaciones reales simples sin integrar pasarelas de pago ni tracking en vivo.

## Pagos MVP

### Pago al recoger

El cliente paga cuando recoge el pedido en tienda. El pago inicia como Pending y se marca como Paid cuando Admin o Vendedor confirma la recepcion del dinero.

### Pago contra entrega

El cliente paga al recibir el delivery local. El pago inicia como Pending y se marca como Paid cuando se confirma la entrega y cobro.

### Yape/Plin manual

El cliente realiza el pago por Yape o Plin fuera del sistema. SaleOps registra la referencia o comprobante manual si se define. Admin o Vendedor valida el pago.

### Transferencia bancaria

El cliente paga por transferencia fuera del sistema. SaleOps guarda referencia, banco opcional y comprobante si aplica. La validacion es manual.

### Tarjeta simulada para demo

El showcase o entornos de demo pueden simular tarjeta para mostrar flujo de checkout. No se deben almacenar datos reales de tarjeta ni procesar pagos reales.

## Estados de pago

### Pending

Pago pendiente de validacion, cobro o confirmacion.

### Paid

Pago confirmado. Puede ser validacion manual o resultado simulado en demo.

### Failed

Pago fallido. Aplica sobre todo a simulaciones o futuras pasarelas.

### Cancelled

Pago cancelado porque el pedido se cancelo o el cliente cambio de metodo.

### Refunded

Pago devuelto. En MVP puede quedar como estado conceptual para casos manuales.

## Por que no implementar pasarela real en MVP

Una pasarela real agrega complejidad legal, tecnica y operativa:

- credenciales y secretos;
- webhooks;
- conciliacion;
- seguridad de pagos;
- manejo de errores externos;
- pruebas con proveedores;
- posibles costos y requisitos comerciales.

El MVP busca validar el flujo ecommerce-operativo sin depender de aprobaciones o integraciones externas.

## Abstraccion para futuras pasarelas

Aunque no se implemente pasarela real, Payment debe disenarse con una interfaz conceptual que permita:

- crear una intencion de pago;
- confirmar pago;
- cancelar pago;
- recibir estado externo;
- guardar referencia de proveedor;
- asociar pago a Order o Sale;
- conciliar estados.

Esto permitira integrar proveedores como Stripe, Mercado Pago, Culqi, PayPal u otros sin reescribir checkout completo.

## Informacion que se guarda

Para pagos MVP:

- metodo de pago;
- estado;
- monto;
- moneda;
- referencia manual;
- comprobante opcional;
- usuario validador;
- fecha de validacion;
- notas internas.

No se guardan numeros reales de tarjeta, CVV ni credenciales de proveedores.

## Validacion manual de pago

Admin o Vendedor con permiso revisa la evidencia del pago y marca el Payment como Paid, Failed o Cancelled. La accion debe registrar AuditLog.

Para evitar errores:

- mostrar monto esperado;
- mostrar pedido asociado;
- pedir referencia o nota;
- registrar usuario y fecha;
- impedir doble validacion sin confirmacion.

## Riesgos de pagos manuales

- Error humano al validar.
- Referencias duplicadas o incompletas.
- Cliente reporta pago que aun no aparece.
- Pedido preparado antes de confirmar pago.
- Dificultad para conciliacion historica.

Mitigaciones:

- registrar evidencia;
- auditar cambios;
- mostrar estado visible en panel;
- permitir notas internas;
- definir politica operativa por metodo de pago.

## Entrega MVP

### Recojo en tienda

El cliente recoge el pedido en la direccion del negocio. El flujo esperado es:

- Pending;
- Confirmed;
- Preparing;
- ReadyForPickup;
- Delivered;
- Completed.

El pago puede completarse al recojo si el metodo elegido fue pago al recoger.

### Delivery local basico

La tienda coordina entrega local manualmente. El flujo esperado es:

- Pending;
- Confirmed;
- Preparing;
- OutForDelivery;
- Delivered;
- Completed.

No hay tracking con mapa ni gestion en tiempo real de repartidores.

## Sin tracking en mapa

El MVP no mostrara ubicacion en tiempo real. El estado OutForDelivery solo indica que el pedido salio para entrega.

Esto evita introducir mapas, geolocalizacion, repartidores, eventos en vivo y costos externos antes de validar el flujo principal.

## Gestion manual de entrega

La tienda decide internamente como llevar el pedido. SaleOps registra metodo, direccion, estado y notas, pero no administra rutas ni asignacion avanzada.

## Datos minimos de direccion

Para delivery local:

- nombre de contacto;
- telefono;
- direccion principal;
- distrito o zona;
- ciudad;
- referencia;
- notas opcionales.

Coordenadas pueden agregarse en el futuro, pero no son obligatorias en MVP.

## Estados segun metodo de entrega

| Metodo | Estados clave |
| --- | --- |
| Recojo en tienda | Preparing, ReadyForPickup, Delivered, Completed |
| Delivery local | Preparing, OutForDelivery, Delivered, Completed |

## Recommended Improvements

- Definir politicas visibles para pagos manuales y tiempos de validacion.
- Registrar comprobante opcional para Yape/Plin y transferencia.
- Permitir configurar costo de delivery por zona en una fase posterior.
- Preparar campos de proveedor de pago aunque esten vacios en MVP.

## Open Questions

- Se aceptara carga de imagen como comprobante en el MVP?
- El costo de delivery sera fijo o por zona desde la primera version?
- Vendedor podra validar todos los pagos manuales o solo pagos al recoger/contra entrega?
