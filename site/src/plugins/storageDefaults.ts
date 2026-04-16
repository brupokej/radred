import { STORAGE_DEFAULTS } from "../utils/storageDefaults";

export default function storageDefaultsPlugin() {
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
}
