# Mock Data

## Objetivo

El showcase usa datos simulados para demostrar la experiencia de SaleOps sin backend real ni base de datos.

Archivo principal:

```text
public/assets/mock-data.js
```

## Estructura

### Categories

Lista categorias visibles para catalogo y filtros:

- Laptops.
- Perifericos.
- Audio.
- Monitores.
- Conectividad.
- Home office.
- Productividad.
- Gamer sobrio.

### Products

Cada producto mock incluye:

- `slug`;
- `name`;
- `category`;
- `price`;
- `previousPrice`;
- `stock`;
- `status`;
- `accent`;
- `description`;
- `specs`.

Estados usados:

- `available`: disponible.
- `low`: bajo stock.
- `out`: agotado.

### Orders

Pedidos recientes simulados con:

- codigo;
- cliente;
- total;
- estado;
- metodo de entrega;
- metodo de pago;
- tiempo relativo.

Estados tecnicos:

- `Pending`.
- `Confirmed`.
- `Preparing`.
- `ReadyForPickup`.
- `Completed`.

### Metrics

Metricas del dashboard:

- ventas del mes;
- pedidos pendientes;
- productos con bajo stock;
- ticket promedio.

### Sales Series

Serie semanal usada para el grafico mock de ventas.

### AI Insights

Respuestas simuladas de IA interna. No se llama a ningun proveedor real.

## Persistencia local

El carrito y el ultimo pedido simulado usan `localStorage`:

- `saleops-showcase-cart`;
- `saleops-showcase-last-order`.

Estos datos no salen del navegador.

## Recommended Improvements

- Agregar mas productos si la demo necesita mayor densidad visual.
- Separar datos por archivo JSON si el showcase migra a un framework.
- Agregar fixtures especificos para pruebas E2E futuras.

## Open Questions

- Se mantendra NovaTech Store como tienda demo final?
- Se agregaran datos mock por campana comercial o temporada?
