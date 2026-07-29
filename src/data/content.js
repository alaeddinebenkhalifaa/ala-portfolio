// ─── WORK EXPERIENCES ──────────────────────────────────────────────────────
export const work = [
  {
    id: 'w01',
    num: '01',
    company: 'IDA Conseil',
    period: '2025 – Present',
    tags: ['Python FastAPI', 'Azure SQL', 'Azure Pipelines', '.NET 8', 'Angular 18', 'GitFlow'],
    en: {
      role: 'AI Engineer — PFE',
      location: 'Canada (Remote)',
      bullets: [
        'Sole engineer on the AI microservice for IMMObox — Tunisia\'s first intelligent real estate pricing platform, covering 24 governorats and 7 property types.',
        'Designed a deterministic price scoring algorithm using Q1/Q3 quartile analysis on comparable properties, classifying listings as Undervalued / Fair / Overvalued with bilingual FR/AR explanations.',
        'Built a complete REST API: POST /estimate, POST /comparables/search, GET /market/{gov}, plus a recommendation engine (/similar, /for-you, /trending).',
        'Configured Azure Pipelines CI/CD across three environments (develop / UAT / production) using GitFlow branching.',
      ],
    },
    fr: {
      role: 'Ingénieur IA — PFE',
      location: 'Canada (À distance)',
      bullets: [
        "Seul ingénieur sur le microservice IA d'IMMObox — la première plateforme intelligente d'estimation immobilière de Tunisie, couvrant 24 gouvernorats et 7 types de biens.",
        "Conception d'un algorithme déterministe de scoring de prix basé sur une analyse des quartiles Q1/Q3 des biens comparables, classant les annonces en Sous-évalué / Juste / Surévalué avec des explications bilingues FR/AR.",
        "Développement d'une API REST complète : POST /estimate, POST /comparables/search, GET /market/{gov}, ainsi qu'un moteur de recommandation (/similar, /for-you, /trending).",
        'Configuration d\'un pipeline CI/CD Azure Pipelines sur trois environnements (develop / UAT / production) selon le modèle GitFlow.',
      ],
    },
  },
  {
    id: 'w02',
    num: '02',
    company: 'Bakchich',
    period: 'Aug – Oct 2025',
    tags: ['Kubernetes', 'k3s', 'Argo CD', 'Helm', 'HashiCorp Vault', 'SigNoz', 'OpenTelemetry'],
    en: {
      role: 'DevOps Intern',
      location: 'Tunis, Tunisia',
      bullets: [
        'Architected a multi-VM Kubernetes platform (k3s) centralising Argo CD, HashiCorp Vault, and SigNoz; isolated application workloads on a dedicated cluster.',
        'Implemented GitOps with Argo CD + Helm to fully automate DEV/QA/PROD deployments; hardened secrets with Vault + External Secrets Operator and wired observability via SigNoz + OpenTelemetry.',
      ],
    },
    fr: {
      role: 'Stagiaire DevOps',
      location: 'Tunis, Tunisie',
      bullets: [
        'Conception d\'une plateforme Kubernetes multi-VM (k3s) centralisant Argo CD, HashiCorp Vault et SigNoz ; isolation des charges applicatives sur un cluster dédié.',
        "Mise en place du GitOps avec Argo CD + Helm pour automatiser entièrement les déploiements DEV/QA/PROD ; renforcement de la gestion des secrets avec Vault + External Secrets Operator et mise en place de l'observabilité via SigNoz + OpenTelemetry.",
      ],
    },
  },
  {
    id: 'w03',
    num: '03',
    company: 'Wegast',
    period: 'Feb – Sep 2025',
    tags: ['React Native', 'MongoDB', 'Node.js', 'AWS', 'Figma'],
    en: {
      role: 'Full-Stack Freelance',
      location: 'Tunis, Tunisia',
      bullets: [
        'Sole engineer — designed, built, and shipped a full-stack food delivery app (React Native + MongoDB) end-to-end, from Figma prototypes to production on AWS with load balancing.',
        'Engineered a gamification system to incentivise repeat orders and drive user retention.',
      ],
    },
    fr: {
      role: 'Freelance Full-Stack',
      location: 'Tunis, Tunisie',
      bullets: [
        "Seul ingénieur — conception, développement et mise en production d'une application de livraison de repas full-stack (React Native + MongoDB) de bout en bout, des prototypes Figma jusqu'à la production sur AWS avec répartition de charge.",
        'Conception d\'un système de gamification pour encourager les commandes répétées et renforcer la fidélisation des utilisateurs.',
      ],
    },
  },
  {
    id: 'w04',
    num: '04',
    company: 'VERMEG',
    period: 'Jul – Sep 2024',
    tags: ['Python', 'NLP', 'Sentiment Analysis', 'TF-IDF', 'Fuzzy Matching'],
    en: {
      role: 'AI Enhancement Intern',
      location: 'Tunis, Tunisia',
      bullets: [
        'Within a 3-engineer team, built NLP features (sentiment analysis, TF-IDF search, fuzzy string matching) improving query relevance and automating support triage inside the ISAC platform.',
        'Trained a feedback analysis model to surface actionable product improvement signals from user submissions.',
      ],
    },
    fr: {
      role: 'Stagiaire Amélioration IA',
      location: 'Tunis, Tunisie',
      bullets: [
        "Au sein d'une équipe de 3 ingénieurs, développement de fonctionnalités NLP (analyse de sentiment, recherche TF-IDF, correspondance floue) améliorant la pertinence des requêtes et automatisant le tri des tickets de support dans la plateforme ISAC.",
        "Entraînement d'un modèle d'analyse des retours utilisateurs pour faire émerger des signaux exploitables d'amélioration produit.",
      ],
    },
  },
  {
    id: 'w05',
    num: '05',
    company: 'BibaDridi',
    period: 'Feb – Aug 2023',
    tags: ['React Native', 'React.js', 'Node.js', 'MongoDB', 'OVH Cloud'],
    en: {
      role: 'Full-Stack Freelance',
      location: 'Tunis, Tunisia',
      bullets: [
        'Delivered a full-stack web and mobile solution (React Native, React.js, Node.js, MongoDB) including multi-language support and data privacy controls; deployed on OVH Cloud.',
      ],
    },
    fr: {
      role: 'Freelance Full-Stack',
      location: 'Tunis, Tunisie',
      bullets: [
        "Livraison d'une solution web et mobile full-stack (React Native, React.js, Node.js, MongoDB) incluant le support multilingue et des contrôles de confidentialité des données ; déployée sur OVH Cloud.",
      ],
    },
  },
]

