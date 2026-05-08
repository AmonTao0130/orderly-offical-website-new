---
name: update-skill-md
description: Use when asked to update, refresh, or sync the Orderly Network skill.md file. Triggers on "update skill", "refresh skill.md", "sync skill file".
---

# Update Orderly Skill File

Downloads the latest `skill.md` from the Orderly Network skills repo into `public/skill.md`.

## Source

- **Raw URL:** `https://raw.githubusercontent.com/OrderlyNetwork/skills/refs/heads/master/skills/orderly-onboarding/SKILL.md`

## Command

```bash
curl -s https://raw.githubusercontent.com/OrderlyNetwork/skills/refs/heads/master/skills/orderly-onboarding/SKILL.md > public/skill.md
```

## Verification

```bash
head -5 public/skill.md
# Should show:
# ---
# name: orderly-onboarding
```

## Context
- Served statically at `https://orderly.network/skill.md` via Next.js `public/` directory
- Discovered by agents via `<link rel="help" href="/skill.md">` in `app/layout.tsx`
