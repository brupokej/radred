import * as path from "path";

export default function secretsPlugin(context: { siteDir: string }) {
  return {
    name: "secrets-plugin",
    configureWebpack() {
      if (process.env.SECRET_MODE === "true") {
        return {
          resolve: {
            alias: {
              [path.join(context.siteDir, "src/data/guide/koga-secrets") + "$"]: path.join(
                context.siteDir,
                "src/data/guide/koga-secrets.enabled"
              ),
              [path.join(context.siteDir, "src/data/guide/blaine-secrets") + "$"]: path.join(
                context.siteDir,
                "src/data/guide/blaine-secrets.enabled"
              ),
              [path.join(context.siteDir, "src/data/secretMode") + "$"]: path.join(
                context.siteDir,
                "src/data/secretMode.enabled"
              ),
            },
          },
        };
      }
    },
  };
}
