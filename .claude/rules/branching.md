# Branch & PR naming

See the root `CLAUDE.md` for the branch protection workflow itself (feature branch + PR required, no direct pushes to `main`, enforced by GitHub branch protection). This file covers naming.

Both the branch name and the PR title carry the same type prefix.

## Types

- `feat`: new user-facing functionality
- `bug`: bug fix
- `chore`: repo maintenance with no user-facing effect. Covers npm dependency upgrades, build config, docs, lint config
- `ci`: changes to CI/CD workflows (`.github/workflows/*`)

Anything that doesn't fit one of these four, default to whichever is closest in spirit (e.g. a pure styling tweak or a test-only change is `feat` if it's part of shipping a change, `chore` if it's incidental cleanup).

## Branch names

`<type>/<kebab-case-summary>`, e.g. `feat/spell-search-filter`, `bug/mobile-detail-sheet-header-overlap`, `chore/upgrade-vite-8`, `ci/add-dependency-audit`.

Keep the summary short (3-6 words), lowercase, hyphen-separated, no ticket numbers (this project doesn't use an issue tracker).

## PR titles

`<type>: Imperative summary`, e.g. `feat: Add spell search filter`, `bug: Fix mobile detail sheet header overlap on iOS Safari`, `chore: Upgrade Vite to 8.x`, `ci: Add dependency audit to CI`. Capitalize the summary after the colon; say what the change does, not how.

Keep the PR body short: a couple of bullets on what changed and why, plus a test plan line if it's not obvious from CI (lint/test/build all run automatically and must pass before merge).
