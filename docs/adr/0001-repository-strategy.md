# ADR 0001: Repository Strategy

## Status

Accepted.

## Context

SaleOps tiene dos naturalezas: producto de portafolio visible y sistema real adaptable para negocios. La parte publica debe demostrar vision, UX y arquitectura sin exponer backend, datos, secretos ni logica sensible.

El producto real tendra tienda, panel interno, API, base de datos, autenticacion, roles, reportes e IA. Esa implementacion no debe vivir en un repositorio publico si puede contener decisiones comerciales o tecnicas sensibles.

## Decision

Usar tres repositorios:

- `saleops-showcase`: repositorio publico para landing, demo visual, flujo simulado de compra, documentacion publica y presentacion tecnica.
- `saleops-frontend`: repositorio privado para frontend real de tienda online y panel administrativo.
- `saleops-backend`: repositorio privado para API real, base de datos, autenticacion, roles, logica de negocio, reportes, IA interna, seguridad y tests.

## Alternatives Considered

### Un solo repositorio publico

Simplifica visibilidad, pero expone demasiado. No es adecuado para backend real, secretos, integraciones o adaptaciones comerciales.

### Un solo repositorio privado

Reduce exposicion, pero limita el valor de portafolio. El proyecto perderia una vitrina publica clara.

### Monorepo privado con showcase publico generado

Puede funcionar mas adelante, pero agrega complejidad de tooling y despliegue para el MVP.

## Positive Consequences

- El showcase puede publicarse sin riesgos innecesarios.
- El frontend y backend reales quedan protegidos.
- Se separa narrativa publica de implementacion privada.
- El producto puede mostrarse como portafolio y usarse como base comercial.
- Cada repositorio tiene una responsabilidad clara.

## Negative Consequences

- Hay mas repositorios que mantener.
- Se necesita disciplina para sincronizar documentacion y decisiones.
- Puede duplicarse algo de contenido entre showcase y docs privadas.
- Requiere convenciones claras de versionado y ramas.

## Final Rationale

La separacion en tres repositorios equilibra portafolio, seguridad y mantenibilidad. SaleOps necesita una cara publica atractiva y una implementacion privada protegida. Esta estrategia permite ambas cosas sin forzar compromisos inseguros.

## Recommended Improvements

- Mantener README coherente en los tres repositorios.
- Publicar solo contratos o diagramas seguros en el showcase.
- Evitar copiar archivos con secretos o configuracion privada al repositorio publico.

## Open Questions

- El showcase incluira una copia simplificada de los documentos o enlazara una version curada?
- Se usara una organizacion Git separada para los tres repositorios?
