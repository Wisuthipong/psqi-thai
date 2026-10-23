# แบบประเมินคุณภาพการนอนหลับ PSQI ภาษาไทย

Static Thai self-assessment. Scores 0–5 indicate good sleep quality; 6–21 indicate poor sleep quality. Seven named components are calculated in the browser. This app is a screening implementation, not a diagnosis or a newly validated translation.

## Run locally

Use Node 24 and npm. Run `npm ci`, then `npm run dev`. Open http://127.0.0.1:5173/psqi-thai/.

Checks: `npm run lint`, `npm run typecheck`, `npm run test -- --run`, `npm run build`. For browser tests run `npx playwright install chromium`, then `npm run test:e2e`.

## Sources and scoring

Only the [RMUTT Thai form](https://im.rmutt.ac.th/psqi/) and [Pittsburgh Exhibit A](https://www.sleep.pitt.edu/sites/default/files/assets/Instrument%20Materials/Exhibit%20A-PSQI%20scoring.pdf) supply instrument content and rules. See [source map](docs/source-map.md) and [scoring specification](docs/scoring-spec.md). Follow the rendered PDF: extracted text drops inclusive inequality symbols.

The UI preserves RMUTT ordering. Semantic fields prevent its final four question numbers from being confused with PDF numbering. The scoring engine is independent of React. Draft answers are validated again within the scoring function.

Answers exist only in React memory: no database, account, analytics, cookies, persistent browser storage, answer URLs, or submission endpoint. Refresh clears them. Static hosting still receives ordinary requests for app assets. Printing shows results without the optional free-text answer.

Instrument attribution does not establish ownership or unrestricted redistribution permission. Neither supplied source establishes a blanket license for this application's intended use. Confirm appropriate reuse rights before publication. No claim of clinical validation of this software is made.

## GitHub Pages release

The base path is `/psqi-thai/`. Enable repository Settings → Pages → Source: GitHub Actions. After reviewing a passing Verify workflow, manually run Publish Pages on the reviewed revision. It repeats verification before uploading `dist`. The expected URL is https://wisuthipong.github.io/psqi-thai/; it is not live merely because this workflow exists.

For rollback, run the publication workflow against a branch pointing at a prior verified revision. Record the deployed commit and questionnaire/scoring versions. No runtime secrets are required. Use feature branches and pull requests for subsequent changes.

## Versions and limits

App 1.0.0; questionnaire `rmutt-th-v1`; scoring `psqi-exhibit-a-v1`. Time inputs represent habitual clock times, not dates; an earlier waking time means next day. Equal clock times and actual sleep exceeding the interval require correction. Optional Q5j contributes zero when either reason or frequency is absent. Numeric ranges are entered as their midpoint. Thai numerals are accepted in numeric text fields. Maximum other-reason text length: 2,000 characters.

No respondent dataset is included. All automated test cases are synthetic. Actual print-dialog behavior and assistive-technology use should be reviewed on target devices before a clinical/research rollout.
