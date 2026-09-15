/**
 * CancelRepository — in-memory sandbox implementation.
 */

import type { CancelRepository } from '@narriva/services/deliveries';
import {
  deliveriesById,
  ensureNarrivaSandboxSeeded,
  responseMeta,
} from '../_shared/narriva-sandbox-store.js';

export class CancelRepositoryDdb implements CancelRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getDelivery(
    input: Parameters<CancelRepository['getDelivery']>[0]
  ): Promise<Awaited<ReturnType<CancelRepository['getDelivery']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const deliveryId = String(raw.deliveryId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const delivery = deliveriesById.get(deliveryId);
    if (!delivery) {
      return null;
    }
    return {
      data: delivery,
      ...responseMeta(correlationId),
    };
  }

  async cancelDelivery(
    input: Parameters<CancelRepository['cancelDelivery']>[0]
  ): Promise<Awaited<ReturnType<CancelRepository['cancelDelivery']>>> {
    ensureNarrivaSandboxSeeded();
    const raw = input as Record<string, unknown>;
    const deliveryId = String(raw.deliveryId ?? '');
    const correlationId = String(raw.correlationId ?? '');
    const delivery = deliveriesById.get(deliveryId);
    if (!delivery) {
      return null as never;
    }
    if (delivery.status === 'scheduled') {
      delivery.status = 'cancelled';
      deliveriesById.set(deliveryId, delivery);
    }
    return {
      data: delivery,
      ...responseMeta(correlationId),
    };
  }
}
