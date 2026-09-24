import { describe, expect, it } from "vitest";

describe("Supabase browser configuration", () => {
  it("reaches the configured REST endpoint with the publishable key", async () => {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return;
    const response = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(403);
  });
});
