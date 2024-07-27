export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://imagify.pages.dev/sitemap.xml",
  };
}
