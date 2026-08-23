#!/usr/bin/env bash
# One-time bootstrap: creates every type:*/area:*/risk:* label used by the
# triage and fixer agents (see CONTRIBUTING.md). Safe to re-run.
set -euo pipefail

create() {
  gh label create "$1" --color "$2" --description "$3" --force
}

# type:* — blue family
create "type:feat"         "1d76db" "New user-facing functionality"
create "type:bug"          "1d76db" "Defect fix"
create "type:refactor"     "1d76db" "Internal restructuring, no behavior change"
create "type:perf"         "1d76db" "Performance improvement"
create "type:test"         "1d76db" "Test coverage only"
create "type:docs"         "1d76db" "README, CLAUDE.md, or rule file changes"
create "type:chore"        "1d76db" "Misc maintenance not fitting elsewhere"
create "type:build-config" "0e4a86" "Vite config, oxlint config, tsconfig"
create "type:ci"           "0e4a86" "GitHub Actions workflow changes"
create "type:deps"         "0e4a86" "Adding, removing, or upgrading npm packages"

# area:* — green family
create "area:data"          "0e8a16" "src/data/dndData.js"
create "area:ui:interaction" "0e8a16" "Breaks user flow or functionality"
create "area:ui:layout"      "0e8a16" "Structural or positioning problems"
create "area:ui:styling"     "0e8a16" "Cosmetic only, nothing functionally broken"
create "area:a11y"           "0e8a16" "Accessibility"
create "area:docs"           "0e8a16" "README, CLAUDE.md, or rule file content"

# risk:* — traffic-light family (blast radius of automating the fix)
create "risk:low"    "c2e0c6" "Isolated, mechanical, easily reversible"
create "risk:medium" "fbca04" "Touches logic across a few files, still test-covered"
create "risk:high"   "b60205" "Cross-cutting, shared state, or infra-adjacent"
