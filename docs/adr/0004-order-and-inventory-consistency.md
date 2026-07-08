# ADR 0004: Order And Inventory Consistency

## Status

Accepted.

## Context

SaleOps conectara tienda online, pedidos, ventas e inventario. Si el stock se actualiza de forma inconsistente, el negocio puede vender productos agotados, preparar pedidos incompletos o perder trazabilidad.

La relacion entre Order, Sale e InventoryMovement debe definirse antes de implementar.

## Decision

Separar conceptualmente:

- Order: solicitud y flujo operativo del pedido.
- Sale: venta reconocida como ingreso.
- InventoryMovement: trazabilidad de entradas, salidas, reservas, liberaciones y ajustes.

Para el MVP, la regla recomendada es:

- validar stock al crear el pedido;
- reservar stock al confirmar pedido;
- descontar definitivamente al completar venta;
- liberar reserva al cancelar pedido antes de completarse.

## Reserving Stock Vs Deducting Stock

Reservar stock significa apartar unidades para un pedido confirmado sin reconocer todavia una venta final.

Descontar stock significa registrar salida definitiva porque la venta se completo o el producto fue entregado.

Esta diferencia evita contar como venta algo que todavia puede cancelarse.

## When An Order Is Cancelled

Si el pedido estaba Pending, normalmente no hay reserva que liberar.

Si estaba Confirmed o Preparing, se libera la reserva.

Si estaba Delivered o Completed, no debe tratarse como cancelacion simple. Debe manejarse como devolucion, ajuste o proceso futuro.

## When Product Runs Out

Si no hay stock suficiente durante checkout, el cliente no debe poder confirmar esa cantidad.

Si el stock se agota entre checkout y confirmacion interna, Admin o Vendedor debe decidir entre cancelar, ajustar cantidad o corregir inventario.

El sistema debe priorizar consistencia sobre promesas falsas de disponibilidad.

## Why This Is Critical

Inventario es una fuente de confianza. Si los pedidos y ventas no afectan stock de forma clara, los reportes y recomendaciones de IA tambien seran poco confiables.

Una decision temprana evita bugs complejos en checkout, reportes, ventas presenciales y reposicion.

## Positive Consequences

- Historial trazable.
- Menos riesgo de sobreventa.
- Reportes mas confiables.
- IA basada en datos mas consistentes.
- Separacion clara entre pedido y venta.

## Negative Consequences

- Requiere transacciones bien disenadas.
- Agrega complejidad a estados de pedido.
- Exige pruebas automatizadas.
- Puede requerir UI clara para reservas y stock disponible.

## Recommended Improvements

- Crear pruebas para transiciones de estado.
- Mostrar stock disponible y reservado en panel interno.
- Registrar motivo de ajustes de inventario.
- Definir si se permite stock negativo antes de ventas presenciales.

## Open Questions

- La reserva se hara exactamente en Confirmed o en Pending para algunos metodos de pago?
- Como se manejara devolucion parcial en una fase futura?
