# Datos de la demo estática

La sección `/demo/` utiliza datos simulados para ser navegable sin backend ni servicios externos. Estos datos no representan la persistencia ni los contratos de la aplicación real.

## Fuente

`public/assets/mock-data.js` contiene categorías, productos, pedidos, métricas, series de ventas y escenarios opcionales de IA. `public/assets/app.js` renderiza las vistas y gestiona la interacción local.

## Persistencia

Sólo se conservan en el navegador:

- `saleops-showcase-cart`
- `saleops-showcase-last-order`

No se envía información a servidores. El checkout no procesa pagos ni solicita datos de tarjeta.

## Diferencia con el producto

La aplicación real obtiene catálogo, pedidos, inventario, ventas, caja y reportes desde PostgreSQL a través de la API. Sus permisos y reglas se validan en servidor. Las capturas de la portada sí provienen de esa aplicación conectada.

Los escenarios de IA son texto demostrativo aislado. No existe proveedor, entrenamiento, inferencia ni dependencia funcional de IA.
