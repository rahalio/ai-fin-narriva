#!/usr/bin/env node
/**
 * Bootstrap local .codegen/ from the zero-apps codegen scaffold.
 * .codegen is gitignored and must never be committed or pushed.
 *
 * Usage:
 *   node scripts/bootstrap-codegen.mjs
 *   NARRIVA_CODEGEN_SCAFFOLD=/path/to/zero-apps-codegen-scaffold node scripts/bootstrap-codegen.mjs
 */
import { cpSync, existsSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dest = join(root, '.codegen');
const scaffoldRoot =
  process.env.NARRIVA_CODEGEN_SCAFFOLD ||
  '/Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold';
const src = join(scaffoldRoot, '.codegen');

if (!existsSync(src)) {
  console.error(
    `[bootstrap-codegen] Source not found: ${src}\n` +
      `Set NARRIVA_CODEGEN_SCAFFOLD to the scaffold repo root.`,
  );
  process.exit(1);
}

if (existsSync(dest)) {
  console.log(`[bootstrap-codegen] Removing existing ${dest}`);
  rmSync(dest, { recursive: true, force: true });
}

console.log(`[bootstrap-codegen] Copying ${src} → ${dest}`);
cpSync(src, dest, { recursive: true });

console.log(
  `[bootstrap-codegen] Done. Next: ensure package_scope is @narriva, then pnpm codegen:paths`,
);
