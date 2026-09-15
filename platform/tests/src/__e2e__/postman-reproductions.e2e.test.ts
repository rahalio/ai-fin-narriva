/**
 * Postman-collection 1:1 Vitest tests for reproductions (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  limit: "",
  narrativeId: "",
  reproductionId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / reproductions (1:1 generated)", () => {

  it("listReproductions", async () => {
    const url = sub("{{baseUrl}}/v0/tenants/me/reproductions?cursor={{cursor}}&limit={{limit}}&narrativeId={{narrativeId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createReproduction", async () => {
    const url = sub("{{baseUrl}}/v0/tenants/me/reproductions");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"narrativeId\": \"newman_narrativeId\",\n  \"snapshotId\": \"newman_snapshotId\",\n  \"templateId\": \"newman_templateId\",\n  \"templateVersion\": 0\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['reproductionId'] = j.data.id;
  });

  it("getReproduction", async () => {
    const url = sub("{{baseUrl}}/v0/tenants/me/reproductions/{{reproductionId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
