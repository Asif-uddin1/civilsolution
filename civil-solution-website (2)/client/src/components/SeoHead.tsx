import { useEffect } from "react";

type SeoHeadProps = {
  title: string;
  description: string;
  path?: string;
  locale: "en" | "bn";
  keywords?: string[];
  serviceName?: string;
};

const DEFAULT_SITE_NAME = "Civil Solution";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100094222700739";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = url;
}

export default function SeoHead({ title, description, path = "/", locale, keywords = [], serviceName }: SeoHeadProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = new URL(path, origin).toString();
    const pageTitle = title.includes(DEFAULT_SITE_NAME) ? title : `${title} | ${DEFAULT_SITE_NAME}`;
    const keywordText = keywords.join(", ");

    document.title = pageTitle;
    document.documentElement.lang = locale === "bn" ? "bn" : "en";
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywordText);
    setMeta("name", "language", locale === "bn" ? "Bengali" : "English");
    setMeta("property", "og:type", serviceName ? "website" : "website");
    setMeta("property", "og:site_name", DEFAULT_SITE_NAME);
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:locale", locale === "bn" ? "bn_BD" : "en_BD");
    setMeta("property", "og:image", new URL("/favicon.png", origin).toString());
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", description);
    setCanonical(canonicalUrl);

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": `${origin}/#business`,
          name: DEFAULT_SITE_NAME,
          url: origin,
          logo: new URL("/favicon.png", origin).toString(),
          image: new URL("/favicon.png", origin).toString(),
          telephone: "+8801723663908",
          address: {
            "@type": "PostalAddress",
            streetAddress: "A.K. Trade Center, 7 CDA Ave",
            addressLocality: "Chattogram",
            postalCode: "4000",
            addressCountry: "BD",
          },
          areaServed: { "@type": "Country", name: "Bangladesh" },
          sameAs: [FACEBOOK_URL],
          serviceType: "Civil and structural engineering consultancy",
        },
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: origin,
          name: DEFAULT_SITE_NAME,
          inLanguage: locale === "bn" ? "bn-BD" : "en-BD",
          publisher: { "@id": `${origin}/#business` },
        },
        {
          "@type": serviceName ? "Service" : "WebPage",
          "@id": `${canonicalUrl}#page`,
          url: canonicalUrl,
          name: pageTitle,
          description,
          inLanguage: locale === "bn" ? "bn-BD" : "en-BD",
          isPartOf: { "@id": `${origin}/#website` },
          ...(serviceName ? { serviceType: serviceName, provider: { "@id": `${origin}/#business` } } : {}),
        },
      ],
    };

    let schema = document.head.querySelector<HTMLScriptElement>('script[data-civil-solution-schema="true"]');
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.dataset.civilSolutionSchema = "true";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(structuredData);
  }, [description, keywords, locale, path, serviceName, title]);

  return null;
}
