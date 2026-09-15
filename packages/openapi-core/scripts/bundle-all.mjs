#!/usr/bin/env node
import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(root, '..');
const bundled = join(pkgRoot, 'src', '.bundled');
mkdirSync(bundled, { recursive: true });

const domains = [
  'identity',
  'snapshots',
  'templates',
  'narratives',
  'approvals',
  'deliveries',
  'reproductions',
];

for (const domain of domains) {
  for (const [ext, outName] of [
    ['yaml', `${domain}.openapi.yaml`],
    ['json', `${domain}.json`],
  ]) {
    const out = join(bundled, outName);
    const result = spawnSync(
      'npx',
      ['redocly', 'bundle', domain, '--output', out],
      { cwd: pkgRoot, stdio: 'inherit', shell: process.platform === 'win32' },
    );
    if (result.status !== 0) {
      console.error(`Failed to bundle ${domain} as ${ext}`);
      process.exit(result.status ?? 1);
    }
  }
}

console.log(`Bundled ${domains.length} domains → ${bundled}`);
