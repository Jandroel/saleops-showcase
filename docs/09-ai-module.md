# AI Module

## Objetivo

El modulo de IA de SaleOps sera una herramienta interna para ayudar al negocio a entender ventas, inventario, pedidos y oportunidades operativas. No sera un chatbot publico para clientes en el MVP.

La IA debe explicar datos reales del sistema, no inventar respuestas ni reemplazar la revision humana.

## Usuarios habilitados

### Admin

Puede acceder a todos los insights internos:

- resumen de ventas;
- productos mas vendidos;
- productos con bajo stock;
- productos con poca rotacion;
- recomendaciones de reposicion;
- resumen semanal o mensual;
- analisis de pedidos online;
- sugerencias para mejorar ventas.

### Vendedor

Puede acceder a funciones limitadas y operativas:

- consulta de stock;
- productos con bajo stock;
- pedidos pendientes;
- resumen operativo del dia;
- recomendaciones simples de reposicion si se habilita.

Vendedor no debe acceder a informacion financiera sensible, configuracion, auditoria ni datos agregados que el negocio reserve para Admin.

## Casos de uso MVP

### Resumen de ventas

Genera una explicacion de ventas por periodo, comparando totales, cantidad de pedidos, ticket promedio y productos relevantes.

### Productos mas vendidos

Identifica productos con mayor volumen o ingreso en un periodo. Debe indicar el criterio usado.

### Productos con bajo stock

Lista productos cuyo stock actual esta por debajo del stock minimo o cercano a agotarse.

### Productos con poca rotacion

Detecta productos con pocas ventas durante un periodo y sugiere acciones como promocion, revision de precio o reposicion menor.

### Recomendaciones de reposicion

Sugiere cantidades o prioridades de reposicion usando stock actual, ventas recientes y tendencia basica.

### Resumen semanal o mensual

Produce un resumen ejecutivo para Admin con ventas, pedidos, productos destacados, alertas y recomendaciones.

### Analisis de pedidos online

Resume pedidos por estado, metodo de entrega, metodo de pago y posibles cuellos de botella.

### Sugerencias para mejorar ventas

Propone acciones basadas en datos: destacar productos, revisar stock, mejorar categorias o ajustar promociones futuras.

## Limites de acceso

- La IA solo esta disponible para usuarios internos autenticados.
- Admin tiene acceso amplio.
- Vendedor tiene acceso limitado a datos operativos.
- Cliente registrado y Cliente invitado no tienen acceso a IA.
- La IA no debe exponer datos sensibles de clientes salvo que sea necesario y permitido para el rol.

## Proteccion de datos

La IA debe usar datos minimos necesarios:

- preferir agregados sobre registros personales;
- evitar enviar datos sensibles innecesarios a proveedores externos;
- anonimizar o resumir cuando sea posible;
- no incluir contrasenas, tokens, secretos ni datos de pago sensibles;
- registrar consultas relevantes sin guardar informacion excesiva.

## Evitar respuestas inventadas

La IA debe basarse en consultas reales al sistema. Cada insight debe indicar:

- periodo analizado;
- fuentes de datos usadas;
- limitaciones del resultado;
- si faltan datos para responder con confianza.

Si no hay datos suficientes, la respuesta debe decirlo con claridad.

## Uso de datos reales

Antes de invocar IA, el backend debe preparar un contexto estructurado:

- ventas agregadas;
- productos y stock;
- pedidos por estado;
- metodos de pago y entrega;
- comparaciones simples;
- alertas relevantes.

La IA no debe consultar la base de datos directamente. El backend controla permisos, filtros y alcance.

## Registro de consultas

Se puede registrar en AiInsight:

- usuario solicitante;
- tipo de insight;
- periodo;
- resumen del prompt;
- resumen de respuesta;
- fuentes usadas;
- costo estimado si aplica;
- fecha.

No se deben guardar prompts con datos sensibles completos si no es necesario.

## Rate limiting

El modulo debe tener limites por usuario y por instalacion:

- limite diario para Vendedor;
- limite mayor para Admin;
- proteccion contra repeticion automatizada;
- bloqueo temporal ante abuso.

## Cost control

La IA puede generar costos variables si usa proveedores externos. Para controlarlos:

- cachear insights repetidos por periodo;
- limitar longitud de contexto;
- usar resuenes agregados;
- registrar costo estimado;
- separar funciones gratuitas o deterministicas de funciones con IA.

## Roadmap IA futura

- Comparativas entre periodos.
- Prediccion simple de demanda.
- Recomendaciones de precios.
- Segmentacion de clientes.
- Explicaciones de margen si se modelan costos.
- Generacion de reportes ejecutivos descargables.
- Alertas automaticas de bajo stock.
- Asistente interno con permisos mas granulares.

## Recommended Improvements

- Empezar con insights deterministas y agregar IA donde mejore la explicacion.
- Incluir citas internas o referencias a datos usados en cada respuesta.
- Crear evaluaciones manuales de calidad para respuestas de IA.
- Disenar prompts como plantillas versionadas.

## Open Questions

- Se usara IA real en el primer backend o una capa simulada para validar UX?
- Que proveedor de IA se evaluara primero?
- Se guardara historial completo de insights o solo resumen y metadata?
