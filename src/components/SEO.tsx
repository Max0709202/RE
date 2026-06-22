import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = "Robert Eng | Full Stack Engineer | Max-Dev | Malaysian Developer",
  description = "Robert Eng (Max-Dev) - Experienced Full Stack Engineer based in Malaysia. 12+ years developing robust web applications with React, Node.js, TypeScript, and modern technologies.",
  keywords = "Robert Eng, Eng, Robert, max-dev, max dev, fullstack, fullstack engineer, full stack developer, Malaysian developer, Malaysia developer, React developer, Node.js developer, TypeScript developer, web developer, software engineer, Tottori developer, freelance developer, remote developer",
  image = "https://devplusplus.xyz/og-image.png",
  url = "https://devplusplus.xyz",
  type = "website",
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Primary meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("title", title);

    // Open Graph tags
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", image, "property");
    updateMetaTag("og:url", url, "property");
    updateMetaTag("og:type", type, "property");

    // Twitter tags
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEO;
