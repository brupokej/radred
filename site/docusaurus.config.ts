import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import { STORAGE_DEFAULTS } from "./src/utils/storageDefaults";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  plugins: [
    function storageDefaultsPlugin() {
      return {
        name: "storage-defaults-plugin",
        injectHtmlTags() {
          const d = JSON.stringify(STORAGE_DEFAULTS);
          return {
            headTags: [
              {
                tagName: "script",
                innerHTML: `(function(){var d=${d};for(var k in d){if(!localStorage.getItem(k))localStorage.setItem(k,d[k])}})();`,
              },
            ],
          };
        },
      };
    },
  ],
  title: "Radical Red Handbook",
  tagline: "A guide to a nuzlocke of Radical Red 4.1 on hardcore mode.",
  favicon: "img/favicon.ico",
  future: {
    v4: true,
  },
  url: "https://brupokej.github.io",
  baseUrl: "/radred/",
  organizationName: "brupokej",
  projectName: "radred",
  onBrokenLinks: "throw",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          path: "guide",
          routeBasePath: "guide",
          sidebarPath: "./sidebars.ts",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: "img/brupokej-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Radical Red",
      logo: {
        alt: "brupokej logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "guideSidebar",
          position: "left",
          label: "Strategy Guide",
        },
        {
          href: "https://github.com/brupokej/radred",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Strategy Guide",
              to: "/guide/brock",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Twitch",
              href: "https://twitch.tv/brupokej",
            },
            {
              label: "YouTube",
              href: "https://youtube.com/@brupokej",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/brupokej/radred",
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
