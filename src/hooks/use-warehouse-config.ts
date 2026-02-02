'use client';

import { useMemo } from 'react';
import { warehouseConfig } from '@/config/warehouse-content';
import { useLanguage } from '@/contexts/language-context';

// Spanish translations for warehouseConfig
const spanishTranslations: any = {
  banner: {
    title: "NUEVA NAVE INDUSTRIAL CLASE A EN RENTA",
    subtitle: "Ubicación estratégica para operaciones logísticas y de última milla",
    description: "Presentamos uno de los desarrollos industriales más atractivos en Tlalnepantla: una nave de distribución Clase A estratégicamente ubicada en el altamente demandado submercado Tlalnepantla, epicentro de logística, e-commerce, transporte y entregas de última milla para la Ciudad de México y toda el Área Metropolitana.",
    ctaText: "Agenda un Recorrido",
    ctaLink: "#contact",
  },
  warehouseFeatures: {
    title: "Características Clave del Edificio",
    subtitle: "Especificaciones Clase \"A\"",
    features: [
      {
        label: "Área del Sitio",
        value: "9,791 m²",
        icon: "area",
      },
      {
        label: "Área Total Arrendable",
        value: "7,390 m²",
        icon: "rentable",
      },
      {
        label: "Área de Almacén",
        value: "6,590 m²",
        icon: "warehouse",
      },
      {
        label: "Mezzanine",
        value: "800 m²",
        description: "Ideal para oficinas o crecimiento operativo",
        icon: "mezzanine",
      },
      {
        label: "Altura Libre",
        value: "11.0 m",
        icon: "height",
      },
      {
        label: "Espaciado de Columnas",
        value: "12 × 24 m",
        description: "Óptimo para estanterías y maniobras internas",
        icon: "spacing",
      },
    ],
  },
  locations: {
    title: "Ubicación Estratégica Privilegiada",
    subtitle: "Acceso directo y eficiente a las principales zonas industriales",
    highlights: [
      "Ciudad de México",
      "Autopista México–Querétaro (57)",
      "Zona Industrial Vallejo",
      "San Martín Obispo",
      "Circuito Exterior Mexiquense",
      "Submercados industriales Cuautitlán–Tultitlán–Tepotzotlán",
      "Principales centros logísticos e industriales del norte del Valle de México",
    ],
    description: "Esta área es una de las zonas logísticas más consolidadas y demandadas del país, con niveles de desocupación extremadamente bajos y una ubicación privilegiada para distribución urbana.",
    addresses: [
      {
        name: "Almacén Tlalnepantla",
        address: "Avenida Prolongación Hidalgo No.3, Col. Pueblo San Pedro Barrientos, Municipio Tlalnepantla De Baez, Edo. De México, C.P. 54010",
        mapLink: "https://maps.app.goo.gl/mgj6YRcikX8zeznC8",
        usps: [
          " Ubicación infill premium con acceso  inmediato a los mercados de consumo y fuerza laboral más robustos de la Ciudad de México",
          "Ideal para operaciones de última milla gracias a su proximidad inigualable con CDMX",
          "Acceso directo a carreteras principales como Gustavo Baz y Periférico Norte",
          "Perfecto para e-commerce, cadenas de retail y logística urbana",
        ],
        idealFor: [
          "Logística y distribución metropolitana",
          "Operaciones de última milla y comercio electrónico",
          "Courier, paquetería y mensajería exprés",
          "Centros de cross-dock y consolidación",
          "Manufactura ligera",
        ],
      },
    ],
  },
  specifications: {
    title: "Especificaciones del Almacén",
    subtitle: "Características constructivas de clase mundial para una eficiencia operativa excepcional",
    tabs: [
      {
        id: "building",
        label: "Características del Edificio",
        items: [
          "Altura libre: 11.0 m",
          "Separación entre columnas: 12 × 24 m",
          " Muros: Concreto reforzado y panel metálico aislado",
          " Techo: Panel KR-18 con aislamiento termoacústico",
          "Iluminación natural: 10%",
          "Iluminación artificial: Luminarias LED",
        ],
      },
      {
        id: "infrastructure",
        label: "Infraestructura",
        items: [
          "Estacionamientos",
          "Andenes de carga",
          " Oficinas (mezanine de 800 m²)",
          "Suministro eléctrico",
          "Sistema contra incendios",
          "Sistema de pararrayos",
        ],
      },
      {
        id: "security",
        label: "Seguridad y Protección",
        items: [
          "Seguridad 24/7",
          "Videovigilancia CCTV",
          "Caseta de acceso controlado",
          "Protección contra incendios: hidrantes, mangueras y gabinetes",
        ],
      },
      {
        id: "operational",
        label: "Características Operativas",
        items: [
          "Acceso 24x7",
          "Sistemas automatizados",
          "Alturas libres de 11 m",
          "Compatibilidad para racks",
          "Andenes de carga",
          " Capacidades de cross-dock",
        ],
      },
    ],
  },
  targetIndustries: {
    title: "Ideal Para",
    subtitle: "Perfecto para diversas operaciones industriales y logísticas",
    industries: [
      {
        id: "ecommerce",
        name: "Comercio Electrónico",
        description: "Centros de cumplimiento y distribución de última milla",
      },
      {
        id: "logistics",
        name: "Logística y Distribución",
        description: "3PL, servicios de mensajería y paquetería",
      },
      {
        id: "retail",
        name: "Cadena de Suministro Minorista",
        description: "Minoristas y distribución de bienes de consumo rápido",
      },
      {
        id: "manufacturing",
        name: "Manufactura",
        description: "Manufactura ligera y ensamblaje",
      },
      {
        id: "pharma",
        name: "Farmacéutico",
        description: "Distribución y almacenamiento farmacéutico",
      },
      {
        id: "automotive",
        name: "Automotriz",
        description: "Piezas y componentes automotrices",
      },
    ],
  },
  availability: {
    status: "INMEDIATO",
    statusText: "Cronograma perfecto para la planeación operativa y la adecuación del espacio",
    pricing: "Contactar para precios",
    pricingModel: "Términos de Renta",
    leaseTerms: "Contrato mínimo de 36 meses",
  },
  ctas: {
    primary: {
      text: "Agenda un Recorrido",
      link: "#contact",
    },
    secondary: {
      text: "Programar Llamada",
      link: "#contact",
    },
    whatsapp: {
      text: "Contactar vía WhatsApp",
      link: "https://wa.me/525512345678",
    },
    download: {
      text: "Descargar Folleto",
      link: "/brochure.pdf",
    },
  },
  leadForm: {
    title: "Póngase en Contacto",
    subtitle: "Completa el formulario y nos pondremos en contacto contigo.",
    fields: [
      { name: "fullName", label: "Nombre Completo", type: "text", required: true },
      { name: "companyName", label: "Nombre de la Empresa", type: "text", required: true },
      { name: "phone", label: "Número de Teléfono", type: "tel", required: true },
      { name: "email", label: "Correo Electrónico", type: "email", required: true },
      { name: "warehouseSize", label: "Requerimientos de superficie", type: "text", required: false },
      { name: "preferredLocation", label: "Ubicación Preferida", type: "select", options: ["Tlalnepantla", "Jilotepec", "Ambos"], required: false },
      { name: "budget", label: "Presupuesto", type: "text", required: false },
      { name: "leaseDuration", label: "Duración del contrato de renta", type: "text", required: false },
      { name: "timeline", label: "Fecha estimada de ocupación", type: "text", required: false },
      { name: "additionalNotes", label: "Notas Adicionales", type: "textarea", required: false },
    ],
  },
  disclaimer: "Esta información ha sido preparada por Newmark únicamente con fines informativos. Newmark no otorga garantías ni realiza declaraciones de ningún tipo, expresas o implícitas, respecto a la información contenida, incluyendo, entre otras, garantías sobre su contenido, exactitud y confiabilidad. Cualquier parte interesada deberá realizar su propia investigación para verificar la exactitud de la información. Newmark excluye de manera inequívoca todos los términos, condiciones y garantías inferidos o implícitos que pudieran derivarse de este documento, y excluye toda responsabilidad por pérdidas o daños que pudieran surgir del mismo.",
};

