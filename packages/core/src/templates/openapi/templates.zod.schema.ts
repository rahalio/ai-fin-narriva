import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createTemplate_Body = z
  .object({
    name: z.string(),
    audience: z.enum(['retail_client', 'advisor', 'institutional']),
    locale: z.string(),
    body: z.string(),
    productRiskTier: z.enum(['routine', 'elevated', 'high']).optional(),
    disclosureRuleIds: z
      .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    bannedClaims: z.array(z.string()).optional(),
    logicOutline: z.string().optional(),
    boundFactKeys: z.array(z.string()).optional(),
  })
  .passthrough();
const createDisclosureRule_Body = z
  .object({
    name: z.string(),
    body: z.string(),
    bannedClaimPatterns: z.array(z.string()).optional(),
  })
  .passthrough();
const Audience = z.enum(['retail_client', 'advisor', 'institutional']);
const TemplateStatus = z.enum(['draft', 'approved', 'retired']);
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
const TemplateId = z.string();
const DisclosureRuleId = z.string();
const Template = z
  .object({
    templateId: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    audience: z.enum(['retail_client', 'advisor', 'institutional']),
    locale: z.string().min(2).max(16),
    version: z.number().int().gte(1),
    status: z.enum(['draft', 'approved', 'retired']),
    body: z.string(),
    productRiskTier: z
      .enum(['routine', 'elevated', 'high'])
      .optional()
      .default('routine'),
    disclosureRuleIds: z
      .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    bannedClaims: z.array(z.string()).optional(),
    logicOutline: z.string().optional(),
    boundFactKeys: z.array(z.string()).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    approvedAt: z.string().datetime({ offset: true }).optional(),
    retiredAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const TemplateListData = z
  .object({
    items: z.array(
      z
        .object({
          templateId: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          audience: z.enum(['retail_client', 'advisor', 'institutional']),
          locale: z.string().min(2).max(16),
          version: z.number().int().gte(1),
          status: z.enum(['draft', 'approved', 'retired']),
          body: z.string(),
          productRiskTier: z
            .enum(['routine', 'elevated', 'high'])
            .optional()
            .default('routine'),
          disclosureRuleIds: z
            .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
            .optional(),
          bannedClaims: z.array(z.string()).optional(),
          logicOutline: z.string().optional(),
          boundFactKeys: z.array(z.string()).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          approvedAt: z.string().datetime({ offset: true }).optional(),
          retiredAt: z.string().datetime({ offset: true }).optional(),
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
const TemplateListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              templateId: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              audience: z.enum(['retail_client', 'advisor', 'institutional']),
              locale: z.string().min(2).max(16),
              version: z.number().int().gte(1),
              status: z.enum(['draft', 'approved', 'retired']),
              body: z.string(),
              productRiskTier: z
                .enum(['routine', 'elevated', 'high'])
                .optional()
                .default('routine'),
              disclosureRuleIds: z
                .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
                .optional(),
              bannedClaims: z.array(z.string()).optional(),
              logicOutline: z.string().optional(),
              boundFactKeys: z.array(z.string()).optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
              approvedAt: z.string().datetime({ offset: true }).optional(),
              retiredAt: z.string().datetime({ offset: true }).optional(),
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
const TemplateCreateRequest = z
  .object({
    name: z.string(),
    audience: z.enum(['retail_client', 'advisor', 'institutional']),
    locale: z.string(),
    body: z.string(),
    productRiskTier: z.enum(['routine', 'elevated', 'high']).optional(),
    disclosureRuleIds: z
      .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    bannedClaims: z.array(z.string()).optional(),
    logicOutline: z.string().optional(),
    boundFactKeys: z.array(z.string()).optional(),
  })
  .passthrough();
const TemplateResponse = z
  .object({
    data: z
      .object({
        templateId: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        audience: z.enum(['retail_client', 'advisor', 'institutional']),
        locale: z.string().min(2).max(16),
        version: z.number().int().gte(1),
        status: z.enum(['draft', 'approved', 'retired']),
        body: z.string(),
        productRiskTier: z
          .enum(['routine', 'elevated', 'high'])
          .optional()
          .default('routine'),
        disclosureRuleIds: z
          .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
          .optional(),
        bannedClaims: z.array(z.string()).optional(),
        logicOutline: z.string().optional(),
        boundFactKeys: z.array(z.string()).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
        approvedAt: z.string().datetime({ offset: true }).optional(),
        retiredAt: z.string().datetime({ offset: true }).optional(),
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
const DisclosureRule = z
  .object({
    disclosureRuleId: z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    body: z.string(),
    bannedClaimPatterns: z.array(z.string()).optional(),
    status: z.enum(['draft', 'approved', 'retired']),
  })
  .passthrough();
const DisclosureRuleListData = z
  .object({
    items: z.array(
      z
        .object({
          disclosureRuleId: z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          body: z.string(),
          bannedClaimPatterns: z.array(z.string()).optional(),
          status: z.enum(['draft', 'approved', 'retired']),
        })
        .passthrough()
    ),
  })
  .passthrough();
const DisclosureRuleListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              disclosureRuleId: z
                .string()
                .regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              body: z.string(),
              bannedClaimPatterns: z.array(z.string()).optional(),
              status: z.enum(['draft', 'approved', 'retired']),
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
const DisclosureRuleCreateRequest = z
  .object({
    name: z.string(),
    body: z.string(),
    bannedClaimPatterns: z.array(z.string()).optional(),
  })
  .passthrough();
const DisclosureRuleResponse = z
  .object({
    data: z
      .object({
        disclosureRuleId: z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        body: z.string(),
        bannedClaimPatterns: z.array(z.string()).optional(),
        status: z.enum(['draft', 'approved', 'retired']),
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
  createTemplate_Body,
  createDisclosureRule_Body,
  Audience,
  TemplateStatus,
  Problem,
  TemplateId,
  DisclosureRuleId,
  Template,
  TemplateListData,
  ResponseMeta,
  TemplateListResponse,
  TemplateCreateRequest,
  TemplateResponse,
  DisclosureRule,
  DisclosureRuleListData,
  DisclosureRuleListResponse,
  DisclosureRuleCreateRequest,
  DisclosureRuleResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/disclosure-rules',
    alias: 'listDisclosureRules',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  disclosureRuleId: z
                    .string()
                    .regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  body: z.string(),
                  bannedClaimPatterns: z.array(z.string()).optional(),
                  status: z.enum(['draft', 'approved', 'retired']),
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
    path: '/v0/tenants/me/disclosure-rules',
    alias: 'createDisclosureRule',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDisclosureRule_Body,
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
            disclosureRuleId: z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            body: z.string(),
            bannedClaimPatterns: z.array(z.string()).optional(),
            status: z.enum(['draft', 'approved', 'retired']),
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
    ],
  },
  {
    method: 'get',
    path: '/v0/tenants/me/templates',
    alias: 'listTemplates',
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
        name: 'audience',
        type: 'Query',
        schema: z
          .enum(['retail_client', 'advisor', 'institutional'])
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['draft', 'approved', 'retired']).optional(),
      },
      {
        name: 'locale',
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
                  templateId: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  audience: z.enum([
                    'retail_client',
                    'advisor',
                    'institutional',
                  ]),
                  locale: z.string().min(2).max(16),
                  version: z.number().int().gte(1),
                  status: z.enum(['draft', 'approved', 'retired']),
                  body: z.string(),
                  productRiskTier: z
                    .enum(['routine', 'elevated', 'high'])
                    .optional()
                    .default('routine'),
                  disclosureRuleIds: z
                    .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .optional(),
                  bannedClaims: z.array(z.string()).optional(),
                  logicOutline: z.string().optional(),
                  boundFactKeys: z.array(z.string()).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                  approvedAt: z.string().datetime({ offset: true }).optional(),
                  retiredAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v0/tenants/me/templates',
    alias: 'createTemplate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createTemplate_Body,
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
            templateId: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            audience: z.enum(['retail_client', 'advisor', 'institutional']),
            locale: z.string().min(2).max(16),
            version: z.number().int().gte(1),
            status: z.enum(['draft', 'approved', 'retired']),
            body: z.string(),
            productRiskTier: z
              .enum(['routine', 'elevated', 'high'])
              .optional()
              .default('routine'),
            disclosureRuleIds: z
              .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            bannedClaims: z.array(z.string()).optional(),
            logicOutline: z.string().optional(),
            boundFactKeys: z.array(z.string()).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            approvedAt: z.string().datetime({ offset: true }).optional(),
            retiredAt: z.string().datetime({ offset: true }).optional(),
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
    ],
  },
  {
    method: 'get',
    path: '/v0/tenants/me/templates/:templateId',
    alias: 'getTemplate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'templateId',
        type: 'Path',
        schema: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            templateId: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            audience: z.enum(['retail_client', 'advisor', 'institutional']),
            locale: z.string().min(2).max(16),
            version: z.number().int().gte(1),
            status: z.enum(['draft', 'approved', 'retired']),
            body: z.string(),
            productRiskTier: z
              .enum(['routine', 'elevated', 'high'])
              .optional()
              .default('routine'),
            disclosureRuleIds: z
              .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            bannedClaims: z.array(z.string()).optional(),
            logicOutline: z.string().optional(),
            boundFactKeys: z.array(z.string()).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            approvedAt: z.string().datetime({ offset: true }).optional(),
            retiredAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v0/tenants/me/templates/:templateId/approve',
    alias: 'approveTemplate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'templateId',
        type: 'Path',
        schema: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            templateId: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            audience: z.enum(['retail_client', 'advisor', 'institutional']),
            locale: z.string().min(2).max(16),
            version: z.number().int().gte(1),
            status: z.enum(['draft', 'approved', 'retired']),
            body: z.string(),
            productRiskTier: z
              .enum(['routine', 'elevated', 'high'])
              .optional()
              .default('routine'),
            disclosureRuleIds: z
              .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            bannedClaims: z.array(z.string()).optional(),
            logicOutline: z.string().optional(),
            boundFactKeys: z.array(z.string()).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            approvedAt: z.string().datetime({ offset: true }).optional(),
            retiredAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v0/tenants/me/templates/:templateId/retire',
    alias: 'retireTemplate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'templateId',
        type: 'Path',
        schema: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            templateId: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            audience: z.enum(['retail_client', 'advisor', 'institutional']),
            locale: z.string().min(2).max(16),
            version: z.number().int().gte(1),
            status: z.enum(['draft', 'approved', 'retired']),
            body: z.string(),
            productRiskTier: z
              .enum(['routine', 'elevated', 'high'])
              .optional()
              .default('routine'),
            disclosureRuleIds: z
              .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            bannedClaims: z.array(z.string()).optional(),
            logicOutline: z.string().optional(),
            boundFactKeys: z.array(z.string()).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            approvedAt: z.string().datetime({ offset: true }).optional(),
            retiredAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v0/tenants/me/templates/:templateId/submit',
    alias: 'submitTemplateForApproval',
    requestFormat: 'json',
    parameters: [
      {
        name: 'templateId',
        type: 'Path',
        schema: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            templateId: z.string().regex(/^tpl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            audience: z.enum(['retail_client', 'advisor', 'institutional']),
            locale: z.string().min(2).max(16),
            version: z.number().int().gte(1),
            status: z.enum(['draft', 'approved', 'retired']),
            body: z.string(),
            productRiskTier: z
              .enum(['routine', 'elevated', 'high'])
              .optional()
              .default('routine'),
            disclosureRuleIds: z
              .array(z.string().regex(/^dcl_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            bannedClaims: z.array(z.string()).optional(),
            logicOutline: z.string().optional(),
            boundFactKeys: z.array(z.string()).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            approvedAt: z.string().datetime({ offset: true }).optional(),
            retiredAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios('https://api.narriva.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
