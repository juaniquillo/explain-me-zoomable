# explain-me-template

Starter for the weekly explain-me tradition.

Each week: pick one piece of tech you worked on but don't fully understand → create `explain-me-<topic>` from this template → learn it via a tiny demo.

## Use this template

1. GitHub → `Use this template` → name it `explain-me-<topic>`
2. Fill `TOPIC.md` (short or long, as needed)
3. Fill tech-specific `AGENTS.md` under `## Per-topic overrides`
4. Paste `prompt.md` as your first prompt to the model
5. Build the `src/` demo (one concept, single run command, no deps)
6. Fill `README.md` explanation sections below
7. Copy `LOG-ENTRY.md` row into your central log

## Explanation format (fill per-topic)

### What
One paragraph: what is this tech?

### Why
Why does it exist / what problem does it solve?

### How demo works
What the `src/` demo shows, how to run it.

### Gotchas
What confused you, edge cases, common mistakes.

### Sources
Links you actually used.

### Template friction
What felt missing or awkward in this template while doing this lesson?

## Files

- `prompt.md` — universal first prompt (does not change per-topic)
- `TOPIC.md` — variable part: what you worked on, what you think, what confuses you
- `AGENTS.md` — base instructions, plus tech-specific notes in each lesson
- `LOG-ENTRY.md` — table row snippet for central log
- `src/README.md` — demo rules

## Evolving this template

To make that easy:
- Keep this template minimal — don't add tech-specific stuff here
- When something feels missing in a lesson, note it in that lesson's README under `### Template friction`
- Every ~3 lessons, backport common fixes here
