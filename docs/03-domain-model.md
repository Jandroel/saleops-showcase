# Domain Model

## Objetivo

Este documento describe el modelo conceptual de SaleOps. No define modelos Prisma, migraciones ni SQL. Su proposito es acordar entidades, relaciones y reglas de negocio antes de implementar.

## Vista general

SaleOps gira alrededor de cuatro areas:

- tienda y configuracion;
- catalogo e inventario;
- carrito, pedidos, pagos, entregas y ventas;
- operacion interna, reportes, IA, auditoria y notificaciones.

## Entidades

### StoreSettings

Proposito: guarda la configuracion general de la instalacion.

Campos importantes: nombre comercial, logo, datos de contacto, moneda, horarios, direccion principal, politicas de entrega, metodos de pago activos y metodos de entrega activos.

Relaciones principales: se relaciona de forma indirecta con Payment y DeliveryMethod como configuracion disponible.

Notas de negocio: al ser single-tenant, normalmente existira un registro principal de configuracion. Debe protegerse para que solo Admin lo modifique.

### User

Proposito: representa usuarios internos que acceden al panel privado.

Campos importantes: nombre, email, password hash, estado, ultimo acceso, roleId, createdAt, updatedAt.

Relaciones principales: pertenece a Role; genera AuditLog; puede confirmar pedidos, registrar ventas y validar pagos.

Notas de negocio: no debe mezclarse con Customer. Un User opera el negocio; un Customer compra.

### Role

Proposito: agrupa permisos internos.

Campos importantes: nombre, descripcion, permisos, estado.

Relaciones principales: tiene muchos User.

Notas de negocio: el MVP puede iniciar con Admin y Vendedor, pero conviene modelar permisos granulares para evolucionar sin romper autorizacion.

### Customer

Proposito: representa compradores registrados o datos consolidados de compradores invitados.

Campos importantes: nombre, email, telefono, documento opcional, tipo, estado, marketingOptIn, createdAt.

Relaciones principales: tiene Address, Cart y Order; puede asociarse a Sale.

Notas de negocio: Cliente invitado puede generar pedidos sin credenciales. Si luego crea cuenta, debe poder vincularse con historial bajo reglas claras.

### Product

Proposito: representa un producto vendible.

Campos importantes: nombre, slug, descripcion, SKU, precio, precioOferta, stockActual, stockMinimo, estado, categoryId, brandId, atributos basicos, createdAt.

Relaciones principales: pertenece a Category y opcionalmente Brand; tiene ProductImage, InventoryMovement, CartItem, OrderItem y SaleItem.

Notas de negocio: debe soportar soft delete para no romper pedidos historicos. No se modelan variantes complejas en MVP salvo decision posterior.

### Category

Proposito: organiza el catalogo publico e interno.

Campos importantes: nombre, slug, descripcion, parentId opcional, orden, estado.

Relaciones principales: tiene muchos Product; puede tener jerarquia por parentId.

Notas de negocio: el MVP puede usar categorias simples, pero la estructura permite subcategorias si el rubro lo requiere.

### Brand

Proposito: identifica marcas de productos cuando el negocio lo necesita.

Campos importantes: nombre, slug, descripcion, estado.

Relaciones principales: tiene muchos Product.

Notas de negocio: puede ser opcional en la UI si el primer negocio no usa marcas, pero conviene incluirla en el modelo conceptual.

### ProductImage

Proposito: almacena imagenes asociadas a productos.

Campos importantes: productId, url, altText, orden, isPrimary.

Relaciones principales: pertenece a Product.

Notas de negocio: la imagen principal debe estar definida para mejorar catalogo, detalle y demo publica.

### InventoryMovement

Proposito: registra entradas, salidas, reservas, liberaciones y ajustes de stock.

Campos importantes: productId, tipo, cantidad, motivo, referencia, userId, createdAt.

Relaciones principales: pertenece a Product; puede referenciar Order, Sale o User.

Notas de negocio: el stock no debe cambiar sin movimiento trazable. Esta entidad es clave para consistencia y auditoria.

### Cart

Proposito: representa una intencion de compra antes de crear Order.

Campos importantes: customerId opcional, guestToken, estado, expiresAt, createdAt, updatedAt.

Relaciones principales: tiene CartItem; puede convertirse en Order.

Notas de negocio: carritos invitados deben manejarse con token seguro y expiracion.

### CartItem

Proposito: representa productos dentro de un carrito.

Campos importantes: cartId, productId, cantidad, precioSnapshot, nombreSnapshot.

Relaciones principales: pertenece a Cart y Product.

Notas de negocio: usar snapshots evita que cambios de precio o nombre alteren la experiencia del checkout en curso.

### Order

Proposito: representa un pedido confirmado por un cliente.

Campos importantes: codigo, customerId opcional, datos de invitado, estado, subtotal, deliveryFee, total, paymentId, deliveryMethodId, addressId, notas, createdAt.

