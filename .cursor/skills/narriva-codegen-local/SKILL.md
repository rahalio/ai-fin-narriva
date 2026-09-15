---
name: narriva-codegen-local
description: >-
  Narriva local codegen bootstrap: .codegen must never be committed or pushed.
  Use when cloning, missing .codegen, running zero-codegen, or git staging
  questions about codegen tooling.
---

# Narriva — local `.codegen` only

## Hard rule

**Never commit or push `.codegen/` to GitHub.** It is provisioned locally and listed in `.gitignore`.

Also never force-add:

- `packages/openapi-core/src/.bundled/`
- `platform/tests/postman/generated/`
- `**/integration-events/generated/`

## Bootstrap

If `.codegen/` is missing:

```bash
node scripts/bootstrap-codegen.mjs
pnpm codegen:paths
```

Default scaffold source (overridable via `NARRIVA_CODEGEN_SCAFFOLD`):

`/Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold`

The script copies only `.codegen/` from that tree; it does not modify the scaffold.

## After bootstrap

1. Confirm `package_scope` is `@narriva` in `.codegen/zero-codegen.json` and `.codegen/.zero-codegen-merged.json`.
2. Run `pnpm codegen:paths`.
3. Use Mode A (full generate) for **new** domains; Mode B (core only) for YAML edits on existing domains.
