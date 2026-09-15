/**
 * Reproductions Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/reproductions.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ReproductionId = components["schemas"]["ReproductionId"];
export type ReproductionJob = components["schemas"]["ReproductionJob"];
export type ReproductionListData = components["schemas"]["ReproductionListData"];
export type ReproductionStatus = components["schemas"]["ReproductionStatus"];
export type ReproductionCreateRequest = components["schemas"]["ReproductionCreateRequest"];
export type Reproduction = components["schemas"]["ReproductionResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateReproductionRequestInput = NonNullable<operations["createReproduction"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListReproductionsParams = NonNullable<operations["listReproductions"]["parameters"]["query"]>;
export type GetReproductionParams = operations["getReproduction"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListReproductionsResponse = operations["listReproductions"]["responses"]["200"]["content"]["application/json"];
export type CreateReproductionResponse = operations["createReproduction"]["responses"]["201"]["content"]["application/json"];
export type GetReproductionResponse = operations["getReproduction"]["responses"]["200"]["content"]["application/json"];


