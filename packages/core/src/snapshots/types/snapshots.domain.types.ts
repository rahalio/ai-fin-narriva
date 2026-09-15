/**
 * Snapshots Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/snapshots.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FactField = components["schemas"]["FactField"];
export type FactFieldId = components["schemas"]["FactFieldId"];
export type FactSnapshot = components["schemas"]["FactSnapshot"];
export type FactSnapshotListData = components["schemas"]["FactSnapshotListData"];
export type SnapshotId = components["schemas"]["SnapshotId"];
export type SnapshotStatus = components["schemas"]["SnapshotStatus"];
export type FactSnapshotCreateRequest = components["schemas"]["FactSnapshotCreateRequest"];
export type MarkFieldAuthoritativeRequest = components["schemas"]["MarkFieldAuthoritativeRequest"];
export type Snapshot = operations["listFactSnapshots"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateFactSnapshotRequestInput = NonNullable<operations["createFactSnapshot"]["requestBody"]>["content"]["application/json"];
export type MarkFactFieldAuthoritativeRequestInput = NonNullable<operations["markFactFieldAuthoritative"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFactSnapshotsParams = NonNullable<operations["listFactSnapshots"]["parameters"]["query"]>;
export type GetFactSnapshotParams = operations["getFactSnapshot"]["parameters"]["path"];
export type LockFactSnapshotParams = operations["lockFactSnapshot"]["parameters"]["path"];
export type MarkFactFieldAuthoritativeParams = operations["markFactFieldAuthoritative"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFactSnapshotsResponse = operations["listFactSnapshots"]["responses"]["200"]["content"]["application/json"];
export type CreateFactSnapshotResponse = operations["createFactSnapshot"]["responses"]["201"]["content"]["application/json"];
export type GetFactSnapshotResponse = operations["getFactSnapshot"]["responses"]["200"]["content"]["application/json"];
export type LockFactSnapshotResponse = operations["lockFactSnapshot"]["responses"]["200"]["content"]["application/json"];
export type MarkFactFieldAuthoritativeResponse = operations["markFactFieldAuthoritative"]["responses"]["200"]["content"]["application/json"];


