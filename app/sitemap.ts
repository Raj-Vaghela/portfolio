import type { MetadataRoute } from "next"
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.rajvaghela.dev", changeFrequency: "monthly", priority: 1 },
    { url: "https://www.rajvaghela.dev/freelance", changeFrequency: "monthly", priority: 0.8 },
  ]
}
