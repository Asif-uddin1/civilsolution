import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import projectsCatalog from "./projects.json";
import servicesCatalog from "./services.json";

const assetReferenceExists = (imagePath: string) => imagePath.startsWith("/manus-storage/") || existsSync(resolve(process.cwd(), "client/public", imagePath.slice(1)));

describe("bilingual content catalogs", () => {
  it("provides English and Bengali fields for every service", () => {
    expect(servicesCatalog.services).toHaveLength(13);
    expect(new Set(servicesCatalog.services.map((service) => service.slug)).size).toBe(13);
    expect(new Set(servicesCatalog.services.map((service) => service.image)).size).toBeGreaterThanOrEqual(12);

    for (const service of servicesCatalog.services) {
      expect(service.title.trim()).not.toBe("");
      expect(service.bnTitle.trim()).not.toBe("");
      expect(service.body.trim()).not.toBe("");
      expect(service.bnBody.trim()).not.toBe("");
      expect(service.altEn.trim()).not.toBe("");
      expect(service.altBn.trim()).not.toBe("");
      expect(service.slug.trim()).not.toBe("");
      expect(assetReferenceExists(service.image)).toBe(true);
    }
  });

  it("keeps Bangladesh-context survey imagery clearly attributed", () => {
    const digitalSurvey = servicesCatalog.services.find((service) => service.slug === "digital-land-survey");
    const soilInvestigation = servicesCatalog.services.find((service) => service.slug === "soil-investigation");
    expect(digitalSurvey?.image).toContain("digital-land-survey-bangladesh-field");
    expect(digitalSurvey?.altEn).toContain("Bangladeshi surveyor");
    expect(digitalSurvey?.license).toContain("Generated visual");
    expect(soilInvestigation?.image).toContain("soil-test-supplied");
    expect(servicesCatalog.services.find((service) => service.slug === "soil-test")).toBeUndefined();
    expect(soilInvestigation?.altEn).toContain("soil testing and investigation");
    expect(soilInvestigation?.credit).toContain("client-supplied anonymized field photo");
  });

  it("provides English and Bengali fields for every project story", () => {
    expect(projectsCatalog.projects.length).toBeGreaterThan(0);

    for (const project of projectsCatalog.projects) {
      expect(project.title.trim()).not.toBe("");
      expect(project.bnTitle.trim()).not.toBe("");
      expect(project.subtitle.trim()).not.toBe("");
      expect(project.bnSubtitle.trim()).not.toBe("");
      expect(project.copy.trim()).not.toBe("");
      expect(project.bnCopy.trim()).not.toBe("");
      expect(project.tag.trim()).not.toBe("");
      expect(project.bnTag.trim()).not.toBe("");
      expect(assetReferenceExists(project.image)).toBe(true);
    }
  });
});
