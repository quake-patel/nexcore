export interface ButtonData {
  text: string;
  link: string;
  style: 'primary' | 'secondary';
}

export interface SectionItem {
  title?: string;
  description?: string;
  icon?: string;
  value?: string;
  label?: string;
  author?: string;
  role?: string;
  avatar?: string;
  price?: string;
  period?: string;
  features?: string[];
  category?: string;
  items?: string[];
  question?: string;
  answer?: string;
}

export interface ElementStyle {
  color?: string;
  backgroundColor?: string;
  fontSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  fontWeight?: 'light' | 'normal' | 'semibold' | 'bold' | 'extrabold';
  letterSpacing?: 'tight' | 'normal' | 'wide';
  lineHeight?: 'tight' | 'normal' | 'loose';
  italic?: boolean;
  bold?: boolean;
}

export interface GridColumn {
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  titleStyle?: ElementStyle;
  descStyle?: ElementStyle;
  width?: 'full' | '1/2' | '1/3' | '2/3' | '1/4';
}

export interface GridRow {
  id: string;
  columns: GridColumn[];
}

export interface SectionData {
  id: string;
  type: 'hero' | 'features' | 'showcase' | 'stats' | 'pricing' | 'technologies' | 'testimonials' | 'cta' | 'faq' | 'custom' | 'grid';
  visible: boolean;
  paddingTop?: 'none' | 'small' | 'medium' | 'large';
  paddingBottom?: 'none' | 'small' | 'medium' | 'large';
  marginTop?: 'none' | 'small' | 'medium' | 'large';
  marginBottom?: 'none' | 'small' | 'medium' | 'large';
  
  // Colors & Typography Spacings
  backgroundColor?: string;
  textColor?: string;
  titleStyle?: ElementStyle;
  descStyle?: ElementStyle;
  taglineStyle?: ElementStyle;
  
  // Grid layout customization
  gridColumns?: '1' | '2' | '3' | '4' | '6';

  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    tagline?: string;
    image?: string;
    imagePosition?: 'left' | 'right';
    buttons?: ButtonData[];
    items?: SectionItem[];
    customHtml?: string;
    theme?: 'primary' | 'dark' | 'light' | 'glass';
    rows?: GridRow[];
  };
}

export interface PageLayout {
  pageKey: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    bgGradient: string;
    fontFamily: string;
  };
  sections: SectionData[];
}

export const LOCAL_LAYOUTS_KEY = 'nexcore_builder_layouts';

