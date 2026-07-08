# SaleOps Showcase

SaleOps Showcase es el repositorio publico de presentacion para SaleOps, una plataforma ecommerce-first single-tenant para negocios. Esta demo publica combina landing comercial, tienda online simulada, flujo de compra mock, panel interno visual, reportes e IA interna simulada.

El repositorio no contiene backend real, base de datos real, autenticacion real, pagos reales, IA real ni logica sensible.

## Que problema muestra

Muchos negocios venden por redes, mensajes y hojas de calculo, pero no tienen pedidos, inventario, ventas, clientes y reportes conectados. SaleOps presenta una base para unir tienda online y operacion interna sin convertir el MVP en marketplace ni ERP completo.

## Enfoque ecommerce-first

La tienda online es el punto de entrada. Desde ahi se simula:

- catalogo de productos;
- detalle de producto;
- carrito;
- checkout;
- recojo en tienda;
- delivery local;
- metodos de pago manuales o simulados;
- confirmacion de pedido.

El panel interno muestra como el negocio podria gestionar pedidos, stock, ventas, reportes e insights internos.

## Modelo single-tenant

SaleOps esta pensado como una instalacion por negocio:

- una tienda por despliegue;
- una configuracion por instancia;
- adaptacion por cliente real;
- sin multiempresa en el MVP.

## Repositorios planeados

- `saleops-showcase`: publico. Landing, demo visual, flujo simulado, docs publicas y presentacion tecnica.
- `saleops-frontend`: privado. Frontend real de tienda online y panel administrativo.
- `saleops-backend`: privado. API real, base de datos, autenticacion, roles, logica de negocio, reportes, IA interna, seguridad y tests.

## Que contiene este showcase

- Landing comercial de SaleOps.
- Demo de tienda para `NovaTech Store`.
- Catalogo con productos mock.
- Detalle visual de producto.
- Carrito con `localStorage`.
- Checkout simulado.
- Confirmacion de pedido con codigo mock.
- Panel interno simulado.
- Productos, pedidos, reportes e IA interna mock.
- Modo claro y oscuro.
- Build estatico para despliegue sin backend.

## Que no contiene

- Backend real.
- Base de datos.
- Login real.
- Pasarela de pagos.
- IA real.
- Secretos o variables sensibles.
- Integraciones externas.
- Frontend privado completo.

## Stack de este repositorio

El showcase de Fase 1 esta implementado como sitio estatico sin dependencias para poder correr en este entorno aunque no exista `npm`, `pnpm` o `yarn` disponible.

Incluye:

- HTML estatico.
- CSS modular en `public/assets/styles.css`.
- JavaScript de demo en `public/assets/app.js`.
- Datos mock en `public/assets/mock-data.js`.
- Scripts Node para servidor local y build estatico.

La version real de SaleOps mantiene el stack propuesto en la documentacion:

- Next.js con App Router.
- React.
- TypeScript.
- Tailwind CSS.
- NestJS.
- PostgreSQL.
- Prisma.
- Docker.
- Swagger/OpenAPI.
- IA interna.

## Requisitos

- Node.js disponible.

No hay dependencias npm que instalar para esta fase.

## Como correr localmente

Con Node directo:

```bash
node scripts/serve.mjs
```

Luego abrir:

```text
http://localhost:4173
```

Si tienes npm disponible:

```bash
npm run dev
```

## Como construir

Con Node directo:

```bash
node scripts/build.mjs
```

Si tienes npm disponible:

```bash
npm run build
```

El build genera la carpeta:

```text
out/
```

## Como desplegar

El showcase no necesita backend. Puede desplegarse como sitio estatico en:

- Vercel;
- Cloudflare Pages;
- Netlify;
- GitHub Pages.

Comando de build:

```bash
node scripts/build.mjs
```

Directorio de salida:

```text
out
```

## Rutas principales

- `/`: landing comercial.
- `/demo/store/`: home de tienda demo.
- `/demo/store/products/`: catalogo.
- `/demo/store/products/monitor-ultraview-27/`: detalle visual de producto.
- `/demo/store/cart/`: carrito.
- `/demo/store/checkout/`: checkout simulado.
- `/demo/store/order-success/`: confirmacion simulada.
- `/demo/admin/`: dashboard interno.
- `/demo/admin/products/`: gestion visual de productos.
- `/demo/admin/orders/`: gestion visual de pedidos.
- `/demo/admin/reports/`: reportes mock.
- `/demo/admin/ai-insights/`: IA interna simulada.
- `/docs/`: resumen tecnico publico.
- `/roadmap/`: roadmap visual.

## Capturas

Seccion preparada para capturas:

- Landing.
- Tienda demo.
- Checkout simulado.
- Dashboard interno.
- IA interna simulada.

## Estructura del proyecto

```text
.
├── docs/
│   ├── adr/
│   ├── showcase.md
│   ├── deployment-showcase.md
│   └── mock-data.md
├── public/
│   └── assets/
│       ├── app.js
│       ├── mock-data.js
│       ├── saleops-hero-dashboard.png
│       └── styles.css
├── scripts/
│   ├── build.mjs
│   └── serve.mjs
├── index.html
├── package.json
└── README.md
```

## Estado actual

Fase 1 en progreso/completada: showcase publico estatico con datos simulados.

Fase recomendada siguiente: Fase 2, base del frontend real privado.

## Nota de portafolio

Este repositorio sirve como vitrina publica de producto y arquitectura. La implementacion real debe permanecer separada en repositorios privados para proteger logica sensible, datos, integraciones y decisiones comerciales.
