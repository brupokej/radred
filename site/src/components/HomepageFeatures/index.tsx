import { useColorMode } from "@docusaurus/theme-common";
import { useStreamMode } from "@site/src/utils/streamMode";
import Heading from "@theme/Heading";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  img: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Step-by-Step Walkthrough",
    img: "feature-team",
    description: (
      <>
        Encounters, teams, and movesets for each important moment in the game. Highlighted&nbsp;text
        shows exactly what to update&nbsp;before&nbsp;moving&nbsp;on.
      </>
    ),
  },
  {
    title: "New Deathless Strategies",
    img: "feature-battle",
    description: (
      <>
        All battle plans are structured for 1DR: one death equals reset. Lines minimize branching
        and risk as much as possible, even during&nbsp;the&nbsp;Elite&nbsp;Four.
      </>
    ),
  },
  {
    title: "Live Stats & Overlays",
    img: "feature-stats",
    description: (
      <>
        Battle appearances and frag counts are tracked automatically throughout the guide. Browse
        full stats on the Team pages or&nbsp;the&nbsp;Twitch&nbsp;overlays.
      </>
    ),
  },
];

function Feature({ title, img, description }: FeatureItem) {
  const { colorMode } = useColorMode();
  const streamActive = useStreamMode();
  const mode = streamActive && colorMode === "dark" ? "stream" : colorMode;
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureContent}>
        <div className={styles.featureImgWrapper}>
          <img src={`/radred/img/${img}-${mode}.png`} alt={title} className={styles.featureImg} />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
