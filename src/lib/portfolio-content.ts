/**
 * Narrative synced to Documents/TIWALADE_ADEGOKE_Fullstack-Engineer-CV-updated.docx
 * Public site uses vendor-neutral wording where noted; terminal `experience` matches this file.
 */

export const profile = {
  name: 'Tiwalade Adegoke',
  role: 'Fullstack Engineer',
  yearsExperience: '3+',
  location: 'Nigeria',
  availability: 'Open to remote opportunities worldwide',
  email: 'tiwatide23@gmail.com',
  github: 'https://github.com/TrentonFunt',
  linkedIn: 'https://www.linkedin.com/in/tiwalade-adegoke',
} as const

export const summaryShort =
  'Fullstack Engineer with 3+ years across frontend and backend — currently building payments, subscriptions, and internal tooling on a regulated investment platform. Open to new opportunities.'

export const summaryAbout =
  'Fullstack Engineer with 3+ years experience building scalable web applications across frontend and backend systems. Strong in React, TypeScript, ASP.NET, and modern UI development, with hands-on experience designing RESTful APIs, managing relational databases, and implementing secure authentication. Focused on reliable, fast, performant systems. Based in Nigeria; open to remote roles worldwide.'

export const experienceEntries = [
  {
    title: 'Fullstack Engineer',
    org: 'Eanvest',
    period: 'May 2026 – Present',
    location: 'Lagos, Nigeria (Hybrid)',
    highlights: [
      'Automated wallet funding for a live investment platform with payment-provider webhooks (C#, ASP.NET Core, PostgreSQL) — every deposit credited exactly once without customer action.',
      'Daily automated reconciliation and double-entry ledger (NGN and USD wallets), cutting time to detect balance discrepancies from weeks to under a day.',
      'ASP.NET Core microservices with transactional outbox, retrying background workers, and optimistic concurrency so updates and events are not lost.',
      'Subscription revenue end to end: card checkout, auto-renewal, refunds, premium access, plus iOS/Android in-app purchases.',
      'Admin platform modernisation (React, TypeScript, Ant Design, TanStack Query) — halved code on largest screens; first automated tests and CI on that surface.',
      'KYC and compliance workflows with bulk review, standardised decisions, and four-eyes approval.',
      'MFA, secure session management, and privacy-aligned masking of personal data across services.',
      'Mentorship, shared libraries, and CI quality gates; test environments ~80% faster to start.',
    ],
  },
  {
    title: 'Fullstack Developer (Owner)',
    org: 'The Gooey Spot Bakery',
    period: 'Jun 2025 – Present',
    location: 'Remote',
    highlights: [
      'Web platform for products, orders, and customer interactions.',
      'Backend on InterServer VPS — API hosting, server config, production deployments.',
      'Product listings, order workflows, reward/referral system, customer data management.',
      'Payment-ready flows and structured order tracking for real-world transactions.',
      'RESTful APIs for order processing, product data, and user interactions.',
      'Relational database design for products, orders, and customers.',
      'Mobile-first UX — accessibility and conversion for online orders.',
    ],
  },
  {
    title: 'Frontend Engineer (Engineering Program)',
    org: 'Rise Academy (RiseVest)',
    period: 'Jan 2025 – Dec 2025',
    location: 'Lagos, Nigeria',
    highlights: [
      'Redux and Zustand for financial data — balances, transactions, async API state.',
      'Secure authentication flows and session handling with validation at trust boundaries.',
      'React, TypeScript, and Vite with component-based, system-oriented patterns.',
      'REST integration and auth flows in production-style projects.',
      'Code reviews, PR workflows, and Agile collaboration.',
    ],
  },
  {
    title: '.NET Backend Engineer',
    org: 'Ampstem',
    period: 'Feb 2024 – Jun 2025',
    location: 'Remote',
    highlights: [
      'RESTful APIs for authentication, validation, and core business logic.',
      'Admin dashboard for user management, data processing, and workflows on relational DBs.',
      'JWT and role-based access control on application endpoints.',
      'Audit, documentation, and activity-tracking across backend APIs.',
      'Database and API performance tuning — lower latency and better data efficiency.',
    ],
  },
  {
    title: 'Freelance Wix Website Developer',
    org: 'Freelance',
    period: 'Jan 2023 – Jul 2024',
    location: 'Remote',
    highlights: [
      'Responsive business websites on Wix aligned to client branding and UX.',
      'Landing pages, product/service pages, and contact flows for engagement and conversion.',
      'SEO, performance, and mobile usability.',
      'Direct client requirements, design iteration, and production delivery.',
    ],
  },
] as const

export function formatExperienceTerminal(): string {
  const blocks = experienceEntries.map((job) => {
    const header = `${job.title} @ ${job.org} (${job.period}) — ${job.location}`
    const bullets = job.highlights.map((h) => `    • ${h}`).join('\n')
    return `  ${header}\n${bullets}`
  })
  return blocks.join('\n\n')
}
