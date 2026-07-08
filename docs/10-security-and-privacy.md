# Security And Privacy

## Objetivo

Este documento define criterios de seguridad y privacidad para SaleOps antes de implementar codigo. El MVP debe ser simple, pero no improvisado. La seguridad debe estar presente en autenticacion, autorizacion, checkout, datos de clientes, logs, configuracion e IA interna.

## Autenticacion segura

- Separar autenticacion de usuarios internos y clientes.
- Usar sesiones basadas en access tokens de vida corta y refresh tokens.
- Invalidar refresh tokens al cerrar sesion o detectar abuso.
- Aplicar rate limiting en login y recuperacion de cuenta futura.
- Evitar mensajes de error que permitan enumerar usuarios.

## Hashing de contrasenas

- Nunca guardar contrasenas en texto plano.
- Usar algoritmos modernos de hashing de password como Argon2 o bcrypt.
- Configurar costo adecuado para el entorno.
- No registrar contrasenas en logs ni errores.

## JWT y refresh tokens

- Access token de corta duracion.
- Refresh token protegido y revocable.
- Rotacion de refresh tokens si el flujo lo permite.
- Claims minimos: subject, rol, tipo de usuario, expiracion.
- No guardar informacion sensible dentro del JWT.

## RBAC

- Admin y Vendedor son roles internos iniciales.
- Cliente registrado y Cliente invitado no deben acceder a endpoints internos.
- La API debe validar permisos aunque el frontend oculte botones.
- Las acciones sensibles deben auditarse.

## Validacion de inputs

- Validar DTOs en backend.
- Normalizar email, slugs y campos buscables.
- Validar cantidades, precios, estados y transiciones.
- Rechazar payloads inesperados.
- Sanitizar contenido que pueda mostrarse en UI.

## Rate limiting

Aplicar limites en:

- login;
- registro;
- lookup de pedidos;
- checkout;
- endpoints de IA;
- endpoints publicos de busqueda si hay abuso.

## CORS

- Permitir solo origenes conocidos en entornos reales.
- Separar configuracion por ambiente.
- No usar comodines en produccion si hay credenciales.

## Variables de entorno

- No hardcodear claves.
- No commitear `.env`.
- Documentar variables necesarias con `.env.example` en fases de implementacion.
- Separar secretos de configuracion publica.

## Proteccion de datos de clientes

- Recoger solo datos necesarios.
- Proteger email, telefono, direccion e historial.
- Limitar acceso por rol.
- Evitar exponer datos de otros clientes.
- Definir politica de retencion futura.

## Auditoria

AuditLog debe registrar:

- cambios de inventario;
- cambios de pedido;
- validacion de pagos;
- cambios de usuarios;
- cambios de configuracion;
- acciones relevantes de IA.

No debe guardar contrasenas, tokens, secretos ni informacion sensible innecesaria.

## Soft delete

Usar soft delete en entidades criticas para preservar historial:

- Product;
- Category;
- Brand;
- Customer;
- User;
- DeliveryMethod.

La eliminacion fisica debe ser excepcional y controlada.

## Backups

Antes de produccion, definir:

- frecuencia de backups;
- retencion;
- prueba de restauracion;
- responsable;
- almacenamiento seguro.

## Logs sin datos sensibles

Los logs deben ayudar a diagnosticar sin exponer:

- contrasenas;
- tokens;
- datos completos de pago;
- secretos;
- informacion personal innecesaria.

Usar requestId o correlationId para trazabilidad.

## Seguridad en checkout

- Validar stock en servidor.
- Calcular precios en servidor.
- No confiar en totales enviados por cliente.
- Validar metodo de pago y entrega.
- Evitar doble confirmacion de pedido.
- Usar idempotencia en operaciones criticas cuando se implemente.

## Seguridad en endpoints admin

- Requieren autenticacion interna.
- Requieren rol o permiso especifico.
- Deben paginar listados.
- Deben auditar operaciones sensibles.
- Deben validar estados y propiedad de datos.

## Consideraciones OWASP

SaleOps debe usar OWASP ASVS como guia de verificacion de seguridad para aplicaciones web. En Fase 0 solo se documentan criterios; en fases posteriores se deben traducir a tareas y pruebas.

Areas prioritarias:

- autenticacion;
- control de acceso;
- validacion de entrada;
- manejo de sesiones y tokens;
- proteccion de datos;
- logging seguro;
- configuracion segura;
- manejo de errores.

Referencia: https://owasp.org/www-project-application-security-verification-standard/

## No exponer secretos

- No publicar tokens, claves API ni credenciales.
- No incluir secretos en showcase publico.
- No guardar claves en documentacion.
- No registrar variables sensibles en logs.

## Recommended Improvements

- Crear threat model ligero antes de backend real.
- Definir checklist de seguridad para PRs.
- Agregar pruebas de autorizacion en endpoints sensibles.
- Documentar politicas de acceso a datos personales.

## Open Questions

- Se requerira 2FA para Admin en una fase futura?
- Que politica de retencion de datos de clientes se usara?
- Que proveedor gestionara secretos en despliegue real?
