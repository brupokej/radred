import Heading from "@theme/Heading";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const LogoIcon = require("@site/static/img/logo.svg").default;

const FeatureList: FeatureItem[] = [
  {
    title: "New Deathless Strategies",
    description: (
      <>
        All battle plans are built for 1DR: one death equals reset. Every line is built to minimize
        branching and keep risk as low as possible, even in the Elite Four.
      </>
    ),
  },
  {
    title: "Live Stats & Overlays",
    description: (
      <>
        Frags and battle appearances are automatically tracked throughout the guide. Browse the full
        stats in the Team sheet or on the Twitch stream overlays.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">
        <div className={styles.featureSvg}>
          <LogoIcon className={styles.featureSvg} role="img" />
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
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
