/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@narriva/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  snpId(): string;
  fldId(): string;
  tplId(): string;
  dclId(): string;
  narId(): string;
  clmId(): string;
  aprId(): string;
  dlvId(): string;
  rprId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
