import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type AdminProfile = {
  id: string;
  display_name: string;
  job_title: string;
  phone: string;
  avatar_url: string;
  updated_at: string;
};

export type AdminAuditAction = "login" | "logout" | "profile_updated" | "inquiry_status_updated" | "career_created" | "career_updated" | "career_deleted" | "inquiries_exported";

export type AdminAuditLog = {
  id: string;
  actor_id: string;
  actor_email: string;
  action: AdminAuditAction;
  entity_type: string;
  entity_id: string | null;
  summary: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export async function logAdminEvent(user: Pick<User, "id" | "email"> | { id: string; email?: string } | null, action: AdminAuditAction, summary: string, entityType = "system", entityId: string | null = null, metadata: Record<string, unknown> = {}) {
  if (!supabase || !user) return;
  await supabase.from("admin_audit_logs").insert({ actor_id: user.id, actor_email: user.email ?? "", action, entity_type: entityType, entity_id: entityId, summary, metadata });
}

export function defaultAdminProfile(user: User): Omit<AdminProfile, "updated_at"> {
  return { id: user.id, display_name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Admin", job_title: "Administrator", phone: user.user_metadata?.phone ?? "", avatar_url: user.user_metadata?.avatar_url ?? "" };
}
