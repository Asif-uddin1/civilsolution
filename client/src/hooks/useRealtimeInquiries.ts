import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Inquiry, supabase } from "@/lib/supabase";

export function useRealtimeInquiries(onInsert?: (inquiry: Inquiry) => void) {
  const [newInquiryCount, setNewInquiryCount] = useState(0);
  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    const channel = client.channel("admin-inquiry-notifications").on("postgres_changes", { event: "INSERT", schema: "public", table: "inquiries" }, (payload) => {
      const inquiry = payload.new as Inquiry;
      setNewInquiryCount((count) => count + 1);
      onInsert?.(inquiry);
      toast.success(`New inquiry from ${inquiry.name || "a customer"}`, { description: inquiry.service || "A new request needs attention" });
    }).subscribe((status) => {
      if (status === "CHANNEL_ERROR") toast.error("Live inquiry notifications are temporarily unavailable");
    });
    return () => { void client.removeChannel(channel); };
  }, [onInsert]);
  return { newInquiryCount, clearNewInquiryCount: () => setNewInquiryCount(0) };
}
