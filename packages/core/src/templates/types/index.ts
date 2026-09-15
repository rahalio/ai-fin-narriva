/**
 * Templates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/templates.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Audience = components["schemas"]["Audience"];
export type DisclosureRule = components["schemas"]["DisclosureRule"];
export type DisclosureRuleId = components["schemas"]["DisclosureRuleId"];
export type DisclosureRuleListData = components["schemas"]["DisclosureRuleListData"];
export type Template = components["schemas"]["Template"];
export type TemplateId = components["schemas"]["TemplateId"];
export type TemplateListData = components["schemas"]["TemplateListData"];
export type TemplateStatus = components["schemas"]["TemplateStatus"];
export type DisclosureRuleCreateRequest = components["schemas"]["DisclosureRuleCreateRequest"];
export type TemplateCreateRequest = components["schemas"]["TemplateCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateTemplateRequestInput = NonNullable<operations["createTemplate"]["requestBody"]>["content"]["application/json"];
export type CreateDisclosureRuleRequestInput = NonNullable<operations["createDisclosureRule"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListTemplatesParams = NonNullable<operations["listTemplates"]["parameters"]["query"]>;
export type GetTemplateParams = operations["getTemplate"]["parameters"]["path"];
export type SubmitTemplateForApprovalParams = operations["submitTemplateForApproval"]["parameters"]["path"];
export type ApproveTemplateParams = operations["approveTemplate"]["parameters"]["path"];
export type RetireTemplateParams = operations["retireTemplate"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListTemplatesResponse = operations["listTemplates"]["responses"]["200"]["content"]["application/json"];
export type CreateTemplateResponse = operations["createTemplate"]["responses"]["201"]["content"]["application/json"];
export type GetTemplateResponse = operations["getTemplate"]["responses"]["200"]["content"]["application/json"];
export type SubmitTemplateForApprovalResponse = operations["submitTemplateForApproval"]["responses"]["200"]["content"]["application/json"];
export type ApproveTemplateResponse = operations["approveTemplate"]["responses"]["200"]["content"]["application/json"];
export type RetireTemplateResponse = operations["retireTemplate"]["responses"]["200"]["content"]["application/json"];
export type ListDisclosureRulesResponse = operations["listDisclosureRules"]["responses"]["200"]["content"]["application/json"];
export type CreateDisclosureRuleResponse = operations["createDisclosureRule"]["responses"]["201"]["content"]["application/json"];


