/**
 * Integration event type definition (hand-maintained contract for codegen registry).
 */

export type IntegrationEventDeliveryMode = 'sync' | 'async';

export type IntegrationEventTypeDefinition = {
  type: string;
  domain: string;
  aggregateType: string;
  description: string;
  defaultDeliveryMode: IntegrationEventDeliveryMode;
};