// ─── PROJECTS ───────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 'p01',
    num: '06',
    name: 'IMMObox AI Engine',
    stack: 'Python FastAPI · Azure SQL · Q1/Q3 Price Scoring',
    year: '2025',
    image: '/assets/img/portfolio/event/hult%20prize%20global%20accelerator/1.jpg',
    link: null,
    en: { desc: 'Tunisia\'s first intelligent real estate pricing platform. Deterministic Q1/Q3 quartile scoring across 24 governorats and 7 property types — bilingual FR/AR explanations, REST API, deployed on Azure.' },
    fr: { desc: "La première plateforme intelligente d'estimation immobilière de Tunisie. Scoring déterministe par quartiles Q1/Q3 sur 24 gouvernorats et 7 types de biens — explications bilingues FR/AR, API REST, déployée sur Azure." },
  },
  {
    id: 'p02',
    num: '07',
    name: 'Unihelp',
    stack: 'Angular · Spring Boot · Docker · OpenStack · Ansible · Kubernetes',
    year: '2024 – 2025',
    image: null,
    link: null,
    en: { desc: 'Microservices freelancing platform. Provisioned full OpenStack infrastructure with load balancing, automated with Ansible; orchestrated deployments with Kubernetes.' },
    fr: { desc: 'Plateforme de freelancing en microservices. Infrastructure OpenStack complète avec répartition de charge, automatisée avec Ansible ; déploiements orchestrés avec Kubernetes.' },
  },
  {
    id: 'p03',
    num: '08',
    name: 'Edulance',
    stack: 'Symfony · JavaFX · AI Content Moderation',
    year: '2023 – 2024',
    image: null,
    link: null,
    en: { desc: 'Web and desktop app for educational content management with AI image moderation to auto-detect adult content.' },
    fr: { desc: "Application web et desktop de gestion de contenu éducatif avec modération d'images par IA pour détecter automatiquement les contenus inappropriés." },
  },
  {
    id: 'p04',
    num: '09',
    name: 'E-Justice',
    stack: 'Qt C++ · Desktop Application',
    year: '2022',
    image: '/assets/img/portfolio/project/E-Justice/1.png',
    link: 'https://github.com/HediLengliz/Smart_Court_2A25',
    en: { desc: 'Groundbreaking court organisation and efficiency platform. Automated judicial processes, streamlined case management, intuitive UI for legal professionals.' },
    fr: { desc: "Plateforme innovante d'organisation et d'efficacité judiciaire. Automatisation des processus judiciaires, gestion simplifiée des dossiers, interface intuitive pour les professionnels du droit." },
  },
  {
    id: 'p05',
    num: '10',
    name: 'Cultrify',
    stack: 'HTML · CSS · JavaScript · PHP',
    year: '2023',
    image: '/assets/img/portfolio/project/cultrify/1.png',
    link: 'https://github.com/AlaBenKhalifa/web',
    en: { desc: 'Dynamic web-based event reservation and organisation platform. Users discover, reserve, and coordinate events with seamless host–attendee communication.' },
    fr: { desc: 'Plateforme web dynamique de réservation et d\'organisation d\'événements. Les utilisateurs découvrent, réservent et coordonnent des événements avec une communication fluide entre organisateurs et participants.' },
  },
  {
    id: 'p06',
    num: '11',
    name: 'The Time Jumper',
    stack: 'C · SDL · 2D Video Game',
    year: '2022',
    image: '/assets/img/portfolio/project/The%20Time%20Jumper/1.png',
    link: 'https://github.com/ismailbokri/superbia',
    en: { desc: '2D video game centred around Tunisian culture and the concept of time travel, with a compelling plot twist. Designed the game mechanics and a full marketing strategy.' },
    fr: { desc: 'Jeu vidéo 2D centré sur la culture tunisienne et le concept de voyage dans le temps, avec un retournement de situation captivant. Conception des mécaniques de jeu et d\'une stratégie marketing complète.' },
  },
  {
    id: 'p07',
    num: '12',
    name: 'TeamUp',
    stack: 'Machine Learning · Desktop Application',
    year: '2022',
    image: '/assets/img/portfolio/event/upside%20education/1.jpg',
    link: 'https://github.com/Haythem-Jaidane/TeamUp',
    en: { desc: 'Hackathon winner (Upside Education). Desktop app using ML to allocate students into teams based on personality types — built in 48 hours.' },
    fr: { desc: 'Gagnant du hackathon (Upside Education). Application desktop utilisant le machine learning pour répartir les étudiants en équipes selon leur type de personnalité — développée en 48 heures.' },
  },
]

