import { describe, expect, it } from "vitest";
import { filterInquiries } from "./inquiryFilters";
import { resolveInquiryProjectLocation } from "./inquiry";
import type { Inquiry } from "./supabase";

const inquiries: Inquiry[] = [
  { id: "1", name: "Ayesha", phone: "017", project_location: "Chattogram", email: "a@example.com", service: "Soil Testing", message: "Need a site review", status: "new", created_at: "2026-01-01T00:00:00Z" },
  { id: "2", name: "Rahim", phone: "018", project_location: "Dhaka", email: null, service: "Digital Land Survey", message: "Boundary survey", status: "closed", created_at: "2026-01-02T00:00:00Z" },
];

describe("filterInquiries", () => {
  it("matches text across contact and message fields", () => expect(filterInquiries(inquiries, { query: "boundary", status: "all", service: "all" }).map((item) => item.id)).toEqual(["2"]));
  it("matches project location", () => expect(filterInquiries(inquiries, { query: "dhaka", status: "all", service: "all" }).map((item) => item.id)).toEqual(["2"]));
  it("filters by selected district", () => expect(filterInquiries(inquiries, { query: "", status: "all", service: "all", area: "Chattogram" }).map((item) => item.id)).toEqual(["1"]));
  it("filters by status and service", () => expect(filterInquiries(inquiries, { query: "", status: "new", service: "Soil Testing" }).map((item) => item.id)).toEqual(["1"]));
  it("uses custom area text when the other-area option is selected", () => expect(resolveInquiryProjectLocation("Other area / district", "  Savar  ", "Other area / district")).toBe("Savar"));
});
