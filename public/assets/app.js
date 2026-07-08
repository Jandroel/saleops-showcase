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
            <span class="brand-mark">SO</span>
            <span>SaleOps</span>
          </a>
          <div class="nav-links">
            <a class="nav-link${active("/")}" href="/">Inicio</a>
            <a class="nav-link${active("/demo/store/")}" href="/demo/store/">Tienda demo</a>
            <a class="nav-link${active("/demo/admin/")}" href="/demo/admin/">Panel interno</a>
            <a class="nav-link${active("/docs/")}" href="/docs/">Docs</a>
            <a class="nav-link${active("/roadmap/")}" href="/roadmap/">Roadmap</a>
          </div>
          <div class="nav-actions">
            <a class="btn ghost desktop-only" href="/demo/store/cart/" aria-label="Ver carrito">${icon("bag")}<span data-cart-count>${cartCount()}</span></a>
            <button class="btn icon-btn" data-theme-toggle aria-label="Cambiar tema">${icon(getTheme() === "dark" ? "sun" : "moon")}</button>
            <button class="btn icon-btn mobile-menu-btn" data-mobile-menu aria-label="Abrir menu">${icon("menu")}</button>
          </div>
        </nav>
        <div class="mobile-panel" data-mobile-panel>
          <a class="nav-link" href="/demo/store/">Tienda demo</a>
          <a class="nav-link" href="/demo/admin/">Panel interno</a>
          <a class="nav-link" href="/docs/">Docs tecnicos</a>
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
            <a class="brand" href="/"><span class="brand-mark">SO</span><span>SaleOps</span></a>
            <p style="max-width: 560px; margin: 14px 0 0;">Showcase publico con datos simulados para presentar una plataforma ecommerce-first single-tenant.</p>
          </div>
          <div class="stack-grid" aria-label="Enlaces">
            <a class="stack-pill" href="/docs/">Docs</a>
            <a class="stack-pill" href="/roadmap/">Roadmap</a>
            <a class="stack-pill" href="/demo/store/">Demo tienda</a>
            <a class="stack-pill" href="/demo/admin/">Demo panel</a>
          </div>
        </div>
      </footer>
      <div class="toast" data-toast></div>
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
      <svg class="chart" viewBox="0 0 560 270" role="img" aria-label="Grafico mock de ventas">
        <line x1="20" y1="226" x2="540" y2="226" stroke="var(--line)" />
        ${bars}
        <polyline points="${points}" fill="none" stroke="var(--primary)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  function landingPage() {
    const modules = [
      ["Tienda online", "Home, catalogo, busqueda, detalle, carrito y checkout simulado.", "store"],
      ["Pedidos", "Estados operativos desde Pending hasta Completed.", "truck"],
      ["Inventario", "Stock visible, bajo stock, agotados y movimientos conceptuales.", "boxes"],
      ["Ventas", "Lectura de ingresos simulados y ventas presenciales futuras.", "chart"],
      ["Clientes", "Cliente registrado e invitado separados del usuario interno.", "users"],
      ["Reportes", "Metricas, productos destacados y resumen de pedidos.", "dashboard"],
      ["IA interna", "Insights simulados solo para Admin y Vendedor.", "spark"],
      ["Seguridad", "RBAC, auditoria, rate limiting y privacidad documentados.", "shield"]
    ];
    const repos = [
      ["saleops-showcase", "Publico", "Landing, demo visual, flujo simulado y documentacion publica."],
      ["saleops-frontend", "Privado", "Tienda real y panel administrativo para cada instalacion."],
      ["saleops-backend", "Privado", "API, PostgreSQL, auth, RBAC, reportes, IA interna y tests."]
    ];
    const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS", "PostgreSQL", "Prisma", "Docker", "Swagger/OpenAPI", "IA interna"];

    return pageShell(`
      <main>
        <section class="hero">
          <div class="hero-inner">
            <div class="hero-copy">
              <p class="eyebrow">${icon("spark")} Ecommerce-first single-tenant</p>
              <h1>SaleOps</h1>
              <p class="hero-lead">Vende online y gestiona tu operacion desde un solo lugar. SaleOps combina tienda online, pedidos, inventario, ventas, clientes, reportes e insights internos para negocios que quieren vender mejor.</p>
              <div class="hero-actions">
                <a class="btn primary" href="/demo/store/">${icon("store")} Ver demo</a>
                <a class="btn ghost" href="/docs/">${icon("docs")} Ver documentacion</a>
              </div>
              <div class="hero-stats">
                <div class="stat-pill"><strong>12</strong><span>productos mock visibles</span></div>
                <div class="stat-pill"><strong>5</strong><span>estados de pedido en demo</span></div>
                <div class="stat-pill"><strong>0</strong><span>servicios externos sensibles</span></div>
              </div>
            </div>
          </div>
        </section>

        <section class="section band-soft">
          <div class="section-inner">
            ${sectionHeading("Problema y solucion", "De ventas dispersas a operacion conectada", "Muchos negocios venden por redes, mensajes y hojas de calculo. SaleOps muestra como una tienda online puede conectarse con pedidos, inventario, ventas y reportes sin convertirse en un ERP completo.")}
            <div class="grid two">
              ${moduleCard("Antes", "Catalogos manuales, pagos por coordinar, stock incierto y poco contexto para decidir reposicion.", "search")}
              ${moduleCard("Con SaleOps", "Una experiencia ecommerce-first con backoffice operativo, estados claros e insights internos simulados.", "check")}
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-inner">
            ${sectionHeading("Modulos", "La columna vertebral del producto", "El showcase presenta los modulos del MVP con datos simulados y sin backend real.")}
            <div class="grid four">${modules.map((item) => moduleCard(item[0], item[1], item[2])).join("")}</div>
          </div>
        </section>

        <section class="section band">
          <div class="section-inner">
            ${sectionHeading("NovaTech Store", "Demo visual de tienda", "La tienda mock usa productos de tecnologia, accesorios, perifericos y home office.", `<a class="btn primary" href="/demo/store/products/">${icon("arrow")} Abrir catalogo</a>`)}
            ${productGrid(data.products.slice(0, 4))}
          </div>
        </section>

        <section class="section">
          <div class="section-inner">
            ${sectionHeading("Backoffice", "Panel interno simulado", "Metricas, pedidos recientes, alertas de stock, grafico mock e IA interna simulada para usuarios internos.", `<a class="btn ghost" href="/demo/admin/">${icon("dashboard")} Ver panel</a>`)}
            <div class="metric-grid">${data.metrics.map(metricCard).join("")}</div>
            <div style="height:16px"></div>
            <div class="dashboard-grid">
              <div class="card"><h3>Ventas mock por dia</h3>${salesChart()}</div>
              <div class="card"><h3>IA interna simulada</h3><p>${data.aiInsights[0]}</p><p>${data.aiInsights[3]}</p></div>
            </div>
          </div>
        </section>

        <section class="section band-soft">
          <div class="section-inner">
            ${sectionHeading("Arquitectura", "Tres repositorios con responsabilidades claras", "El showcase publico cuenta la historia del producto sin exponer implementacion privada ni logica sensible.")}
            <div class="grid three">
              ${repos.map((repo, index) => `<article class="card repo-card"><span class="repo-index">0${index + 1}</span><div><h3>${repo[0]}</h3><p><strong>${repo[1]}.</strong> ${repo[2]}</p></div></article>`).join("")}
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-inner">
            ${sectionHeading("Stack", "Base tecnica propuesta", "El showcase es estatico para publicarse sin backend. La version real mantiene la arquitectura documentada en Fase 0.")}
            <div class="stack-grid">${stack.map((item) => `<span class="stack-pill">${item}</span>`).join("")}</div>
          </div>
        </section>

        <section class="section band">
          <div class="section-inner">
            ${sectionHeading("Roadmap", "MVP enfocado, futuro ordenado", "SaleOps avanza desde showcase publico hacia frontend real, backend, catalogo, checkout, panel interno, reportes e IA.")}
            ${roadmapList(true)}
          </div>
        </section>

        <section class="section">
          <div class="section-inner">
            <div class="disclaimer"><strong>Demo publica.</strong> Esta demo usa datos simulados y no contiene backend real ni logica sensible. La version completa de SaleOps esta disenada para implementaciones privadas por negocio.</div>
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
              <p class="hero-lead">Explora una tienda demo con productos mock, categorias, bajo stock, agotados, carrito y checkout simulado.</p>
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
          ${sectionHeading("Catalogo", "Productos mock de NovaTech Store", "Filtra categorias, abre detalles y agrega productos disponibles al carrito simulado.")}
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
            ${sectionHeading("Carrito", "Tu carrito simulado esta vacio", "Agrega productos desde el catalogo para continuar al checkout mock.")}
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
            <p class="eyebrow">${icon("shield")} Checkout simulado</p>
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
              ${option("payment", "yape", "Yape/Plin manual", "Referencia manual simulada.")}
              ${option("payment", "transfer", "Transferencia bancaria", "Sin integracion bancaria real.")}
              ${option("payment", "card", "Tarjeta simulada", "Solo para demo visual.")}
            </div>
            <button class="btn primary" style="width:100%; margin-top: 18px;" type="submit">${icon("check")} Confirmar pedido simulado</button>
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
              <p>Pedido simulado creado con datos locales. Estado inicial: Pending.</p>
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
          ${sectionHeading("Panel interno simulado", title, "Vista publica con datos mock. No hay login real, backend, base de datos ni IA real.")}
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
        <section class="card"><h3>Ventas mock por dia</h3>${salesChart()}</section>
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
        <section class="card"><h3>Ventas simuladas</h3>${salesChart()}</section>
        <section class="card"><h3>Resumen</h3><p>Ingresos simulados del mes: <strong>S/ 48,920</strong></p><p>Productos mas vendidos: Monitor UltraView 27, Teclado ProLine MX y Dock USB-C 12 en 1.</p><p>Pedidos con recojo en tienda: <strong>58%</strong>.</p></section>
      </div>
      <div style="height:16px"></div>
      <div class="grid three">
        ${moduleCard("Bajo stock", "6 productos requieren revision antes de nueva campana.", "boxes")}
        ${moduleCard("Poca rotacion", "2 productos agotados y 3 con movimiento bajo en esta demo.", "chart")}
        ${moduleCard("Delivery local", "Flujo manual sin mapa ni repartidores en tiempo real.", "truck")}
      </div>
    `, "Reportes visuales");
  }

  function aiPage() {
    return adminShell(`
      <section class="ai-thread">
        ${data.aiInsights.map((insight, index) => `<article class="ai-message"><span class="badge info">Insight mock ${index + 1}</span><p style="margin-top:12px;">${insight}</p><small style="color:var(--muted);">Fuente simulada: ventas, pedidos e inventario de NovaTech Store.</small></article>`).join("")}
      </section>
    `, "IA interna simulada");
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
          ${sectionHeading("Documentacion publica", "Resumen tecnico del showcase", "Esta ruta sintetiza la Fase 0 y explica que este repositorio no contiene frontend real completo ni backend real.")}
          <div class="grid two">
            ${moduleCard("Showcase publico", "Landing, tienda demo, panel admin simulado, reportes visuales, IA mock y documentacion publica.", "store")}
            ${moduleCard("Version privada", "El frontend y backend reales viviran en repositorios privados por seguridad, integraciones y datos sensibles.", "shield")}
          </div>
          <div style="height:16px"></div>
          <div class="table-wrap"><table><thead><tr><th>Documento</th><th>Archivo</th></tr></thead><tbody>${docs.map((doc) => `<tr><td>${doc[0]}</td><td>${doc[1]}</td></tr>`).join("")}</tbody></table></div>
        </div>
      </main>
    `);
  }

  function roadmapList(compact = false) {
    const phases = [
      ["Fase 0", "Documentacion y decisiones base."],
      ["Fase 1", "Showcase publico inicial."],
      ["Fase 2", "Frontend real base."],
      ["Fase 3", "Backend real base."],
      ["Fase 4", "Catalogo, productos e inventario."],
      ["Fase 5", "Carrito, checkout y pedidos."],
      ["Fase 6", "Panel interno operativo."],
      ["Fase 7", "Reportes e IA interna."],
      ["Fase 8", "Calidad, tests, CI y despliegue."]
    ];
    const list = compact ? phases.slice(0, 5) : phases;
    return `<div class="roadmap">${list.map((phase) => `<article class="roadmap-item"><span class="phase">${phase[0]}</span><p>${phase[1]}</p></article>`).join("")}</div>`;
  }

  function roadmapPage() {
    return pageShell(`
      <main class="section">
        <div class="section-inner">
          ${sectionHeading("Roadmap", "Fases de implementacion", "La ruta mantiene el MVP enfocado y separa mejoras futuras como pagos reales, facturacion, WhatsApp, multiempresa y app movil.")}
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

  function showToast(message) {
    const toast = document.querySelector("[data-toast]");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 1900);
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
    showToast(`${product.name} agregado al carrito`);
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