// Additional UI translations
const uiTranslations: Record<string, Record<string, string>> = {
  en: {
    'locationComparison.title': 'Choose Your Ideal Location',
    'locationComparison.subtitle': 'A strategic location, optimized for operational efficiency. Discover how it can perfectly support your business needs.',
    'locationComparison.keyAdvantages': 'Key Advantages',
    'locationComparison.idealFor': 'Ideal For',
    'locationComparison.openInMaps': 'Open in Google Maps',
    'locations.strategicAccessPoints': 'Strategic Access Points',
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Explore our state-of-the-art warehouse facilities through our photo and video gallery. See the quality and features that make our spaces ideal for your operations.',
    'availability.title': 'Availability & Pricing',
    'availability.subtitle': 'Ready to move in immediately. Flexible pricing options to suit your business needs.',
    'availability.leaseTerms': 'Lease Terms',
    'availability.getQuote': 'Get Quote',
    'availability.contactUs': 'Contact Us',
    'cta.title': 'Ready to Get Started?',
    'cta.subtitle': 'Explore our Class A warehouse facilities and discover how we can support your business operations.',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Choose your preferred method to contact us. We are here to help you find the perfect warehouse solution.',
    'contact.whatsapp': 'WhatsApp',
    'contact.chatWithUs': 'Chat with us instantly',
    'contact.callUs': 'Call Us',
    'contact.contactUs': 'Contact Us',
    'form.submitting': 'Submitting...',
    'form.required': 'is required',
    'form.invalidEmail': 'Please enter a valid email address',
    'form.invalidPhone': 'Please enter a valid phone number',
    'form.invalidPhoneLength': 'Phone number must be 9-12 digits',
    'form.invalidPhoneDigits': 'Please match the requested format (only digits)',
    'form.success': "✅ Thank you! We've received your inquiry and will get back to you shortly.",
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.ourLocations': 'Our Locations',
    'footer.disclaimer': 'Disclaimer',
  },
  es: {
    'locationComparison.title': 'Elija Su Ubicación Ideal',
    'locationComparison.subtitle': 'Una ubicación estratégica, optimizada para la eficiencia operativa. Descubra cómo puede apoyar perfectamente las necesidades de su negocio.',
    'locationComparison.keyAdvantages': 'Ventajas Clave',
    'locationComparison.idealFor': 'Ideal Para',
    'locationComparison.openInMaps': 'Abrir en Google Maps',
    'locations.strategicAccessPoints': 'Puntos de Acceso Estratégicos',
    'gallery.title': 'Galería',
    'gallery.subtitle': 'Explora nuestras instalaciones de vanguardia a través de la galería de fotos y videos. Conoce la calidad y características que hacen que nuestros espacios sean ideales para tus operaciones.',
    'availability.title': 'Disponibilidad y Precios',
    'availability.subtitle': 'Listo para ocupar de inmediato. Opciones de precios flexibles según tus necesidades.',
    'availability.leaseTerms': 'Términos de Arrendamiento',
    'availability.getQuote': 'Obtener Cotización',
    'availability.contactUs': 'Solicita Cotización',
    'cta.title': '¿Listo para Comenzar?',
    'cta.subtitle': 'Explora nuestras naves industriales Clase A y descubre cómo podemos apoyar tus operaciones.',
    'contact.title': 'Contáctenos',
    'contact.subtitle': 'Elige el método de contacto que prefieras. Estamos aquí para ayudarte a encontrar la solución de almacén perfecta.',
    'contact.whatsapp': 'WhatsApp',
    'contact.chatWithUs': 'Chatea con nosotros al instante',
    'contact.callUs': 'Llámanos',
    'contact.contactUs': 'Contáctenos',
    'form.submitting': 'Enviando...',
    'form.required': 'es requerido',
    'form.invalidEmail': 'Por favor ingrese una dirección de correo electrónico válida',
    'form.invalidPhone': 'Por favor ingrese un número de teléfono válido',
    'form.invalidPhoneLength': 'El número debe tener entre 9 y 12 dígitos (solo dígitos)',
    'form.invalidPhoneDigits': 'Solo dígitos válidos, no letras (solo dígitos)',
    'form.success': '✅ ¡Gracias! Hemos recibido su consulta y nos pondremos en contacto con usted pronto.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contact': 'Contacto',
    'footer.ourLocations': 'Nuestras Ubicaciones',
    'footer.disclaimer': 'Descargo de Responsabilidad',
  },
};

