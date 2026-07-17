# SaleOps Showcase

Vitrina pública de SaleOps, una plataforma single-tenant que conecta tienda online, pedidos, catálogo, inventario, ventas, clientes, caja y reportes operativos.

El sitio es estático y no replica la aplicación real. Combina capturas verificables del frontend conectado al backend con una demo local claramente identificada como simulada.

## Qué muestra

- Recorrido visual por el storefront y el panel operativo reales.
- Capacidades actuales y límites deliberados del producto.
- Arquitectura de los cuatro repositorios.
- Demo estática de catálogo, carrito, checkout y panel sin servicios externos.
- Separación explícita entre funciones reales, opcionales, simuladas y futuras.

## Producto real

- [`saleops-frontend`](https://github.com/Jandroel/saleops-frontend): Next.js, React, TypeScript, Tailwind CSS y Playwright.
- [`saleops-backend`](https://github.com/Jandroel/saleops-backend): NestJS, PostgreSQL, Prisma, JWT, Swagger y Jest.
- [`saleops-docs`](https://github.com/Jandroel/saleops-docs): arquitectura, operación y decisiones.

La aplicación real tiene 41 rutas y la API 108 operaciones. La IA es opcional, está aislada y no interviene en tienda, pedidos, inventario, ventas, caja ni reportes.

## Demo estática

La demo bajo `/demo/` usa datos de `public/assets/mock-data.js` y `localStorage`. No autentica usuarios, no consulta una base de datos, no procesa pagos y no llama a proveedores de IA. Sirve para explorar una muestra pública sin exponer configuración ni datos operativos.

## Uso local

```bash
npm install
npm run dev
```

Abrir `http://localhost:4173`.

## Calidad y build

```bash
npm run build
npm run check
npm audit --audit-level=high
```

El build genera 25 rutas estáticas en `out/`. `check` valida recursos, capturas, salidas críticas y vocabulario público obsoleto.

## Rutas

- `/`: producto, recorrido real, arquitectura y estado.
- `/demo/store/`: demo estática de tienda.
- `/demo/admin/`: demo estática del panel.
- `/docs/`: resumen técnico público.
- `/roadmap/`: estado actual y siguientes decisiones.

## Estructura

```text
.
├── docs/
├── public/assets/
│   ├── screenshots/
│   ├── app.js
│   ├── mock-data.js
│   ├── saleops-mark.svg
│   └── styles.css
├── scripts/
│   ├── build.mjs
│   ├── check.mjs
│   └── serve.mjs
├── index.html
└── package.json
```

## Límites actuales

No incluye pagos reales, promociones, OAuth, marketing automation, proveedor de IA, facturación, marketplace ni multiempresa. Estos elementos no se presentan como capacidades disponibles.
