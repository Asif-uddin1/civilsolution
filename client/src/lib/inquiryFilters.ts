import type { Inquiry, InquiryStatus } from "@/lib/supabase";

export type InquiryFilters = { query: string; status: "all" | InquiryStatus; service: string; area?: string };

export function filterInquiries(inquiries: Inquiry[], filters: InquiryFilters) {
  const query = filters.query.trim().toLowerCase();
  return inquiries.filter((inquiry) => {
    const matchesQuery = !query || [inquiry.name, inquiry.phone, inquiry.project_location, inquiry.email, inquiry.service, inquiry.message].filter(Boolean).some((value) => value!.toLowerCase().includes(query));
    const matchesStatus = filters.status === "all" || inquiry.status === filters.status;
    const matchesService = filters.service === "all" || inquiry.service === filters.service;
    const matchesArea = !filters.area || inquiry.project_location === filters.area;
    return matchesQuery && matchesStatus && matchesService && matchesArea;
  });
}
