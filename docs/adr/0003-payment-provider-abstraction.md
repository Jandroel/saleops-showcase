# ADR 0003: Payment Provider Abstraction

## Status

Accepted.

## Context

El MVP de SaleOps usara pagos manuales o simulados: pago al recoger, pago contra entrega, Yape/Plin manual, transferencia bancaria y tarjeta simulada para demo.

No se integrara una pasarela real en el MVP, pero el checkout no debe quedar disenado como si los pagos manuales fueran la unica posibilidad futura.

## Decision

No integrar pasarela real en el MVP, pero modelar Payment con una abstraccion conceptual de proveedor.

La arquitectura debe permitir integrar en el futuro proveedores como:

- Stripe;
- Mercado Pago;
- Culqi;
- PayPal;
- otros proveedores locales.

## Why No Real Gateway In MVP

Una pasarela real requiere:

- credenciales;
- webhooks;
- manejo de estados externos;
- conciliacion;
- ambientes sandbox;
- pruebas con proveedor;
- requisitos legales o comerciales;
- controles adicionales de seguridad.

Esto desviaria el MVP del objetivo principal: validar venta online y operacion interna.

## Why Abstraction Still Matters

Si el sistema se acopla demasiado a pagos manuales, integrar una pasarela despues obligaria a reescribir checkout, pedidos y pagos.

La abstraccion reduce ese riesgo. Payment debe representar estado, metodo, monto, referencias y proveedor opcional sin depender de un unico flujo.

## Expected Shape

La abstraccion futura deberia cubrir:

- crear intento de pago;
- confirmar pago;
- cancelar pago;
- registrar referencia externa;
- recibir actualizaciones;
- mapear estado de proveedor a estado interno;
- asociar pago a Order o Sale.

## Risks Reduced

- Reescritura de checkout.
- Acoplamiento a pagos manuales.
- Estados inconsistentes entre pedido y pago.
- Dificultad para soportar varios proveedores.
- Falta de trazabilidad al validar pagos.

## What Is Deferred

- Integracion real.
- Webhooks.
- Conciliacion automatica.
- Manejo de disputas.
- Reembolsos automatizados.
- Tokenizacion o almacenamiento seguro delegado.
- Certificaciones o requisitos del proveedor.

## Recommended Improvements

- Documentar estados internos antes de integrar proveedor.
- No almacenar datos reales de tarjeta.
- Mantener Payment como entidad independiente de detalles del proveedor.
- Agregar idempotencia cuando existan pagos reales.

## Open Questions

- Que proveedor se evaluara primero para Peru o mercados objetivo?
- La primera pasarela real sera para tarjeta, billetera digital o ambos?