export function useWarehouseConfig() {
  const { language } = useLanguage();

  return useMemo(() => {
    if (language === 'es') {
      // Deep merge Spanish translations with original config
      return {
        ...warehouseConfig,
        banner: { ...warehouseConfig.banner, ...spanishTranslations.banner },
        warehouseFeatures: { ...warehouseConfig.warehouseFeatures, ...spanishTranslations.warehouseFeatures },
        locations: { ...warehouseConfig.locations, ...spanishTranslations.locations },
        specifications: { ...warehouseConfig.specifications, ...spanishTranslations.specifications },
        targetIndustries: { ...warehouseConfig.targetIndustries, ...spanishTranslations.targetIndustries },
        availability: { ...warehouseConfig.availability, ...spanishTranslations.availability },
        ctas: { ...warehouseConfig.ctas, ...spanishTranslations.ctas },
        leadForm: { ...warehouseConfig.leadForm, ...spanishTranslations.leadForm },
        disclaimer: spanishTranslations.disclaimer,
      };
    }
    return warehouseConfig;
  }, [language]);
}

export function useUITranslations() {
  const { language, t } = useLanguage();
  
  return useMemo(() => {
    return (key: string): string => {
      return uiTranslations[language]?.[key] || uiTranslations.en[key] || key;
    };
  }, [language, t]);
}

