# Git workflow

- Never commit or push directly to `main`. Always create a feature branch, commit there, push it, and open a PR — even for small or config-only changes.
- `main` is protected on GitHub (PR required + the `build` CI check must pass, enforced for everyone including admins), so a direct push will be rejected anyway. Don't work around this by disabling branch protection instead of opening a PR.
