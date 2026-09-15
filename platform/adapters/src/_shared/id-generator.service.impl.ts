/**
 * ID Generator Service Implementation — starter prefixes.
 */

import type { DomainCode } from '@narriva/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@narriva/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@narriva/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  snpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.snapshot);
  }
  fldId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.factField);
  }
  tplId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.template);
  }
  dclId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.disclosure);
  }
  narId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.narrative);
  }
  clmId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.claimBinding);
  }
  aprId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.approval);
  }
  dlvId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.delivery);
  }
  rprId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.reproduction);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
