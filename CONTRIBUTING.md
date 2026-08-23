# Contributing

## Issue labels

Every issue gets classified along three independent axes. An issue can (and
usually should) carry one label from each axis.

### Type labels

`type:*` labels say what kind of change this is.

- `type:feat`: new user-facing functionality
- `type:bug`: defect fix
- `type:refactor`: internal restructuring, no behavior change
- `type:perf`: performance improvement
- `type:test`: test coverage only
- `type:docs`: README, CLAUDE.md, or rule file changes
- `type:chore`: misc maintenance not fitting elsewhere
- `type:build-config`: Vite config, oxlint config, tsconfig
- `type:ci`: GitHub Actions workflow changes
- `type:deps`: adding, removing, or upgrading npm packages

### Area labels

`area:*` labels say where in the codebase the change lives.

- `area:data`: `src/data/dndData.js`
- `area:ui:interaction`: breaks user flow or functionality (click doesn't
  register, selection state wrong, hover-driven UI stuck)
- `area:ui:layout`: structural or positioning problems (overlap, breakpoint
  issues, alignment, a stuck `useMediaQuery` switch between desktop and
  mobile)
- `area:ui:styling`: cosmetic only (color, spacing, typography, animation
  polish, a broken `useTheme` value, nothing functionally broken)
- `area:a11y`: accessibility
- `area:docs`: README, CLAUDE.md, or rule file content

Every issue gets one type and one area, no exceptions. A `type:test` issue
takes whatever area it's testing (`area:data` for a `dndData.test.js` case,
`area:ui:interaction` for a selection-state test, and so on). A `type:docs`
issue takes `area:docs`.

### Risk labels

`risk:*` labels say how much blast radius automating the fix carries. This
isn't severity or priority (how bad the bug is, or how soon to fix it). It
answers a narrower question: how safe is it to let an agent make this
change unattended?

- `risk:low`: isolated, mechanical, easily reversible (typo or data
  corrections, single-component tweaks)
- `risk:medium`: touches logic across a few files, still within test
  coverage
- `risk:high`: cross-cutting, shared state, anything that smells like
  `type:ci`, `type:build-config`, or `type:deps`

## Automated agents

Two agents operate on labeled issues, each with a single responsibility.

- **Triage agent.** Runs when an issue is opened. Reads it, applies one
  `type:*`, one `area:*`, and one `risk:*` label. Never touches code, never
  opens a PR.
- **Fixer agent.** Runs when an issue's labels clear the gate below. Reads
  the issue, edits the relevant code, runs lint/test/build, retries on
  failure, opens a PR. Never touches labels, never merges.

The fixer runs only if `risk:low` or `risk:medium` is present, and `type` is
not `ci`, `build-config`, or `deps`. That exclusion holds regardless of
risk: a "small" dependency bump or CI tweak can still break the whole
build.

If triage gets it wrong, relabel the issue by hand. No code gets touched
until the gate passes, so a bad classification never causes a bad edit.

## Manual labeling

You don't need to wait for triage. Apply `type:*`, `area:*`, and `risk:*`
labels yourself on any issue to route it directly, or to trigger the fixer
agent immediately.

## Related conventions

- Branch and PR naming: [.claude/rules/branching.md](.claude/rules/branching.md)
- Testing strategy: [.claude/rules/testing.md](.claude/rules/testing.md)
- React & CSS conventions: [.claude/rules/react-css.md](.claude/rules/react-css.md)
