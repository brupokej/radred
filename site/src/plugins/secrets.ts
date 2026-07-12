import * as path from "path";

export default function secretsPlugin(context: { siteDir: string }) {
  return {
    name: "secrets-plugin",
    configureWebpack() {
      if (process.env.SECRET_MODE === "true") {
        return {
          resolve: {
            alias: {
              [path.join(context.siteDir, "src/data/guide/clairSecrets") + "$"]: path.join(
                context.siteDir,
                "src/data/guide/clairSecrets.enabled"
              ),
              [path.join(context.siteDir, "src/data/guide/victoryRoadSecrets") + "$"]: path.join(
                context.siteDir,
                "src/data/guide/victoryRoadSecrets.enabled"
              ),
              [path.join(context.siteDir, "src/data/guide/eliteFourSecrets") + "$"]: path.join(
                context.siteDir,
                "src/data/guide/eliteFourSecrets.enabled"
              ),
              [path.join(context.siteDir, "src/data/secretMode") + "$"]: path.join(
                context.siteDir,
                "src/data/secretMode.enabled"
              ),
              [path.join(context.siteDir, "src/data/spriteColors") + "$"]: path.join(
                context.siteDir,
                "src/data/spriteColors.enabled"
              ),
            },
          },
        };
      }
    },
  };
}
