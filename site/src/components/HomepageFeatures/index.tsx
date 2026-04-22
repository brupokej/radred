import { useColorMode } from "@docusaurus/theme-common";
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
    title: "Turn-by-Turn Walkthrough",
    img: "feature-team",
    description: (
      <>
        Catches, box changes, and exact movesets for every fight from Brock to the Elite Four. Each
        section covers the full route to the next badge with nothing left to improvise.
      </>
    ),
  },
  {
    title: "New Deathless Strategies",
    img: "feature-battle",
    description: (
      <>
        All battle plans are built for 1DR: one death equals reset. Every line is built to minimize
        branching and keep risk as low as possible, even in the Elite Four.
      </>
    ),
  },
  {
    title: "Live Stats & Overlays",
    img: "feature-stats",
    description: (
      <>
        Battle appearances and frags are automatically tracked throughout the guide. Browse the full
        stats in the Team page or on the Twitch stream overlays.
      </>
    ),
  },
];

function Feature({ title, img, description }: FeatureItem) {
  const { colorMode } = useColorMode();
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureContent}>
        <div className={styles.featureImgWrapper}>
          <img src={`/radred/img/${img}-${colorMode}.png`} alt={title} className={styles.featureImg} />
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
