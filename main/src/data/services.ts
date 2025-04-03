// servicesData.ts
import { Service } from "@/types/service";

export const servicesData: Record<string, Service[]> = {
  webdesign: [
    {
      id: 1,
      name: {
        en: "Elegance",
        fr: "Élégance",
        de: "Eleganz",
      },
      description: {
        en: "Elegant animated webpage with modern design and smooth transitions.",
        fr: "Page web animée élégante avec un design moderne et des transitions fluides.",
        de: "Elegante animierte Webseite mit modernem Design und sanften Übergängen.",
      },
      baseFeatures: {
        en: ["Frontend Technologies"],
        fr: ["Technologies Frontend"],
        de: ["Frontend-Technologien"],
      },
      deliveryDays: 10,
      pages: {
        en: "1-3 pages",
        fr: "1-3 pages",
        de: "1-3 Seiten",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
    {
      id: 2,
      name: {
        en: "Scalability",
        fr: "Évolutivité",
        de: "Skalierbarkeit",
      },
      description: {
        en: "Full-stack webpage with stunning animations and robust features.",
        fr: "Page web full-stack avec des animations époustouflantes et des fonctionnalités robustes.",
        de: "Full-Stack-Webseite mit beeindruckenden Animationen und robusten Funktionen.",
      },
      baseFeatures: {
        en: ["Full-stack Technologies"],
        fr: ["Technologies Full-stack"],
        de: ["Full-Stack-Technologien"],
      },
      deliveryDays: 25,
      pages: {
        en: "4-9 pages",
        fr: "4-9 pages",
        de: "4-9 Seiten",
      },
      revisions: {
        en: "2 revisions",
        fr: "2 révisions",
        de: "2 Überarbeitungen",
      },
    },
    {
      id: 3,
      name: {
        en: "Shop",
        fr: "Boutique",
        de: "Shop",
      },
      description: {
        en: "E-commerce webpage crafted to boost sales and user experience.",
        fr: "Page web e-commerce conçue pour augmenter les ventes et améliorer l'expérience utilisateur.",
        de: "E-Commerce-Webseite, die darauf ausgelegt ist, Verkäufe und Benutzererfahrung zu steigern.",
      },
      baseFeatures: {
        en: ["E-commerce Technologies"],
        fr: ["Technologies E-commerce"],
        de: ["E-Commerce-Technologien"],
      },
      deliveryDays: 40,
      pages: {
        en: "10+ pages",
        fr: "10+ pages",
        de: "10+ Seiten",
      },
      revisions: {
        en: "3 revisions",
        fr: "3 révisions",
        de: "3 Überarbeitungen",
      },
    },
    {
      id: 4,
      name: {
        en: "Innovation",
        fr: "Innovation",
        de: "Innovation",
      },
      description: {
        en: "Interactive web app with engaging animations and top features.",
        fr: "Application web interactive avec des animations captivantes et des fonctionnalités de pointe.",
        de: "Interaktive Webanwendung mit ansprechenden Animationen und Top-Funktionen.",
      },
      baseFeatures: {
        en: ["Web App Technologies"],
        fr: ["Technologies d'Application Web"],
        de: ["Web-App-Technologien"],
      },
      deliveryDays: 45,
      pages: {
        en: "8+ pages",
        fr: "8+ pages",
        de: "8+ Seiten",
      },
      revisions: {
        en: "4 revisions",
        fr: "4 révisions",
        de: "4 Überarbeitungen",
      },
    },
  ],
  appdesign: [
    {
      id: 1,
      name: {
        en: "Desktop",
        fr: "Bureau",
        de: "Desktop",
      },
      description: {
        en: "Cross-platform desktop app with sleek animations and usability.",
        fr: "Application de bureau multiplateforme avec des animations fluides et une grande convivialité.",
        de: "Plattformübergreifende Desktop-App mit eleganten Animationen und Benutzerfreundlichkeit.",
      },
      baseFeatures: {
        en: ["Desktop App Technologies"],
        fr: ["Technologies d'Application de Bureau"],
        de: ["Desktop-App-Technologien"],
      },
      deliveryDays: 0,
      pages: {
        en: "Based on project",
        fr: "Basé sur le projet",
        de: "Basierend auf dem Projekt",
      },
      revisions: {
        en: "2 revisions",
        fr: "2 révisions",
        de: "2 Überarbeitungen",
      },
    },
    {
      id: 2,
      name: {
        en: "Mobile",
        fr: "Mobile",
        de: "Mobil",
      },
      description: {
        en: "Cross-platform mobile app with vivid animations and performance.",
        fr: "Application mobile multiplateforme avec des animations vives et des performances élevées.",
        de: "Plattformübergreifende Mobil-App mit lebendigen Animationen und hoher Leistung.",
      },
      baseFeatures: {
        en: ["Mobile App Technologies"],
        fr: ["Technologies d'Application Mobile"],
        de: ["Mobil-App-Technologien"],
      },
      deliveryDays: 0,
      pages: {
        en: "Based on project",
        fr: "Basé sur le projet",
        de: "Basierend auf dem Projekt",
      },
      revisions: {
        en: "2 revisions",
        fr: "2 révisions",
        de: "2 Überarbeitungen",
      },
    },
    {
      id: 3,
      name: {
        en: "Universal",
        fr: "Universel",
        de: "Universal",
      },
      description: {
        en: "Desktop and mobile apps with consistent design and animations.",
        fr: "Applications de bureau et mobiles avec un design cohérent et des animations.",
        de: "Desktop- und Mobil-Apps mit konsistentem Design und Animationen.",
      },
      baseFeatures: {
        en: ["Desktop & Mobile App Technologies"],
        fr: ["Technologies d'Application Bureau & Mobile"],
        de: ["Desktop- & Mobil-App-Technologien"],
      },
      deliveryDays: 0,
      pages: {
        en: "Based on project",
        fr: "Basé sur le projet",
        de: "Basierend auf dem Projekt",
      },
      revisions: {
        en: "3 revisions",
        fr: "3 révisions",
        de: "3 Überarbeitungen",
      },
    },
  ],
  socialmedia: [
    {
      id: 1,
      name: {
        en: "Social",
        fr: "Social",
        de: "Sozial",
      },
      description: {
        en: "Expert content creation to engage and expand your audience base.",
        fr: "Création de contenu experte pour engager et élargir votre audience.",
        de: "Experten-Content-Erstellung zur Einbindung und Erweiterung Ihres Publikums.",
      },
      baseFeatures: {
        en: ["Content Creation"],
        fr: ["Création de Contenu"],
        de: ["Content-Erstellung"],
      },
      deliveryDays: 3,
      pages: {
        en: "Grid Design",
        fr: "Conception en Grille",
        de: "Rasterdesign",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
    {
      id: 2,
      name: {
        en: "Popular",
        fr: "Populaire",
        de: "Populär",
      },
      description: {
        en: "Stunning content and social media management for maximum reach.",
        fr: "Contenu époustouflant et gestion des réseaux sociaux pour une portée maximale.",
        de: "Beeindruckender Content und Social-Media-Management für maximale Reichweite.",
      },
      baseFeatures: {
        en: ["Content Creation", "Social Media Management"],
        fr: ["Création de Contenu", "Gestion des Réseaux Sociaux"],
        de: ["Content-Erstellung", "Social-Media-Management"],
      },
      deliveryDays: 5,
      pages: {
        en: "Grid Design",
        fr: "Conception en Grille",
        de: "Rasterdesign",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
    {
      id: 3,
      name: {
        en: "Famous",
        fr: "Célèbre",
        de: "Berühmt",
      },
      description: {
        en: "All-in-one content, management, and community building solution.",
        fr: "Solution tout-en-un pour contenu, gestion et construction de communauté.",
        de: "All-in-One-Lösung für Content, Management und Community-Aufbau.",
      },
      baseFeatures: {
        en: ["Content Creation", "Social Media Management", "Community Management"],
        fr: ["Création de Contenu", "Gestion des Réseaux Sociaux", "Gestion de Communauté"],
        de: ["Content-Erstellung", "Social-Media-Management", "Community-Management"],
      },
      deliveryDays: 7,
      pages: {
        en: "Grid Design",
        fr: "Conception en Grille",
        de: "Rasterdesign",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
    {
      id: 4,
      name: {
        en: "Influencer",
        fr: "Influenceur",
        de: "Influencer",
      },
      description: {
        en: "Ultimate package with content, management, and targeted ad campaigns.",
        fr: "Forfait ultime avec contenu, gestion et campagnes publicitaires ciblées.",
        de: "Ultimatives Paket mit Content, Management und gezielten Werbekampagnen.",
      },
      baseFeatures: {
        en: ["Content Creation", "Social Media Management", "Community Management", "Social Media Ads"],
        fr: ["Création de Contenu", "Gestion des Réseaux Sociaux", "Gestion de Communauté", "Publicités sur Réseaux Sociaux"],
        de: ["Content-Erstellung", "Social-Media-Management", "Community-Management", "Social-Media-Anzeigen"],
      },
      deliveryDays: 9,
      pages: {
        en: "Grid Design",
        fr: "Conception en Grille",
        de: "Rasterdesign",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
  ],
  branding: [
    {
      id: 1,
      name: {
        en: "Logo",
        fr: "Logo",
        de: "Logo",
      },
      description: {
        en: "Professional logo creation to define your brand’s unique identity.",
        fr: "Création de logo professionnelle pour définir l’identité unique de votre marque.",
        de: "Professionelle Logo-Erstellung zur Definition der einzigartigen Identität Ihrer Marke.",
      },
      baseFeatures: {
        en: ["Creativity Technologies"],
        fr: ["Technologies de Créativité"],
        de: ["Kreativitätstechnologien"],
      },
      deliveryDays: 7,
      pages: {
        en: "Professional Design",
        fr: "Design Professionnel",
        de: "Professionelles Design",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
    {
      id: 2,
      name: {
        en: "Identity",
        fr: "Identité",
        de: "Identität",
      },
      description: {
        en: "Complete branding with logo, colors, fonts, and design guidelines.",
        fr: "Image de marque complète avec logo, couleurs, polices et directives de design.",
        de: "Komplettes Branding mit Logo, Farben, Schriftarten und Designrichtlinien.",
      },
      baseFeatures: {
        en: ["Creativity Technologies"],
        fr: ["Technologies de Créativité"],
        de: ["Kreativitätstechnologien"],
      },
      deliveryDays: 15,
      pages: {
        en: "Professional Design",
        fr: "Design Professionnel",
        de: "Professionelles Design",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
    {
      id: 3,
      name: {
        en: "Personality",
        fr: "Personnalité",
        de: "Persönlichkeit",
      },
      description: {
        en: "Full brand identity with custom 2D art for visual impact.",
        fr: "Identité de marque complète avec art 2D personnalisé pour un impact visuel.",
        de: "Vollständige Markenidentität mit maßgeschneiderter 2D-Kunst für visuelle Wirkung.",
      },
      baseFeatures: {
        en: ["Creativity Technologies"],
        fr: ["Technologies de Créativité"],
        de: ["Kreativitätstechnologien"],
      },
      deliveryDays: 20,
      pages: {
        en: "Professional Design",
        fr: "Design Professionnel",
        de: "Professionelles Design",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
  ],
  video: [
    {
      id: 1,
      name: {
        en: "Video",
        fr: "Vidéo",
        de: "Video",
      },
      description: {
        en: "Professional video editing to enhance your footage dynamically.",
        fr: "Montage vidéo professionnel pour améliorer vos séquences de manière dynamique.",
        de: "Professionelle Videobearbeitung zur dynamischen Verbesserung Ihres Materials.",
      },
      baseFeatures: {
        en: ["Simply edited video"],
        fr: ["Vidéo simplement montée"],
        de: ["Einfach bearbeitetes Video"],
      },
      deliveryDays: 7,
      pages: {
        en: "0-20 minutes",
        fr: "0-20 minutes",
        de: "0-20 Minuten",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
    {
      id: 2,
      name: {
        en: "Movie",
        fr: "Film",
        de: "Film",
      },
      description: {
        en: "Advanced video editing with effects and seamless transitions.",
        fr: "Montage vidéo avancé avec effets et transitions fluides.",
        de: "Fortgeschrittene Videobearbeitung mit Effekten und nahtlosen Übergängen.",
      },
      baseFeatures: {
        en: ["Video edited with effects & transitions"],
        fr: ["Vidéo montée avec effets et transitions"],
        de: ["Video mit Effekten und Übergängen bearbeitet"],
      },
      deliveryDays: 7,
      pages: {
        en: "0-10 minutes",
        fr: "0-10 minutes",
        de: "0-10 Minuten",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
    {
      id: 3,
      name: {
        en: "Series",
        fr: "Série",
        de: "Serie",
      },
      description: {
        en: "Custom motion graphics tailored to your project’s specific needs.",
        fr: "Graphismes animés personnalisés adaptés aux besoins spécifiques de votre projet.",
        de: "Maßgeschneiderte Motion-Grafiken, angepasst an die spezifischen Bedürfnisse Ihres Projekts.",
      },
      baseFeatures: {
        en: ["Motion graphics creation based on requests or voiceovers"],
        fr: ["Création de graphismes animés basée sur des demandes ou des voix off"],
        de: ["Erstellung von Motion-Grafiken basierend auf Anfragen oder Voiceovers"],
      },
      deliveryDays: 14,
      pages: {
        en: "0-6 minutes",
        fr: "0-6 minutes",
        de: "0-6 Minuten",
      },
      revisions: {
        en: "2 revisions",
        fr: "2 révisions",
        de: "2 Überarbeitungen",
      },
    },
  ],
  advertisement: [
    {
      id: 1,
      name: {
        en: "Google",
        fr: "Google",
        de: "Google",
      },
      description: {
        en: "Effective Google Ads campaigns to elevate your online presence.",
        fr: "Campagnes Google Ads efficaces pour renforcer votre présence en ligne.",
        de: "Effektive Google Ads-Kampagnen zur Steigerung Ihrer Online-Präsenz.",
      },
      baseFeatures: {
        en: ["Google Analytics"],
        fr: ["Google Analytics"],
        de: ["Google Analytics"],
      },
      deliveryDays: 7,
      pages: {
        en: "1-2 campaigns",
        fr: "1-2 campagnes",
        de: "1-2 Kampagnen",
      },
      revisions: {
        en: "1 revision per month",
        fr: "1 révision par mois",
        de: "1 Überarbeitung pro Monat",
      },
    },
    {
      id: 2,
      name: {
        en: "Meta",
        fr: "Meta",
        de: "Meta",
      },
      description: {
        en: "Targeted Meta Ads designed to connect with your ideal audience.",
        fr: "Publicités Meta ciblées conçues pour atteindre votre audience idéale.",
        de: "Gezielte Meta-Anzeigen, die Ihre ideale Zielgruppe ansprechen.",
      },
      baseFeatures: {
        en: ["Meta Analytics"],
        fr: ["Meta Analytics"],
        de: ["Meta Analytics"],
      },
      deliveryDays: 7,
      pages: {
        en: "1-2 campaigns",
        fr: "1-2 campagnes",
        de: "1-2 Kampagnen",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
    {
      id: 3,
      name: {
        en: "Email",
        fr: "Email",
        de: "E-Mail",
      },
      description: {
        en: "Engaging email marketing and newsletters for customer retention.",
        fr: "Marketing par email engageant et newsletters pour fidéliser les clients.",
        de: "Ansprechendes E-Mail-Marketing und Newsletter zur Kundenbindung.",
      },
      baseFeatures: {
        en: ["Newsletter and Email Content"],
        fr: ["Contenu de Newsletter et Email"],
        de: ["Newsletter- und E-Mail-Inhalte"],
      },
      deliveryDays: 10,
      pages: {
        en: "1-2 per month",
        fr: "1-2 par mois",
        de: "1-2 pro Monat",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
    {
      id: 4,
      name: {
        en: "Physical",
        fr: "Physique",
        de: "Physisch",
      },
      description: {
        en: "Creative physical advertising solutions customized for you.",
        fr: "Solutions publicitaires physiques créatives personnalisées pour vous.",
        de: "Kreative physische Werbelösungen, individuell für Sie angepasst.",
      },
      baseFeatures: {
        en: ["Graphic Designs"],
        fr: ["Designs Graphiques"],
        de: ["Grafikdesigns"],
      },
      deliveryDays: 7,
      pages: {
        en: "Depends on the project",
        fr: "Dépend du projet",
        de: "Abhängig vom Projekt",
      },
      revisions: {
        en: "1 revision",
        fr: "1 révision",
        de: "1 Überarbeitung",
      },
    },
  ],
};