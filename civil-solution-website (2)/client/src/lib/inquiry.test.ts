import { describe, expect, it } from "vitest";
import { buildInquiryText, hasRequiredInquiryFields } from "./inquiry";

describe("buildInquiryText", () => {
  it("uses real line breaks for all included fields", () => {
    expect(buildInquiryText({ name: "Asif Uddin", phone: "01642998473", projectLocation: "Chattogram", email: "gameridy48@gmail.com", service: "Soil Test", message: "DDDD" })).toBe("Name: Asif Uddin\nPhone: 01642998473\nProject location: Chattogram\nEmail: gameridy48@gmail.com\nService: Soil Test\nMessage: DDDD");
  });

  it("omits the optional email line when no email is provided", () => {
    expect(buildInquiryText({ name: "Asif Uddin", phone: "01642998473", projectLocation: "Dhaka", message: "DDDD" })).toBe("Name: Asif Uddin\nPhone: 01642998473\nProject location: Dhaka\nMessage: DDDD");
  });
});

describe("hasRequiredInquiryFields", () => {
  it("accepts a complete inquiry", () => {
    expect(hasRequiredInquiryFields({ name: "Asif Uddin", phone: "01642998473", projectLocation: "Chattogram", message: "Please review this site." })).toBe(true);
  });

  it("rejects an empty or whitespace-only message", () => {
    expect(hasRequiredInquiryFields({ name: "Asif Uddin", phone: "01642998473", projectLocation: "Chattogram", message: "" })).toBe(false);
    expect(hasRequiredInquiryFields({ name: "Asif Uddin", phone: "01642998473", projectLocation: "Chattogram", message: "   " })).toBe(false);
    expect(hasRequiredInquiryFields({ name: "Asif Uddin", phone: "01642998473", projectLocation: "   ", message: "Please review this site." })).toBe(false);
  });
});
