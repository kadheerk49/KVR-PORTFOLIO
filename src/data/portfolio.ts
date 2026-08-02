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

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  eager?: boolean;
}

export interface ProjectItem {
  number: string;
  category: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  images: {
    left: ProjectImage[];
    right: ProjectImage;
  };
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
  projects: ProjectItem[];
  contacts: ContactItem[];
}

// Main portfolio data
export const portfolioData: PortfolioData = {
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    heading: "Hi, I'm Kadheer",
    subtitle: 'a data science creator building intelligent automation and financial market systems',
  },
  about: {
    text: "I'm a Data Science student at Vellore Institute of Technology, focused on predictive analytics, n8n AI automation, and financial market systems. I build practical workflows, analytical pipelines, and trading tools across Forex, crypto, gold, and crude oil. Based in India, I'm open to projects and collaborations that turn complex data into useful decisions.",
    cornerImages: [
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=420&q=80',
        alt: 'Data visualization dashboard',
        width: 420,
        height: 270,
      },
      {
        src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=420&q=80',
        alt: 'Python code editor',
        width: 420,
        height: 270,
      },
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=420&q=80',
        alt: 'Machine learning model visualization',
        width: 420,
        height: 270,
      },
      {
        src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=420&q=80',
        alt: 'Automation workflow diagram',
        width: 420,
        height: 270,
      },
    ],
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
    },
  ],
  projects: [
    {
      number: '01',
      category: 'Data Science',
      title: 'Predictive Analytics',
      description: 'Exploratory data analysis pipelines, predictive modeling, visualization dashboards, and machine learning models in Python & SQL.',
      actionLabel: 'Discuss Project',
      actionHref: '#contact',
      images: {
        left: [
          {
            src: 'images/predictive_analytics_ui_1785590645761.png',
            alt: 'XGBoost predictive forecasting dashboard',
            width: 420,
            height: 270,
          },
          {
            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
            alt: 'Python data analytics plots',
            width: 420,
            height: 270,
          },
        ],
        right: {
          src: 'images/predictive_analytics_ui_1785590645761.png',
          alt: 'Data science time-series forecasting terminal',
          width: 800,
          height: 600,
        },
      },
    },
    {
      number: '02',
      category: 'AI & Automation',
      title: 'n8n AI Workflows',
      description: 'Custom n8n workflow engines integrating LLMs, webhooks, Telegram bots, and automated task execution.',
      actionLabel: 'Discuss Project',
      actionHref: '#contact',
      images: {
        left: [
          {
            src: 'images/n8n_automation_flow_1785590627093.png',
            alt: 'API automation pipeline logs and node metrics',
            width: 420,
            height: 270,
          },
          {
            src: 'images/n8n_ai_workflow_nodes_1785590605971.png',
            alt: 'n8n AI agent node canvas',
            width: 420,
            height: 270,
          },
        ],
        right: {
          src: 'images/n8n_ai_workflow_nodes_1785590605971.png',
          alt: 'n8n AI workflow canvas connecting Webhook, GPT-4, Telegram and Database',
          width: 800,
          height: 600,
        },
      },
    },
    {
      number: '03',
      category: 'Market Intelligence',
      title: 'Financial Market Systems',
      description: 'Quantitative setups and indicator tools for Forex pairs and Crypto markets with custom risk parameters.',
      actionLabel: 'Discuss Project',
      actionHref: '#contact',
      images: {
        left: [
          {
            src: 'images/crypto_analytics_heatmap_1785590681924.png',
            alt: 'Crypto liquidity depth map and order flow heatmap',
            width: 420,
            height: 270,
          },
          {
            src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
            alt: 'Quantitative trading strategy indicators',
            width: 420,
            height: 270,
          },
        ],
        right: {
          src: 'images/forex_trading_terminal_1785590664198.png',
          alt: 'XAUUSD Gold and Forex quantitative trading terminal',
          width: 800,
          height: 600,
        },
      },
    },
  ],
  contacts: [
    {
      label: 'Email',
      href: 'mailto:kadheerk49@gmail.com',
    },
    {
      label: 'Telegram',
      href: 'https://t.me/skull_420',
    },
  ],
};