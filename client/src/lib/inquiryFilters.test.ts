import { describe, expect, it } from "vitest";
import { filterInquiries } from "./inquiryFilters";
import { buildInquiryProjectLocation } from "./inquiry";
import type { Inquiry } from "./supabase";

const inquiries: Inquiry[] = [
  { id: "1", name: "Ayesha", phone: "017", project_location: "Agrabad, Chattogram", district: "Chattogram", area_name: "Agrabad", email: "a@example.com", service: "Soil Testing", message: "Need a site review", status: "new", created_at: "2026-01-01T00:00:00Z" },
  { id: "2", name: "Rahim", phone: "018", project_location: "Uttara, Dhaka", district: "Dhaka", area_name: "Uttara", email: null, service: "Digital Land Survey", message: "Boundary survey", status: "closed", created_at: "2026-01-02T00:00:00Z" },
];

describe("filterInquiries", () => {
  it("matches text across contact and message fields", () => expect(filterInquiries(inquiries, { query: "boundary", status: "all", service: "all" }).map((item) => item.id)).toEqual(["2"]));
  it("matches project location", () => expect(filterInquiries(inquiries, { query: "dhaka", status: "all", service: "all" }).map((item) => item.id)).toEqual(["2"]));
  it("filters by selected district", () => expect(filterInquiries(inquiries, { query: "", status: "all", service: "all", district: "Chattogram" }).map((item) => item.id)).toEqual(["1"]));
  it("filters by inclusive date range", () => expect(filterInquiries(inquiries, { query: "", status: "all", service: "all", dateFrom: "2026-01-02", dateTo: "2026-01-02" }).map((item) => item.id)).toEqual(["2"]));
  it("filters from a start date", () => expect(filterInquiries(inquiries, { query: "", status: "all", service: "all", dateFrom: "2026-01-02" }).map((item) => item.id)).toEqual(["2"]));
  it("combines the typed area and selected district", () => expect(buildInquiryProjectLocation("Chattogram", "  Agrabad  ")).toBe("Agrabad, Chattogram"));
});
