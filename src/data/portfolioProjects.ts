export interface ProjectData {
  id: string
  title: string
  shortDescription: string
  detailedDescription: string
  category: string
  services: string[]
  technologies: string[]
  platforms: string[]
  keyFeatures: string[]
  images: {
    banner: string
    preview: string
    screenshots?: string[]
    bannerAlt?: string
    previewAlt?: string
    screenshotAlts?: string[]
  }
  videoUrl?: string
  videoPoster?: string
  currentNote?: string
  metrics?: {
    users?: string
    performance?: string
    marketPosition?: string
  }
  businessImpact?: string
  clientTestimonial?: string
  completionYear?: string
  projectDuration?: string
  teamSize?: string
  visitUrl?: string
  isCurrentProject?: boolean
  appStoreUrl?: string
  playStoreUrl?: string
  demoUrl?: string
  caseStudyUrl?: string
  awards?: string[]
  highlights?: string[]
}

export const portfolioProjects: ProjectData[] = [
  {
    id: 'miremadi',
    title: 'Miremadi Dermatology Medical Clinic',
    shortDescription:
      'Modern, conversion-focused clinic website highlighting services, trust signals, and appointment flow.',
    detailedDescription:
      'A premium dermatology clinic website designed to build patient confidence with clear service pathways, physician credibility, and streamlined appointment booking.',
    category: 'Healthcare',
    services: ['Web Design', 'Web Development', 'Brand Experience', 'SEO'],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    platforms: ['Website'],
    keyFeatures: [
      'Service-led navigation for fast patient discovery',
      'Physician-led trust signals and credentials',
      'Conversion-ready CTA placement',
      'Mobile-first performance',
    ],
    images: {
      banner: '/images/portfolio/banners/miremadi-banner.jpg',
      preview: '/images/portfolio/banners/miremadi-banner.jpg',
      bannerAlt:
        'Miremadi Dermatology Medical Clinic website showcasing services and doctor profile',
      previewAlt: 'Miremadi Dermatology Medical Clinic homepage preview',
    },
    videoUrl: '/videos/portfolio/miremadi-demo.mp4',
    videoPoster: '/images/portfolio/banners/miremadi-banner.jpg',
    currentNote: 'E-commerce coming soon',
    metrics: {
      users: 'Patient-first UX',
      performance: 'Fast load, mobile-ready',
      marketPosition: 'Premium clinic presence',
    },
    completionYear: '2025',
    projectDuration: '6 weeks',
    teamSize: '3 specialists',
    visitUrl: 'https://drmiremadi.com',
    isCurrentProject: true,
    highlights: ['Premium medical brand presentation', 'Conversion-focused booking flow'],
  },
  {
    id: 'lawazm',
    title: 'Lawazm - Enterprise E-commerce Platform',
    shortDescription:
      'Complete online store with 5,000+ household products, trusted by families across Kuwait and the Middle East.',
    detailedDescription:
      'Lawazm is a comprehensive e-commerce platform established as a distinguished electronic marketplace in Kuwait and the Middle East, specializing in household products, baby & children needs, and family supplies. With over 25 years of trading experience, the platform features more than 5,000 unique, high-quality household products from prominent global manufacturers.',
    category: 'E-commerce/Household',
    services: [
      'Web Development',
      'Mobile App Development',
      'Database Solutions',
      'Cloud Solutions',
      'DevOps',
    ],
    technologies: [
      'Next.js',
      'React Native',
      'PostgreSQL',
      'Redis',
      'AWS',
      'Stripe',
      'Elasticsearch',
      'Docker',
      'Flutter',
      '.NET',
    ],
    platforms: ['iOS', 'Android', 'Website', 'Admin Dashboard'],
    keyFeatures: [
      'Advanced Product Catalog (5,000+ items)',
      'Multi-vendor Marketplace',
      'Same-day Delivery System',
      'International Payment Gateway',
      'Real-time Inventory Management',
      'AI-Powered Advanced Search & Filtering',
      'Multi-language Support (Arabic/English)',
    ],
    images: {
      banner: '/images/portfolio/banners/lawazm-banner.webp',
      preview: '/images/portfolio/previews/lawazm-preview.webp',
      bannerAlt:
        'Lawazm e-commerce platform showing product catalog with household items across mobile and desktop',
      previewAlt: 'Lawazm app preview displaying the product browsing experience on mobile',
      screenshots: [
        '/images/portfolio/screenshots/lawazm-all-in-one.webp',
        '/images/portfolio/screenshots/lawazm-1.webp',
        '/images/portfolio/screenshots/lawazm-2.webp',
        '/images/portfolio/screenshots/lawazm-3.webp',
        '/images/portfolio/screenshots/lawazm-4.webp',
        '/images/portfolio/screenshots/lawazm-5.webp',
        '/images/portfolio/screenshots/lawazm-6.webp',
        '/images/portfolio/screenshots/lawazm-7.webp',
      ],
      screenshotAlts: [
        'Lawazm all-in-one overview showing multiple app screens',
        'Lawazm product catalog with category filtering',
        'Lawazm shopping cart and checkout flow',
        'Lawazm product detail page with reviews',
        'Lawazm order tracking and delivery status',
        'Lawazm user account and order history',
        'Lawazm search results with filters',
        'Lawazm home screen with featured products',
      ],
    },
    metrics: {
      users: '75,000+ Registered Users',
      performance: 'Strong market presence',
      marketPosition: 'Established Kuwait E-commerce Platform',
    },
    businessImpact:
      "Tripled our client's sales and helped them reach customers in 6 Middle Eastern countries",
    completionYear: '2023',
    projectDuration: '8 months',
    teamSize: '8 developers',
    visitUrl: 'https://lawazm.com/',
    appStoreUrl: 'https://apps.apple.com/us/app/lawazm-%D9%84%D9%88%D8%A7%D8%B2%D9%85/id1562072722',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.lawazm&hl=en_US',
    highlights: ['25+ years of trading experience digitized', 'Same-day delivery across Kuwait'],
  },
  {
    id: 'joyful',
    title: 'Joyful - Smart Confectionery Platform',
    shortDescription:
      'Smart cake ordering app where customers design their perfect custom cakes with AI help.',
    detailedDescription:
      'Joyful is a comprehensive e-commerce platform for a Qatari confectionery store specializing in flowers, snacks, chocolates, and cakes. The project involved creating a sophisticated mobile application with advanced product customization features. The platform includes AI-powered customization recommendations, real-time cake design previews, and integrated delivery logistics for same-day service across Qatar.',
    category: 'E-commerce/Confectionery',
    services: [
      'Mobile App Development',
      'AI & Machine Learning',
      'Web Development',
      'Custom Software Development',
    ],
    technologies: [
      'React Native',
      'AR/VR SDKs',
      'AI/ML Models',
      'Real-time Rendering',
      'Payment Gateways',
      'GPS Tracking',
      'Elasticsearch',
      'PHP',
      'Flutter',
      'Magento',
    ],
    platforms: ['iOS', 'Android', 'Website', 'Admin Panel'],
    keyFeatures: [
      'AI-Powered Product Customization',
      'Same-day Delivery Tracking',
      'Multi-payment Gateway Integration',
      'Inventory Management System',
      'Customer Order History & Reordering',
    ],
    images: {
      banner: '/images/portfolio/banners/joyful-banner.webp',
      preview: '/images/portfolio/previews/joyful-preview.webp',
      bannerAlt:
        'Joyful confectionery platform showing custom cake ordering interface on mobile devices',
      previewAlt: 'Joyful app preview with cake customization and delivery options',
      screenshots: [
        '/images/portfolio/screenshots/joyful-all-in-one.webp',
        '/images/portfolio/screenshots/joyful-1.webp',
        '/images/portfolio/screenshots/joyful-2.webp',
        '/images/portfolio/screenshots/joyful-3.webp',
        '/images/portfolio/screenshots/joyful-4.webp',
        '/images/portfolio/screenshots/joyful-5.webp',
      ],
      screenshotAlts: [
        'Joyful all-in-one overview showing multiple app screens',
        'Joyful cake customization interface with design options',
        'Joyful product catalog with chocolates and confectionery items',
        'Joyful delivery tracking and order status screen',
        'Joyful checkout and payment flow',
        'Joyful home screen with featured confectionery products',
      ],
    },
    metrics: {
      users: '30,000+ Active Users',
      performance: '200% Increase in Custom Orders',
      marketPosition: 'Popular Qatar Confectionery Platform',
    },
    businessImpact:
      'Turned a traditional bakery into a modern digital business, increasing revenue by 200% in just one year',
    completionYear: '2022',
    projectDuration: '6 months',
    teamSize: '7 developers',
    appStoreUrl: 'https://apps.apple.com/us/app/joyful-boxes/id1579508169',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.joyful&hl=en_US',
    highlights: ['Advanced product customization engine', 'Same-day delivery across Qatar'],
  },
  {
    id: 'lazurd',
    title: 'Lazurd - Luxury Brand Digital Experience',
    shortDescription:
      'Luxury food app for premium home-cooked meals and chocolates that became #1 in Kuwait.',
    detailedDescription:
      'Lazurd is a luxury brand inspired by the semi-precious stone "Lapis Lazuli", specializing in premium home-cooked meals, cakes, and chocolates for special occasions. The platform focuses on creating an eye-catching UI that reflects sophistication and premium quality, successfully reaching top charts in Kuwait through exceptional design and user experience.',
    category: 'Luxury/Food',
    services: [
      'Mobile App Development',
      'Web Development',
      'UI/UX Design',
      'Digital Transformation',
    ],
    technologies: [
      'hadisto',
      'PHP',
      'Flutter',
      'High-quality Image Processing',
      'Luxury Payment Systems',
    ],
    platforms: ['iOS', 'Android', 'Website', 'Social Media Integration'],
    keyFeatures: [
      'Luxury-focused UI Design',
      'Exclusive Member Benefits System',
      'High-end Food Ordering Experience',
      'Multi-currency Premium Payment & Delivery Options',
    ],
    images: {
      banner: '/images/portfolio/banners/lazurd-banner.webp',
      preview: '/images/portfolio/previews/lazurd-preview.webp',
      bannerAlt:
        'Lazurd luxury food delivery app featuring premium home-cooked meals and chocolates',
      previewAlt: 'Lazurd app preview showcasing luxury brand design and premium food ordering',
      screenshots: [
        '/images/portfolio/screenshots/lazurd-all-in-one.webp',
        '/images/portfolio/screenshots/lazurd-1.webp',
        '/images/portfolio/screenshots/lazurd-2.webp',
        '/images/portfolio/screenshots/lazurd-3.webp',
        '/images/portfolio/screenshots/lazurd-4.webp',
        '/images/portfolio/screenshots/lazurd-5.webp',
      ],
      screenshotAlts: [
        'Lazurd all-in-one overview showing luxury app interface across screens',
        'Lazurd premium product catalog with luxury food items',
        'Lazurd order placement with specialty meal options',
        'Lazurd delivery scheduling and tracking interface',
        'Lazurd member benefits and loyalty rewards screen',
        'Lazurd home screen with featured luxury products',
      ],
    },
    metrics: {
      users: '8,000+ Premium Users',
      performance: 'High App Store Rankings',
      marketPosition: 'Premium Luxury Food Platform',
    },
    businessImpact:
      'Built a premium brand reputation online, increasing brand value by 4x and luxury sales by 2.5x',
    completionYear: '2022',
    projectDuration: '5 months',
    teamSize: '5 developers',
    appStoreUrl: 'https://apps.apple.com/us/app/lazurd-app/id1436477492',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=approots.ca.lazurd&hl=en_US',
    highlights: ['Premium luxury design focus', 'High-quality user experience'],
  },
  {
    id: 'i-love-food-ilf',
    title: 'WellBox - Food Package Delivery Platform',
    shortDescription:
      'Smart nutrition app that creates personal meal plans and helps you reach your health goals with AI.',
    detailedDescription:
      'WellBox is a comprehensive daily food delivery mobile application designed as the simplest yet most effective solution for healthy eating and weight loss. The app leverages nutritional analysis and intelligent food recommendations based on user preferences, dietary restrictions, and health goals.',
    category: 'Health/Fitness',
    services: ['Mobile App Development', 'Database Solutions', 'API Development'],
    technologies: [
      'Flutter',
      '.Net',
      'Angular',
      'Computer Vision',
      'Health Data APIs',
      'Cloud Analytics',
    ],
    platforms: ['iOS', 'Android', 'Admin Dashboard'],
    keyFeatures: [
      'Computer Vision Food Recognition',
      'Personalized Nutrition Recommendations',
      'Dietary Restriction Management',
      'Nutritional Analysis & Insights',
    ],
    images: {
      banner: '/images/portfolio/banners/i-love-food-ilf-banner.webp',
      preview: '/images/portfolio/previews/i-love-food-ilf-preview.webp',
      bannerAlt:
        'WellBox food delivery platform showing personalized meal plans and nutrition tracking',
      previewAlt: 'WellBox app preview displaying healthy meal planning interface',
      screenshots: [
        '/images/portfolio/screenshots/wellbox-all-in-one.webp',
        '/images/portfolio/screenshots/wellbox-1.webp',
        '/images/portfolio/screenshots/wellbox-2.webp',
        '/images/portfolio/screenshots/wellbox-3.webp',
        '/images/portfolio/screenshots/wellbox-4.webp',
      ],
      screenshotAlts: [
        'WellBox all-in-one overview showing health and nutrition app screens',
        'WellBox personalized meal plan with dietary recommendations',
        'WellBox food recognition and calorie tracking interface',
        'WellBox nutrition analytics dashboard with health goals',
        'WellBox meal ordering and delivery scheduling screen',
      ],
    },
    metrics: {
      users: '1,000+ Health Enthusiasts',
      performance: '600% Increase in customer Orders',
      marketPosition: 'Food Package Delivery Platform',
    },
    businessImpact:
      'Users stick to healthy eating 65% better and manage their weight 50% more effectively',
    completionYear: '2024',
    projectDuration: '5 months',
    teamSize: '5 developers',
    appStoreUrl: 'https://apps.apple.com/us/app/wellbox-diet/id6477454104',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.wellbox.app&hl=en_US',
    highlights: ['Computer vision food recognition', '73% user goal achievement rate'],
  },
  {
    id: 'chatfly',
    title: 'ChatFly - AI Communication Platform',
    shortDescription:
      'Smart AI chatbot that helps businesses talk to customers better, powered by advanced AI technology.',
    detailedDescription:
      'ChatFly is a comprehensive AI-powered communication platform that combines advanced artificial intelligence with user-friendly design. The application serves as both a mobile app and a no-code AI platform, offering multiple functionalities including AI chatbot capabilities, automatic grammar corrections, text summaries at various reading levels, and AI-generated art creation.',
    category: 'AI/Communication',
    services: [
      'AI & Machine Learning',
      'Mobile App Development',
      'Web Development',
      'API Development',
    ],
    technologies: [
      'GPT Integration',
      'DALL-E API',
      'Node.js',
      'Python',
      'REST APIs',
      'WebSocket',
      'Cloud Services',
    ],
    platforms: [
      'iOS',
      'Android',
      'Web Platform',
      'API',
      'Telegram',
      'Slack',
      'Microsoft Teams',
      'WordPress',
      'WooCommerce',
    ],
    keyFeatures: [
      'Multi-Platform AI Chatbot Integration',
      'Advanced Grammar Correction Engine',
      'Intelligent Text Summarization',
      'AI-Generated Art & Content Creation',
      'Real-time Auto-Response System',
      'Custom Branding & White-label Solutions',
      'Enterprise-grade API Access',
      'Multi-language Support',
    ],
    images: {
      banner: '/images/portfolio/banners/chatfly-banner.webp',
      preview: '/images/portfolio/previews/chatfly-preview.webp',
      bannerAlt:
        'ChatFly AI communication platform with multi-platform chatbot integration dashboard',
      previewAlt: 'ChatFly app preview showing AI-powered chatbot conversation interface',
    },
    metrics: {
      users: '6 Platform Integrations',
      performance: 'Sub-second AI Response Time',
      marketPosition: 'Multi-platform AI Solution',
    },
    completionYear: '2023',
    projectDuration: '4 months',
    teamSize: '6 developers',
    highlights: ['Built for multiple platforms', 'Multi-language support'],
  },
  {
    id: 'joyjoy',
    title: 'JoyJoy - AI-Powered Wellness App',
    shortDescription:
      'Daily inspiration app with your personal AI buddy, helping thousands feel better every day.',
    detailedDescription:
      'JoyJoy is a comprehensive daily motivation and affirmation mobile application designed to help users cultivate a positive mindset and improve their overall well-being. The app provides users with inspirational quotes, positive affirmations, and uplifting messages powered by AI personalization. Key features include AI-driven content curation, social sharing capabilities, progress tracking, and an interactive AI companion for personalized growth conversations.',
    category: 'Mobile App/Wellness',
    services: [
      'Mobile App Development',
      'AI & Machine Learning',
      'UI/UX Design',
      'Push Notifications',
    ],
    technologies: [
      'Flutter',
      'AI/ML Models',
      'Firebase',
      'Push Notification Services',
      'Analytics SDKs',
      'Social Media APIs',
    ],
    platforms: ['iOS'],
    keyFeatures: [
      'AI-Personalized Daily Affirmations',
      'Intelligent Content Curation',
      'Interactive AI Wellness Companion',
      'Social Media Integration',
      'Offline Content Access',
      'Customizable Reminder Systems',
      'Multi-language Affirmations',
    ],
    images: {
      banner: '/images/portfolio/banners/joyjoy-banner.webp',
      preview: '/images/portfolio/previews/joyjoy-preview.webp',
      bannerAlt:
        'JoyJoy AI wellness app displaying daily affirmations and positive mindset features',
      previewAlt: 'JoyJoy app preview showing AI companion and wellness tracking interface',
    },
    metrics: {
      users: '25,000+ Downloads',
      performance: '4.5★ App Store Rating',
      marketPosition: 'High-rated Wellness App',
    },
    businessImpact:
      'Users feel 40% happier daily and build 60% more positive habits with our AI companion',
    completionYear: '2023',
    projectDuration: '4 months',
    teamSize: '4 developers',
    highlights: ['High user retention rate', 'AI companion with strong user satisfaction'],
  },
  {
    id: 'letspass',
    title: 'LetsPass - Advanced EdTech Platform',
    shortDescription:
      'Complete online learning platform that creates personalized study plans with AI and fun interactive tests.',
    detailedDescription:
      'LetsPass is a comprehensive online education platform designed to facilitate digital learning experiences. The platform provides interactive learning modules, advanced progress tracking, assessment tools, and certification systems. It serves educational institutions, corporate training programs, and individual learners with personalized learning experiences.',
    category: 'Education/E-learning',
    services: [
      'Web Development',
      'Mobile App Development',
      'Database Solutions',
      'Cloud Solutions',
    ],
    technologies: [
      'Flutter',
      'Angular',
      'Node.js',
      'AI/ML Algorithms',
      'Video Streaming',
      'Real-time Communications',
      'Learning Analytics',
    ],
    platforms: ['Mobile App', 'Admin Dashboard', 'Teacher Dashboard'],
    keyFeatures: [
      'Interactive Video Learning Modules',
      'Real-time Progress Analytics',
      'Advanced Assessment & Testing Tools',
      'Digital Certification System',
      'Collaborative Learning Spaces',
      'Multi-format Content Support',
      'Gamified Learning Experience',
      'Institution Management Tools',
    ],
    images: {
      banner: '/images/portfolio/banners/letspass-banner.webp',
      preview: '/images/portfolio/previews/letspass-preview.webp',
      bannerAlt:
        'LetsPass online education platform with interactive learning modules and progress tracking',
      previewAlt: 'LetsPass app preview showing course catalog and student dashboard',
    },
    metrics: {
      users: '10+ Content Formats Supported',
      performance: '45% Improvement in Learning Outcomes',
      marketPosition: 'Educational Technology Solution',
    },
    businessImpact: 'Students learn 45% better while companies save 60% on training costs',
    completionYear: '2021',
    projectDuration: '5 months',
    teamSize: '6 developers',
    highlights: [
      'Support for 10+ content formats',
      'Integrated certification system',
      'Real-time collaboration tools',
    ],
  },
  {
    id: 'zahra-farm',
    title: 'Zahra Farm - AgriTech Innovation Platform',
    shortDescription:
      'Smart farming app that combines organic produce sales, farm visits, and high-tech crop monitoring.',
    detailedDescription:
      'Zahra Farm is an innovative agricultural and eco-tourism platform that combines organic product sales with experiential farming services. The platform integrates IoT sensors for smart farming, offers plot rental for personal farming, greenhouse monitoring systems, and eco-tourism booking capabilities, promoting sustainable agriculture and environmental consciousness.',
    category: 'Agriculture/IoT',
    services: [
      'IoT Hardware & Edge Computing',
      'Mobile App Development',
      'Web Development',
      'Custom Software Development',
    ],
    technologies: [
      'IoT Sensors',
      'Edge Computing',
      'Flutter',
      'Angular',
      'Strapi',
      'Agricultural Management Systems',
      'Weather APIs',
    ],
    platforms: ['Mobile App', 'Website', 'Admin Dashboard', 'Field Management System'],
    keyFeatures: [
      'Organic Product E-commerce',
      'Plot Rental Booking System',
      'Greenhouse Tour Reservations',
      'Eco-Tourism Hut Bookings',
      'Automated Irrigation Control',
      'Crop Health Monitoring',
      'Sustainable Farming Analytics',
      'Environmental Impact Tracking',
    ],
    images: {
      banner: '/images/portfolio/banners/zahra-farm-banner.webp',
      preview: '/images/portfolio/previews/zahra-farm-preview.webp',
      bannerAlt:
        'Zahra Farm smart agriculture platform showing IoT crop monitoring and organic produce marketplace',
      previewAlt: 'Zahra Farm app preview with farm management dashboard and eco-tourism booking',
    },
    metrics: {
      users: '3,000+ Farm Visitors',
      performance: '40% Increase in Crop Yields',
      marketPosition: 'Smart Farming Solution',
    },
    completionYear: '2020',
    projectDuration: '7 months',
    teamSize: '8 developers + IoT specialists',
    highlights: [
      'Smart farming platform',
      'Sustainable tourism model',
      'Environmental innovation focus',
    ],
  },
  {
    id: 'chayyel',
    title: 'Chayyel - Global Gaming Platform',
    shortDescription:
      'Global gaming platform built for worldwide expansion with strong community features.',
    detailedDescription:
      'Chayyel is an ambitious gaming startup platform designed for global expansion. The project encompasses gaming ecosystem development, community management features, multi-platform gaming support, and scalable infrastructure to accommodate international markets with diverse gaming communities and multiple language support.',
    category: 'Gaming/Entertainment',
    services: [
      'Custom Software Development',
      'Cloud Solutions',
      'Mobile App Development',
      'Digital Transformation',
    ],
    technologies: [
      'Cloud Gaming Infrastructure',
      'Cross-platform Development',
      'Magento',
      'PHP',
      'Flutter',
      'Android',
    ],
    platforms: ['iOS', 'Web', 'Community Dashboard'],
    keyFeatures: [
      'Cross-platform Gaming Support',
      'Community Management Tools',
      'In-game Economy System',
      'Real-time Chat & Communication',
      'User-Generated Content Tools',
      'Multi-language Gaming Support',
      'Social Gaming Features',
    ],
    images: {
      banner: '/images/portfolio/banners/chayyel-banner.webp',
      preview: '/images/portfolio/previews/chayyel-preview.webp',
      bannerAlt:
        'Chayyel global gaming platform showcasing cross-platform gaming ecosystem and community features',
      previewAlt: 'Chayyel app preview displaying gaming dashboard and social features',
    },
    metrics: {
      users: '100,000+ Concurrent Players Supported',
      performance: 'Low-latency Global Infrastructure',
      marketPosition: 'Global Gaming Infrastructure',
    },
    businessImpact:
      'Created gaming technology that supports 100,000+ players at once across 15 countries',
    completionYear: '2025',
    projectDuration: '14 months',
    teamSize: '10 developers + game designers',
    highlights: [
      'Global expansion ready infrastructure',
      'Multi-platform gaming ecosystem',
      'Community-driven development approach',
    ],
  },
]