Relaciones principales: tiene OrderItem; se relaciona con Payment, DeliveryMethod, Address y opcionalmente Sale.

Notas de negocio: Order no siempre significa venta completada. Es una solicitud confirmada que debe pasar por estados operativos.

### OrderItem

Proposito: guarda las lineas del pedido.

Campos importantes: orderId, productId, cantidad, precioUnitarioSnapshot, nombreSnapshot, skuSnapshot, subtotal.

Relaciones principales: pertenece a Order y referencia Product.

Notas de negocio: los snapshots preservan historial aunque el producto cambie luego.

### Payment

Proposito: registra el metodo y estado de pago de un pedido o venta.

Campos importantes: metodo, estado, monto, referenciaManual, comprobanteUrl opcional, validatedByUserId, validatedAt.

Relaciones principales: puede pertenecer a Order o Sale; puede ser validado por User.

Notas de negocio: en MVP no procesa dinero real. Debe quedar listo para conectar proveedores futuros.

### DeliveryMethod

Proposito: define como se entregara el pedido.

Campos importantes: tipo, nombre, costo, activo, instrucciones, zonaCobertura opcional.

Relaciones principales: se usa en Order.

Notas de negocio: MVP soporta PickUp y LocalDelivery. No incluye tracking en mapa.

### Address

Proposito: guarda direcciones de clientes para delivery.

Campos importantes: customerId opcional, nombreContacto, telefono, direccionLinea1, direccionLinea2, distrito, ciudad, referencia, coordenadas opcionales.

Relaciones principales: pertenece a Customer cuando existe; puede usarse en Order.

Notas de negocio: los datos deben ser minimos y protegidos. Coordenadas no son obligatorias en MVP.

### Sale

Proposito: representa una venta registrada como ingreso operativo.

Campos importantes: codigo, orderId opcional, customerId opcional, userId, canal, total, paymentId, createdAt.

Relaciones principales: tiene SaleItem; puede vincularse a Order, Payment, Customer y User.

Notas de negocio: una Sale puede venir de un Order online completado o de una venta presencial registrada por Vendedor.

### SaleItem

Proposito: guarda productos vendidos en una Sale.

Campos importantes: saleId, productId, cantidad, precioUnitarioSnapshot, subtotal.

Relaciones principales: pertenece a Sale y referencia Product.

Notas de negocio: permite reportes historicos confiables aunque el catalogo cambie.

### Report

Proposito: representa reportes generados o configuraciones de reportes.

Campos importantes: tipo, periodo, filtros, resultadoResumen, generatedByUserId, createdAt.

Relaciones principales: puede ser generado por User y alimentar AiInsight.

Notas de negocio: inicialmente puede ser un concepto logico sin persistir cada reporte, salvo reportes generados por IA o exportaciones.

### AiInsight

Proposito: guarda resultados relevantes del modulo de IA interna.

Campos importantes: tipo, promptResumen, respuestaResumen, fuentesDatos, userId, createdAt, costoEstimado opcional.

Relaciones principales: pertenece a User; puede referenciar Report.

Notas de negocio: no debe exponer datos a clientes. Debe indicar fuentes y periodo analizado para reducir respuestas inventadas.

### AuditLog

Proposito: registra acciones sensibles del panel interno.

Campos importantes: userId, accion, entidad, entityId, beforeSnapshot opcional, afterSnapshot opcional, ip, userAgent, createdAt.

Relaciones principales: pertenece a User cuando aplica.

Notas de negocio: debe registrar cambios de pedidos, inventario, pagos, usuarios y configuracion.

### Notification

Proposito: representa avisos internos o mensajes transaccionales basicos.

Campos importantes: tipo, canal, destinatario, titulo, contenido, estado, relatedEntity, createdAt.

Relaciones principales: puede vincularse a Order, User o Customer.

Notas de negocio: en MVP puede iniciar con notificaciones internas simples y prepararse para email o WhatsApp futuro.

## Relaciones clave

- Product pertenece a Category y opcionalmente Brand.
- Product tiene muchas ProductImage e InventoryMovement.
- Cart tiene muchos CartItem y puede convertirse en Order.
- Order tiene muchos OrderItem y un Payment asociado.
- Order puede terminar generando una Sale.
- Sale tiene muchos SaleItem y puede existir sin Order si es venta presencial.
- User pertenece a Role y puede generar AuditLog, Sale, Payment validation y AiInsight.
- Customer puede tener Address, Order y Sale.

## Recommended Improvements

- Mantener snapshots en CartItem, OrderItem y SaleItem.
- Usar movimientos de inventario como fuente de trazabilidad, no solo un campo de stock.
- Separar User y Customer desde el inicio para evitar problemas de permisos.
- Definir estados como enums tecnicos en ingles cuando se implemente.

## Open Questions

- El MVP manejara variantes de producto como talla/color o se postergaran?
- Se permitira stock negativo para ventas presenciales urgentes o se bloqueara siempre?
- Brand sera visible en tienda desde el MVP o quedara como dato interno opcional?
