import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabasePublishableKey!, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

export type InquiryStatus = "new" | "in_progress" | "closed";

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  project_location: string | null;
  email: string | null;
  service: string | null;
  message: string;
  status: InquiryStatus;
  created_at: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title_en: string;
  title_bn: string;
  excerpt_en: string;
  excerpt_bn: string;
  content_en: string;
  content_bn: string;
  category: string;
  cover_image: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export function isAdminUser(user: { app_metadata?: Record<string, unknown> } | null) {
  return user?.app_metadata?.role === "admin";
}

export function getSupabaseSetupMessage(isBn = false) {
  return isBn
    ? "ফর্ম সংরক্ষণ চালু করতে VITE_SUPABASE_URL এবং VITE_SUPABASE_PUBLISHABLE_KEY সেট করুন।"
    : "Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to enable database-backed inquiries.";
}
