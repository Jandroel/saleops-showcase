# ADR 0005: AI Internal Only

## Status

Accepted.

## Context

SaleOps incluira IA para analisis y recomendaciones. La tentacion natural seria agregar un chatbot publico para clientes, pero eso ampliaria alcance, costos y riesgos antes de validar el sistema operativo central.

El valor inicial de IA esta en ayudar al negocio a entender ventas, stock, pedidos y reposicion.

## Decision

La IA sera solo interna en el MVP.

Usuarios con acceso:

- Admin;
- Vendedor con funciones limitadas.

Usuarios sin acceso:

- Cliente registrado;
- Cliente invitado.

## Risks Of Customer-Facing AI

- Respuestas incorrectas sobre stock, precios o politicas.
- Exposicion accidental de informacion interna.
- Costos variables dificiles de controlar.
- Abuso publico del endpoint.
- Expectativas de soporte en tiempo real.
- Mayor carga de seguridad, moderacion y monitoreo.

## Cost Protection

Al limitar IA a usuarios internos:

- se reduce volumen de consultas;
- se pueden aplicar limites por rol;
- se controla mejor el contexto enviado;
- se evita abuso anonimo;
- se puede auditar uso con mas claridad.

## Sensitive Information Protection

La IA interna puede necesitar datos de ventas, clientes o inventario. Ese contexto no debe exponerse a clientes.

El backend debe preparar datos agregados y aplicar permisos antes de enviar contexto a un proveedor de IA o motor interno.

## Future Evolution

En fases futuras podria evaluarse IA publica si:

- la base de productos y politicas esta madura;
- existen guardrails claros;
- hay monitoreo y rate limiting robusto;
- se define un alcance reducido, como preguntas frecuentes o ayuda de compra;
- el costo esta controlado.

Una evolucion prudente seria empezar con recomendaciones internas, luego respuestas asistidas para vendedores y solo despues evaluar experiencias publicas.

## Recommended Improvements

- Registrar AiInsight con usuario, tipo, periodo y fuentes.
- Mostrar limitaciones de datos en cada respuesta.
- Empezar con reportes deterministas y usar IA para explicacion.
- Crear evaluaciones de calidad antes de confiar en recomendaciones.

## Open Questions

- El primer modulo de IA usara proveedor externo o reglas internas con resumen generativo?
- Se permitira a Vendedor hacer preguntas libres o solo elegir insights predefinidos?
