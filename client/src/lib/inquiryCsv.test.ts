import { describe, expect, it } from "vitest";
import { inquiriesToCsv } from "./inquiryCsv";
import type { Inquiry } from "./supabase";

describe("inquiriesToCsv", () => {
  it("exports the new district and area fields with escaped values", () => {
    const inquiry: Inquiry = { id: "1", name: "Ayesha, Ltd", phone: "017", project_location: "Agrabad, Chattogram", district: "Chattogram", area_name: "Agrabad", email: "a@example.com", service: "Soil Testing", message: "Need a, review", status: "new", created_at: "2026-01-01T00:00:00Z" };
    const csv = inquiriesToCsv([inquiry]);
    expect(csv).toContain('"Ayesha, Ltd"');
    expect(csv).toContain('"Agrabad"');
    expect(csv).toContain('"Need a, review"');
  });
});
