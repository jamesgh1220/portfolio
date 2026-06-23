/**
 * @typedef {Object} Project
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {string[]} stack
 * @property {{ demo?: string, repo?: string }} links
 */

/**
 * @typedef {Object} Experience
 * @property {string} company
 * @property {string} role
 * @property {string} period
 * @property {string} description
 * @property {string[]} stack
 */

/**
 * @typedef {Object} TechItem
 * @property {string} name
 * @property {'frontend' | 'backend' | 'tools'} category
 */

export const portfolio = {
  branding: {
    name: 'John James',
    lastName: 'Gallego Hernández',
    role: 'Desarrollador de software',
    tagline:
      'Desarrollador fullstack con 3 años de experiencia creando aplicaciones digitales funcionales, escalables e intuitivas. Especializado en desarrollo web, con enfoque en la transformación de ideas complejas en interfaces claras.',
  },

  about: {
    bio: 'Desarrollador de software con experiencia en desarrollo web y móvil, especializado en la creación de aplicaciones eficientes, escalables y mantenibles. Trabajo tanto en backend como en frontend, utilizando tecnologías modernas y buenas prácticas de arquitectura de software. Cuento con experiencia en PHP y Laravel, Node.js, y en el desarrollo de interfaces con Vue.js, React y Angular. Manejo HTML5, CSS3, SCSS, Bootstrap y Tailwind CSS para la construcción de interfaces responsivas y orientadas a la experiencia de usuario. He desarrollado aplicaciones multiplataforma utilizando Ionic y Quasar. Poseo conocimientos sólidos en bases de datos MySQL y MongoDB, optimizando consultas y estructuras. Utilizo Git para el control de versiones y trabajo colaborativo. Me caracterizo por mi pensamiento analítico, capacidad de resolución de problemas y búsqueda constante de nuevas tecnologías para aportar soluciones eficientes y escalables.',
    highlights: [
      { label: 'Experiencia', value: '3+ años' },
      { label: 'Formación', value: 'Ingeniero informático' },
      { label: 'Ubicación', value: 'Medellín, Colombia' },
      {
        label: 'Disponibilidad',
        value: 'Freelance y colaboración',
      },
    ],
    image: '/images/hero-image.webp',
  },

  projects: [
    {
      title: 'SpeechRecognitionIos',
      description:
        'Plugin nativo para Capacitor (iOS) desarrollado en Swift, que permite integrar reconocimiento de voz a texto en aplicaciones móviles híbridas. Gestiona permisos del sistema, captura de audio y devuelve el texto transcrito en tiempo real a JavaScript.',
      image: '/images/plugin-capacitor.png',
      stack: ['Swift', 'Capacitor', 'TypeScript'],
      links: {
        repo: 'https://github.com/jamesgh1220/speech-recognizer-ios',
      },
    },
    {
      title: 'QRStock',
      description:
        'App móvil de gestión de inventarios con Ionic + Angular. Genera y escanea códigos QR únicos por producto, almacenando datos localmente. Ejemplo de integración entre frontend híbrido y capacidades nativas.',
      image: '/images/inventory.png',
      stack: ['Ionic', 'Angular', 'TypeScript', 'Capacitor'],
      links: { repo: 'https://github.com/jamesgh1220/InventoryApp' },
    },
    {
      title: 'FinanzasPRO',
      description:
        'Aplicación web para la gestión de finanzas personales con dashboard de métricas clave, administración de deudas, registro de ingresos y gráficos interactivos para el análisis de datos financieros.',
      image: '/images/finanzas.png',
      stack: ['React', 'Next.js', 'Tailwind', 'ReCharts'],
      links: { repo: 'https://github.com/jamesgh1220/finanzas_pro' },
    },
    {
      title: 'Repositorio',
      description: 'Repositorio personal con proyectos y contribuciones de desarrollo web y móvil.',
      image: '/images/repositorio.png',
      stack: ['GitHub'],
      links: { repo: 'https://github.com/jamesgh1220' },
    },
  ],

  experience: [
    {
      company: 'GMA Digital SAS',
      role: 'Desarrollador fullstack',
      period: 'Sep 2022 — Presente',
      description:
        'Desarrollo de funcionalidades Backend y Frontend. Uso de Vue.js, Pinia.js, Angular, Tailwind y Laravel. Creación de aplicaciones móviles multiplataforma con Ionic y Quasar. Gestión y administración de bases de datos en MySQL y SQL Server. Colaboración en equipos de trabajo utilizando metodologías ágiles.',
      stack: ['Vue.js', 'Laravel', 'Ionic', 'Quasar', 'MySQL'],
    },
    {
      company: 'History Clinical',
      role: 'Desarrollador fullstack',
      period: 'Mar 2022 — Ago 2022',
      description:
        'Desarrollo de funcionalidades Backend y Frontend. Desarrollo fullstack con PHP nativo. Administración y optimización de bases de datos en MySQL.',
      stack: ['PHP', 'MySQL'],
    },
    {
      company: 'Politécnico Colombiano Jaime Izasa Cadavid',
      role: 'Desarrollador fullstack',
      period: 'Mar 2022 — Jul 2022',
      description:
        'Desarrollo de funcionalidades Backend y Frontend con React y Laravel. Gestión y administración de bases de datos en MySQL. Desarrollo de una aplicación para la visualización de métricas estadísticas basadas en información histórica de la universidad.',
      stack: ['React', 'Laravel', 'MySQL'],
    },
    {
      company: 'Freelance',
      role: 'Desarrollador Web',
      period: '2020 — Mar 2022',
      description:
        'Proyectos a medida para pymes: landing pages, tiendas online y sistemas de reservas.',
      stack: ['JavaScript', 'PHP', 'WordPress', 'MySQL'],
    },
  ],

  stack: [
    { name: 'Vue.js', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'HTML/CSS', category: 'frontend' },
    { name: 'React/Next.js', category: 'frontend' },
    { name: 'Ionic', category: 'frontend' },
    { name: 'Quasar', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'PHP/Laravel', category: 'backend' },
    { name: 'Nest.js', category: 'backend' },
    { name: 'MySQL', category: 'backend' },
    { name: 'REST APIs', category: 'backend' },
    { name: 'Git/GitHub', category: 'tools' },
    { name: 'Docker', category: 'tools' },
  ],

  contact: {
    email: 'jamesgh.1220@gmail.com',
    phone: '+57 313 360 4722',
    github: 'github.com/jamesgh1220',
    linkedin: '',
    linkedinLabel: 'Próximamente',
    location: 'Medellín, Colombia',
    availability:
      'Actualmente disponible para proyectos freelance y oportunidades de colaboración.',
  },
};

export const stackCategories = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Herramientas',
};
