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
  pantry/         Pantry ingredient write-ups (often with photos/)
  blog/           MkDocs blog plugin posts (e.g. meal plans)
  about.md, index.md
mkdocs.yml         Site config: nav, theme, tag definitions, plugins
overrides/          Custom theme assets, incl. locally cached emoji icons used as tag icons
amex-dining-credit/ Standalone Node.js tool, unrelated to the recipe content
CONTRIBUTING.md     Style guide (units, fractions, prime symbols) — authoritative, read it
.grazie.en.yaml     Machine-checkable version of the same style rules (Grazie/vale-style)
```

Each content directory usually has a `.meta.yml` with a default `tags:` entry
(via the MkDocs `meta` plugin) applied to every page in it. Individual pages
can add more specific tags inline with:

```
<primary-label ref="recipe"/>
<secondary-label ref="us"/>
<secondary-label ref="stew"/>
```

Valid `ref` values are the tag *keys* (right-hand side) defined under `extra.tags`
in `mkdocs.yml` — check there before inventing a new tag, and add new tags to that
list (plus an icon under `theme.icon.tag` / `overrides/.icons/`) if you introduce one.

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

## General agent notes

- Prefer editing existing files/patterns over introducing new structures.
- This repo's content is personal and opinionated (recipes "adjusted for taste"); when editing
  someone else's recipe text, preserve intent and only fix what was asked.
