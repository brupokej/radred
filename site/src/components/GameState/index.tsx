import Link from "@docusaurus/Link";
import Card from "@site/src/components/Card";
import GoLiveButton from "@site/src/components/GoLiveButton";
import { Row } from "@site/src/components/Row";
import { Moment } from "@site/src/utils/moments";
import { slugify } from "@site/src/utils/slugify";
import { removeState, useStorageState } from "@site/src/utils/storage";
import { LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";
import styles from "./styles.module.css";

export default function GameState({ moments }: { moments: Moment[] }) {
  const { value: storedMomentLabel, set: setStoredMomentLabel } = useStorageState("live-moment");
  const defaultMoment = moments.find((m) => m.label === LIVE_MOMENT_DEFAULT) ?? moments[0];
  const moment = moments.find((m) => m.label === storedMomentLabel) ?? defaultMoment;
  const guidePath = `/guide/${moment.split.toLowerCase()}#${slugify(moment.label)}`;

  const dropdownOptions = moments
    .filter((m) => {
      return (
        m.kind === "encounter" ||
        m.kind === "battle" ||
        m.kind === "switchBattle" ||
        m.label === moment.label
      );
    })
    .map((m) => m.label);

  function handleMomentChange(v: string) {
    if (v === LIVE_MOMENT_DEFAULT) removeState("live-moment");
    else setStoredMomentLabel(v);
  }

  return (
    <>
      <GoLiveButton moment={moment} />
      <Card title="Game State">
        <Row
          row={[
            "Moment:",
            {
              dropdown: {
                value: moment.label,
                options: dropdownOptions,
                onChange: handleMomentChange,
              },
            },
          ]}
        />
        {guidePath && (
          <Link to={guidePath} className={styles.guideLink}>
            Jump to moment in Guide →
          </Link>
        )}
      </Card>
    </>
  );
}
