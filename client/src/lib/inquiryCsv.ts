import type { Inquiry } from "@/lib/supabase";

function escapeCsv(value: string | null | undefined) {
  const normalized = value ?? "";
  return `"${normalized.replaceAll('"', '""')}"`;
}

export function inquiriesToCsv(inquiries: Inquiry[]) {
  const headers = ["ID", "Name", "Phone", "District", "Area / neighborhood", "Legacy location", "Email", "Service", "Status", "Message", "Created at"];
  const rows = inquiries.map((inquiry) => [
    inquiry.id,
    inquiry.name,
    inquiry.phone,
    inquiry.district,
    inquiry.area_name,
    inquiry.project_location,
    inquiry.email,
    inquiry.service,
    inquiry.status,
    inquiry.message,
    new Date(inquiry.created_at).toISOString(),
  ]);
  return [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\r\n");
}

export function downloadInquiryCsv(inquiries: Inquiry[], filename: string) {
  const blob = new Blob(["\uFEFF", inquiriesToCsv(inquiries)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
