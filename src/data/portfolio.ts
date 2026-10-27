// Portfolio data structure for Kadheer Vel Raj N
// Contains navigation, biography, services, projects, contacts, and image metadata

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  eager?: boolean;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export type ProjectStatus = 'ongoing' | 'shipped' | 'completed' | 'prototype';

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectItem {
  number: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  domain: string;
  description: string;
  highlights: string[];
  metrics: ProjectMetric[];
  stack: string[];
  links: ProjectLink[];
}

export interface PatentItem {
  number: string;
  title: string;
  publicationNo: string;
  applicationNo: string;
  filed: string;
  published: string;
  applicant: string;
  role: string;
  summary: string;
  pdf: string;
}

export interface CertificationItem {
  title: string;
  code: string;
  issuer: string;
  school: string;
  period: string;
  type: string;
  pdf: string;
}

export interface ContactItem {
  label: string;
  href: string;
  icon?: string;
}

export interface PortfolioData {
  nav: NavItem[];
  hero: {
    heading: string;
    subtitle: string;
  };
  about: {
    text: string;
    cornerImages: ProjectImage[];
  };
  services: ServiceItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  patents: PatentItem[];
  certifications: CertificationItem[];
  contacts: ContactItem[];
}

// Main portfolio data
export const portfolioData: PortfolioData = {
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }],
  hero: {
    heading: "Hi, I'm Kadheer",
    subtitle: 'a data science creator building intelligent automation and financial market systems',
  },
  about: {
    text: "I'm a Data Science student at Vellore Institute of Technology, focused on predictive analytics, n8n AI automation, and financial market systems. I build practical workflows, analytical pipelines, and trading tools across Forex, crypto, gold, and crude oil. Based in India, I'm open to projects and collaborations that turn complex data into useful decisions.",
    cornerImages: [
      {
        src: 'images/about_1.jpg',
        alt: 'Kadheer Vel Raj N — black and white profile portrait with glasses',
        width: 900,
        height: 995,
      },
      {
        src: 'images/about_2.jpg',
        alt: 'Kadheer Vel Raj N — black and white portrait looking down',
        width: 900,
        height: 901,
      },
      {
        src: 'images/about_3.jpg',
        alt: 'Kadheer Vel Raj N — black and white outdoor profile portrait',
        width: 700,
        height: 700,
      },
      {
        src: 'images/about_4.jpg',
        alt: 'Kadheer Vel Raj N — black and white front portrait',
        width: 900,
        height: 900,
      }],
  },
  services: [
    {
      number: '01',
      title: 'Data Science & Analytics',
      description: 'Python, Pandas, SQL, exploratory analysis, visualization, predictive modeling, and machine-learning workflows.',
    },
    {
      number: '02',
      title: 'n8n AI Automation',
      description: 'n8n pipelines connecting LLMs, webhooks, APIs, Telegram bots, and automated task execution.',
    },
    {
      number: '03',
      title: 'Forex Trading Systems',
      description: 'Market-structure analysis, price-action setups, technical indicators, alerts, and controlled risk parameters.',
    },
    {
      number: '04',
      title: 'Crypto Market Analytics',
      description: 'Cryptocurrency tracking, liquidity analysis, backtesting, and risk-management tooling.',
    },
    {
      number: '05',
      title: 'Commodities Analytics',
      description: 'Gold and crude-oil monitoring using liquidity zones, macroeconomic signals, analytical scripts, and alerts.',
    }],
  skills: [
    {
      title: 'AI & ML',
      skills: ['TensorFlow', 'Keras', 'PyTorch', 'scikit-learn', 'XGBoost', 'Hugging Face', 'OpenCV', 'YOLO', 'SHAP', 'spaCy', 'Predictive Modeling', 'Time-Series Forecasting'],
    },
    {
      title: 'Languages',
      skills: ['Python', 'SQL', 'R', 'JavaScript', 'TypeScript'],
    },
    {
      title: 'Data & Analytics',
      skills: ['pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Apache Spark', 'Apache Kafka', 'Power BI', 'Tableau'],
    },
    {
      title: 'Web & Backend',
      skills: ['HTML', 'CSS', 'Tailwind CSS', 'React', 'Next.js', 'Node.js', 'FastAPI', 'Streamlit', 'Gradio'],
    },
    {
      title: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase'],
    },
    {
      title: 'Dev & Cloud',
      skills: ['GitHub', 'Docker', 'Vercel', 'AWS', 'Google Cloud', 'Google Colab', 'Jupyter', 'VS Code', 'Postman', 'Pytest', 'Linux'],
    },
    {
      title: 'AI Coding & Agents',
      skills: ['Claude Code', 'Antigravity', 'Cursor', 'Codex', 'Gemini CLI', 'Claude', 'Model Context Protocol', 'Prompt engineering'],
    },
    {
      title: 'Research & Workflow',
      skills: ['LaTeX (Overleaf)', 'Notion', 'Obsidian', 'Excel', 'Google Sheets', 'Patent drafting', 'Scientific writing'],
    },
    {
      title: 'n8n & AI Automation',
      skills: ['n8n', 'LLM Agents', 'OpenAI API', 'Webhooks', 'REST APIs', 'Telegram Bots', 'Workflow Orchestration', 'Task Automation'],
    },
    {
      title: 'Financial Markets',
      skills: ['Forex', 'Crypto', 'Gold (XAUUSD)', 'Crude Oil', 'TradingView', 'Price Action', 'Market Structure', 'Liquidity Analysis', 'Risk Management', 'Backtesting'],
    }],
  projects: [
    {
      number: '01',
      title: 'Multi-Agent Business Automation',
      tagline: 'Explainable Context-Aware Multi-Agent Workflow Orchestration',
      status: 'ongoing',
      domain: 'AI & Automation',
      description:
        'A decision engine where a context analyzer scores every incoming business request 0-10 with full explanations, a planner agent decomposes it into sub-tasks, and five specialized agents (support, leads, scheduling, finance, inventory) execute through n8n — with human-in-the-loop gates on high-priority and negative-sentiment cases.',
      highlights: [
        'Novelty 1: prioritization engine scoring urgency, client tier, revenue impact & sentiment',
        'Five specialized agents incl. RAG support answering with citations and escalation rules',
        'Failure-safe n8n bridge: plans queue locally when the network is killed',
        'React + TypeScript 7-route demo console for live evaluation',
      ],
      metrics: [
        { value: '5', label: 'Specialized Agents' },
        { value: '0-10', label: 'Explainable Priority' },
        { value: '7', label: 'Dashboard Routes' },
        { value: 'HITL', label: 'Human-in-the-Loop' },
      ],
      stack: ['Python', 'n8n', 'React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'SQLite'],
      links: [{ label: 'Discuss Project', href: '#contact' }],
    },
    {
      number: '02',
      title: 'Misinformation Detection Engine',
      tagline: 'Adaptive Credibility Scoring & Rumor Propagation Network',
      status: 'shipped',
      domain: 'Data Science & NLP',
      description:
        'An end-to-end misinformation analysis platform that fuses five evidence layers — BERT semantics, VADER emotional-manipulation detection, speaker reliability history, live fact-check cross-referencing, and epidemic-style rumor modeling — into one adaptive 0-100 credibility index with publish/flag/review/block recommendations.',
      highlights: [
        'Adaptive Evidence Fusion engine blends five layers into one calibrated score',
        'BERT classifier + TF-IDF/Random-Forest baselines trained on the LIAR benchmark',
        'SIR epidemic simulation on scale-free Barabasi-Albert graphs for virality risk',
        'Live verification against Google Fact Check Tools API and PolitiFact RSS feeds',
      ],
      metrics: [
        { value: '0-100', label: 'Credibility Index' },
        { value: '5', label: 'Evidence Layers' },
        { value: 'SIR', label: 'Propagation Model' },
        { value: 'LIAR', label: 'Benchmark Dataset' },
      ],
      stack: ['Python', 'Hugging Face', 'PyTorch', 'pandas', 'NetworkX', 'REST APIs'],
      links: [
        { label: 'View on GitHub', href: 'https://github.com/kadheerk49/Adaptive-Misinformation-Detection', external: true },
        { label: 'Discuss Project', href: '#contact' },
      ],
    },
    {
      number: '03',
      title: 'GPU Kernel Fusion Study',
      tagline: 'Breaking the Streaming Memory Wall on NVIDIA Turing',
      status: 'completed',
      domain: 'GPU Programming',
      description:
        'A CUDA research study benchmarking the complete kernel-fusion spectrum on a 5-stage real-time forex tick pipeline over 71.7M institutional EUR/USD ticks — collapsing five kernels into one shared-memory mega-kernel on a GTX 1650.',
      highlights: [
        'Fully fused mega-kernel sustains 1.06 billion ticks/second on 1M real ticks',
        '158.09x speedup over single-thread CPU, 5.0x over the unfused GPU baseline',
        '70.2% of DRAM traffic eliminated via shared-memory tiling (146.5 MB to 43.6 MB)',
        '97.32% SM occupancy with 62 registers per thread and zero spills',
      ],
      metrics: [
        { value: '1.06B', label: 'Ticks / Second' },
        { value: '158x', label: 'Faster than CPU' },
        { value: '-70%', label: 'DRAM Traffic' },
        { value: '97.3%', label: 'SM Occupancy' },
      ],
      stack: ['CUDA', 'C++', 'Python', 'pandas', 'TradingView'],
      links: [{ label: 'Discuss Project', href: '#contact' }],
    },
    {
      number: '04',
      title: 'AnatoLens — AR Dissection',
      tagline: 'Markerless Mobile AR with a Context-Grounded LLM Tutor',
      status: 'prototype',
      domain: 'AR/VR & Mobile',
      description:
        'An Android augmented-reality platform that turns a commodity phone into an interactive dissection table: a life-sized procedural anatomy figure anchored by ARCore, a virtual clipping plane that slices the body along any axis, and an AI tutor that answers questions grounded in exactly the structure you tapped.',
      highlights: [
        'Markerless ARCore plane detection — no headset, no marker cards, no downloads',
        'Real-time clipping plane reveals sagittal, axial and coronal cross-sections',
        'Four toggleable systems: skeletal, muscular, nervous and colour-coded organs',
        'Context-grounded LLM tutor plus a fully offline MBBS-level MCQ bank',
      ],
      metrics: [
        { value: '4', label: 'Anatomical Systems' },
        { value: '3-Axis', label: 'Clipping Plane' },
        { value: 'ARCore', label: 'Markerless AR' },
        { value: 'LLM', label: 'Grounded Tutor' },
      ],
      stack: ['Kotlin', 'ARCore', 'Claude', 'Gemini CLI', 'TypeScript'],
      links: [{ label: 'Discuss Project', href: '#contact' }],
    },
    {
      number: '05',
      title: 'Interactive 3D Portfolio',
      tagline: 'This very site — WebGL shaders, gooey physics, hand-tuned design',
      status: 'shipped',
      domain: 'UI/UX & Creative Development',
      description:
        'A single-page portfolio built from scratch as a showcase of craft: a GLSL aurora background, shader-driven specular buttons, a gooey navigation pill with particle physics, a scroll-stacking project deck and a card-swap skills explorer — all on a custom dark design system tuned for performance and reduced-motion accessibility.',
      highlights: [
        'Custom GLSL shaders: aurora background and specular light-tracing buttons',
        'Gooey navigation with a WebGL metaball pill and particle transitions',
        'Physics-tuned interactions: dock magnify, card-swap deck, scroll stacking',
        'Regression-tested shader math and reduced-motion support throughout',
      ],
      metrics: [
        { value: '2', label: 'Custom GLSL Shaders' },
        { value: '84', label: 'Skills On Deck' },
        { value: '15+', label: 'Animated Systems' },
        { value: '0', label: 'Template Code' },
      ],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
      links: [
        { label: 'View Source', href: 'https://github.com/kadheerk49/KVR-PORTFOLIO', external: true },
        { label: 'Discuss Project', href: '#contact' },
      ],
    },
  ],
  patents: [
    {
      number: '01',
      title: 'Quantum-Classical Chiplet Architecture for Scalable Hybrid Computing Systems',
      publicationNo: 'IN202641047700 A',
      applicationNo: '202641047700',
      filed: '14 Apr 2026',
      published: '24 Apr 2026',
      applicant: 'Vellore Institute of Technology',
      role: 'Co-inventor',
      summary:
        'A hybrid quantum-classical computing architecture implemented through chiplet-based semiconductor integration: classical processor chiplets, a cryogenic control chiplet and a QPU chiplet interconnected on a silicon interposer with thermal isolation structures and a spectral veto control module that gates quantum instruction execution when signal noise exceeds defined thresholds.',
      pdf: 'patents/quantum-classical-chiplet-architecture.pdf',
    },
    {
      number: '02',
      title: 'Adaptive Lighting System with Computer Vision-based Focus Detection',
      publicationNo: 'IN202641065411 A',
      applicationNo: '202641065411',
      filed: '24 May 2026',
      published: '05 Jun 2026',
      applicant: 'Vellore Institute of Technology',
      role: 'Co-inventor',
      summary:
        'An AI-driven adaptive lighting system that captures real-time video, detects facial landmarks, gaze direction and head orientation, combines behavioral signals with ambient light intensity, classifies the user into high/medium/low focus states through machine-learning decision logic, and adjusts LED brightness and color temperature over IoT.',
      pdf: 'patents/adaptive-lighting-focus-detection.pdf',
    },
  ],
  certifications: [
    {
      title: 'Python for Data Analysis and Visualization',
      code: 'VAC2006',
      issuer: 'Vellore Institute of Technology',
      school: 'School of Electronics Engineering (SENSE)',
      period: 'Sep 2025 - Nov 2025',
      type: 'Value Added Course · Certificate of Participation',
      pdf: 'certifications/python-data-analysis-vac2006.pdf',
    },
  ],
  contacts: [
    {
      label: 'GitHub',
      href: 'https://github.com/kadheerk49',
    },
    {
      label: 'Reddit',
      href: 'https://www.reddit.com/user/skull_420/',
    },
    {
      label: 'Email',
      href: 'mailto:kadheerk49@gmail.com',
    },
    {
      label: 'Telegram',
      href: 'https://t.me/skull_420',
    }],
};