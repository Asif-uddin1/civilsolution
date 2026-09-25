import { describe, expect, it } from "vitest";

describe("Supabase environment", () => {
  it("accepts the configured publishable key at the Auth settings endpoint", async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

    expect(supabaseUrl).toMatch(/^https:\/\//);
    expect(publishableKey).toBeTruthy();

    const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
      headers: {
        apikey: publishableKey!,
        Authorization: `Bearer ${publishableKey}`,
      },
    });

    expect(response.ok).toBe(true);
  });
});
