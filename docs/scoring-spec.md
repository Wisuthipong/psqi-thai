# PSQI scoring contract

Authority: rendered Pittsburgh Exhibit A supplied by the owner, inspected 23 October 2026. Version `psqi-exhibit-a-v1`. Text extraction omits inequality underlines.

| Component | Rule |
|---|---|
| Quality | PDF Q6 directly |
| Latency | Minutes 0–15 / >15–30 / >30–60 / >60 → 0/1/2/3; add Q5a, then sum 0 / 1–2 / 3–4 / 5–6 → 0/1/2/3 |
| Duration | ≥7 / ≥6–<7 / ≥5–<6 / <5 hours → 0/1/2/3 |
| Efficiency | Actual sleep / time in bed ×100; ≥85 / ≥75–<85 / ≥65–<75 / <65 → 0/1/2/3 |
| Disturbances | Q5b–j sum 0 / 1–9 / 10–18 / 19–27 → 0/1/2/3 |
| Medication | PDF Q7 directly |
| Daytime dysfunction | PDF Q8+Q9 sum 0 / 1–2 / 3–4 / 5–6 → 0/1/2/3 |

Q5j contributes zero if its comment or frequency is missing. Other required responses cannot be missing. Sum components for total 0–21. Total ≤5 means good; >5 means poor. This agrees with the user's explicit rule. Use midpoint for numeric ranges.

Application choices: earlier wake means next day; equal times invalid; impossible sleep duration invalid; decimals retained through classification; only display percentages rounded. Semantic fields map the Thai page to the PDF as documented separately.