// ─── CONTENT / EVENTS ───────────────────────────────────────────────────────
export const events = [
  {
    id: 'e01',
    year: '2022 – 2023',
    sortDate: 202209,
    rank: 1,
    category: 'Competition',
    image: '/assets/img/portfolio/event/hult%20prize%20global%20accelerator/1.jpg',
    images: [
      '/assets/img/portfolio/event/hult%20prize%20global%20accelerator/1.jpg',
      '/assets/img/portfolio/event/hult%20prize%20global%20accelerator/2.jpg',
      '/assets/img/portfolio/event/hult%20prize%20global%20accelerator/3.jpg',
      '/assets/img/portfolio/event/hult%20prize%20global%20accelerator/4.jpg',
      '/assets/img/portfolio/event/hult%20prize%20global%20accelerator/5.PNG',
    ],
    links: [
      { url: 'https://www.hultprize.org/winner-stories/2022/yopex/', label: 'Hult Prize' },
    ],
    en: {
      title: 'Hult Prize Global Accelerator',
      subtitle: 'Top 16 of 15,000+ teams worldwide · Boston, USA',
      desc: 'Out of 15,000+ teams, our project "Yopex" — a platform to empower students and startups — was selected for the Global Accelerator in Boston. Engaged with top investors and industry experts.',
    },
    fr: {
      title: 'Hult Prize Global Accelerator',
      subtitle: 'Top 16 sur plus de 15 000 équipes dans le monde · Boston, États-Unis',
      desc: 'Parmi plus de 15 000 équipes, notre projet « Yopex » — une plateforme pour accompagner étudiants et startups — a été sélectionné pour le Global Accelerator à Boston. Échanges avec des investisseurs de premier plan et des experts du secteur.',
    },
  },
  {
    id: 'e02',
    year: 'Apr 2023',
    sortDate: 202304,
    rank: 2,
    category: 'Conference',
    image: '/assets/img/portfolio/event/harvard/1.jpg',
    images: [
      '/assets/img/portfolio/event/harvard/1.jpg',
      '/assets/img/portfolio/event/harvard/3.jpg',
    ],
    en: {
      title: 'Harvard Africa Business Conference',
      subtitle: 'VIP Invitation · Harvard Business School',
      desc: 'Invited as a VIP to present the "Watchaboo" education project at the Africa Business Conference at Harvard Business School.',
    },
    fr: {
      title: 'Harvard Africa Business Conference',
      subtitle: 'Invitation VIP · Harvard Business School',
      desc: 'Invité en tant qu\'invité VIP pour présenter le projet éducatif « Watchaboo » à l\'Africa Business Conference de la Harvard Business School.',
    },
  },
  {
    id: 'e03',
    year: 'Mar 2024',
    sortDate: 202403,
    rank: 3,
    category: 'Hackathon',
    image: '/assets/img/portfolio/event/WIB/1.jpg',
    images: [
      '/assets/img/portfolio/event/WIB/1.jpg',
    ],
    en: {
      title: 'WIB Hackathon — 1st Place',
      subtitle: 'Accessibility web app with gamification layer',
      desc: 'Led a team to first place — built an accessibility web app with a gamification layer to encourage inclusive digital experiences.',
    },
    fr: {
      title: 'WIB Hackathon — 1re place',
      subtitle: "Application web d'accessibilité avec une couche de gamification",
      desc: "A mené une équipe à la première place — développement d'une application web d'accessibilité avec une couche de gamification pour encourager des expériences numériques inclusives.",
    },
  },
  {
    id: 'e04',
    year: 'Sep 2022 – Mar 2023',
    sortDate: 202209,
    rank: 7,
    category: 'Organisation',
    image: '/assets/img/portfolio/event/HP%20OC/1.jpg',
    images: [
      '/assets/img/portfolio/event/HP%20OC/1.jpg',
      '/assets/img/portfolio/event/HP%20OC/2.jpg',
    ],
    en: {
      title: 'Hult Prize OnCampus',
      subtitle: 'Experts & Judges Coordinator · ESPRIT',
      desc: 'Served as Experts and Judges Coordinator for the OnCampus programme — extended invitations, managed logistics, and ensured a seamless experience for all evaluators.',
    },
    fr: {
      title: 'Hult Prize OnCampus',
      subtitle: 'Coordinateur Experts & Jury · ESPRIT',
      desc: "A occupé le poste de Coordinateur Experts et Jury pour le programme OnCampus — envoi des invitations, gestion de la logistique et garantie d'une expérience fluide pour tous les évaluateurs.",
    },
  },
  {
    id: 'e05',
    year: 'Sep 2022',
    sortDate: 202209,
    rank: 9,
    category: 'Organisation',
    image: '/assets/img/portfolio/event/OC%20APP0%20Esprit/1.png',
    images: [
      '/assets/img/portfolio/event/OC%20APP0%20Esprit/1.png',
      '/assets/img/portfolio/event/OC%20APP0%20Esprit/2.png',
      '/assets/img/portfolio/event/OC%20APP0%20Esprit/3.png',
    ],
    links: [
      { url: 'https://www.facebook.com/esprit.tn/posts/pfbid02yBghvR4BZ3SsSpwaB5NeN2T9Eun8ob97CCkrmrn6PjJ3h4fMjqXDKPf7oS692g3Vl', label: 'Facebook' },
    ],
    en: {
      title: 'APP0 Esprit — Organising Committee',
      subtitle: 'Freshmen Welcome Event · ESPRIT University',
      desc: 'Organised the annual APP0 event welcoming incoming freshmen — coordinated team assignments, logistics, and prototype sessions.',
    },
    fr: {
      title: "APP0 Esprit — Comité d'organisation",
      subtitle: "Événement d'accueil des nouveaux étudiants · Université ESPRIT",
      desc: "Organisation de l'événement annuel APP0 d'accueil des nouveaux étudiants — coordination de la répartition des équipes, de la logistique et des sessions de prototypage.",
    },
  },
  {
    id: 'e06',
    year: 'Mar 2021',
    sortDate: 202103,
    rank: 11,
    category: 'Bootcamp',
    image: '/assets/img/portfolio/event/NMTC/1.png',
    images: [
      '/assets/img/portfolio/event/NMTC/1.png',
      '/assets/img/portfolio/event/NMTC/2.png',
      '/assets/img/portfolio/event/NMTC/3.png',
    ],
    links: [
      { url: 'https://www.facebook.com/NMTC.TUNISIA/posts/pfbid0rjeE9yGT11cGrX6bJXokq4stesR5S8Gpb6Gfagao23JzMn8nxK3niJAjDzAmcm8gl', label: 'Facebook' },
    ],
    en: {
      title: 'NMTC',
      subtitle: 'National Microsoft Technology Bootcamp',
      desc: 'Participated in the National Microsoft Technology Bootcamp — seminars on Web 4.0, Big Data, Cloud, and Blockchain, plus a hackathon.',
    },
    fr: {
      title: 'NMTC',
      subtitle: 'Bootcamp national des technologies Microsoft',
      desc: 'Participation au Bootcamp national des technologies Microsoft — séminaires sur le Web 4.0, le Big Data, le Cloud et la Blockchain, ainsi qu\'un hackathon.',
    },
  },
  {
    id: 'e07',
    year: 'Nov 2021',
    sortDate: 202111,
    rank: 10,
    category: 'Leadership',
    image: '/assets/img/portfolio/event/Theatre%20Workshop/1.png',
    images: [
      '/assets/img/portfolio/event/Theatre%20Workshop/1.png',
      '/assets/img/portfolio/event/Theatre%20Workshop/2.png',
    ],
    links: [
      { url: 'https://www.facebook.com/Na9chaTN/posts/pfbid0KpXNVn7T8vwvcTrANgGKgCHv1NxD6G4QXgDC3LauGKLEuX9FNvTCwR8CbUiidW8cl', label: 'Facebook' },
    ],
    en: {
      title: 'Theatre Workshop',
      subtitle: 'Co-Founder · NaQcha Theatre Club',
      desc: 'As co-founder of NaQcha Theatre Club, organised a successful workshop on theatre arts — handled logistics, speaker selection, and facilitated engaging discussions.',
    },
    fr: {
      title: 'Atelier de théâtre',
      subtitle: 'Co-fondateur · Club de théâtre NaQcha',
      desc: 'En tant que co-fondateur du club de théâtre NaQcha, organisation d\'un atelier réussi sur les arts théâtraux — gestion de la logistique, sélection des intervenants et animation de discussions enrichissantes.',
    },
  },
  {
    id: 'e08',
    year: 'Jun 2023',
    sortDate: 202306,
    rank: 12,
    category: 'Media',
    image: '/assets/img/portfolio/event/radio-shows/1.png',
    images: [
      '/assets/img/portfolio/event/radio-shows/1.png',
      '/assets/img/portfolio/event/radio-shows/2.png',
    ],
    links: [
      { url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02dcEFCyzgpK9RC2TodvM3CMhDz61rsLhF4HWZRM19foFzu2ywnYgJ5Pa6sNPAuyLxl&id=100009407850464', label: 'Facebook' },
    ],
    en: {
      title: 'Radio Shows',
      subtitle: 'Guest Speaker · 2 National Appearances',
      desc: 'Featured as a guest on two national radio shows — discussed academic excellence strategies in one, and co-presented the "Watchaboo" project in the other.',
    },
    fr: {
      title: 'Émissions de radio',
      subtitle: 'Invité · 2 passages nationaux',
      desc: 'Invité sur deux émissions de radio nationales — discussion sur les stratégies de réussite académique dans l\'une, et co-présentation du projet « Watchaboo » dans l\'autre.',
    },
  },
  {
    id: 'e09',
    year: '2021 – 2024',
    sortDate: 202101,
    rank: 5,
    category: 'Leadership',
    image: '/assets/img/portfolio/club/ieee/2.png',
    images: [
      '/assets/img/portfolio/club/ieee/2.png',
      '/assets/img/portfolio/club/ieee/1.jpg',
    ],
    en: {
      title: 'IEEE CS Chapter ESPRIT',
      subtitle: 'General Secretary · Executive Committee Member',
      desc: 'Served as General Secretary — coordinated activities, events, and initiatives; facilitated collaborations with faculty, industry professionals, and students. Led workshops on React.js, React Native, Python, Bootstrap, and pitched a Deepfake Detection algorithm at the TSYP IEEE CS Challenge.',
    },
    fr: {
      title: 'IEEE CS Chapter ESPRIT',
      subtitle: 'Secrétaire général · Membre du comité exécutif',
      desc: "A occupé le poste de Secrétaire général — coordination des activités, événements et initiatives ; facilitation des collaborations avec le corps enseignant, les professionnels du secteur et les étudiants. Animation d'ateliers sur React.js, React Native, Python, Bootstrap, et présentation d'un algorithme de détection de deepfake au TSYP IEEE CS Challenge.",
    },
  },
  {
    id: 'e10',
    year: 'Oct 2022',
    sortDate: 202210,
    rank: 4,
    category: 'Hackathon',
    image: '/assets/img/portfolio/event/upside%20education/1.jpg',
    images: [
      '/assets/img/portfolio/event/upside%20education/1.jpg',
      '/assets/img/portfolio/event/upside%20education/2.jpg',
      '/assets/img/portfolio/event/upside%20education/3.jpg',
    ],
    links: [
      { url: 'https://github.com/Haythem-Jaidane/TeamUp', label: 'GitHub' },
    ],
    en: {
      title: 'Upside Education Hackathon',
      subtitle: '"TeamUp" — ML-powered team allocation app',
      desc: 'Built "TeamUp" in 48 hours — a desktop application using ML to allocate students into teams based on their personality types.',
    },
    fr: {
      title: 'Upside Education Hackathon',
      subtitle: '« TeamUp » — application de répartition d\'équipes par machine learning',
      desc: 'Développement de « TeamUp » en 48 heures — une application desktop utilisant le machine learning pour répartir les étudiants en équipes selon leur type de personnalité.',
    },
  },
  {
    id: 'e11',
    year: '2024 – 2025',
    sortDate: 202401,
    rank: 13,
    category: 'Academic',
    image: '/assets/img/portfolio/project/Unihelp/1.png',
    images: [
      '/assets/img/portfolio/project/Unihelp/1.png',
      '/assets/img/portfolio/project/Unihelp/2.png',
    ],
    links: [
      { url: 'https://github.com/AlaBenKhalifa/Unihelp-Integration/tree/main', label: 'GitHub' },
    ],
    en: {
      title: 'Unihelp',
      subtitle: 'Microservices Freelancing Platform · ESPRIT',
      desc: 'Microservices freelancing platform. Provisioned full OpenStack infrastructure with load balancing, automated with Ansible; orchestrated deployments with Kubernetes.',
    },
    fr: {
      title: 'Unihelp',
      subtitle: 'Plateforme de freelancing en microservices · ESPRIT',
      desc: 'Plateforme de freelancing en microservices. Infrastructure OpenStack complète avec répartition de charge, automatisée avec Ansible ; déploiements orchestrés avec Kubernetes.',
    },
  },
  {
    id: 'e12',
    year: '2023 – 2024',
    sortDate: 202301,
    rank: 14,
    category: 'Academic',
    image: '/assets/img/portfolio/project/Edulance/1.png',
    images: [
      '/assets/img/portfolio/project/Edulance/1.png',
      '/assets/img/portfolio/project/Edulance/2.png',
      '/assets/img/portfolio/project/Edulance/3.png',
      '/assets/img/portfolio/project/Edulance/4.png',
    ],
    links: [
      { url: 'https://github.com/AlaBenKhalifa/EdulanceJAVA', label: 'GitHub (JavaFX)' },
      { url: 'https://github.com/KhalifaMounir/edulance', label: 'GitHub (Web)' },
    ],
    en: {
      title: 'Edulance',
      subtitle: 'Educational Content Platform · ESPRIT',
      desc: 'Web and desktop app for educational content management with AI image moderation to auto-detect adult content.',
    },
    fr: {
      title: 'Edulance',
      subtitle: 'Plateforme de contenu éducatif · ESPRIT',
      desc: "Application web et desktop de gestion de contenu éducatif avec modération d'images par IA pour détecter automatiquement les contenus inappropriés.",
    },
  },
  {
    id: 'e13',
    year: '2022',
    sortDate: 202201,
    rank: 16,
    category: 'Academic',
    image: '/assets/img/portfolio/project/E-Justice/1.png',
    images: [
      '/assets/img/portfolio/project/E-Justice/1.png',
      '/assets/img/portfolio/project/E-Justice/2.png',
    ],
    links: [
      { url: 'https://github.com/HediLengliz/Smart_Court_2A25', label: 'GitHub' },
    ],
    en: {
      title: 'E-Justice',
      subtitle: 'Smart Court Management System · ESPRIT',
      desc: 'Groundbreaking court organisation and efficiency platform. Automated judicial processes, streamlined case management, intuitive UI for legal professionals.',
    },
    fr: {
      title: 'E-Justice',
      subtitle: 'Système de gestion judiciaire intelligent · ESPRIT',
      desc: "Plateforme innovante d'organisation et d'efficacité judiciaire. Automatisation des processus judiciaires, gestion simplifiée des dossiers, interface intuitive pour les professionnels du droit.",
    },
  },
  {
    id: 'e14',
    year: '2023',
    sortDate: 202301,
    rank: 15,
    category: 'Academic',
    image: '/assets/img/portfolio/project/cultrify/1.png',
    images: [
      '/assets/img/portfolio/project/cultrify/1.png',
      '/assets/img/portfolio/project/cultrify/2.png',
    ],
    links: [
      { url: 'https://github.com/AlaBenKhalifa/web', label: 'GitHub' },
    ],
    en: {
      title: 'Cultrify',
      subtitle: 'Event Reservation Platform · ESPRIT',
      desc: 'Dynamic web-based event reservation and organisation platform. Users discover, reserve, and coordinate events with seamless host–attendee communication.',
    },
    fr: {
      title: 'Cultrify',
      subtitle: "Plateforme de réservation d'événements · ESPRIT",
      desc: "Plateforme web dynamique de réservation et d'organisation d'événements. Les utilisateurs découvrent, réservent et coordonnent des événements avec une communication fluide entre organisateurs et participants.",
    },
  },
  {
    id: 'e15',
    year: '2022',
    sortDate: 202201,
    rank: 17,
    category: 'Academic',
    image: '/assets/img/portfolio/project/The%20Time%20Jumper/1.png',
    images: [
      '/assets/img/portfolio/project/The%20Time%20Jumper/1.png',
      '/assets/img/portfolio/project/The%20Time%20Jumper/2.png',
    ],
    links: [
      { url: 'https://github.com/ismailbokri/superbia', label: 'GitHub' },
    ],
    en: {
      title: 'The Time Jumper',
      subtitle: '2D Video Game · ESPRIT',
      desc: '2D video game centred around Tunisian culture and the concept of time travel, with a compelling plot twist. Designed the game mechanics and a full marketing strategy.',
    },
    fr: {
      title: 'The Time Jumper',
      subtitle: 'Jeu vidéo 2D · ESPRIT',
      desc: "Jeu vidéo 2D centré sur la culture tunisienne et le concept de voyage dans le temps, avec un retournement de situation captivant. Conception des mécaniques de jeu et d'une stratégie marketing complète.",
    },
  },
  {
    id: 'e16',
    year: '2023 – 2024',
    sortDate: 202301,
    rank: 6,
    category: 'Competition',
    image: '/assets/img/portfolio/event/TSYP/1.jpg',
    images: [
      '/assets/img/portfolio/event/TSYP/1.jpg',
      '/assets/img/portfolio/event/TSYP/2.jpg',
    ],
    links: [],
    en: {
      title: 'TSYP IEEE CS Challenge',
      subtitle: 'Deep Learning Deepfake Detection Algorithm',
      desc: 'Pitched a deep learning-based deepfake detection algorithm at the TSYP IEEE Computer Society Challenge, presenting the technical approach and its potential impact to a panel of judges.',
    },
    fr: {
      title: 'TSYP IEEE CS Challenge',
      subtitle: 'Algorithme de détection de deepfakes par deep learning',
      desc: "Présentation d'un algorithme de détection de deepfakes basé sur le deep learning au TSYP IEEE Computer Society Challenge, exposant l'approche technique et son impact potentiel devant un jury.",
    },
  },
  {
    id: 'e17',
    year: '2023',
    sortDate: 202301,
    rank: 8,
    category: 'Organisation',
    image: '/assets/img/portfolio/event/IEEEXtreme/1.jpg',
    images: [
      '/assets/img/portfolio/event/IEEEXtreme/1.jpg',
    ],
    links: [],
    en: {
      title: 'IEEEXtreme Programming Competition',
      subtitle: 'Organising Committee Member · ESPRIT IEEE Student Branch',
      desc: "Served on the organising committee for IEEEXtreme, the IEEE Computer Society's global 24-hour programming competition, helping run the on-site event for ESPRIT's student branch.",
    },
    fr: {
      title: 'IEEEXtreme Programming Competition',
      subtitle: "Membre du comité d'organisation · ESPRIT IEEE Student Branch",
      desc: "Membre du comité d'organisation d'IEEEXtreme, la compétition mondiale de programmation de 24 heures de l'IEEE Computer Society, contribuant à l'organisation de l'événement sur place pour la branche étudiante ESPRIT.",
    },
  },
]

// ─── SKILLS (About page grid) ────────────────────────────────────────────────
export const skills = [
  {
    id: 's01',
    en: { label: 'AI / NLP', items: 'Price Scoring · Sentiment Analysis · TF-IDF · Fuzzy Matching · GradientBoosting' },
    fr: { label: 'IA / NLP', items: 'Price Scoring · Sentiment Analysis · TF-IDF · Fuzzy Matching · GradientBoosting' },
  },
  {
    id: 's02',
    en: { label: 'Backend', items: 'Python FastAPI · .NET 8 · Node.js · Spring Boot · Symfony · Flask' },
    fr: { label: 'Backend', items: 'Python FastAPI · .NET 8 · Node.js · Spring Boot · Symfony · Flask' },
  },
  {
    id: 's03',
    en: { label: 'Frontend', items: 'Angular 18 · React Native · React.js · FlutterFlow' },
    fr: { label: 'Frontend', items: 'Angular 18 · React Native · React.js · FlutterFlow' },
  },
  {
    id: 's04',
    en: { label: 'DevOps & Cloud', items: 'Azure · Docker · Kubernetes · Argo CD · Ansible · Terraform · OpenStack · AWS · Linux' },
    fr: { label: 'DevOps & Cloud', items: 'Azure · Docker · Kubernetes · Argo CD · Ansible · Terraform · OpenStack · AWS · Linux' },
  },
  {
    id: 's05',
    en: { label: 'Databases', items: 'Azure SQL · MongoDB · PostgreSQL · PL/SQL' },
    fr: { label: 'Bases de données', items: 'Azure SQL · MongoDB · PostgreSQL · PL/SQL' },
  },
  {
    id: 's06',
    en: { label: 'Languages', items: 'Python · C# · Java · JavaScript · C · C++' },
    fr: { label: 'Langages', items: 'Python · C# · Java · JavaScript · C · C++' },
  },
  {
    id: 's07',
    en: { label: 'Tools', items: 'Git · Figma · HashiCorp Vault · OpenTelemetry · Jira' },
    fr: { label: 'Outils', items: 'Git · Figma · HashiCorp Vault · OpenTelemetry · Jira' },
  },
  {
    id: 's08',
    en: { label: 'Human Languages', items: 'Arabic (Native) · French (Fluent) · English (Fluent)' },
    fr: { label: 'Langues parlées', items: 'Arabe (langue maternelle) · Français (courant) · Anglais (courant)' },
  },
]

// ─── SKILLS CLOUD ─────────────────────────────────────────────────────────────
export const skillsCloud = [
  // Languages
  { name: 'Python',         slug: 'python',              category: 'Languages' },
  { name: 'JavaScript',     slug: 'javascript',          category: 'Languages' },
  { name: 'Java',           slug: 'java',                category: 'Languages' },
  { name: 'C#',             slug: 'csharp',              category: 'Languages' },
  { name: 'C++',            slug: 'cplusplus',           category: 'Languages' },

  // Backend
  { name: 'FastAPI',        slug: 'fastapi',             category: 'Backend'   },
  { name: '.NET',           slug: 'dotnet',              category: 'Backend'   },
  { name: 'Node.js',        slug: 'nodedotjs',           category: 'Backend'   },
  { name: 'Spring Boot',    slug: 'springboot',          category: 'Backend'   },
  { name: 'Symfony',        slug: 'symfony',             category: 'Backend'   },
  { name: 'Flask',          slug: 'flask',               category: 'Backend'   },

  // Frontend
  { name: 'Angular',        slug: 'angular',             category: 'Frontend'  },
  { name: 'React',          slug: 'react',               category: 'Frontend'  },
  { name: 'React Native',   slug: 'react',               category: 'Frontend'  },
  { name: 'Flutter',        slug: 'flutter',             category: 'Frontend'  },
  { name: 'HTML5',          slug: 'html5',               category: 'Frontend'  },
  { name: 'CSS3',           slug: 'css3',                category: 'Frontend'  },

  // DevOps
  { name: 'Azure',          slug: 'microsoftazure',      category: 'DevOps'    },
  { name: 'AWS',            slug: 'amazonaws',           category: 'DevOps'    },
  { name: 'Docker',         slug: 'docker',              category: 'DevOps'    },
  { name: 'Kubernetes',     slug: 'kubernetes',          category: 'DevOps'    },
  { name: 'Argo CD',        slug: 'argo',                category: 'DevOps'    },
  { name: 'Helm',           slug: 'helm',                category: 'DevOps'    },
  { name: 'Ansible',        slug: 'ansible',             category: 'DevOps'    },
  { name: 'Terraform',      slug: 'terraform',           category: 'DevOps'    },
  { name: 'Linux',          slug: 'linux',               category: 'DevOps'    },
  { name: 'OpenStack',      slug: 'openstack',           category: 'DevOps'    },

  // Databases
  { name: 'MongoDB',        slug: 'mongodb',             category: 'Databases' },
  { name: 'PostgreSQL',     slug: 'postgresql',          category: 'Databases' },
  { name: 'SQL Server',     slug: 'microsoftsqlserver',  category: 'Databases' },

  // Tools
  { name: 'Git',            slug: 'git',                 category: 'Tools'     },
  { name: 'GitHub',         slug: 'github',              category: 'Tools'     },
  { name: 'Figma',          slug: 'figma',               category: 'Tools'     },
  { name: 'Jira',           slug: 'jira',                category: 'Tools'     },
  { name: 'HashiCorp Vault',slug: 'vault',               category: 'Tools'     },
  { name: 'OpenTelemetry',  slug: 'opentelemetry',       category: 'Tools'     },
  { name: 'Scikit-learn',   slug: 'scikitlearn',         category: 'Tools'     },
]

// ─── CERTIFICATIONS ──────────────────────────────────────────────────────────
// Certificate titles/issuers are official document names — kept identical
// across locales; only `category` is translated (via the certCat dictionary).
const BASE = '/assets/certifications'

export const certifications = [
  {
    id: 'c01',
    title: 'Hult Prize OnCampus',
    issuer: 'Hult Prize Foundation',
    category: 'Competition',
    file: `${BASE}/Hult Prize OC.pdf`,
    isPdf: true,
  },
  {
    id: 'c02',
    title: 'AWS Cloud Operations',
    issuer: 'Amazon Web Services Academy',
    category: 'Cloud',
    file: `${BASE}/AWS cloud operations.pdf`,
    badge: `${BASE}/aws-academy-graduate-cloud-operations-training-badg.png`,
    isPdf: true,
  },
  {
    id: 'c03',
    title: 'Yopex — Ala Eddine Ben Khalifa',
    issuer: 'Hult Prize',
    category: 'Competition',
    file: `${BASE}/Yopex _Ala eddine Ben Khalifa.pdf`,
    isPdf: true,
  },
  {
    id: 'c04',
    title: 'Istanbul Regional — ESPRIT',
    issuer: 'Hult Prize Global',
    category: 'Competition',
    file: `${BASE}/Yopex_Istanbul Regional_ESPRIT_Ala  Ben KHLIFA.pdf`,
    isPdf: true,
  },
  {
    id: 'c05',
    title: 'Python Programming',
    issuer: 'Sololearn',
    category: 'Programming',
    file: `${BASE}/pythoncert.pdf`,
    isPdf: true,
  },
  {
    id: 'c06',
    title: 'CSS Certificate',
    issuer: 'Sololearn',
    category: 'Programming',
    file: `${BASE}/css certificate.pdf`,
    isPdf: true,
  },
  {
    id: 'c07',
    title: 'Sololearn Achievement',
    issuer: 'Sololearn',
    category: 'Programming',
    file: `${BASE}/Sololearn.pdf`,
    isPdf: true,
  },
  {
    id: 'c08',
    title: 'Blockchain Fundamentals',
    issuer: 'Online Course',
    category: 'Technology',
    file: `${BASE}/Blockchain.pdf`,
    isPdf: true,
  },
  {
    id: 'c09',
    title: 'EF SET English Certificate',
    issuer: 'EF Standard English Test',
    category: 'Language',
    file: `${BASE}/EF SET Certificate.pdf`,
    isPdf: true,
  },
  {
    id: 'c10',
    title: 'PI READY Bootcamp',
    issuer: 'Programme',
    category: 'Training',
    file: `${BASE}/Certif PI READY Bootcamp.pdf`,
    isPdf: true,
  },
  {
    id: 'c11',
    title: 'Mandatory Internship Certificate',
    issuer: 'ESPRIT School of Engineering',
    category: 'Academic',
    file: `${BASE}/Mandatory Internship.pdf`,
    isPdf: true,
  },
  {
    id: 'c12',
    title: 'NaQcha — 2nd Runner Up',
    issuer: 'NaQcha Theatre Club',
    category: 'Leadership',
    file: `${BASE}/2nd Runner Up Certificate_NaQcha.pdf`,
    isPdf: true,
  },
  {
    id: 'c13',
    title: 'IEEE Day — Appreciation',
    issuer: 'IEEE',
    category: 'IEEE',
    file: `${BASE}/Certificate of appreciation - IEEE Day.pdf`,
    isPdf: true,
  },
  {
    id: 'c14',
    title: 'Upside Education — Appreciation',
    issuer: 'Upside Education',
    category: 'Competition',
    file: `${BASE}/Certificate of appreciation - upside education.pdf`,
    isPdf: true,
  },
  {
    id: 'c15',
    title: 'TSYP — Participation',
    issuer: 'IEEE Tunisia Section',
    category: 'IEEE',
    file: `${BASE}/Certificate of paticipation - TSYP.jpg`,
    isPdf: false,
  },
  {
    id: 'c16',
    title: 'Bootstrap — Appreciation',
    issuer: 'IEEE CS ESPRIT',
    category: 'IEEE',
    file: `${BASE}/cert of appreciation (Bootstrap).pdf`,
    isPdf: true,
  },
  {
    id: 'c17',
    title: 'IEEE ExCom — Appreciation',
    issuer: 'IEEE CS ESPRIT',
    category: 'IEEE',
    file: `${BASE}/cert of appreciation - IEEE ExCom.pdf`,
    isPdf: true,
  },
  {
    id: 'c18',
    title: 'IEEE CS Certificate',
    issuer: 'IEEE Computer Society',
    category: 'IEEE',
    file: `${BASE}/CS IEEE cert.pdf`,
    isPdf: true,
  },
  {
    id: 'c19',
    title: 'IEEE CIS Certificate',
    issuer: 'IEEE Computational Intelligence Society',
    category: 'IEEE',
    file: `${BASE}/CIS IEEE cert.pdf`,
    isPdf: true,
  },
  {
    id: 'c20',
    title: 'IEEE IES Certificate',
    issuer: 'IEEE Industrial Electronics Society',
    category: 'IEEE',
    file: `${BASE}/IES IEEE cert.pdf`,
    isPdf: true,
  },
  {
    id: 'c21',
    title: 'IEEE PES Certificate',
    issuer: 'IEEE Power & Energy Society',
    category: 'IEEE',
    file: `${BASE}/PES IEEE cert.pdf`,
    isPdf: true,
  },
  {
    id: 'c22',
    title: 'IEEE General Certificate',
    issuer: 'IEEE',
    category: 'IEEE',
    file: `${BASE}/ieee ccert.pdf`,
    isPdf: true,
  },
  {
    id: 'c23',
    title: 'Personal Achievement',
    issuer: 'Ala Eddine Ben Khalifa',
    category: 'Academic',
    file: `${BASE}/Ala BEN KHLIFA.pdf`,
    isPdf: true,
  },
]

// ─── TICKER ITEMS ────────────────────────────────────────────────────────────
export const tickerItems = {
  en: [
    'Top 16 of 15,000+ Teams · Hult Prize Global',
    'WIB Hackathon — 1st Place',
    'Harvard Africa Business Conference',
    '4 Countries: TN / CA / USA / TR',
    '5+ Production Deployments',
    'AI · Full-Stack · DevOps',
    'ESPRIT School of Engineering',
    'Available Now',
  ],
  fr: [
    'Top 16 sur plus de 15 000 équipes · Hult Prize Global',
    'WIB Hackathon — 1re place',
    'Harvard Africa Business Conference',
    '4 pays : TN / CA / USA / TR',
    '5+ déploiements en production',
    'IA · Full-Stack · DevOps',
    "ESPRIT — École d'Ingénieurs",
    'Disponible maintenant',
  ],
}
