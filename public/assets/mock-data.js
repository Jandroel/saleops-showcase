window.SaleOpsData = {
  categories: [
    "Laptops",
    "Perifericos",
    "Audio",
    "Monitores",
    "Conectividad",
    "Home office",
    "Productividad",
    "Gamer sobrio"
  ],
  products: [
    {
      slug: "monitor-ultraview-27",
      name: "Monitor UltraView 27",
      category: "Monitores",
      price: 899,
      previousPrice: 1049,
      stock: 6,
      status: "low",
      accent: "cyan",
      description: "Panel QHD de 27 pulgadas para productividad, diseno y multitarea diaria.",
      specs: ["QHD 1440p", "USB-C", "75 Hz", "Base ajustable"]
    },
    {
      slug: "teclado-proline-mx",
      name: "Teclado ProLine MX",
      category: "Perifericos",
      price: 289,
      previousPrice: 329,
      stock: 4,
      status: "low",
      accent: "indigo",
      description: "Teclado mecanico sobrio para equipos que escriben, venden y operan todo el dia.",
      specs: ["Switch tactile", "Bluetooth", "USB-C", "Layout compacto"]
    },
    {
      slug: "mouse-aero-precision",
      name: "Mouse Aero Precision",
      category: "Perifericos",
      price: 149,
      previousPrice: null,
      stock: 32,
      status: "available",
      accent: "emerald",
      description: "Mouse inalambrico ligero con precision estable para trabajo y gaming moderado.",
      specs: ["2.4 GHz", "Bluetooth", "Silent click", "USB-C"]
    },
    {
      slug: "webcam-focus-4k",
      name: "Webcam Focus 4K",
      category: "Productividad",
      price: 379,
      previousPrice: 429,
      stock: 0,
      status: "out",
      accent: "rose",
      description: "Webcam 4K con encuadre amplio para reuniones, clases y contenido profesional.",
      specs: ["4K", "Autofocus", "Microfono dual", "Clip universal"]
    },
    {
      slug: "audifonos-clarity-pro",
      name: "Audifonos Clarity Pro",
      category: "Audio",
      price: 459,
      previousPrice: null,
      stock: 14,
      status: "available",
      accent: "amber",
      description: "Audifonos con cancelacion activa para llamadas claras y concentracion.",
      specs: ["ANC", "40 h bateria", "Multipunto", "Estuche rigido"]
    },
    {
      slug: "dock-usb-c-12-en-1",
      name: "Dock USB-C 12 en 1",
      category: "Conectividad",
      price: 319,
      previousPrice: 369,
      stock: 8,
      status: "available",
      accent: "violet",
      description: "Dock compacto para conectar monitores, red, memoria y carga desde un solo puerto.",
      specs: ["HDMI", "Ethernet", "PD 100W", "SD/microSD"]
    },
    {
      slug: "laptop-novabook-air",
      name: "Laptop NovaBook Air",
      category: "Laptops",
      price: 3299,
      previousPrice: 3599,
      stock: 5,
      status: "low",
      accent: "sky",
      description: "Laptop delgada para oficina, ventas, navegacion, video llamadas y gestion diaria.",
      specs: ["14 pulgadas", "16 GB RAM", "512 GB SSD", "1.25 kg"]
    },
    {
      slug: "silla-ergo-flex",
      name: "Silla Ergo Flex",
      category: "Home office",
      price: 799,
      previousPrice: null,
      stock: 11,
      status: "available",
      accent: "lime",
      description: "Silla ergonomica con soporte lumbar para jornadas largas de trabajo.",
      specs: ["Soporte lumbar", "Apoyabrazos", "Malla respirable", "Reclinable"]
    },
    {
      slug: "pack-home-office-plus",
      name: "Pack Home Office Plus",
      category: "Home office",
      price: 1199,
      previousPrice: 1399,
      stock: 9,
      status: "available",
      accent: "orange",
      description: "Pack de escritorio, soporte, teclado y mouse para renovar un espacio de trabajo.",
      specs: ["4 piezas", "Ahorro bundle", "Setup limpio", "Garantia local"]
    },
    {
      slug: "soporte-aluminio-laptop",
      name: "Soporte Aluminio Laptop",
      category: "Productividad",
      price: 129,
      previousPrice: null,
      stock: 2,
      status: "low",
      accent: "slate",
      description: "Soporte plegable para elevar la pantalla y mejorar postura en escritorio.",
      specs: ["Aluminio", "Plegable", "Antideslizante", "Ligero"]
    },
    {
      slug: "microfono-streamline",
      name: "Microfono StreamLine",
      category: "Audio",
      price: 269,
      previousPrice: 319,
      stock: 0,
      status: "out",
      accent: "fuchsia",
      description: "Microfono USB para reuniones, streaming sobrio y grabaciones rapidas.",
      specs: ["USB-C", "Mute fisico", "Base metalica", "Filtro pop"]
    },
    {
      slug: "escritorio-stand-fit",
      name: "Escritorio Stand Fit",
      category: "Home office",
      price: 1499,
      previousPrice: 1699,
      stock: 7,
      status: "available",
      accent: "emerald",
      description: "Escritorio regulable para alternar trabajo sentado y de pie.",
      specs: ["Motor silencioso", "Memorias", "120 cm", "Carga 70 kg"]
    }
  ],
  orders: [
    { code: "SO-2048", customer: "Mariana Ruiz", total: 1288, status: "Pending", delivery: "Delivery local", payment: "Yape/Plin manual", time: "Hace 12 min" },
    { code: "SO-2047", customer: "Javier Torres", total: 608, status: "Confirmed", delivery: "Recojo en tienda", payment: "Pago al recoger", time: "Hace 36 min" },
    { code: "SO-2046", customer: "Lucia Perez", total: 3299, status: "Preparing", delivery: "Delivery local", payment: "Transferencia bancaria", time: "Hace 1 h" },
    { code: "SO-2045", customer: "Cliente invitado", total: 149, status: "ReadyForPickup", delivery: "Recojo en tienda", payment: "Tarjeta simulada", time: "Hace 2 h" },
    { code: "SO-2044", customer: "Renato Silva", total: 1199, status: "Completed", delivery: "Delivery local", payment: "Pago contra entrega", time: "Ayer" }
  ],
  metrics: [
    { label: "Ventas del mes", value: "S/ 48,920", delta: "+18%", tone: "success" },
    { label: "Pedidos pendientes", value: "24", delta: "6 urgentes", tone: "warning" },
    { label: "Bajo stock", value: "6", delta: "3 criticos", tone: "danger" },
    { label: "Ticket promedio", value: "S/ 286", delta: "+7%", tone: "info" }
  ],
  salesSeries: [
    { day: "Lun", sales: 4200, orders: 18 },
    { day: "Mar", sales: 5100, orders: 21 },
    { day: "Mie", sales: 4700, orders: 19 },
    { day: "Jue", sales: 6900, orders: 28 },
    { day: "Vie", sales: 7600, orders: 31 },
    { day: "Sab", sales: 6400, orders: 24 },
    { day: "Dom", sales: 5900, orders: 22 }
  ],
  aiInsights: [
    "El producto con mejor rendimiento este mes es Monitor UltraView 27.",
    "Hay 6 productos con bajo stock y 2 agotados en la demo.",
    "Los pedidos con recojo en tienda representan el 58% de las ventas simuladas.",
    "Se recomienda reponer teclados mecanicos y webcams antes de la campana de regreso a clases."
  ]
};
