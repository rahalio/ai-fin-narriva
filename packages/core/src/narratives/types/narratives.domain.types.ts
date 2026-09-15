/**
 * Narratives Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/narratives.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ClaimBinding = components["schemas"]["ClaimBinding"];
export type ClaimBindingId = components["schemas"]["ClaimBindingId"];
export type NarrativeDraft = components["schemas"]["NarrativeDraft"];
export type NarrativeId = components["schemas"]["NarrativeId"];
export type NarrativeListData = components["schemas"]["NarrativeListData"];
export type NarrativeStatus = components["schemas"]["NarrativeStatus"];
export type ProductivitySummary = components["schemas"]["ProductivitySummary"];
export type JudgmentOverlayRequest = components["schemas"]["JudgmentOverlayRequest"];
export type NarrativeGenerateRequest = components["schemas"]["NarrativeGenerateRequest"];
export type Narrative = components["schemas"]["NarrativeResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type GenerateNarrativeRequestInput = NonNullable<operations["generateNarrative"]["requestBody"]>["content"]["application/json"];
export type AddNarrativeJudgmentOverlayRequestInput = NonNullable<operations["addNarrativeJudgmentOverlay"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListNarrativesParams = NonNullable<operations["listNarratives"]["parameters"]["query"]>;
export type GetNarrativeParams = operations["getNarrative"]["parameters"]["path"];
export type AddNarrativeJudgmentOverlayParams = operations["addNarrativeJudgmentOverlay"]["parameters"]["path"];
export type GetNarrativeProductivitySummaryParams = NonNullable<operations["getNarrativeProductivitySummary"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListNarrativesResponse = operations["listNarratives"]["responses"]["200"]["content"]["application/json"];
export type GenerateNarrativeResponse = operations["generateNarrative"]["responses"]["201"]["content"]["application/json"];
export type GetNarrativeResponse = operations["getNarrative"]["responses"]["200"]["content"]["application/json"];
export type AddNarrativeJudgmentOverlayResponse = operations["addNarrativeJudgmentOverlay"]["responses"]["200"]["content"]["application/json"];
export type GetNarrativeProductivitySummaryResponse = operations["getNarrativeProductivitySummary"]["responses"]["200"]["content"]["application/json"];