// ── Default Layout templates matching our existing pages ──
export const DEFAULT_LAYOUTS: Record<string, PageLayout> = {
  'content-writing-agency': {
    pageKey: 'content-writing-agency',
    theme: {
      primaryColor: '#0c609c',
      accentColor: '#f26223',
      bgGradient: 'radial-gradient(ellipse 70% 60% at 80% 20%, rgba(12,96,156,0.08) 0%, transparent 60%)',
      fontFamily: 'Manrope',
    },
    sections: [
      {
        id: 'writing-hero',
        type: 'hero',
        visible: true,
        content: {
          tagline: 'Content Writing Agency',
          title: 'The content writing agency that makes you impossible to scroll past.',
          description: 'SEO articles, web copy, ebooks, and founder ghostwriting by category specialists, plus a Content Cluster Strategy that ranks whole topics.',
          buttons: [
            { text: 'Get Free Sample', link: '/#lead', style: 'primary' }
          ]
        }
      }
    ]
  },
  'content-marketing-agency': {
    pageKey: 'content-marketing-agency',
    theme: {
      primaryColor: '#0c609c',
      accentColor: '#f26223',
      bgGradient: 'radial-gradient(ellipse 70% 60% at 80% 20%, rgba(12,96,156,0.08) 0%, transparent 60%)',
      fontFamily: 'Manrope',
    },
    sections: [
      {
        id: 'marketing-hero',
        type: 'hero',
        visible: true,
        content: {
          tagline: 'Content Marketing Agency',
          title: 'We turn content into high-performance pipeline.',
          description: 'We audit your customer journey, research search volume, draft conversion-focused copy, and distribute it to rank, read, and convert.',
          buttons: [
            { text: 'Get Free Sample', link: '/#lead', style: 'primary' }
          ]
        }
      }
    ]
  },
  home: {
    pageKey: 'home',
    theme: {
      primaryColor: '#06b6d4',
      accentColor: '#8b5cf6',
      bgGradient: 'radial-gradient(ellipse 70% 60% at 60% 40%, rgba(0,212,255,0.07) 0%, transparent 70%)',
      fontFamily: 'Manrope',
    },
    sections: [
      {
        id: 'home-hero',
        type: 'hero',
        visible: true,
        content: {
          tagline: 'NexCore IT Solutions & Marketing',
          title: 'Engineering Digital Futures.',
          description: 'We deliver high-performance custom web development, mobile engineering, robust cloud architectures, and ROI-driven digital performance marketing.',
          buttons: [
            { text: 'Start Project', link: '/contact', style: 'primary' },
            { text: 'View Services', link: '/services', style: 'secondary' }
          ],
          image: '/hero-illust.png',
          theme: 'primary'
        }
      },
      {
        id: 'home-services',
        type: 'features',
        visible: true,
        content: {
          tagline: 'Our Capabilities',
          title: 'Advanced Solutions Built to Scale',
          description: 'Explore our multi-disciplinary capabilities spanning modern software engineering, cloud infrastructures, and digital growth systems.',
          items: [
            { title: 'Custom Web Engineering', description: 'Next.js, React, and server-less stacks designed for speed and sub-second page rendering times.', icon: 'Code' },
            { title: 'Mobile Applications', description: 'Cross-platform React Native and native iOS/Android builds with fluid 60fps animations.', icon: 'Smartphone' },
            { title: 'AWS Cloud Architecture', description: 'Secure, multi-region cloud deployment, Dockerization, and auto-scaling setups.', icon: 'Cloud' },
            { title: 'Performance Marketing', description: 'Data-driven paid ads, lead funnel design, and conversions audited for absolute commercial ROI.', icon: 'TrendingUp' }
          ],
          theme: 'dark'
        }
      },
      {
        id: 'home-stats',
        type: 'stats',
        visible: true,
        content: {
          tagline: 'NexCore By The Numbers',
          title: 'Proven Track Record of Excellence',
          items: [
            { value: '14+', label: 'Years Experience' },
            { value: '250+', label: 'Scale Projects Delivered' },
            { value: '99.2%', label: 'Client Retention Rate' },
            { value: '$45M+', label: 'Client Ad Spend Managed' }
          ],
          theme: 'glass'
        }
      },
      {
        id: 'home-testimonials',
        type: 'testimonials',
        visible: true,
        content: {
          tagline: 'Partner Feedback',
          title: 'What Enterprise Leaders Say',
          items: [
            {
              author: 'Sarah Jenkins',
              role: 'CTO, FinFlow Global',
              description: 'NexCore rebuilt our custom merchant ledger under dynamic deadlines. Their clean, documented React code saved us months of debugging.',
              avatar: 'SJ'
            },
            {
              author: 'Rajesh Sharma',
              role: 'VP of Growth, HealthSpark',
              description: 'Their marketing acquisition campaigns dropped our customer acquisition cost by 38% in less than 90 days. Highly collaborative engineers.',
              avatar: 'RS'
            }
          ],
          theme: 'dark'
        }
      },
      {
        id: 'home-cta',
        type: 'cta',
        visible: true,
        content: {
          title: 'Ready to build something phenomenal?',
          description: 'Schedule a free architectural sprint call with our principal engineer to outline your product scope and customer acquisition timeline.',
          buttons: [
            { text: 'Book Consultation Call', link: '/contact', style: 'primary' }
          ],
          theme: 'primary'
        }
      }
    ]
  },
  about: {
    pageKey: 'about',
    theme: {
      primaryColor: '#06b6d4',
      accentColor: '#8b5cf6',
      bgGradient: '',
      fontFamily: 'Manrope',
    },
    sections: [
      {
        id: 'about-hero',
        type: 'hero',
        visible: true,
        content: {
          tagline: 'Our Journey & Culture',
          title: 'Builders at Heart. Engineered for Results.',
          description: 'Founded in GIFT City in 2010, NexCore started with a primary mission: custom digital platforms should directly drive buyer actions and business growth.',
          buttons: [
            { text: 'Read Blog Insights', link: '/blog', style: 'secondary' }
          ],
          theme: 'primary'
        }
      },
      {
        id: 'about-philosophy',
        type: 'features',
        visible: true,
        content: {
          tagline: 'Our Core Philosophies',
          title: 'Values That Govern Our Work',
          items: [
            { title: 'High-Integrity Codebase', description: 'We write clear, type-safe, document-backed scripts. We hate code shortcuts or quick patches that create system technical debt.' },
            { title: 'Strict Commercial ROI', description: 'Every product feature we map and every ad asset we launch is audited against high conversion performance.' },
            { title: 'Seamless Collaboration', description: 'We integrate deeply with your internal product planning and engineering teams via daily sprints.' }
          ],
          theme: 'dark'
        }
      },
      {
        id: 'about-cta',
        type: 'cta',
        visible: true,
        content: {
          title: 'Want to scale your product or traffic pipeline?',
          description: 'We would love to discuss your engineering obstacles and custom customer-acquisition goals.',
          buttons: [
            { text: 'Schedule Consultation', link: '/contact', style: 'primary' },
            { text: 'View Capabilities', link: '/services', style: 'secondary' }
          ],
          theme: 'primary'
        }
      }
    ]
  },
  services: {
    pageKey: 'services',
    theme: {
      primaryColor: '#06b6d4',
      accentColor: '#8b5cf6',
      bgGradient: '',
      fontFamily: 'Manrope',
    },
    sections: [
      {
        id: 'services-hero',
        type: 'hero',
        visible: true,
        content: {
          tagline: 'Our Capabilities',
          title: 'Enterprise Solutions Built for Global Scale',
          description: 'From modern headless merchant checkout panels to multi-region cloud infrastructures and heavy customer-acquisition channels, we deliver technology built to win.',
          buttons: [
            { text: 'Book a Planners Call', link: '/contact', style: 'primary' }
          ],
          theme: 'primary'
        }
      },
      {
        id: 'services-grid',
        type: 'features',
        visible: true,
        content: {
          tagline: 'Services Shelf',
          title: 'End-to-End Execution Capabilities',
          items: [
            { title: 'Product Engineering', description: 'Full-stack software execution including high-performance micro-frontends and multi-tenant architectures.' },
            { title: 'React Native Apps', description: 'Highly responsive mobile designs sharing codebases for rapid cross-platform app deployment.' },
            { title: 'Infrastructure Optimization', description: 'Kubernetes orchestration, automated CI/CD pipelines, and high availability systems.' },
            { title: 'Growth Funnels', description: 'Scientific customer acquisition frameworks featuring multivariate testing and attribution setups.' }
          ],
          theme: 'dark'
        }
      },
      {
        id: 'services-cta',
        type: 'cta',
        visible: true,
        content: {
          title: 'Not sure which service fits your immediate goals?',
          description: 'Talk directly with our lead architects and digital planners. We will analyze your operational bottlenecks and map a shared roadmap.',
          buttons: [
            { text: 'Book Free Consult', link: '/contact', style: 'primary' }
          ],
          theme: 'glass'
        }
      }
    ]
  },
  contact: {
    pageKey: 'contact',
    theme: {
      primaryColor: '#06b6d4',
      accentColor: '#8b5cf6',
      bgGradient: '',
      fontFamily: 'Manrope',
    },
    sections: [
      {
        id: 'contact-hero',
        type: 'hero',
        visible: true,
        content: {
          tagline: 'Get In Touch',
          title: 'Let\'s Discuss Your Scaling Challenges.',
          description: 'Have a project proposal, an operational bottleneck, or a growth pipeline goal? Send us your brief and we will reply within 24 business hours.',
          theme: 'primary'
        }
      },
      {
        id: 'contact-details',
        type: 'features',
        visible: true,
        content: {
          tagline: 'Contact Channels',
          title: 'How to Reach Us',
          items: [
            { title: 'Email Address', description: 'hello@nexcore.io — General scopes and RFPs.' },
            { title: 'Headquarters', description: 'GIFT City, Zone 1, Ahmedabad, Gujarat, 382355.' },
            { title: 'Call Center', description: '+91 (079) 4005-NEXC — Mon to Fri, 9am to 6pm IST.' }
          ],
          theme: 'glass'
        }
      }
    ]
  },
  process: {
    pageKey: 'process',
    theme: {
      primaryColor: '#06b6d4',
      accentColor: '#8b5cf6',
      bgGradient: '',
      fontFamily: 'Manrope',
    },
    sections: [
      {
        id: 'process-hero',
        type: 'hero',
        visible: true,
        content: {
          tagline: 'Our Workflow Timeline',
          title: '6 Steps to High-Integrity Delivery',
          description: 'We don\'t work in a black box. Our transparent development pipeline ensures you are aligned with every sprint, testing phase, and release.',
          theme: 'primary'
        }
      },
      {
        id: 'process-steps',
        type: 'features',
        visible: true,
        content: {
          tagline: 'The NexCore Standard',
          title: 'How We Build Products',
          items: [
            { title: '01. Discovery & Audit', description: 'Analyze your existing code bases, marketing accounts, and system challenges to baseline performance.' },
            { title: '02. Architecture Planning', description: 'Draft comprehensive API schemas, database maps, user flows, and wireframe prototypes.' },
            { title: '03. Agile Sprints', description: 'Iterate via 2-week agile development cycles with public staging URLs refreshed every Friday.' },
            { title: '04. QA & Vulnerability Audits', description: 'Execute rigorous regression suites, end-to-end tests, and security scanning.' },
            { title: '05. High-Impact Launch', description: 'Perform seamless production migration with zero downtime using Canary or Blue-Green setups.' },
            { title: '06. SRE & Marketing Scaling', description: 'Monitor system reliability, load speeds, and scale customer-acquisition funnels.' }
          ],
          theme: 'dark'
        }
      }
    ]
  },
  technologies: {
    pageKey: 'technologies',
    theme: {
      primaryColor: '#06b6d4',
      accentColor: '#8b5cf6',
      bgGradient: '',
      fontFamily: 'Manrope',
    },
    sections: [
      {
        id: 'tech-hero',
        type: 'hero',
        visible: true,
        content: {
          tagline: 'Our Engineering Stack',
          title: 'Modern Technology, No Technical Debt.',
          description: 'We build on modern, open-source architectures vetted for lightning speeds, high security, and easy long-term maintenance.',
          theme: 'primary'
        }
      },
      {
        id: 'tech-categories',
        type: 'features',
        visible: true,
        content: {
          tagline: 'Our Vetted Stack',
          title: 'Languages, Databases, & Infrastructure',
          items: [
            { title: 'Frontend Frameworks', description: 'Next.js 15+, React 19, TypeScript, Tailwind CSS, Framer Motion.' },
            { title: 'Backend & APIs', description: 'Node.js, NestJS, Go, GraphQL, REST, WebSocket integrations.' },
            { title: 'Cloud & Infrastructure', description: 'AWS (ECS, RDS, S3), Terraform, Docker, Kubernetes, GitHub Actions.' },
            { title: 'Databases & Cache', description: 'PostgreSQL, MongoDB, Redis, Prisma ORM, Drizzle ORM.' }
          ],
          theme: 'dark'
        }
      }
    ]
  }
};

