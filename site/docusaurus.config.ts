import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import overlayServerPlugin from "./src/plugins/overlayServer";
import secretsPlugin from "./src/plugins/secrets";
import storageDefaultsPlugin from "./src/plugins/storageDefaults";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  plugins: [
    overlayServerPlugin,
    storageDefaultsPlugin,
    secretsPlugin,
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "data",
        path: "data",
        routeBasePath: "data",
        sidebarPath: "./sidebars.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "overlay",
        path: "overlay",
        routeBasePath: "overlay",
        sidebarPath: "./sidebars.ts",
      },
    ],
  ],
  title: "Radical Red Handbook",
  tagline: "How to nuzlocke Radical Red 4.1 on hardcore mode.",
  favicon: "img/favicon.ico",
  future: {
    v4: true,
  },
  url: "https://brupokej.github.io",
  baseUrl: "/radred/",
  organizationName: "brupokej",
  projectName: "radred",
  trailingSlash: true,
  onBrokenLinks: "throw",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  headTags: [
    {
      tagName: "meta",
      attributes: {
        name: "google-site-verification",
        content: "yJOMihHl0ttkdji_qrdOfBFnHbzIHC0WyTGp-i2GqY0",
      },
    },
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          path: "guide",
          routeBasePath: "guide",
          sidebarPath: "./sidebars.ts",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
        pages: process.env.NODE_ENV !== "development" ? { exclude: ["**/attribution.tsx"] } : {},
        theme: {
          customCss:
            process.env.NODE_ENV === "development"
              ? ["./src/css/custom.css", "./src/css/dev.css"]
              : "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        docsRouteBasePath: ["guide"],
        docsDir: ["guide"],
        indexBlog: false,
      },
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
          label: "Guide",
        },
        {
          type: "docSidebar",
          sidebarId: "dataSidebar",
          docsPluginId: "data",
          position: "left",
          label: "Data",
        },
        {
          type: "docSidebar",
          sidebarId: "overlaySidebar",
          docsPluginId: "overlay",
          position: "left",
          label: "Overlay",
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Guide",
              to: "/guide/brock",
            },
            {
              label: "Data",
              to: "/data/box",
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
              label: "Overlay",
              href: "/overlay/background",
            },
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
