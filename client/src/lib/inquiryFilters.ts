import type { Inquiry, InquiryStatus } from "@/lib/supabase";

export type InquiryFilters = { query: string; status: "all" | InquiryStatus; service: string; district?: string };

export function filterInquiries(inquiries: Inquiry[], filters: InquiryFilters) {
  const query = filters.query.trim().toLowerCase();
  return inquiries.filter((inquiry) => {
    const matchesQuery = !query || [inquiry.name, inquiry.phone, inquiry.project_location, inquiry.district, inquiry.area_name, inquiry.email, inquiry.service, inquiry.message].filter(Boolean).some((value) => value!.toLowerCase().includes(query));
    const matchesStatus = filters.status === "all" || inquiry.status === filters.status;
    const matchesService = filters.service === "all" || inquiry.service === filters.service;
    const matchesDistrict = !filters.district || inquiry.district === filters.district;
    return matchesQuery && matchesStatus && matchesService && matchesDistrict;
  });
}
