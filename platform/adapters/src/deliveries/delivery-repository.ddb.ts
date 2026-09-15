/**
 * DeliveryRepository — in-memory sandbox implementation.
 */

import type { DeliveryRepository } from '@narriva/services/deliveries';
import { generateIdWithPrefix } from '../_shared/id-generator.service.impl.js';
import {
  deliveriesById,
  ensureNarrivaSandboxSeeded,
  listDeliveries,
  narrativesById,
  nowIso,
  responseMeta,
  type SandboxDeliveredNarrative,
} from '../_shared/narriva-sandbox-store.js';

export class DeliveryRepositoryDdb implements DeliveryRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDeliveries(
    input: Parameters<DeliveryRepository['listDeliveries']>[0]
  ): Promise<Awaited<ReturnType<DeliveryRepository['listDeliveries']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    return {
      data: { items: listDeliveries() },
      ...responseMeta(correlationId),
    };
  }

  async createDelivery(
    input: Parameters<DeliveryRepository['createDelivery']>[0]
  ): Promise<Awaited<ReturnType<DeliveryRepository['createDelivery']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const narrativeId = String(raw.narrativeId ?? '');
    const narrative = narrativesById.get(narrativeId);
    if (!narrative) {
      return null as never;
    }

    const deliveryId = String(raw.id ?? generateIdWithPrefix('dlv'));
    const now = nowIso();
    const scheduledAt = raw.scheduledAt ? String(raw.scheduledAt) : undefined;
    const delivery: SandboxDeliveredNarrative = {
      deliveryId,
      narrativeId,
      channel: (raw.channel as SandboxDeliveredNarrative['channel']) ?? 'pdf',
      status: scheduledAt ? 'scheduled' : 'delivered',
      recipientRef: raw.recipientRef ? String(raw.recipientRef) : undefined,
      snapshotId: narrative.snapshotId,
      templateId: narrative.templateId,
      templateVersion: narrative.templateVersion,
      artefactUri: `sandbox://artefacts/${deliveryId}.pdf`,
      scheduledAt,
      deliveredAt: scheduledAt ? undefined : now,
      createdAt: now,
    };
    deliveriesById.set(deliveryId, delivery);

    if (!scheduledAt) {
      narrative.status = 'delivered';
      narrative.updatedAt = now;
      narrativesById.set(narrativeId, narrative);
    }

    return {
      data: delivery,
      ...responseMeta(correlationId),
    };
  }

  async getDelivery(
    input: Parameters<DeliveryRepository['getDelivery']>[0]
  ): Promise<Awaited<ReturnType<DeliveryRepository['getDelivery']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const deliveryId = String(raw.deliveryId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const delivery = deliveriesById.get(deliveryId);
    if (!delivery) {
      return null as never;
    }
    return {
      data: delivery,
      ...responseMeta(correlationId),
    };
  }
}