// ── Local Storage Helpers ──

export function getAllCustomLayouts(): Record<string, PageLayout> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOCAL_LAYOUTS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, PageLayout>) : {};
  } catch {
    return {};
  }
}

export function getPageLayout(pageKey: string): PageLayout {
  const custom = getAllCustomLayouts();
  if (custom[pageKey]) {
    return custom[pageKey];
  }
  // Return a copy of the default layout
  return JSON.parse(JSON.stringify(DEFAULT_LAYOUTS[pageKey] || {
    pageKey,
    theme: { primaryColor: '#06b6d4', accentColor: '#8b5cf6', bgGradient: '', fontFamily: 'Manrope' },
    sections: []
  }));
}

export function savePageLayout(pageKey: string, layout: PageLayout): void {
  if (typeof window === 'undefined') return;
  const custom = getAllCustomLayouts();
  custom[pageKey] = layout;
  localStorage.setItem(LOCAL_LAYOUTS_KEY, JSON.stringify(custom));
}

export function resetPageLayout(pageKey: string): void {
  if (typeof window === 'undefined') return;
  const custom = getAllCustomLayouts();
  delete custom[pageKey];
  localStorage.setItem(LOCAL_LAYOUTS_KEY, JSON.stringify(custom));
}

export function isPageCustomized(pageKey: string): boolean {
  if (typeof window === 'undefined') return false;
  const custom = getAllCustomLayouts();
  return !!custom[pageKey];
}