// Service mapping for portfolio filtering
export const serviceMapping = {
  'Custom Software Development': ['chatfly', 'joyful', 'zahra-farm', 'chayyel'],
  'AI & Machine Learning': ['chatfly', 'joyjoy', 'joyful', 'letspass', 'i-love-food-ilf'],
  'Mobile App Development': [
    'chatfly',
    'joyjoy',
    'joyful',
    'lazurd',
    'letspass',
    'zahra-farm',
    'i-love-food-ilf',
    'chayyel',
  ],
  'Web Development': ['chatfly', 'lawazm', 'joyful', 'lazurd', 'letspass', 'zahra-farm'],
  'Cloud Solutions': ['lawazm', 'letspass', 'chayyel'],
  'Database Solutions': ['lawazm', 'letspass', 'i-love-food-ilf'],
  'IoT Hardware & Edge Computing': ['zahra-farm'],
  DevOps: ['lawazm'],
  'UI/UX Design': ['joyjoy', 'lazurd'],
  'Digital Transformation': ['lazurd', 'chayyel'],
  'API Development': ['chatfly', 'i-love-food-ilf'],
}

export const categoryColors = {
  'AI/Communication': '#9d4edd',
  'Mobile App/Wellness': '#4CD787',
  'E-commerce/Household': '#4834D4',
  'E-commerce/Confectionery': '#FFD700',
  'Luxury/Food': '#ff6b6b',
  'Education/E-learning': '#00D2FF',
  'Agriculture/IoT': '#4CD787',
  'Health/Fitness': '#9d4edd',
  'Gaming/Entertainment': '#ff6b6b',
  Healthcare: '#67E8F9',
}
