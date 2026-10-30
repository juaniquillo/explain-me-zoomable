# Universal first prompt

Copy-paste as-is. All variable context lives in `TOPIC.md`. Tech-specific agent instructions live in `AGENTS.md`.

---

Read `TOPIC.md` and `AGENTS.md` in this repo.

Explain the topic in `TOPIC.md` for someone who has used it but doesn't understand it.

Pick the explanation method that fits this tech best (don't force all of them):
- visual / interactive
- step-by-step
- analogy -> code -> gotchas
- compare / contrast with alternatives

Then:
1. Build a minimal demo in `src/` following `src/README.md` (one concept, single run command, no dependencies unless unavoidable).
2. Fill `README.md` sections: What / Why / How demo works / Gotchas / Sources.
3. Fill tech-specific notes in `AGENTS.md` under `## Per-topic overrides`.
4. Propose a 2-3 line human summary for `LOG-ENTRY.md`.

Keep explanations concrete and tied to the demo. Call out what was confusing in `TOPIC.md` explicitly.
