# AGENTS.md

Guidance for AI coding agents (Claude, Copilot, Codex, etc.) working in this repository.

## What this repo is

A personal cooking/food knowledge base, built as a static site with
[MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and published on
Cloudflare Pages (`https://adrians.cooking/`). Content is authored in Markdown under `docs/`.

It also contains one unrelated Node.js tool, `amex-dining-credit/`, kept in the same repo
for convenience — treat it as a separate project (see below).

## Repository structure

```
docs/
  recipes/       Recipes (main content)
  hospitality/    Restaurant / venue reviews
  knowledge/      General cooking knowledge (sous vide, vacuum sealing, gear, …)
  pantry/         Pantry ingredient write-ups (often with photos/), incl. nutrition-facts.md product catalog
  blog/           MkDocs blog plugin posts (e.g. meal plans)
  about.md, index.md
templates/          Templates for new content (not rendered), e.g. meal-plan-day.md
mkdocs.yml         Site config: nav, theme, tag definitions, plugins
overrides/          Custom theme assets, incl. locally cached emoji icons used as tag icons
amex-dining-credit/ Standalone Node.js tool, unrelated to the recipe content
CONTRIBUTING.md     Style guide (units, fractions, prime symbols) — authoritative, read it
.grazie.en.yaml     Machine-checkable version of the same style rules (Grazie/vale-style)
```

Each content directory usually has a `.meta.yml` with a default `tags:` entry
(via the MkDocs `meta` plugin) applied to every page in it. This is currently the
**only working way** to tag a page.

Many existing pages also carry inline markup like:

```
<primary-label ref="recipe"/>
<secondary-label ref="us"/>
<secondary-label ref="stew"/>
```

**⚠️ These `<primary-label>`/`<secondary-label>` tags are obsolete/dead.** They are a
leftover from an earlier JetBrains Writerside-based version of this project and are
*not* processed by MkDocs Material/the `meta`/`tags` plugins used today — they don't do
anything anymore, they just sit in the rendered page as inert HTML-ish text. They still
appear in many existing files but should **not** be used as a model for new content, and
should eventually be removed from the repo (tracked as cleanup, not yet done — don't
mass-delete them on your own initiative unless asked). Until that cleanup happens, treat
`.meta.yml` as the authoritative tag source and check `extra.tags` in `mkdocs.yml` for
the valid tag keys before inventing a new one (add an icon under `theme.icon.tag` /
`overrides/.icons/` if you introduce one).

## Content conventions (recipes especially)

Follow `CONTRIBUTING.md` for style. Highlights:

- Narrow no-break space (`&#x202F;`) between a value and an SI unit, e.g. `120&#x202F;g`, `10&#x202F;%`.
  Regular non-breaking space for non-SI units like cups/tablespoons.
- Use prime symbols for minutes/seconds/inches: `45′`, `30″` — not `45'`/`30"`.
- Use Unicode vulgar fractions (`½`, `¼`, `⅓`, `⅔`, `¾`, `⅛`, `⅒`, …), not `1/2` etc.
- Recipes are written in whichever language the author used for that dish (German and
  English both occur in `docs/recipes/`) — match the existing language of a file you edit;
  don't translate existing recipes unless asked.
- Recipes are not required to follow one single template — some are terse ingredient/step
  lists (`Pizza.md`), others use `## Ingredients` / `## Directions` headings (`gumbo.md`).
  Match the style of neighboring files in the same directory rather than inventing a new format.
- Don't invent recipe content. When asked to add a recipe from an external source, keep it
  attributed (source link, video, book, etc., as several existing files already do) and keep
  quantities/steps faithful to the source rather than guessing.

## Meal-Plan-Posts (Tages-Ernährungslog)

Adrian tells the agent (in German, often in several messages over the day) what he ate;
the agent turns that into one blog post per day. The goal is that he only has to say what he
ate — everything else follows from these rules.

**Profile (for the commentary, not printed in posts unless asked):** 174 cm, 68 kg,
wants a moderate calorie deficit to lose fat. Apple Health, September 2026 averages:
Ruheenergie ~1.758 kcal + Aktive Energie ~845 kcal = ~2.600 kcal/day (watch active values
tend to run high, so assume ~2.350–2.600). Target ~1.900–2.100 kcal/day (deficit ~400–500 kcal)
and ~110–135 g protein/day (1,6–2 g/kg). Regularly eating far below ~1.800 kcal is too
aggressive — point that out gently. Re-check the target when Adrian reports new averages or his
weight trend (goal ~0,3–0,5 kg/week). Typical breakfast: 180–200 g Skyr + 30–40 g Haferflocken
(ask or use 35 g if not specified), plus "Kaffee wie üblich" = 0,5 l coffee with 100 g Vemondo
„No Milk“ Hafer 3,5 % (catalog anchor `#lidl-vemondo-no-milk-hafer-3-5`). Lunch is usually in the Kantine with unknown portions.
When replying, briefly say how the day stands against these targets; keep it encouraging, no
lecturing — a single low or high day is fine, the weekly average is what counts.

**File:** `docs/blog/posts/YYYY-MM-DD What I ate.md`, based on
[`templates/meal-plan-day.md`](templates/meal-plan-day.md) (the template lives outside `docs/`
so it is not rendered). Written in German. Structure: front matter with `date` and
`categories: [What I Ate]`, heading `# Essen am <D. Monat YYYY>`, a day summary table
(one row per meal + `**Zusammen**`), then one `##` section per meal (`Frühstück`, `Mittag`,
`Abend`, and `Später` for snacks/shakes) with an ingredient table and `**Gesamt**` row.
Columns are always Kalorien / Eiweiß / Kohlenhydrate / Fett, values prefixed with `~`
because they are estimates. Omit meals that haven't happened (yet) rather than writing
"unbekannt" rows. Keep the summary table and all totals consistent after every change.

**Products:** Packaged/specific products live in the product catalog
[`docs/pantry/nutrition-facts.md`](docs/pantry/nutrition-facts.md), not in the posts. Each
product is one `###` section with an explicit anchor `{#ean-<EAN>}` (or a descriptive slug like
`{#maurer-dinkelwuerfel}` if there is no EAN), a short description (brand, store/manufacturer,
package size), the EAN, and the nutrition table exactly as printed on the label. Posts only
state the amount eaten and link to the anchor, e.g.
`[Svježi polumasni sir](../../pantry/nutrition-facts.md#ean-3858893130611)`.
- When Adrian sends a photo of a label, transcribe it into a new catalog entry. Validate the EAN
  check digit before using it. Never edit an existing entry's values to fit a different product —
  a different product (other store, other brand, changed recipe) gets its own entry, so older
  posts stay correct.
- For products with a website (e.g. bakery bread), take the values from there and link the page.
- Unpackaged food (Kantine, restaurant, home-cooked without label) is estimated with typical
  values and marked as such, e.g. `(Kantine – Mengen geschätzt)`.

**Kantine receipts (JSON export from the canteen's POS):** Adrian may attach the receipt as a
JSON array, one object per item (`articleName`/`guestDescription`, `nutrientInfo[]` with
`nutrientName`, `currentValue`, `unitShortName`). The values are per item as served, but the
units are unreliable despite all saying "g":
- `kcal` and `Kohlenhydrate`: trustworthy, use as-is.
- `Fett`: consistently in **milligrams** (e.g. `18865.94` → 18,9 g).
- `Eiweiß`: sometimes correct, sometimes ×10 too high (`30.43` on a side salad → ~3 g) or in mg.
- `davon Zucker`: sometimes mg (`3817.03` → 3,8 g), sometimes g.
- `davon Gesättigte Fettsäuren`: unusable (often exceeds total fat) — ignore.
- `Salz`: mostly plausible in g, but treat values > ~5 g per item as suspect.
- All-zero `nutrientInfo` (e.g. the Schnitzel) means no data — estimate from the name,
  which often includes the portion weight (`… 125g`). Drinks like Tafelwasser have no values.

Always sanity-check with the energy balance (4 kcal/g carbs & protein, 9 kcal/g fat) against the
`kcal` value; if protein/fat don't reconcile, keep kcal and carbs and derive the rest
(estimate protein, fat = remainder / 9). Note in the post that values come from the receipt
and which were corrected or derived. If a receipt arrives for a day already on `main`, correct
that post directly on `main` (small change to existing content).

**Git workflow — one commit per day:**
1. First message of a day: branch `blog/YYYY-MM-DD-what-i-ate` from an up-to-date `main`,
   create the post (plus any new catalog entries), commit, push.
2. Every later addition that day: update the post, `git commit --amend`, and
   `git push --force-with-lease`, so the branch always holds exactly one commit for that day.
   Commit message: `Add meal plan blog post for YYYY-MM-DD` with a short German body listing the meals.
3. When Adrian says the day is complete, merge into `main` (fast-forward/squash, so one commit
   lands) and push — Cloudflare Pages then publishes it. Don't merge before he says so.
   Changes to the catalog or this workflow that aren't part of a specific day go in their own commit.

## Working with the site

- No package manager lockstep required at the repo root; MkDocs deps are in `requirements.txt`
  (currently just `mkdocs-material`).
- Local preview: `pip install -r requirements.txt && mkdocs serve` (see `README.md` for the
  venv/docker variants).
- There is deliberately no GitHub Actions workflow for building/deploying — Cloudflare Pages
  builds directly from pushes to `main`. Don't add a CI/deploy workflow unless asked.

## `amex-dining-credit/` subproject

Independent Node.js project (Google Places / AMEX merchant data tooling), not part of the
MkDocs site. Has its own `package.json`, `README.md`, and Jest tests
(`npm test` from within `amex-dining-credit/`). Changes to the cooking content in `docs/`
should not touch this directory, and vice versa.

## Git / commit conventions

- Commits should be authored as the human (Adrian Föder `<adrian@foeder.de>`), not as the agent.
  Set `GIT_AUTHOR_NAME`/`GIT_AUTHOR_EMAIL` (and committer) accordingly before committing.
- Add the agent as a `Co-Authored-By:` trailer in the commit message instead, e.g.
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.
- Prefer a single, canonical commit per change: when refining work that isn't merged yet,
  `git commit --amend` and `git push --force-with-lease` instead of stacking fix-up commits.
- New undertakings (e.g. a new recipe or page, new structures or tooling) go through a
  pull request, so they can be refined before landing. Small changes to existing content
  (a wording fix, an added hint, a corrected quantity) are committed directly to `main`
  without a PR. If in doubt, ask.

## General agent notes

- Prefer editing existing files/patterns over introducing new structures.
- This repo's content is personal and opinionated (recipes "adjusted for taste"); when editing
  someone else's recipe text, preserve intent and only fix what was asked.
