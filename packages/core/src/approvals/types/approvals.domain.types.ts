/**
 * Approvals Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/approvals.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Approval = components["schemas"]["Approval"];
export type ApprovalId = components["schemas"]["ApprovalId"];
export type ApprovalListData = components["schemas"]["ApprovalListData"];
export type ApprovalOutcome = components["schemas"]["ApprovalOutcome"];
export type RiskTier = components["schemas"]["RiskTier"];
export type ApprovalCreateRequest = components["schemas"]["ApprovalCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateNarrativeApprovalRequestInput = NonNullable<operations["createNarrativeApproval"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListApprovalsParams = NonNullable<operations["listApprovals"]["parameters"]["query"]>;
export type CreateNarrativeApprovalParams = operations["createNarrativeApproval"]["parameters"]["path"];
export type GetApprovalParams = operations["getApproval"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListApprovalsResponse = operations["listApprovals"]["responses"]["200"]["content"]["application/json"];
export type CreateNarrativeApprovalResponse = operations["createNarrativeApproval"]["responses"]["201"]["content"]["application/json"];
export type GetApprovalResponse = operations["getApproval"]["responses"]["200"]["content"]["application/json"];


