# AGENTS.md

## Project Skills

This repository stores project-specific AI skills under:

```text
.claude/skills/
```

When an AI coding tool works in this repository, it should scan `.claude/skills/*/SKILL.md`, read each skill's frontmatter `name` and `description`, and use the matching skill before handling a task.

Before executing a task that matches a skill description, read that skill's full `SKILL.md` and follow its workflow.
