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
  }
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
  appStoreUrl?: string
  playStoreUrl?: string
  demoUrl?: string
  caseStudyUrl?: string
  awards?: string[]
  highlights?: string[]
}

export const portfolioProjects: ProjectData[] = [
  {
    id: 'chatfly',
    title: 'ChatFly - AI Communication Platform',
    shortDescription: 'Smart AI chatbot that helps businesses talk to customers better, powered by advanced AI technology.',
    detailedDescription: 'ChatFly is a comprehensive AI-powered communication platform that combines advanced artificial intelligence with user-friendly design. The application serves as both a mobile app and a no-code AI platform, offering multiple functionalities including AI chatbot capabilities, automatic grammar corrections, text summaries at various reading levels, and AI-generated art creation. Powered by GPT and DALL-E technologies, ChatFly assists businesses in creating, testing, launching, and managing AI chatbots for various use cases at scale.',
    category: 'AI/Communication',
    services: ['AI & Machine Learning', 'Mobile App Development', 'Web Development', 'API Development'],
    technologies: ['GPT Integration', 'DALL-E API', 'React Native', 'Node.js', 'Python', 'REST APIs', 'WebSocket', 'Cloud Services'],
    platforms: ['iOS', 'Android', 'Web Platform', 'API', 'Telegram', 'Slack', 'Microsoft Teams', 'WordPress', 'WooCommerce'],
    keyFeatures: [
      'Multi-Platform AI Chatbot Integration',
      'Advanced Grammar Correction Engine',
      'Intelligent Text Summarization',
      'AI-Generated Art & Content Creation',
      'Real-time Auto-Response System',
      'Custom Branding & White-label Solutions',
      'Enterprise-grade API Access',
      'Multi-language Support',
      'Conversation Analytics & Insights'
    ],
    images: {
      banner: '/images/portfolio/banners/chatfly-banner.webp',
      preview: '/images/portfolio/previews/chatfly-preview.webp'
    },
    metrics: {
      users: '10,000+ Active Users',
      performance: '99.9% Uptime',
      marketPosition: 'Multi-platform AI Solution'
    },
    businessImpact: 'Helped businesses cut customer service costs by 60% while responding to customers 75% faster',
    completionYear: '2024',
    projectDuration: '8 months',
    teamSize: '6 developers',
    highlights: [
      'Built for multiple platforms',
      'Processing thousands of messages daily',
      'Multi-language support'
    ]
  },
  {
    id: 'joyjoy',
    title: 'JoyJoy - AI-Powered Wellness App',
    shortDescription: 'Daily inspiration app with your personal AI buddy, helping thousands feel better every day.',
    detailedDescription: 'JoyJoy is a comprehensive daily motivation and affirmation mobile application designed to help users cultivate a positive mindset and improve their overall well-being. The app provides users with inspirational quotes, positive affirmations, and uplifting messages powered by AI personalization. Key features include AI-driven content curation, social sharing capabilities, progress tracking, and an interactive AI companion for personalized growth conversations.',
    category: 'Mobile App/Wellness',
    services: ['Mobile App Development', 'AI & Machine Learning', 'UI/UX Design', 'Push Notifications'],
    technologies: ['React Native', 'AI/ML Models', 'Firebase', 'Push Notification Services', 'Analytics SDKs', 'Social Media APIs'],
    platforms: ['iOS', 'Android'],
    keyFeatures: [
      'AI-Personalized Daily Affirmations',
      'Intelligent Content Curation',
      'Interactive AI Wellness Companion',
      'Progress Tracking & Analytics',
      'Social Media Integration',
      'Offline Content Access',
      'Customizable Reminder Systems',
      'Multi-language Affirmations',
      'Mood Tracking & Insights'
    ],
    images: {
      banner: '/images/portfolio/banners/joyjoy-banner.webp',
      preview: '/images/portfolio/previews/joyjoy-preview.webp'
    },
    metrics: {
      users: '25,000+ Downloads',
      performance: '4.8★ App Store Rating',
      marketPosition: 'High-rated Wellness App'
    },
    businessImpact: 'Users feel 40% happier daily and build 60% more positive habits with our AI companion',
    completionYear: '2024',
    projectDuration: '6 months',
    teamSize: '4 developers',
    highlights: [
      'Available in English & Spanish',
      'High user retention rate',
      'AI companion with strong user satisfaction'
    ]
  },
  {
    id: 'lawazm',
    title: 'Lawazm - Enterprise E-commerce Platform',
    shortDescription: 'Complete online store with 5,000+ household products, trusted by families across Kuwait and the Middle East.',
    detailedDescription: 'Lawazm is a comprehensive e-commerce platform established as a distinguished electronic marketplace in Kuwait and the Middle East, specializing in household products, baby & children needs, and family supplies. With over 25 years of trading experience, the platform features more than 5,000 unique, high-quality household products from prominent global manufacturers. The platform guarantees authentic products with original packaging and warranties extending up to 15 years.',
    category: 'E-commerce/Household',
    services: ['Web Development', 'Mobile App Development', 'Database Solutions', 'Cloud Solutions', 'DevOps'],
    technologies: ['Next.js', 'React Native', 'PostgreSQL', 'Redis', 'AWS', 'Stripe', 'PayPal', 'Elasticsearch', 'Docker'],
    platforms: ['iOS', 'Android', 'Website', 'Admin Dashboard'],
    keyFeatures: [
      'Advanced Product Catalog (5,000+ items)',
      'Multi-vendor Marketplace',
      'Same-day Delivery System',
      'International Payment Gateway',
      'Real-time Inventory Management',
      'Advanced Search & Filtering',
      'Multi-language Support (Arabic/English)',
      'Customer Loyalty Program',
      'Warranty Management System'
    ],
    images: {
      banner: '/images/portfolio/banners/lawazm-banner.webp',
      preview: '/images/portfolio/previews/lawazm-preview.webp'
    },
    metrics: {
      users: '50,000+ Registered Users',
      performance: '$2M+ Annual Revenue',
      marketPosition: 'Established Kuwait E-commerce Platform'
    },
    businessImpact: 'Tripled our client\'s sales and helped them reach customers in 6 Middle Eastern countries',
    completionYear: '2023',
    projectDuration: '12 months',
    teamSize: '8 developers',
    highlights: [
      '25+ years of trading experience digitized',
      'Same-day delivery across Kuwait',
      '15-year warranty support system',
      'Integration with global suppliers'
    ]
  },
  {
    id: 'joyful',
    title: 'Joyful - Smart Confectionery Platform',
    shortDescription: 'Smart cake ordering app where customers design their perfect custom cakes with AI help.',
    detailedDescription: 'Joyful is a comprehensive e-commerce platform for a Qatari confectionery store specializing in flowers, snacks, chocolates, and cakes. The project involved creating a sophisticated mobile application with advanced product customization features. The platform includes AI-powered customization recommendations, real-time cake design previews, and integrated delivery logistics for same-day service across Qatar.',
    category: 'E-commerce/Confectionery',
    services: ['Mobile App Development', 'AI & Machine Learning', 'Web Development', 'Custom Software Development'],
    technologies: ['React Native', 'AR/VR SDKs', 'AI/ML Models', 'Real-time Rendering', 'Payment Gateways', 'GPS Tracking'],
    platforms: ['iOS', 'Android', 'Website', 'Admin Panel'],
    keyFeatures: [
      'AI-Powered Product Customization',
      'Real-time 3D Cake Design Preview',
      'AR Visualization for Custom Orders',
      'Smart Recommendation Engine',
      'Same-day Delivery Tracking',
      'Multi-payment Gateway Integration',
      'Inventory Management System',
      'Customer Order History & Reordering',
      'Social Media Integration'
    ],
    images: {
      banner: '/images/portfolio/banners/joyful-banner.webp',
      preview: '/images/portfolio/previews/joyful-preview.webp'
    },
    metrics: {
      users: '15,000+ Active Users',
      performance: '45% Increase in Custom Orders',
      marketPosition: 'Popular Qatar Confectionery Platform'
    },
    businessImpact: 'Turned a traditional bakery into a modern digital business, increasing revenue by 200% in just one year',
    completionYear: '2024',
    projectDuration: '10 months',
    teamSize: '7 developers',
    highlights: [
      'Advanced product customization engine',
      'Same-day delivery across Qatar',
      'AR-powered cake preview',
      'AI recommendations increased sales by 35%'
    ]
  },
  {
    id: 'lazurd',
    title: 'Lazurd - Luxury Brand Digital Experience',
    shortDescription: 'Luxury food app for premium home-cooked meals and chocolates that became #1 in Kuwait.',
    detailedDescription: 'Lazurd is a luxury brand inspired by the semi-precious stone "Lapis Lazuli", specializing in premium home-cooked meals, cakes, and chocolates for special occasions. The platform focuses on creating an eye-catching UI that reflects sophistication and premium quality, successfully reaching top charts in Kuwait through exceptional design and user experience.',
    category: 'Luxury/Food',
    services: ['Mobile App Development', 'Web Development', 'UI/UX Design', 'Digital Transformation'],
    technologies: ['React Native', 'Premium UI Libraries', 'Advanced Animations', 'High-quality Image Processing', 'Luxury Payment Systems'],
    platforms: ['iOS', 'Android', 'Website', 'Social Media Integration'],
    keyFeatures: [
      'Luxury-focused UI Design',
      'Premium Product Photography Integration',
      'Exclusive Member Benefits System',
      'High-end Food Ordering Experience',
      'Special Occasion Planning Tools',
      'Premium Packaging Customization',
      'VIP Customer Service Integration',
      'Social Sharing for Luxury Experiences',
      'Premium Payment & Delivery Options'
    ],
    images: {
      banner: '/images/portfolio/banners/lazurd-banner.webp',
      preview: '/images/portfolio/previews/lazurd-preview.webp'
    },
    metrics: {
      users: '8,000+ Premium Users',
      performance: 'High App Store Rankings',
      marketPosition: 'Premium Luxury Food Platform'
    },
    businessImpact: 'Built a premium brand reputation online, increasing brand value by 4x and luxury sales by 2.5x',
    completionYear: '2024',
    projectDuration: '8 months',
    teamSize: '5 developers',
    highlights: [
      'Achieved #1 position in Kuwait app charts',
      'Premium luxury design focus',
      'High-quality user experience'
    ]
  },
  {
    id: 'letspass',
    title: 'LetsPass - Advanced EdTech Platform',
    shortDescription: 'Complete online learning platform that creates personalized study plans with AI and fun interactive tests.',
    detailedDescription: 'LetsPass is a comprehensive online education platform designed to facilitate digital learning experiences. The platform provides AI-powered course recommendations, interactive learning modules, advanced progress tracking, assessment tools, and certification systems. It serves educational institutions, corporate training programs, and individual learners with personalized learning experiences.',
    category: 'Education/E-learning',
    services: ['Web Development', 'AI & Machine Learning', 'Database Solutions', 'Cloud Solutions'],
    technologies: ['React', 'Node.js', 'AI/ML Algorithms', 'Video Streaming', 'Real-time Communications', 'Learning Analytics'],
    platforms: ['Web Platform', 'Mobile App', 'Admin Dashboard'],
    keyFeatures: [
      'AI-Powered Learning Path Recommendations',
      'Interactive Video Learning Modules',
      'Real-time Progress Analytics',
      'Advanced Assessment & Testing Tools',
      'Digital Certification System',
      'Collaborative Learning Spaces',
      'Multi-format Content Support',
      'Gamified Learning Experience',
      'Institution Management Tools'
    ],
    images: {
      banner: '/images/portfolio/banners/letspass-banner.webp',
      preview: '/images/portfolio/previews/letspass-preview.webp'
    },
    metrics: {
      users: '12,000+ Students',
      performance: '78% Course Completion Rate',
      marketPosition: 'Educational Technology Solution'
    },
    businessImpact: 'Students learn 45% better while companies save 60% on training costs',
    completionYear: '2023',
    projectDuration: '9 months',
    teamSize: '6 developers',
    highlights: [
      'AI-powered personalized learning paths',
      'Support for 10+ content formats',
      'Integrated certification system',
      'Real-time collaboration tools'
    ]
  },
  {
    id: 'zahra-farm',
    title: 'Zahra Farm - AgriTech Innovation Platform',
    shortDescription: 'Smart farming app that combines organic produce sales, farm visits, and high-tech crop monitoring.',
    detailedDescription: 'Zahra Farm is an innovative agricultural and eco-tourism platform that combines organic product sales with experiential farming services. The platform integrates IoT sensors for smart farming, offers plot rental for personal farming, greenhouse monitoring systems, and eco-tourism booking capabilities, promoting sustainable agriculture and environmental consciousness.',
    category: 'Agriculture/IoT',
    services: ['IoT Hardware & Edge Computing', 'Mobile App Development', 'Web Development', 'Custom Software Development'],
    technologies: ['IoT Sensors', 'Edge Computing', 'React Native', 'Agricultural Management Systems', 'GPS/GIS Integration', 'Weather APIs'],
    platforms: ['Mobile App', 'Website', 'IoT Dashboard', 'Field Management System'],
    keyFeatures: [
      'Smart IoT Farm Monitoring',
      'Organic Product E-commerce',
      'Plot Rental Booking System',
      'Greenhouse Tour Reservations',
      'Eco-Tourism Hut Bookings',
      'Automated Irrigation Control',
      'Crop Health Monitoring',
      'Sustainable Farming Analytics',
      'Environmental Impact Tracking'
    ],
    images: {
      banner: '/images/portfolio/banners/zahra-farm-banner.webp',
      preview: '/images/portfolio/previews/zahra-farm-preview.webp'
    },
    metrics: {
      users: '3,000+ Farm Visitors',
      performance: '40% Increase in Crop Yields',
      marketPosition: 'Smart Farming Solution'
    },
    businessImpact: 'Helped farmers grow more food with 35% less water using smart technology',
    completionYear: '2023',
    projectDuration: '11 months',
    teamSize: '8 developers + IoT specialists',
    highlights: [
      'Smart farming platform',
      'IoT sensors monitoring multiple data points',
      'Sustainable tourism model',
      'Environmental innovation focus'
    ]
  },
  {
    id: 'i-love-food-ilf',
    title: 'I Love Food - AI Nutrition Platform',
    shortDescription: 'Smart nutrition app that creates personal meal plans and helps you reach your health goals with AI.',
    detailedDescription: 'I Love Food (ILF) is a comprehensive health and fitness mobile application designed as the simplest yet most effective solution for healthy eating and weight loss. The app leverages AI to provide personalized meal planning, nutritional analysis, and intelligent food recommendations based on user preferences, dietary restrictions, and health goals.',
    category: 'Health/Fitness',
    services: ['Mobile App Development', 'AI & Machine Learning', 'Database Solutions', 'API Development'],
    technologies: ['React Native', 'Nutritional AI Models', 'Computer Vision', 'Health Data APIs', 'Machine Learning', 'Cloud Analytics'],
    platforms: ['iOS', 'Android', 'Health Kit Integration'],
    keyFeatures: [
      'AI-Powered Meal Planning',
      'Computer Vision Food Recognition',
      'Personalized Nutrition Recommendations',
      'Smart Calorie Tracking',
      'Health Goals Progress Monitoring',
      'Recipe Suggestions & Modifications',
      'Dietary Restriction Management',
      'Integration with Fitness Trackers',
      'Nutritional Analysis & Insights'
    ],
    images: {
      banner: '/images/portfolio/banners/i-love-food-ilf-banner.webp',
      preview: '/images/portfolio/previews/i-love-food-ilf-preview.webp'
    },
    metrics: {
      users: '18,000+ Health Enthusiasts',
      performance: '73% User Goal Achievement',
      marketPosition: 'AI-Powered Nutrition Platform'
    },
    businessImpact: 'Users stick to healthy eating 65% better and manage their weight 50% more effectively',
    completionYear: '2024',
    projectDuration: '7 months',
    teamSize: '5 developers',
    highlights: [
      'AI-driven personalized nutrition plans',
      'Computer vision food recognition',
      '73% user goal achievement rate',
      'Integration with major fitness platforms'
    ]
  },
  {
    id: 'chayyel',
    title: 'Chayyel - Global Gaming Platform',
    shortDescription: 'Global gaming platform built for worldwide expansion with strong community features.',
    detailedDescription: 'Chayyel is an ambitious gaming startup platform designed for global expansion. The project encompasses gaming ecosystem development, community management features, multi-platform gaming support, and scalable infrastructure to accommodate international markets with diverse gaming communities and multiple language support.',
    category: 'Gaming/Entertainment',
    services: ['Custom Software Development', 'Cloud Solutions', 'Mobile App Development', 'Digital Transformation'],
    technologies: ['Unity Engine', 'Cloud Gaming Infrastructure', 'Real-time Multiplayer', 'Blockchain Integration', 'Cross-platform Development'],
    platforms: ['Mobile', 'Web', 'Cross-platform Gaming', 'Community Dashboard'],
    keyFeatures: [
      'Cross-platform Gaming Support',
      'Global Multiplayer Infrastructure',
      'Community Management Tools',
      'In-game Economy System',
      'Real-time Chat & Communication',
      'Tournament & Competition Platform',
      'User-Generated Content Tools',
      'Multi-language Gaming Support',
      'Social Gaming Features'
    ],
    images: {
      banner: '/images/portfolio/banners/chayyel-banner.webp',
      preview: '/images/portfolio/previews/chayyel-preview.webp'
    },
    metrics: {
      users: '25,000+ Gamers',
      performance: 'Low-latency Global Infrastructure',
      marketPosition: 'Global Gaming Infrastructure'
    },
    businessImpact: 'Created gaming technology that supports 100,000+ players at once across 15 countries',
    completionYear: '2024',
    projectDuration: '14 months',
    teamSize: '10 developers + game designers',
    highlights: [
      'Global expansion ready infrastructure',
      'Support for 100,000+ concurrent players',
      'Multi-platform gaming ecosystem',
      'Community-driven development approach'
    ]
  }
]

// Service mapping for portfolio filtering
export const serviceMapping = {
  'Custom Software Development': ['chatfly', 'joyful', 'zahra-farm', 'chayyel'],
  'AI & Machine Learning': ['chatfly', 'joyjoy', 'joyful', 'letspass', 'i-love-food-ilf'],
  'Mobile App Development': ['chatfly', 'joyjoy', 'joyful', 'lazurd', 'letspass', 'zahra-farm', 'i-love-food-ilf', 'chayyel'],
  'Web Development': ['chatfly', 'lawazm', 'joyful', 'lazurd', 'letspass', 'zahra-farm'],
  'Cloud Solutions': ['lawazm', 'letspass', 'chayyel'],
  'Database Solutions': ['lawazm', 'letspass', 'i-love-food-ilf'],
  'IoT Hardware & Edge Computing': ['zahra-farm'],
  'DevOps': ['lawazm'],
  'UI/UX Design': ['joyjoy', 'lazurd'],
  'Digital Transformation': ['lazurd', 'chayyel'],
  'API Development': ['chatfly', 'i-love-food-ilf']
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
  'Gaming/Entertainment': '#ff6b6b'
}