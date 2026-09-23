import { describe, expect, it } from "vitest";
import { buildShareLinks } from "./share";

describe("buildShareLinks", () => {
  it("encodes the website URL for Facebook sharing", () => {
    const links = buildShareLinks("https://civilsolutionbd.com/services/soil-test?from=home", "Civil Solution");
    expect(links.facebook).toContain("https://www.facebook.com/sharer/sharer.php?u=");
    expect(decodeURIComponent(links.facebook)).toContain("civilsolutionbd.com/services/soil-test?from=home");
  });

  it("encodes the message and URL for WhatsApp sharing", () => {
    const links = buildShareLinks("https://civilsolutionbd.com", "Civil Solution — Engineering support");
    expect(decodeURIComponent(links.whatsapp)).toBe("https://wa.me/?text=Civil Solution — Engineering support — https://civilsolutionbd.com");
  });
});
