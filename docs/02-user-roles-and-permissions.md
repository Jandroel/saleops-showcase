# User Roles And Permissions

## Objetivo

SaleOps usara roles para separar la tienda publica del panel interno y proteger acciones sensibles. El MVP necesita cuatro perfiles: Admin, Vendedor, Cliente registrado y Cliente invitado.

Los permisos deben aplicarse en backend y reflejarse en frontend. La interfaz puede ocultar acciones, pero la API debe ser la fuente real de autorizacion.

## Roles

### Admin

Admin controla la instalacion de SaleOps. Tiene acceso completo al panel interno y puede configurar operaciones, usuarios, reportes e IA.

Puede:

- gestionar productos;
- gestionar categorias;
- gestionar marcas si se define;
- gestionar inventario;
- ver y cambiar pedidos;
- gestionar clientes;
- gestionar usuarios internos;
- ver ventas;
- ver reportes;
- usar IA de analisis;
- configurar metodos de pago;
- configurar metodos de entrega;
- configurar datos de tienda;
- ver auditoria basica.

### Vendedor

Vendedor opera el dia a dia. Tiene permisos suficientes para atender pedidos, revisar stock y registrar ventas, pero no debe controlar configuraciones sensibles.

Puede:

- ver productos;
- ver stock;
- ver pedidos;
- confirmar pedidos;
- cambiar estados de pedido;
- registrar ventas presenciales;
- crear clientes;
- atender pedidos de recojo;
- atender pedidos de delivery;
- usar IA limitada para consultas operativas.

### Cliente registrado

Cliente registrado usa la tienda publica con cuenta propia.

Puede:

- comprar;
- ver historial de pedidos;
- guardar datos basicos;
- guardar direcciones;
- consultar estado de pedido.

### Cliente invitado

Cliente invitado usa la tienda publica sin crear cuenta.

Puede:

- navegar;
- buscar productos;
- agregar al carrito;
- comprar como invitado;
- consultar pedido por codigo y email si se define en el flujo.

## Matriz simple de permisos

| Capacidad | Admin | Vendedor | Cliente registrado | Cliente invitado |
| --- | --- | --- | --- | --- |
| Navegar tienda | Si | Si | Si | Si |
| Buscar productos | Si | Si | Si | Si |
| Comprar online | No aplica | No aplica | Si | Si |
| Ver historial propio | No aplica | No aplica | Si | No |
| Consultar pedido propio | No aplica | No aplica | Si | Si, con validacion |
| Gestionar productos | Si | No | No | No |
| Ver productos internos | Si | Si | No | No |
| Gestionar categorias | Si | No | No | No |
| Gestionar marcas | Si | No | No | No |
| Ver stock | Si | Si | No | No |
| Ajustar inventario | Si | No | No | No |
| Ver pedidos | Si | Si | Solo propios | Solo por codigo validado |
| Confirmar pedidos | Si | Si | No | No |
| Cambiar estados de pedido | Si | Si | No | No |
| Registrar ventas presenciales | Si | Si | No | No |
| Gestionar clientes | Si | Crear/actualizar basico | Solo datos propios | No |
| Gestionar usuarios internos | Si | No | No | No |
| Ver reportes | Si | Limitado si se habilita | No | No |
| Usar IA interna | Si | Limitada | No | No |
| Configurar tienda | Si | No | No | No |
| Ver auditoria | Si | No | No | No |

## Reglas de autorizacion

- Las rutas administrativas requieren usuario interno autenticado.
- Admin puede realizar acciones destructivas o sensibles.
- Vendedor no puede modificar configuracion global, roles ni usuarios internos.
- Cliente registrado solo puede acceder a sus propios datos.
- Cliente invitado solo puede consultar un pedido si entrega datos de verificacion.
- La IA nunca debe estar disponible para clientes.

## Recommended Improvements

- Definir permisos granulares aunque el MVP use roles simples.
- Registrar en AuditLog cambios de pedido, inventario, usuarios internos y configuracion.
- Preparar una convencion de nombres para permisos, por ejemplo `orders:update-status`.

## Open Questions

- Vendedor podra crear productos en una fase futura o solo sugerir cambios?
- El panel mostrara reportes limitados al Vendedor o quedaran solo para Admin en el MVP?
