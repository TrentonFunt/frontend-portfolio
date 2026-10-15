import type { Project } from './projects'

/** Backend case studies — source: backend-portfolio-projects.md */
export const backendProjects: Project[] = [
  {
    id: 'b1',
    slug: 'payment-webhook-processor',
    category: 'backend',
    title: 'Payment Webhook Processor',
    shortDescription:
      'When a customer pays by bank transfer, their balance updates on its own, even if they close the app straight after paying. A payment can never be counted twice.',
    description:
      'When a customer pays by bank transfer, their balance updates on its own, even if they close the app straight after paying. A payment can never be counted twice.',
    problem:
      'If payment confirmation depends on the client app polling the server, a customer who pays and closes the app is never credited. Confirmation has to come from the payment provider, server to server, and it has to be safe against retries, duplicates and forged requests.',
    built: [
      'A webhook endpoint that receives payment notifications directly from the payment provider and verifies each one with an HMAC-SHA512 signature, rejecting anything forged.',
      'A durable inbox: every valid notification is stored before the server replies, so a crash or restart cannot lose a payment. Malformed notifications move to a dead-letter state instead of being dropped.',
      'A background worker that claims each inbox record before processing it and retries failures with exponential backoff.',
      'Idempotent crediting, so a duplicate or replayed notification can never credit the same payment twice.',
      'A balance-integrity check that runs every few minutes, comparing total customer balances against the funds held.',
    ],
    concepts: [
      'webhooks',
      'signature verification',
      'durable inbox',
      'idempotency',
      'background workers',
      'exponential backoff',
    ],
    impact: [
      'Every deposit is credited automatically, with no action needed from the customer.',
      'A replayed or duplicated notification cannot credit a payment twice.',
      'No payment notification is lost, even through crashes or redeployments.',
    ],
    year: 2026,
    technologies: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'PostgreSQL', 'Payment provider API', 'xUnit'],
    role: 'Backend Engineer',
    cardHook: 'Signed webhooks, durable inbox, idempotent crediting',
    featured: true,
  },
  {
    id: 'b2',
    slug: 'double-entry-ledger-reconciliation',
    category: 'backend',
    title: 'Double-Entry Ledger and Daily Reconciliation',
    shortDescription:
      'Every money movement is recorded as a balanced pair of entries, and every night the system checks its records against the payment provider\'s. Anything that doesn\'t match is recorded as a discrepancy, never silently corrected.',
    description:
      'Every money movement is recorded as a balanced pair of entries, and every night the system checks its records against the payment provider\'s. Anything that doesn\'t match is recorded as a discrepancy, never silently corrected.',
    problem:
      'A balance stored as a single number cannot explain itself: there is no trail of how it got there, and no independent way to prove it matches what the payment provider actually settled.',
    built: [
      'A double-entry ledger with a single writer that enforces the rule that every entry balances, introduced through a staged write-both migration so a ledger error can never block a live transaction.',
      'Ledger coverage for every place money moves: deposits, withdrawals, fees, fund subscriptions and redemptions, dividends, and stock buys and sells.',
      'A daily reconciliation job that matches every deposit against the provider\'s settlement records over a trailing window, to catch late settlements, and every completed withdrawal against the provider\'s transfer records.',
      'Idempotent reruns: the job is keyed on the provider\'s own settlement ID and protected by a unique index, so a rerun or an overlapping window never processes the same settlement twice.',
      'A discrepancy queue: mismatches are recorded with a reason and never auto-corrected, so balances only change through explicit, audited actions.',
    ],
    concepts: [
      'double-entry bookkeeping',
      'reconciliation',
      'scheduled jobs',
      'idempotency',
      'staged (write-both) rollout',
      'zero-downtime migrations',
    ],
    impact: [
      'Every balance can be traced back to the transactions that produced it.',
      'Every deposit and withdrawal is checked against the payment provider within a day.',
    ],
    year: 2026,
    technologies: [
      'C#',
      'ASP.NET Core',
      'Entity Framework Core',
      'PostgreSQL',
      'Payment provider settlement & transfer APIs',
      'xUnit',
    ],
    role: 'Backend Engineer',
    cardHook: 'Double-entry ledger with nightly provider reconciliation',
  },
  {
    id: 'b3',
    slug: 'daily-trade-settlement-pipeline',
    category: 'backend',
    title: 'Daily Trade Settlement Pipeline',
    shortDescription:
      'At the end of each trading day, the system takes in that day\'s stock trades, checks every figure, and settles the day\'s net amount with the stockbroker. Each step requires a different user\'s approval before any money moves.',
    description:
      'At the end of each trading day, the system takes in that day\'s stock trades, checks every figure, and settles the day\'s net amount with the stockbroker. Each step requires a different user\'s approval before any money moves.',
    problem:
      'Recording a day\'s trades and settling them with a broker means handling duplicate submissions, figures that don\'t add up, conflicting versions of the same trade and concurrent requests, while enforcing separation of duties on every money movement.',
    built: [
      'A signed, machine-to-machine intake endpoint, callable only by a dedicated service account with the minimum permissions it needs.',
      'All-or-nothing batch validation: totals, fees, settlement amounts, decimal precision and dates are all checked, and if any line fails, nothing is written.',
      'Idempotent intake enforced by a unique database key, returning a per-line result of recorded, duplicate or conflict.',
      'Conflict handling: a differing resubmission never overwrites the original. It\'s stored once, deduplicated by a canonical hash, as an audit record.',
      'Safe handling of two identical batches arriving at the same moment.',
      'A daily net-settlement workflow with maker-checker controls enforced in code and the database: preparing, verifying and paying each require a different user, with evidence attached, and the workflow supports corrections and catching up on missed days.',
    ],
    concepts: [
      'idempotent APIs',
      'batch validation',
      'conflict detection',
      'race-condition handling',
      'maker-checker (four-eyes) workflows',
      'least-privilege service accounts',
    ],
    impact: [
      'A bad or partial batch can never be half-recorded.',
      'A resubmitted or conflicting trade never silently changes the books.',
      'Separation of duties is enforced by the system, not by convention.',
    ],
    year: 2026,
    technologies: [
      'C#',
      '.NET 8',
      'ASP.NET Core',
      'Entity Framework Core',
      'PostgreSQL',
      'xUnit integration tests against a real PostgreSQL database',
    ],
    role: 'Backend Engineer',
    cardHook: 'Batch trade intake with maker-checker settlement',
  },
  {
    id: 'b4',
    slug: 'withdrawal-approval-workflow',
    category: 'backend',
    title: 'Multi-Stage Withdrawal Approval Workflow',
    shortDescription:
      'Withdrawals move through a multi-stage approval state machine before money is paid out. Once a withdrawal is paid, the customer\'s account is updated reliably, even if a service is briefly down.',
    description:
      'Withdrawals move through a multi-stage approval state machine before money is paid out. Once a withdrawal is paid, the customer\'s account is updated reliably, even if a service is briefly down.',
    problem:
      'A withdrawal crosses service boundaries: it\'s approved in one system and reflected in another. If the outcome is sent as a separate step after the database commit, a crash in between leaves the two systems disagreeing, with the customer\'s funds stuck in a reserved state.',
    built: [
      'A withdrawal workflow engine: a state machine with four approval stages and a full stage history.',
      'An evidence gate: final approval is blocked until a bank receipt is attached. Rejecting never needs one, because nothing was paid.',
      'Payout reference validation with a uniqueness rule, so one bank transfer can never settle two withdrawals.',
      'A transactional outbox: the outcome is saved in the same database transaction as the status change, then delivered to the other system by a background worker with retries.',
      'Concurrency-safe intake, so two simultaneous submissions of the same withdrawal produce exactly one record.',
    ],
    concepts: [
      'workflow state machines',
      'transactional outbox',
      'eventual consistency',
      'evidence-gated approvals',
      'race-condition handling',
      'audit trails',
    ],
    impact: [
      'No withdrawal is approved as paid without proof of payment.',
      'One transfer can never be matched to two withdrawals.',
      'Every paid withdrawal reliably reaches the customer\'s account, with no lost or phantom updates.',
    ],
    year: 2026,
    technologies: [
      'C#',
      '.NET 8',
      'ASP.NET Core',
      'Entity Framework Core',
      'PostgreSQL',
      'xUnit integration tests against a real PostgreSQL database',
    ],
    role: 'Backend Engineer',
    cardHook: 'Multi-stage approvals and transactional outbox payouts',
  },
  {
    id: 'b5',
    slug: 'app-subscription-sync',
    category: 'backend',
    title: 'App Store and Google Play Subscription Sync',
    shortDescription:
      'Customers can subscribe to a premium plan on iPhone, Android or the web. The backend keeps their access correct whichever platform they paid on, and sends exactly one email for each subscription event.',
    description:
      'Customers can subscribe to a premium plan on iPhone, Android or the web. The backend keeps their access correct whichever platform they paid on, and sends exactly one email for each subscription event.',
    problem:
      'App-store purchases and web card payments follow different billing rules. Tracking both means keeping their states from overwriting each other, and never letting an incoming notification alone decide who has premium access.',
    built: [
      'A webhook receiver for subscription events, routed through a subscription platform, with signature verification over the raw request body and constant-time comparison.',
      'An inbox with a unique event ID, so redelivered events are ignored. Only a hash of each event body is stored, never the personal data inside it.',
      'A background worker that claims events using optimistic concurrency, retries with backoff, and dead-letters an event after repeated failures.',
      'A single writer that re-reads the subscription from the provider before changing access, so running it twice changes nothing.',
      'A scheduled reconcile job as a backstop for missed events, plus an on-demand resync endpoint.',
      'Guards that keep web and app-store subscription terms separate, so one cannot overwrite the other.',
      'Lifecycle emails (receipts, reminders, failed payments, endings and refunds), each sent exactly once and tied to the change that triggered it.',
    ],
    concepts: [
      'webhook security',
      'inbox pattern',
      'idempotency',
      'optimistic concurrency',
      'retries and dead-lettering',
      'state reconciliation',
      'exactly-once side effects',
    ],
    impact: [
      'A notification alone can never grant or remove premium access; the provider\'s record decides.',
      'A duplicated or redelivered event changes nothing.',
      'One subscription backend serves iOS, Android and the web.',
    ],
    year: 2026,
    technologies: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'PostgreSQL', 'Subscription platform API', 'xUnit'],
    role: 'Backend Engineer',
    cardHook: 'Cross-platform subscriptions with reconcile backstop',
  },
]
