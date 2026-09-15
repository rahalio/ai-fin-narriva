# Narriva

Enterprise NLG for client reporting: locked fact snapshots → audience templates → claim-bound narratives → review → delivery → audit reproduction.

OpenAPI-first DDD monorepo based on the zero-apps codegen scaffold. Package scope: **`@narriva/*`**.

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  ← generated clients + feature stubs; product UI per WEBAPP.md
```

Product specs: [PRODUCT.md](PRODUCT.md) · [USER_STORIES.md](USER_STORIES.md) · [WEBAPP.md](WEBAPP.md)

## Quick start

```bash
# If .codegen is missing (never committed), bootstrap from the scaffold:
node scripts/bootstrap-codegen.mjs

pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: narriva_demo_local_dev_key
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=narriva-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.
4. **`.codegen/` must never be committed or pushed** — see `.cursor/rules/codegen-never-commit.mdc`.

See `.cursor/skills/` and `docs/CODEGEN.md`.
