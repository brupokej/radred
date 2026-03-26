import Heading from "@theme/Heading";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Title 1",
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo enim ut nisl lacinia,
        id viverra mauris facilisis.
      </>
    ),
  },
  {
    title: "Title 2",
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        Vestibulum ante felis, consequat ac sagittis eu, imperdiet a erat. Morbi vitae erat eu nibh
        venenatis euismod non vel odio.
      </>
    ),
  },
  {
    title: "Title 3",
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        Maecenas blandit fermentum maximus. Vestibulum volutpat consequat nulla ac porttitor. Cras
        hendrerit ante nisi.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
