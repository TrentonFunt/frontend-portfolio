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
  '3+ years across the stack: React and TypeScript on the front, ASP.NET Core and PostgreSQL on the back. I build products end to end and care about UX, clear APIs, and behavior you can trust in production.'

export const summaryAbout =
  'I work as a fullstack engineer on web products from first UI sketch through deployed services. Day to day that means React and TypeScript, REST APIs on ASP.NET Core, relational data modeling, and auth flows that fail safely. I have shipped customer-facing apps, admin tools, integrations, and owned a small business platform solo. Based in Nigeria and open to remote teams worldwide.'

export const experienceEntries = [
  {
    title: 'Fullstack Engineer',
    org: 'Eanvest',
    period: 'May 2026 to Present',
    location: 'Lagos, Nigeria (Hybrid)',
    highlights: [
      'Automated wallet funding with payment-provider webhooks (C#, ASP.NET Core, PostgreSQL) so each deposit credits once without customer action.',
      'Daily automated reconciliation and double-entry ledger (NGN and USD wallets), cutting time to detect balance discrepancies from weeks to under a day.',
      'ASP.NET Core microservices with transactional outbox, retrying background workers, and optimistic concurrency so updates and events are not lost.',
      'Subscription revenue end to end: card checkout, auto-renewal, refunds, premium access, plus iOS/Android in-app purchases.',
      'Admin platform modernisation (React, TypeScript, Ant Design, TanStack Query): halved code on largest screens and added the first automated tests and CI on that surface.',
      'KYC and compliance workflows with bulk review, standardised decisions, and four-eyes approval.',
      'MFA, secure session management, and privacy-aligned masking of personal data across services.',
      'Mentorship, shared libraries, and CI quality gates; test environments ~80% faster to start.',
    ],
  },
  {
    title: 'Fullstack Developer (Owner)',
    org: 'The Gooey Spot Bakery',
    period: 'Jun 2025 to Present',
    location: 'Remote',
    highlights: [
      'Web platform for products, orders, and customer interactions.',
      'Backend on InterServer VPS: API hosting, server config, and production deployments.',
      'Product listings, order workflows, reward/referral system, customer data management.',
      'Payment-ready flows and structured order tracking for real-world transactions.',
      'RESTful APIs for order processing, product data, and user interactions.',
      'Relational database design for products, orders, and customers.',
      'Mobile-first UX with accessibility and conversion in mind for online orders.',
    ],
  },
  {
    title: 'Frontend Engineer (Engineering Program)',
    org: 'Rise Academy (RiseVest)',
    period: 'Jan 2025 to Dec 2025',
    location: 'Lagos, Nigeria',
    highlights: [
      'Redux and Zustand for live app data: balances, transactions, and async API state.',
      'Secure authentication flows and session handling with validation at trust boundaries.',
      'React, TypeScript, and Vite with component-based, system-oriented patterns.',
      'REST integration and auth flows in production-style projects.',
      'Code reviews, PR workflows, and Agile collaboration.',
    ],
  },
  {
    title: '.NET Backend Engineer',
    org: 'Ampstem',
    period: 'Feb 2024 to Jun 2025',
    location: 'Remote',
    highlights: [
      'RESTful APIs for authentication, validation, and core business logic.',
      'Admin dashboard for user management, data processing, and workflows on relational DBs.',
      'JWT and role-based access control on application endpoints.',
      'Audit, documentation, and activity-tracking across backend APIs.',
      'Database and API performance tuning for lower latency and better data efficiency.',
    ],
  },
  {
    title: 'Freelance Wix Website Developer',
    org: 'Freelance',
    period: 'Jan 2023 to Jul 2024',
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
    const header = `${job.title} @ ${job.org} (${job.period}) · ${job.location}`
    const bullets = job.highlights.map((h) => `    • ${h}`).join('\n')
    return `  ${header}\n${bullets}`
  })
  return blocks.join('\n\n')
}
