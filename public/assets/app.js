(function () {
  const data = window.SaleOpsData;
  const app = document.getElementById("app");
  const cartKey = "saleops-showcase-cart";
  const orderKey = "saleops-showcase-last-order";
  const themeKey = "saleops-theme";

  const icons = {
    arrow: '<path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>',
    bag: '<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    boxes: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    dashboard: '<rect x="3" y="3" width="7" height="8" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="15" width="7" height="6" rx="1"/>',
    docs: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
    menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 7.4A9 9 0 1 1 12 3Z"/>',
    package: '<path d="m7.5 4.3 9 5.2"/><path d="M21 8.5v7a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 15.5v-7a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4a2 2 0 0 1 1 1.73Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z"/>',
    spark: '<path d="m12 3 1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>',
    store: '<path d="M4 10h16l-1-5H5l-1 5Z"/><path d="M5 10v9h14v-9"/><path d="M9 19v-5h6v5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.9 19.1 1.4-1.4"/><path d="m17.7 6.3 1.4-1.4"/>',
    truck: '<path d="M10 17h4V5H2v12h3"/><path d="M14 17h1"/><path d="M19 17h3v-5l-3-4h-5"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  };

  const toneMap = {
    cyan: "#22d3ee",
    indigo: "#6366f1",
    emerald: "#10b981",
    rose: "#fb7185",
    amber: "#f59e0b",
    violet: "#8b5cf6",
    sky: "#38bdf8",
    lime: "#84cc16",
    orange: "#f97316",
    slate: "#64748b",
    fuchsia: "#d946ef"
  };

  function icon(name) {
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
  }

  function money(value) {
    return `S/ ${value.toLocaleString("es-PE")}`;
  }

  function pathName() {
    return window.location.pathname.replace(/\/index\.html$/, "/");
  }

  function active(href) {
    const current = pathName();
    return current === href || (href !== "/" && current.startsWith(href)) ? " active" : "";
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(themeKey, theme);
  }

  function getTheme() {
    return localStorage.getItem(themeKey) || "light";
  }

  function cart() {
    try {
      return JSON.parse(localStorage.getItem(cartKey) || "[]");
    } catch {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(cartKey, JSON.stringify(items));
  }

  function productBySlug(slug) {
    return data.products.find((product) => product.slug === slug) || data.products[0];
  }

  function cartItems() {
    return cart()
      .map((item) => ({ ...item, product: productBySlug(item.slug) }))
      .filter((item) => item.product);
  }

  function cartCount() {
    return cart().reduce((total, item) => total + item.qty, 0);
  }

  function subtotal(items = cartItems()) {
    return items.reduce((total, item) => total + item.product.price * item.qty, 0);
  }

  function deliveryFee(method) {
    return method === "delivery" ? 18 : 0;
  }

  function statusBadge(status) {
    const map = {
      available: ["Disponible", "success"],
      low: ["Bajo stock", "warning"],
      out: ["Agotado", "danger"],
      Pending: ["Pending", "warning"],
      Confirmed: ["Confirmed", "info"],
      Preparing: ["Preparing", "info"],
      ReadyForPickup: ["ReadyForPickup", "success"],
      OutForDelivery: ["OutForDelivery", "info"],
      Delivered: ["Delivered", "success"],
      Completed: ["Completed", "success"],
      Cancelled: ["Cancelled", "danger"]
    };
    const [label, tone] = map[status] || [status, "info"];
    return `<span class="badge ${tone}">${label}</span>`;
  }

  function header() {
    return `
      <header class="site-header">
        <nav class="nav" aria-label="Principal">
          <a class="brand" href="/">
            <img class="brand-logo" src="/assets/saleops-mark.svg" alt="" width="34" height="34" />
            <span>SaleOps</span>
          </a>
          <div class="nav-links">
            <a class="nav-link${active("/")}" href="/">Producto</a>
            <a class="nav-link" href="/#recorrido">Recorrido</a>
            <a class="nav-link${active("/demo/store/")}" href="/demo/store/">Demo estática</a>
            <a class="nav-link${active("/docs/")}" href="/docs/">Arquitectura</a>
            <a class="nav-link${active("/roadmap/")}" href="/roadmap/">Estado</a>
          </div>
          <div class="nav-actions">
            <a class="btn ghost desktop-only" href="/demo/store/cart/" aria-label="Ver carrito">${icon("bag")}<span data-cart-count>${cartCount()}</span></a>
            <button class="btn icon-btn" data-theme-toggle aria-label="Cambiar tema">${icon(getTheme() === "dark" ? "sun" : "moon")}</button>
            <button class="btn icon-btn mobile-menu-btn" data-mobile-menu aria-label="Abrir menu">${icon("menu")}</button>
          </div>
        </nav>
        <div class="mobile-panel" data-mobile-panel>
          <a class="nav-link" href="/#recorrido">Recorrido real</a>
          <a class="nav-link" href="/demo/store/">Demo estática</a>
          <a class="nav-link" href="/docs/">Arquitectura</a>
          <a class="nav-link" href="/demo/store/cart/">Carrito (${cartCount()})</a>
        </div>
      </header>
    `;
  }

  function footer() {
    return `
      <footer class="footer" id="footer">
        <div class="footer-inner">
          <div>
            <a class="brand" href="/"><img class="brand-logo" src="/assets/saleops-mark.svg" alt="" width="34" height="34" /><span>SaleOps</span></a>
            <p style="max-width: 560px; margin: 14px 0 0;">Tienda online y operación comercial conectadas. El producto funciona completamente sin IA.</p>
          </div>
          <div class="stack-grid" aria-label="Enlaces">
            <a class="stack-pill" href="/docs/">Docs</a>
            <a class="stack-pill" href="/roadmap/">Estado</a>
            <a class="stack-pill" href="https://github.com/Jandroel/saleops-frontend" rel="noreferrer" target="_blank">Frontend</a>
            <a class="stack-pill" href="https://github.com/Jandroel/saleops-backend" rel="noreferrer" target="_blank">Backend</a>
          </div>
        </div>
      </footer>
      <div class="toast" data-toast role="status" aria-live="polite" aria-atomic="true"></div>
    `;
  }

  function pageShell(content) {
    return `${header()}${content}${footer()}`;
  }

  function sectionHeading(eyebrow, title, text, action = "") {
    return `
      <div class="section-heading">
        <div class="section-title">
          <p class="eyebrow">${eyebrow}</p>
          <h2>${title}</h2>
          <p>${text}</p>
        </div>
        ${action}
      </div>
    `;
  }

  function moduleCard(title, text, iconName) {
    return `
      <article class="card">
        <div class="module-icon">${icon(iconName)}</div>
        <h3>${title}</h3>
        <p>${text}</p>
      </article>
    `;
  }

  function productCard(product) {
    const disabled = product.status === "out";
    return `
      <article class="product-card tone-${product.accent}">
        <a class="product-media" href="/demo/store/products/${product.slug}/" aria-label="Ver ${product.name}">
          <span class="product-device"></span>
        </a>
        <div class="product-content">
          <div>${statusBadge(product.status)}</div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-meta">
            <div>
              <div class="price">${money(product.price)}</div>
              ${product.previousPrice ? `<div class="previous-price">${money(product.previousPrice)}</div>` : ""}
            </div>
            <button class="btn ${disabled ? "" : "primary"}" data-add-cart="${product.slug}" ${disabled ? "disabled" : ""} aria-label="Agregar ${product.name}">
              ${icon("bag")}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function productGrid(products = data.products) {
    return `<div class="product-grid" data-product-grid>${products.map(productCard).join("")}</div>`;
  }

  function miniProduct(product) {
    return `
      <div class="mini-product" style="--tone:${toneMap[product.accent]}">
        <span class="shape"></span>
        <strong>${product.name}</strong>
        <small>${money(product.price)}</small>
      </div>
    `;
  }

  function salesChart() {
    const max = Math.max(...data.salesSeries.map((item) => item.sales));
    const points = data.salesSeries
      .map((item, index) => {
        const x = 42 + index * 78;
        const y = 214 - (item.sales / max) * 150;
        return `${x},${y}`;
      })
      .join(" ");
    const bars = data.salesSeries
      .map((item, index) => {
        const x = 24 + index * 78;
        const height = (item.sales / max) * 132;
        const y = 226 - height;
        return `<rect x="${x}" y="${y}" width="34" height="${height}" rx="5" fill="var(--info)" opacity="0.62"/><text x="${x + 17}" y="248" text-anchor="middle" fill="var(--muted)" font-size="12">${item.day}</text>`;
      })
      .join("");
    return `
      <svg class="chart" viewBox="0 0 560 270" role="img" aria-label="Gráfico de ventas de ejemplo">
        <line x1="20" y1="226" x2="540" y2="226" stroke="var(--line)" />
        ${bars}
        <polyline points="${points}" fill="none" stroke="var(--primary)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  function landingPage() {
    const modules = [
      ["Tienda online", "Catálogo, búsqueda, detalle, carrito y checkout validados por la API.", "store"],
      ["Pedidos", "Compra invitada o autenticada, reservas y transiciones operativas.", "truck"],
      ["Inventario", "Stock, bajo stock, movimientos y ajustes transaccionales.", "boxes"],
      ["Ventas y POS", "Venta presencial, conversión de pedidos, comprobante y anulaciones.", "chart"],
      ["Clientes", "Cuenta, perfil, direcciones e historial separados del usuario interno.", "users"],
      ["Caja", "Apertura, movimientos, cierre e historial consistentes.", "dashboard"],
      ["Reportes", "Indicadores, comparativas y CSV deterministas sin depender de IA.", "chart"],
      ["Seguridad", "Sesiones separadas, RBAC, auditoría y validación estricta.", "shield"]
    ];
    const repos = [
      ["saleops-showcase", "Vitrina estática", "Presentación, capturas y demo local sin datos sensibles.", "https://github.com/Jandroel/saleops-showcase"],
      ["saleops-frontend", "Aplicación real", "Tienda, cuenta de cliente y panel administrativo.", "https://github.com/Jandroel/saleops-frontend"],
      ["saleops-backend", "Fuente de verdad", "API, PostgreSQL, autenticación y reglas comerciales.", "https://github.com/Jandroel/saleops-backend"],
      ["saleops-docs", "Decisiones", "Arquitectura, contratos, ADR y continuidad técnica.", "https://github.com/Jandroel/saleops-docs"]
    ];
    const stack = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "TanStack Query", "NestJS 11", "PostgreSQL 16", "Prisma 6", "Playwright", "GitHub Actions"];

    return pageShell(`
      <main>
        <section class="hero">
          <div class="hero-inner">
            <div class="hero-copy">
              <p class="eyebrow">${icon("store")} Ecommerce-first · single-tenant</p>
              <h1>SaleOps</h1>
              <p class="hero-lead">Tienda online, pedidos, inventario, ventas, clientes, caja y reportes conectados en una operación consistente.</p>
              <div class="hero-actions">
                <a class="btn primary" href="#recorrido">${icon("arrow")} Ver producto real</a>
                <a class="btn hero-secondary" href="https://github.com/Jandroel/saleops-frontend" rel="noreferrer" target="_blank">${icon("docs")} Abrir repositorio</a>
              </div>
              <div class="hero-stats">
                <div class="stat-pill"><strong>41</strong><span>rutas de aplicación</span></div>
                <div class="stat-pill"><strong>108</strong><span>operaciones API inventariadas</span></div>
                <div class="stat-pill"><strong>0</strong><span>flujos que dependen de IA</span></div>
              </div>
            </div>
          </div>
        </section>

        <section class="section band-soft">
          <div class="section-inner">
            ${sectionHeading("Problema y solución", "De ventas dispersas a operación conectada", "SaleOps reúne el recorrido de compra y el trabajo interno del negocio sin convertirse en marketplace ni ERP generalista.")}
            <div class="grid two">
              ${moduleCard("Experiencia comercial", "Catálogo publicable, compra invitada o autenticada, pedidos consultables y datos de cliente protegidos.", "store")}
              ${moduleCard("Operación interna", "Stock, pedidos, POS, ventas, caja y reportes comparten reglas y una única fuente de verdad.", "check")}
            </div>
          </div>
        </section>

        <section class="section" id="recorrido">
          <div class="section-inner">
            ${sectionHeading("Recorrido real", "La aplicación que ya funciona", "Capturas tomadas de SaleOps conectado a PostgreSQL con datos locales controlados. No contienen credenciales ni información personal real.")}
            <div class="shot-grid">
              <figure class="product-shot shot-wide"><img src="/assets/screenshots/storefront-desktop.webp" alt="Tienda real de SaleOps con catálogo y productos destacados" loading="eager" /><figcaption><strong>Tienda online</strong><span>Catálogo, media real y disponibilidad actualizada.</span></figcaption></figure>
              <figure class="product-shot"><img src="/assets/screenshots/dashboard-desktop.webp" alt="Dashboard operativo real de SaleOps" loading="lazy" /><figcaption><strong>Dashboard</strong><span>Resumen comparado y ventas recientes.</span></figcaption></figure>
              <figure class="product-shot"><img src="/assets/screenshots/reports-desktop.webp" alt="Reportes operativos reales de SaleOps" loading="lazy" /><figcaption><strong>Reportes</strong><span>Filtros, comparativas, tablas y exportación.</span></figcaption></figure>
              <figure class="product-shot"><img src="/assets/screenshots/pos-desktop.webp" alt="Punto de venta real de SaleOps" loading="lazy" /><figcaption><strong>Punto de venta</strong><span>Productos, cliente, pago, stock y caja.</span></figcaption></figure>
              <figure class="product-shot shot-mobile"><img src="/assets/screenshots/storefront-mobile.webp" alt="Tienda SaleOps en un viewport móvil" loading="lazy" /><figcaption><strong>Experiencia móvil</strong><span>Navegación y compra adaptadas.</span></figcaption></figure>
            </div>
          </div>
        </section>

        <section class="section band">
          <div class="section-inner">
            ${sectionHeading("Capacidades", "La columna vertebral del producto", "Estos módulos consumen la API real y PostgreSQL; la demo estática es solo una representación pública separada.")}
            <div class="grid four">${modules.map((item) => moduleCard(item[0], item[1], item[2])).join("")}</div>
          </div>
        </section>

        <section class="section">
          <div class="section-inner">
            ${sectionHeading("Estados claros", "Real, opcional y futuro no se mezclan", "La comunicación del producto distingue lo operativo de los experimentos y del trabajo que aún no existe.")}
            <div class="grid three">
              <article class="card status-card"><span class="badge success">Disponible</span><h3>Núcleo comercial</h3><p>Tienda, clientes, catálogo, pedidos, inventario, ventas, POS, caja, dashboard y reportes.</p></article>
              <article class="card status-card"><span class="badge info">Opcional</span><h3>Laboratorio de IA</h3><p>Vista conceptual aislada. SaleOps y sus reportes funcionan completamente sin IA.</p></article>
              <article class="card status-card"><span class="badge warning">Futuro</span><h3>Integraciones comerciales</h3><p>Pagos reales, promociones, OAuth y automatización requieren decisiones y proveedores propios.</p></article>
            </div>
          </div>
        </section>

        <section class="section band-soft">
          <div class="section-inner">
            ${sectionHeading("Demo pública", "Explora una representación estática", "Permite recorrer tienda y panel sin backend, credenciales ni datos sensibles. No sustituye a la aplicación real.", `<a class="btn primary" href="/demo/store/">${icon("store")} Abrir demo estática</a>`)}
          </div>
        </section>

        <section class="section">
          <div class="section-inner">
            ${sectionHeading("Arquitectura", "Cuatro repositorios con responsabilidades claras", "La aplicación, la API, la documentación y la vitrina evolucionan por separado y se validan con CI.")}
            <div class="grid two">
              ${repos.map((repo, index) => `<a class="card repo-card" href="${repo[3]}" rel="noreferrer" target="_blank"><span class="repo-index">0${index + 1}</span><div><h3>${repo[0]}</h3><p><strong>${repo[1]}.</strong> ${repo[2]}</p><span class="repo-link">Abrir en GitHub ${icon("arrow")}</span></div></a>`).join("")}
            </div>
          </div>
        </section>

        <section class="section band">
          <div class="section-inner">
            ${sectionHeading("Stack", "Base técnica actual", "Tecnologías verificadas en los repositorios reales y sus pipelines.")}
            <div class="stack-grid">${stack.map((item) => `<span class="stack-pill">${item}</span>`).join("")}</div>
          </div>
        </section>

        <section class="section">
          <div class="section-inner">
            <div class="disclaimer"><strong>Límite de la vitrina.</strong> Las rutas bajo <code>/demo</code> usan datos locales simulados y no contienen autenticación, base de datos ni lógica sensible. Las capturas y capacidades descritas corresponden a la aplicación real separada.</div>
          </div>
        </section>
      </main>
    `);
  }

  function metricCard(metric) {
    return `
      <article class="metric-card">
        <span class="badge ${metric.tone}">${metric.delta}</span>
        <strong>${metric.value}</strong>
        <p>${metric.label}</p>
      </article>
    `;
  }

  function storeHomePage() {
    return pageShell(`
      <main>
        <section class="section">
          <div class="section-inner store-hero">
            <div>
              <p class="eyebrow">${icon("store")} NovaTech Store</p>
              <h2 style="font-size: clamp(2.6rem, 7vw, 5.2rem); line-height: .94; margin-bottom: 18px;">Tecnologia para trabajar mejor</h2>
              <p class="hero-lead">Explora una representación estática de la tienda con productos locales, categorías, carrito y checkout de prueba.</p>
              <div class="hero-actions">
                <a class="btn primary" href="/demo/store/products/">${icon("package")} Ver productos</a>
                <a class="btn ghost" href="/demo/store/cart/">${icon("bag")} Carrito (${cartCount()})</a>
              </div>
            </div>
            <div class="store-visual">
              <div class="store-visual-grid">${data.products.slice(0, 4).map(miniProduct).join("")}</div>
            </div>
          </div>
        </section>
        <section class="section band">
          <div class="section-inner">
            ${sectionHeading("Destacados", "Productos listos para demo", "Incluye disponibles, bajo stock y agotados para mostrar estados reales de ecommerce.")}
            ${productGrid(data.products.slice(0, 8))}
          </div>
        </section>
      </main>
    `);
  }

  function productsPage() {
    return pageShell(`
      <main class="section">
        <div class="section-inner">
          ${sectionHeading("Catálogo", "Productos de ejemplo de NovaTech Store", "Filtra categorías, abre detalles y agrega productos al carrito local de la vitrina.")}
          <div class="filters" data-filters>
            <button class="filter-btn active" data-filter="Todos">Todos</button>
            ${data.categories.map((category) => `<button class="filter-btn" data-filter="${category}">${category}</button>`).join("")}
          </div>
          ${productGrid(data.products)}
        </div>
      </main>
    `);
  }

  function detailPage() {
    const slug = pathName().split("/").filter(Boolean).at(-1);
    const product = productBySlug(slug);
    const disabled = product.status === "out";
    return pageShell(`
      <main class="section">
        <div class="section-inner detail-layout">
          <div class="detail-media tone-${product.accent}"></div>
          <div>
            <p class="eyebrow">${product.category}</p>
            <h2 style="font-size: clamp(2.4rem, 5vw, 4rem); line-height: 1;">${product.name}</h2>
            <div style="margin: 14px 0;">${statusBadge(product.status)}</div>
            <p class="hero-lead">${product.description}</p>
            <div class="price">${money(product.price)}</div>
            ${product.previousPrice ? `<div class="previous-price">${money(product.previousPrice)}</div>` : ""}
            <ul class="spec-list">${product.specs.map((spec) => `<li>${spec}</li>`).join("")}</ul>
            <div class="hero-actions">
              <button class="btn primary" data-add-cart="${product.slug}" ${disabled ? "disabled" : ""}>${icon("bag")} Agregar al carrito</button>
              <a class="btn ghost" href="/demo/store/products/">${icon("arrow")} Volver al catalogo</a>
            </div>
          </div>
        </div>
      </main>
    `);
  }

  function cartPage() {
    const items = cartItems();
    if (!items.length) {
      return pageShell(`
        <main class="section">
          <div class="section-inner">
            ${sectionHeading("Carrito local", "Tu carrito está vacío", "Agrega productos de ejemplo para continuar al checkout estático.")}
            <div class="empty-state"><div><p>No hay productos seleccionados.</p><a class="btn primary" href="/demo/store/products/">${icon("package")} Ir al catalogo</a></div></div>
          </div>
        </main>
      `);
    }
    return pageShell(`
      <main class="section">
        <div class="section-inner checkout-layout">
          <div>
            ${sectionHeading("Carrito", "Productos seleccionados", "El carrito usa localStorage y no envia datos a ningun servidor.")}
            <div class="cart-list">${items.map(cartItem).join("")}</div>
          </div>
          <aside class="checkout-panel">
            <h3>Resumen</h3>
            ${summaryLines(items, "pickup")}
            <a class="btn primary" style="width:100%; margin-top: 18px;" href="/demo/store/checkout/">${icon("arrow")} Ir a checkout</a>
          </aside>
        </div>
      </main>
    `);
  }

  function cartItem(item) {
    return `
      <article class="cart-item tone-${item.product.accent}">
        <div class="cart-thumb"></div>
        <div>
          <strong>${item.product.name}</strong>
          <div style="color: var(--muted); margin-top: 4px;">${money(item.product.price)} · ${item.product.category}</div>
        </div>
        <div class="quantity">
          <button data-qty="${item.product.slug}" data-dir="-1" aria-label="Reducir">-</button>
          <strong>${item.qty}</strong>
          <button data-qty="${item.product.slug}" data-dir="1" aria-label="Aumentar">+</button>
        </div>
      </article>
    `;
  }

  function summaryLines(items, delivery) {
    const sub = subtotal(items);
    const fee = deliveryFee(delivery);
    return `
      <div class="summary-line"><span>Subtotal</span><strong>${money(sub)}</strong></div>
      <div class="summary-line"><span>Entrega</span><strong>${fee ? money(fee) : "S/ 0"}</strong></div>
      <div class="summary-line total"><span>Total</span><strong>${money(sub + fee)}</strong></div>
    `;
  }

  function checkoutPage() {
    const items = cartItems();
    if (!items.length) {
      return cartPage();
    }
    return pageShell(`
      <main class="section">
        <div class="section-inner checkout-layout">
          <form class="checkout-panel" data-checkout-form>
            <p class="eyebrow">${icon("shield")} Checkout de la demo estática</p>
            <h2>Confirmar pedido</h2>
            <p style="color: var(--muted);">No guarda datos reales ni conecta pasarelas. Todo queda en estado local del navegador.</p>
            <div class="form-grid">
              <div class="field"><label>Nombre</label><input value="Cliente Demo" autocomplete="off" /></div>
              <div class="field"><label>Email</label><input value="cliente@demo.local" autocomplete="off" /></div>
            </div>
            <h3>Entrega</h3>
            <div class="option-grid" data-delivery-options>
              ${option("delivery", "pickup", "Recojo en tienda", "El pedido se marca como ReadyForPickup.")}
              ${option("delivery", "delivery", "Delivery local", "Entrega manual sin tracking en mapa.")}
            </div>
            <h3>Pago</h3>
            <div class="option-grid" data-payment-options>
              ${option("payment", "pickup", "Pago al recoger", "Validacion manual por Vendedor.")}
              ${option("payment", "cod", "Pago contra entrega", "Se confirma al entregar.")}
              ${option("payment", "yape", "Yape manual", "Importe y referencia sujetos a validacion.")}
              ${option("payment", "plin", "Plin manual", "Importe y referencia sujetos a validacion.")}
              ${option("payment", "transfer", "Transferencia bancaria", "Sin integracion bancaria real.")}
              ${option("payment", "card", "Tarjeta simulada", "Solo para demo visual.")}
            </div>
            <div class="disclaimer" style="margin-top:16px;"><strong>Demostracion: no realizar pagos reales.</strong> Yape, Plin y transferencia se muestran con datos ficticios y validacion manual. La tarjeta simulada no solicita ni almacena datos bancarios.</div>
            <button class="btn primary" style="width:100%; margin-top: 18px;" type="submit">${icon("check")} Confirmar pedido de ejemplo</button>
          </form>
          <aside class="checkout-panel">
            <h3>Resumen</h3>
            <div class="cart-list">${items.map(cartItem).join("")}</div>
            <div data-checkout-summary>${summaryLines(items, "pickup")}</div>
          </aside>
        </div>
      </main>
    `);
  }

  function option(name, value, title, detail) {
    const checked = (name === "delivery" && value === "pickup") || (name === "payment" && value === "pickup");
    return `
      <label class="option ${checked ? "selected" : ""}">
        <input type="radio" name="${name}" value="${value}" ${checked ? "checked" : ""} />
        <span><strong>${title}</strong><small>${detail}</small></span>
      </label>
    `;
  }

  function successPage() {
    const saved = JSON.parse(localStorage.getItem(orderKey) || "null");
    const code = saved?.code || "SO-DEMO-2048";
    return pageShell(`
      <main class="section">
        <div class="section-inner">
          <div class="empty-state">
            <div>
              <p class="eyebrow">${icon("check")} Pedido confirmado</p>
              <h2 style="font-size: clamp(2.3rem, 6vw, 4.4rem);">${code}</h2>
              <p>Pedido de ejemplo creado localmente. Esta acción no consulta la API real.</p>
              <div class="hero-actions" style="justify-content:center;">
                <a class="btn primary" href="/demo/admin/orders/">${icon("dashboard")} Ver en panel</a>
                <a class="btn ghost" href="/demo/store/products/">${icon("package")} Seguir comprando</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    `);
  }

  function adminShell(content, title = "Dashboard interno") {
    const links = [
      ["/demo/admin/", "Dashboard", "dashboard"],
      ["/demo/admin/products/", "Productos", "package"],
      ["/demo/admin/orders/", "Pedidos", "truck"],
      ["/demo/admin/reports/", "Reportes", "chart"],
      ["/demo/admin/ai-insights/", "IA interna", "spark"]
    ];
    return pageShell(`
      <main class="section">
        <div class="section-inner">
          ${sectionHeading("Demo estática de panel", title, "Representación pública con datos locales. La aplicación real, la API y PostgreSQL viven en repositorios separados.")}
          <div class="admin-layout">
            <aside class="sidebar">${links.map(([href, label, iconName]) => `<a class="sidebar-link${active(href)}" href="${href}">${icon(iconName)} ${label}</a>`).join("")}</aside>
            <div>${content}</div>
          </div>
        </div>
      </main>
    `);
  }

  function adminDashboardPage() {
    return adminShell(`
      <div class="metric-grid">${data.metrics.map(metricCard).join("")}</div>
      <div style="height:16px"></div>
      <div class="dashboard-grid">
        <section class="card"><h3>Ventas de ejemplo por día</h3>${salesChart()}</section>
        <section class="card"><h3>Alertas de stock</h3>${lowStockList()}</section>
      </div>
      <div style="height:16px"></div>
      <section class="table-wrap">${ordersTable(data.orders.slice(0, 5))}</section>
    `);
  }

  function lowStockList() {
    return data.products
      .filter((product) => product.status !== "available")
      .map((product) => `<p><strong>${product.name}</strong><br><span style="color:var(--muted);">${product.stock} unidades · ${product.category}</span></p>`)
      .join("");
  }

  function productsAdminPage() {
    const rows = data.products
      .map(
        (product) => `
          <tr>
            <td><strong>${product.name}</strong></td>
            <td>${product.category}</td>
            <td>${money(product.price)}</td>
            <td>${product.stock}</td>
            <td>${statusBadge(product.status)}</td>
          </tr>
        `
      )
      .join("");
    return adminShell(`<section class="table-wrap"><table><thead><tr><th>Producto</th><th>Categoria</th><th>Precio</th><th>Stock</th><th>Estado</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Gestion visual de productos");
  }

  function ordersAdminPage() {
    return adminShell(`<section class="table-wrap">${ordersTable(data.orders)}</section>`, "Gestion visual de pedidos");
  }

  function ordersTable(orders) {
    return `
      <table>
        <thead><tr><th>Pedido</th><th>Cliente</th><th>Total</th><th>Entrega</th><th>Pago</th><th>Estado</th><th>Tiempo</th></tr></thead>
        <tbody>
          ${orders.map((order) => `<tr><td><strong>${order.code}</strong></td><td>${order.customer}</td><td>${money(order.total)}</td><td>${order.delivery}</td><td>${order.payment}</td><td>${statusBadge(order.status)}</td><td>${order.time}</td></tr>`).join("")}
        </tbody>
      </table>
    `;
  }

  function reportsPage() {
    return adminShell(`
      <div class="dashboard-grid">
        <section class="card"><h3>Ventas de ejemplo</h3>${salesChart()}</section>
        <section class="card"><h3>Resumen estático</h3><p>Ingresos del conjunto local: <strong>S/ 48,920</strong></p><p>Esta vista no consulta la API real. Sirve para recorrer la presentación pública sin credenciales.</p><p>Los reportes reales incluyen periodos, comparación, filtros, tablas y CSV.</p></section>
      </div>
      <div style="height:16px"></div>
      <div class="grid three">
        ${moduleCard("Bajo stock", "6 productos requieren revision antes de nueva campana.", "boxes")}
        ${moduleCard("Poca rotacion", "2 productos agotados y 3 con movimiento bajo en esta demo.", "chart")}
        ${moduleCard("Delivery local", "Flujo manual sin mapa ni repartidores en tiempo real.", "truck")}
      </div>
    `, "Representación de reportes");
  }

  function aiPage() {
    return adminShell(`
      <section class="ai-thread">
        <div class="disclaimer"><strong>Capacidad opcional.</strong> SaleOps funciona completamente sin IA. Esta ruta solo conserva una representación visual aislada.</div>
        ${data.aiInsights.map((insight, index) => `<article class="ai-message"><span class="badge info">Escenario conceptual ${index + 1}</span><p style="margin-top:12px;">${insight}</p><small style="color:var(--muted);">Datos locales de demostración; no usa proveedor ni modifica la operación.</small></article>`).join("")}
      </section>
    `, "Laboratorio opcional de IA");
  }

  function docsPage() {
    const docs = [
      ["Product brief", "docs/00-product-brief.md"],
      ["MVP scope", "docs/01-mvp-scope.md"],
      ["Roles y permisos", "docs/02-user-roles-and-permissions.md"],
      ["Modelo de dominio", "docs/03-domain-model.md"],
      ["Arquitectura", "docs/04-architecture.md"],
      ["API contract", "docs/06-api-contract.md"],
      ["Checkout", "docs/07-order-checkout-flow.md"],
      ["Seguridad", "docs/10-security-and-privacy.md"]
    ];
    return pageShell(`
      <main class="section">
        <div class="section-inner">
          ${sectionHeading("Arquitectura pública", "Cómo está construido SaleOps", "La vitrina es estática; la aplicación real, la API y las decisiones técnicas evolucionan en repositorios separados.")}
          <div class="grid two">
            ${moduleCard("Aplicación real", "Next.js reúne tienda, cuenta de cliente y panel interno conectado a la API.", "store")}
            ${moduleCard("Backend real", "NestJS y PostgreSQL son autoridad de identidad, precio, stock, pedidos, ventas, caja y reportes.", "shield")}
          </div>
          <div style="height:16px"></div>
          <div class="grid two">
            <a class="card repo-card" href="https://github.com/Jandroel/saleops-frontend" rel="noreferrer" target="_blank"><div><h3>saleops-frontend</h3><p>Tienda, cuenta y administración.</p><span class="repo-link">Abrir repositorio ${icon("arrow")}</span></div></a>
            <a class="card repo-card" href="https://github.com/Jandroel/saleops-backend" rel="noreferrer" target="_blank"><div><h3>saleops-backend</h3><p>API, base de datos y reglas comerciales.</p><span class="repo-link">Abrir repositorio ${icon("arrow")}</span></div></a>
            <a class="card repo-card" href="https://github.com/Jandroel/saleops-docs" rel="noreferrer" target="_blank"><div><h3>saleops-docs</h3><p>ADR, contratos y estado consolidado.</p><span class="repo-link">Abrir repositorio ${icon("arrow")}</span></div></a>
            <a class="card repo-card" href="https://github.com/Jandroel/saleops-showcase" rel="noreferrer" target="_blank"><div><h3>saleops-showcase</h3><p>Vitrina y demo estática sin secretos.</p><span class="repo-link">Abrir repositorio ${icon("arrow")}</span></div></a>
          </div>
          <div style="height:16px"></div>
          <div class="table-wrap"><table><thead><tr><th>Documento</th><th>Archivo</th></tr></thead><tbody>${docs.map((doc) => `<tr><td>${doc[0]}</td><td>${doc[1]}</td></tr>`).join("")}</tbody></table></div>
        </div>
      </main>
    `);
  }

  function roadmapList(compact = false) {
    const statuses = [
      ["Disponible", "Tienda, catálogo, clientes, checkout y pedidos reales."],
      ["Disponible", "Inventario, ventas, POS, caja y administración real."],
      ["Disponible", "Dashboard, reportes, comparativas y exportación CSV."],
      ["En curso", "Coherencia visual, accesibilidad, capturas y documentación viva."],
      ["Siguiente", "Operación de piloto: sesiones seguras, observabilidad, backups y carga."],
      ["Futuro", "Pagos reales y promociones según demanda comercial."],
      ["Opcional", "IA desacoplada, evaluada solo con datos y objetivos gobernados."]
    ];
    const list = compact ? statuses.slice(0, 5) : statuses;
    return `<div class="roadmap">${list.map((status) => `<article class="roadmap-item"><span class="state-label">${status[0]}</span><p>${status[1]}</p></article>`).join("")}</div>`;
  }

  function roadmapPage() {
    return pageShell(`
      <main class="section">
        <div class="section-inner">
          ${sectionHeading("Estado del producto", "Qué existe y qué sigue después", "El núcleo comercial está implementado. La prioridad siguiente es hacerlo operable en un piloto antes de sumar integraciones de mayor riesgo.")}
          ${roadmapList(false)}
        </div>
      </main>
    `);
  }

  function renderRoute() {
    const current = pathName();
    if (current === "/" || current === "/index.html") return landingPage();
    if (current === "/demo/store/" || current === "/demo/store") return storeHomePage();
    if (current === "/demo/store/products/" || current === "/demo/store/products") return productsPage();
    if (current.startsWith("/demo/store/products/")) return detailPage();
    if (current === "/demo/store/cart/" || current === "/demo/store/cart") return cartPage();
    if (current === "/demo/store/checkout/" || current === "/demo/store/checkout") return checkoutPage();
    if (current === "/demo/store/order-success/" || current === "/demo/store/order-success") return successPage();
    if (current === "/demo/admin/" || current === "/demo/admin") return adminDashboardPage();
    if (current === "/demo/admin/products/" || current === "/demo/admin/products") return productsAdminPage();
    if (current === "/demo/admin/orders/" || current === "/demo/admin/orders") return ordersAdminPage();
    if (current === "/demo/admin/reports/" || current === "/demo/admin/reports") return reportsPage();
    if (current === "/demo/admin/ai-insights/" || current === "/demo/admin/ai-insights") return aiPage();
    if (current === "/docs/" || current === "/docs") return docsPage();
    if (current === "/roadmap/" || current === "/roadmap") return roadmapPage();
    return landingPage();
  }

  function rerender() {
    app.innerHTML = renderRoute();
    bindEvents();
    updateCartCounters();
  }

  function showToast(message, actionHref) {
    const toast = document.querySelector("[data-toast]");
    if (!toast) return;
    toast.replaceChildren();
    const text = document.createElement("span");
    text.textContent = message;
    toast.append(text);
    if (actionHref) {
      const action = document.createElement("a");
      action.href = actionHref;
      action.textContent = "Ver carrito";
      toast.append(action);
    }
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 5000);
  }

  function updateCartCounters() {
    document.querySelectorAll("[data-cart-count]").forEach((node) => {
      node.textContent = cartCount();
    });
  }

  function addToCart(slug) {
    const product = productBySlug(slug);
    if (product.status === "out") return;
    const items = cart();
    const existing = items.find((item) => item.slug === slug);
    if (existing) existing.qty += 1;
    else items.push({ slug, qty: 1 });
    saveCart(items);
    updateCartCounters();
    const quantity = items.find((item) => item.slug === slug).qty;
    showToast(`${product.name} · ${quantity} ${quantity === 1 ? "unidad" : "unidades"}`, "/demo/store/cart/");
  }

  function changeQty(slug, dir) {
    const items = cart()
      .map((item) => (item.slug === slug ? { ...item, qty: item.qty + dir } : item))
      .filter((item) => item.qty > 0);
    saveCart(items);
    rerender();
  }

  function bindEvents() {
    document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
      setTheme(getTheme() === "dark" ? "light" : "dark");
      rerender();
    });

    document.querySelector("[data-mobile-menu]")?.addEventListener("click", () => {
      document.querySelector("[data-mobile-panel]")?.classList.toggle("open");
    });

    document.querySelectorAll("[data-add-cart]").forEach((button) => {
      button.addEventListener("click", () => addToCart(button.dataset.addCart));
    });

    document.querySelectorAll("[data-qty]").forEach((button) => {
      button.addEventListener("click", () => changeQty(button.dataset.qty, Number(button.dataset.dir)));
    });

    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.filter;
        document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        const products = category === "Todos" ? data.products : data.products.filter((product) => product.category === category);
        const grid = document.querySelector("[data-product-grid]");
        if (grid) grid.outerHTML = productGrid(products);
        document.querySelectorAll("[data-add-cart]").forEach((addButton) => {
          addButton.addEventListener("click", () => addToCart(addButton.dataset.addCart));
        });
      });
    });

    const deliveryOptions = document.querySelector("[data-delivery-options]");
    const summary = document.querySelector("[data-checkout-summary]");
    deliveryOptions?.addEventListener("change", (event) => {
      document.querySelectorAll("[data-delivery-options] .option").forEach((optionNode) => optionNode.classList.remove("selected"));
      event.target.closest(".option")?.classList.add("selected");
      if (summary) summary.innerHTML = summaryLines(cartItems(), event.target.value);
    });

    document.querySelector("[data-payment-options]")?.addEventListener("change", (event) => {
      document.querySelectorAll("[data-payment-options] .option").forEach((optionNode) => optionNode.classList.remove("selected"));
      event.target.closest(".option")?.classList.add("selected");
    });

    document.querySelector("[data-checkout-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const code = `SO-DEMO-${Math.floor(2000 + Math.random() * 7000)}`;
      localStorage.setItem(orderKey, JSON.stringify({ code, createdAt: new Date().toISOString() }));
      saveCart([]);
      window.location.href = "/demo/store/order-success/";
    });
  }

  setTheme(getTheme());
  rerender();
})();
