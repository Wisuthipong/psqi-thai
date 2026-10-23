# Implementation ledger

Plan: Thai PSQI plan dated 23 October 2026.

Ruling: Consolidate normalization/time/validation/scoring in `engine.ts` and the screen components in `Assessment.tsx` for this small static application. Pure calculation remains independent of UI. Cost: split these focused modules if future features grow.

Ruling: Preserve raw string drafts and validate inside scorePsqi instead of exposing a branded complete-answer type. Invalid drafts throw before arithmetic. Cost: less compile-time separation; runtime validation remains mandatory.

Ruling: Use Playwright for browser testing because no Browser plugin skill is available. Tests cover desktop and mobile end-to-end paths, print media and local-processing behavior.

Ruling: Upgrade initially selected development dependency versions after npm audit reported vulnerabilities. Keep exact resolved versions in lockfile.

Release workflow is manually dispatched; publishing and instrument reuse rights remain a release-stage decision. No response collection service is implemented.
