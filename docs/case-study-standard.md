# Case study standard

Every project in `src/content/projects/{en,pt}/<slug>.mdx` follows this
standard. A case study exists to show **the result and the value it created**,
backed by evidence. The reader is a hiring manager or a client: they should
understand the outcome from the hero and metric band alone, and find the proof
further down.

Reference implementation: `s1-vuln-sync.mdx` (EN and PT).

## Truth rules

- Use only numbers, names and facts that already exist in the case, its
  screenshots, or that Caio has confirmed. Never invent a figure, a team size,
  a percentage or a comparison.
- A claim with no source is either softened ("cut weekly reporting from hours
  to minutes" only if stated) or removed. Open questions go in a
  `{/* VERIFY: ... */}` comment at the point of use, never on the page.
- A design that was not deployed is described as a design. Results are what
  actually happened.
- When two cases share a result (e.g. the Linux vulnerability reduction), one
  case owns it and the other says "contributed to" and links to it.

## Frontmatter

| Field | Rule |
| --- | --- |
| `title` | `<Name> — <measurable result>`, sentence case. EN: "S1-Vuln-Sync — 394K vulnerabilities in one weekly view". |
| `tagline` | One sentence, first person, result first. |
| `metrics` | Exactly 3. `value` leads with a number or a measured state (`−44%`, `394K`, `<24h`, `0`). `label` is sentence case, at most 5 words; the layout sets it in caps. The first metric is the headline result. |
| `stack` | Tools, platforms, languages and frameworks only — no activities ("Incident response") or metrics ("SLA / MTTR"). Product names stay in English in both languages. |
| `summary` | 1–2 sentences: what, for whom, the result. Used for SEO and cards. |
| `order` | Unique across all cases, 1–17 — it sets the order of the project list on the home page. |
| `proofs` | Real screenshots only. `alt` describes what is visible; `caption` says what it proves. Rendered as the **Evidence** gallery. |

## Body structure

Same H2 sections, same order, in every case. H3 is free inside a section.

| # | EN | PT | Content |
| --- | --- | --- | --- |
| — | *(optional)* `<Callout kind="scope">` | | Authorization / disclosure note, before the first H2. |
| 1 | `## Context` | `## Contexto` | The situation and why it mattered to the business. End with the problem as 2–4 bullets. |
| 2 | `## What I did` | `## O que eu fiz` | The approach and the decisions, with their trade-offs. H3 per phase or component. |
| 3 | `## How it works` | `## Como funciona` | A Mermaid diagram of the system or flow, plus 1–3 sentences reading it. |
| 4 | `## Results` | `## Resultados` | A visual (`BeforeAfter`, `StatGrid` or `Timeline`) and quantified bullets. Every bullet carries a number or a verifiable outcome. |
| 5 | `## Business value` | `## Valor para o negócio` | One `<Callout kind="value">` saying what the result meant: risk reduced, time or cost saved, compliance or audit readiness, decisions enabled. |
| 6 | `## Lessons` | `## Aprendizados` | 3–5 bullets, each a bold principle plus one sentence of evidence from this case. |

## Visual components

Import from `@/components/case/`. Pass `lang="pt"` in the PT file where the
component takes it.

```mdx
import BeforeAfter from '@/components/case/BeforeAfter.astro';
import StatGrid from '@/components/case/StatGrid.astro';
import Timeline from '@/components/case/Timeline.astro';
import Callout from '@/components/case/Callout.astro';

<BeforeAfter lang="en" title="Linux findings" items={[
  { label: 'Monthly vulnerability impact', before: 569000, after: 318000, beforeText: '569K', afterText: '318K' },
]} caption="Source: SentinelOne monthly snapshot." />

<StatGrid title="Production snapshot" stats={[
  { value: '394,706', label: 'Vulnerabilities processed', detail: 'One weekly sync' },
]} />

<Timeline title="Response" steps={[
  { when: 'Day 0', title: 'RCE confirmed manually' },
  { when: 'Hours later', title: 'WAF containment live', key: true },
]} />

<Callout kind="value" lang="en">
Text in Markdown.
</Callout>
```

- `BeforeAfter` — any result with a before and an after. The change is
  computed; never type the percentage by hand.
- `StatGrid` — counts and states (records processed, tools shipped, findings).
- `Timeline` — incident response and phased delivery. Mark the decisive step
  with `key: true`.
- `Callout` — `value` (business value, required once), `scope`
  (authorization, disclosure), `note`.
- Mermaid diagrams are translated in the PT file.
- Markdown tables are fine for matrices (severity × OS, tool comparison).

## Language

- **EN**: first person, past tense for what happened, present for how the
  system works. Plain, senior, no marketing adjectives.
- **PT**: natural Brazilian Portuguese, the same register as EN. Use "para",
  not "pra"; "está", not "tá". Keep the established technical terms in
  English when they are the industry word (pipeline, finding, SIEM, WAF,
  gate, sprint, pentest, offboarding); translate everything else (fleet →
  frota, rollback safety → segurança no rollback). Never turn an English word
  into a Portuguese verb ("trackear", "flagar", "weaponizar", "scorear").
- Genders: **o** pipeline, **a** sprint, **a** engine, **o** finding,
  **o** playbook.
- Numbers: EN `394,706` / PT `394.706`; EN `−44%` / PT `−44%`.
- Punctuation: straight quotes and apostrophes; em dash with spaces ` — `.
- EN and PT are mirrors: same sections, same order, same numbers, same
  components, same images.
