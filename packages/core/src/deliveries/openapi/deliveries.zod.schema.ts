import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDelivery_Body = z
  .object({
    narrativeId: z.string(),
    channel: z.enum(['pdf', 'email', 'in_app']),
    recipientRef: z.string().optional(),
    scheduledAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DeliveryStatus = z.enum([
  'scheduled',
  'sent',
  'delivered',
  'failed',
  'cancelled',
]);
const DeliveryChannel = z.enum(['pdf', 'email', 'in_app']);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const DeliveryId = z.string();
const DeliveredNarrative = z
  .object({
    deliveryId: z.string().regex(/^dlv_[0-9A-HJKMNP-TV-Z]{26}$/),
    narrativeId: z.string(),
    channel: z.enum(['pdf', 'email', 'in_app']),
    status: z.enum(['scheduled', 'sent', 'delivered', 'failed', 'cancelled']),
    recipientRef: z.string().optional(),
    snapshotId: z.string(),
    templateId: z.string(),
    templateVersion: z.number().int(),
    artefactUri: z.string().optional(),
    scheduledAt: z.string().datetime({ offset: true }).optional(),
    deliveredAt: z.string().datetime({ offset: true }).optional(),
    failureReason: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DeliveryListData = z
  .object({
    items: z.array(
      z
        .object({
          deliveryId: z.string().regex(/^dlv_[0-9A-HJKMNP-TV-Z]{26}$/),
          narrativeId: z.string(),
          channel: z.enum(['pdf', 'email', 'in_app']),
          status: z.enum([
            'scheduled',
            'sent',
            'delivered',
            'failed',
            'cancelled',
          ]),
          recipientRef: z.string().optional(),
          snapshotId: z.string(),
          templateId: z.string(),
          templateVersion: z.number().int(),
          artefactUri: z.string().optional(),
          scheduledAt: z.string().datetime({ offset: true }).optional(),
          deliveredAt: z.string().datetime({ offset: true }).optional(),
          failureReason: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const DeliveryListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              deliveryId: z.string().regex(/^dlv_[0-9A-HJKMNP-TV-Z]{26}$/),
              narrativeId: z.string(),
              channel: z.enum(['pdf', 'email', 'in_app']),
              status: z.enum([
                'scheduled',
                'sent',
                'delivered',
                'failed',
                'cancelled',
              ]),
              recipientRef: z.string().optional(),
              snapshotId: z.string(),
              templateId: z.string(),
              templateVersion: z.number().int(),
              artefactUri: z.string().optional(),
              scheduledAt: z.string().datetime({ offset: true }).optional(),
              deliveredAt: z.string().datetime({ offset: true }).optional(),
              failureReason: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DeliveryCreateRequest = z
  .object({
    narrativeId: z.string(),
    channel: z.enum(['pdf', 'email', 'in_app']),
    recipientRef: z.string().optional(),
    scheduledAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DeliveryResponse = z
  .object({
    data: z
      .object({
        deliveryId: z.string().regex(/^dlv_[0-9A-HJKMNP-TV-Z]{26}$/),
        narrativeId: z.string(),
        channel: z.enum(['pdf', 'email', 'in_app']),
        status: z.enum([
          'scheduled',
          'sent',
          'delivered',
          'failed',
          'cancelled',
        ]),
        recipientRef: z.string().optional(),
        snapshotId: z.string(),
        templateId: z.string(),
        templateVersion: z.number().int(),
        artefactUri: z.string().optional(),
        scheduledAt: z.string().datetime({ offset: true }).optional(),
        deliveredAt: z.string().datetime({ offset: true }).optional(),
        failureReason: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createDelivery_Body,
  DeliveryStatus,
  DeliveryChannel,
  Problem,
  DeliveryId,
  DeliveredNarrative,
  DeliveryListData,
  ResponseMeta,
  DeliveryListResponse,
  DeliveryCreateRequest,
  DeliveryResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/deliveries',
    alias: 'listDeliveries',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['scheduled', 'sent', 'delivered', 'failed', 'cancelled'])
          .optional(),
      },
      {
        name: 'channel',
        type: 'Query',
        schema: z.enum(['pdf', 'email', 'in_app']).optional(),
      },
      {
        name: 'narrativeId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  deliveryId: z.string().regex(/^dlv_[0-9A-HJKMNP-TV-Z]{26}$/),
                  narrativeId: z.string(),
                  channel: z.enum(['pdf', 'email', 'in_app']),
                  status: z.enum([
                    'scheduled',
                    'sent',
                    'delivered',
                    'failed',
                    'cancelled',
                  ]),
                  recipientRef: z.string().optional(),
                  snapshotId: z.string(),
                  templateId: z.string(),
                  templateVersion: z.number().int(),
                  artefactUri: z.string().optional(),
                  scheduledAt: z.string().datetime({ offset: true }).optional(),
                  deliveredAt: z.string().datetime({ offset: true }).optional(),
                  failureReason: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v0/tenants/me/deliveries',
    alias: 'createDelivery',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDelivery_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            deliveryId: z.string().regex(/^dlv_[0-9A-HJKMNP-TV-Z]{26}$/),
            narrativeId: z.string(),
            channel: z.enum(['pdf', 'email', 'in_app']),
            status: z.enum([
              'scheduled',
              'sent',
              'delivered',
              'failed',
              'cancelled',
            ]),
            recipientRef: z.string().optional(),
            snapshotId: z.string(),
            templateId: z.string(),
            templateVersion: z.number().int(),
            artefactUri: z.string().optional(),
            scheduledAt: z.string().datetime({ offset: true }).optional(),
            deliveredAt: z.string().datetime({ offset: true }).optional(),
            failureReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v0/tenants/me/deliveries/:deliveryId',
    alias: 'getDelivery',
    requestFormat: 'json',
    parameters: [
      {
        name: 'deliveryId',
        type: 'Path',
        schema: z.string().regex(/^dlv_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            deliveryId: z.string().regex(/^dlv_[0-9A-HJKMNP-TV-Z]{26}$/),
            narrativeId: z.string(),
            channel: z.enum(['pdf', 'email', 'in_app']),
            status: z.enum([
              'scheduled',
              'sent',
              'delivered',
              'failed',
              'cancelled',
            ]),
            recipientRef: z.string().optional(),
            snapshotId: z.string(),
            templateId: z.string(),
            templateVersion: z.number().int(),
            artefactUri: z.string().optional(),
            scheduledAt: z.string().datetime({ offset: true }).optional(),
            deliveredAt: z.string().datetime({ offset: true }).optional(),
            failureReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v0/tenants/me/deliveries/:deliveryId/cancel',
    alias: 'cancelDelivery',
    requestFormat: 'json',
    parameters: [
      {
        name: 'deliveryId',
        type: 'Path',
        schema: z.string().regex(/^dlv_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            deliveryId: z.string().regex(/^dlv_[0-9A-HJKMNP-TV-Z]{26}$/),
            narrativeId: z.string(),
            channel: z.enum(['pdf', 'email', 'in_app']),
            status: z.enum([
              'scheduled',
              'sent',
              'delivered',
              'failed',
              'cancelled',
            ]),
            recipientRef: z.string().optional(),
            snapshotId: z.string(),
            templateId: z.string(),
            templateVersion: z.number().int(),
            artefactUri: z.string().optional(),
            scheduledAt: z.string().datetime({ offset: true }).optional(),
            deliveredAt: z.string().datetime({ offset: true }).optional(),
            failureReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios('https://api.narriva.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
