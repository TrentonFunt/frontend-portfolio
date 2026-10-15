const FLOWS: Record<string, string[]> = {
  'payment-webhook-processor': [
    'payment provider',
    '    │ webhook + HMAC',
    '    ▼',
    ' verify ──▶ inbox ──▶ worker ──▶ wallet credit',
    '              └──▶ dead-letter (invalid)',
  ],
  'double-entry-ledger-reconciliation': [
    'money events ──▶ ledger writer (balanced pairs)',
    '                      │',
    ' nightly job ◀────────┘',
    '    │ match settlements & transfers',
    '    ▼',
    ' pass ──▶ archive   │   mismatch ──▶ discrepancy queue',
  ],
  'daily-trade-settlement-pipeline': [
    'broker batch ──▶ validate all-or-nothing',
    '                      │',
    '              idempotent persist',
    '                      │',
    ' prepare ──▶ verify ──▶ pay  (3 different users)',
  ],
  'withdrawal-approval-workflow': [
    'request ──▶ state machine (4 stages)',
    '                 │ evidence gate',
    '                 ▼',
    ' paid + outbox row ──▶ worker ──▶ account service',
  ],
  'app-subscription-sync': [
    'stores / web ──▶ subscription platform',
    '                      │ signed webhook',
    '                      ▼',
    ' inbox ──▶ worker ──▶ re-fetch provider ──▶ access + email (once)',
  ],
}

interface BackendFlowDiagramProps {
  slug: string
}

export function BackendFlowDiagram({ slug }: BackendFlowDiagramProps) {
  const lines = FLOWS[slug]
  if (!lines) return null

  return (
    <div className="mb-10 rounded-lg border border-(--border-terminal) bg-terminal-bg overflow-hidden">
      <div className="px-4 py-2 border-b border-(--border-terminal) text-xs text-terminal-fg-muted">
        <span className="text-terminal-prompt">$</span> cat ./flow.txt
      </div>
      <pre className="p-4 text-xs sm:text-sm leading-relaxed text-(--syntax-string) overflow-x-auto font-mono">
        {lines.join('\n')}
      </pre>
    </div>
  )
}
