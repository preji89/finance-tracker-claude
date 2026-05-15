---
name: project-conventions
description: Architecture, styling, and data model conventions for the expense-tracker-starter project
metadata:
  type: project
---

Vite + React 19 SPA, no routing, no external state management. State is lifted to App.jsx via useState. No test suite.

**Data model:** `{ id, description, amount, type: "income"|"expense", category, date }`

Categories fixed array in App.jsx: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`

**Styling:** Dark fintech dashboard. Single flat CSS file at src/App.css. CSS custom properties in :root. Fonts: Rajdhani (display), Roboto Mono (numbers). No CSS modules, no Tailwind. index.css also exists but is largely overridden by App.css.

**ID generation:** TransactionForm uses `Date.now()` — safe for single-user local state.

**Known issues found in first review (2026-05-15):**
- Seed data bug: transaction id=4 ("Freelance Work") is typed as "expense" but categorized as "salary" — should be "income"
- No input validation: negative/zero amounts accepted, empty description silently skipped without user feedback
- No empty-state message in TransactionList when all rows are filtered out
- `window.confirm` for delete: blocks UI thread, not accessible
- Summary and table amounts rendered as raw integers (e.g., $5000 not $5,000.00) — no toFixed/toLocaleString
- Balance card always renders in blue regardless of negative balance — no visual signal for deficit
- index.css sets body background #ffffff which conflicts with App.css dark theme; App.css wins due to load order but it is dead code
- No labels on form inputs (placeholder-only) — screen reader and autofill hostile
- `outline: none` on form inputs with no custom focus ring fallback in some browsers
- CSS uses global `form`, `table`, `th`, `td` selectors — fragile if more forms/tables are added
- COLORS map in SpendingChart.jsx has no fallback for categories not in the map (falls back to #B0B0B0, which is acceptable)
- No aria-label on delete buttons — screen readers will read "Delete" without transaction context
