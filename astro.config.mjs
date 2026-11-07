// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.chaiyokung.com",
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "th",
        locales: { th: "th-TH", en: "en-US" },
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],

  i18n: {
    defaultLocale: "th",
    locales: ["th", "en"],
    routing: {
      // Thai is the main language, so its URLs stay the same (no `/th` prefix).
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
