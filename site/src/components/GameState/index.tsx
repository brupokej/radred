import Link from "@docusaurus/Link";
import Card from "@site/src/components/Card";
import GoLiveButton from "@site/src/components/GoLiveButton";
import { Row } from "@site/src/components/Row";
import { secretMode } from "@site/src/data/secretMode";
import { Moment } from "@site/src/utils/moments";
import { slugify } from "@site/src/utils/slugify";
import { removeState, useStorageState } from "@site/src/utils/storage";
import { LIVE_ATTEMPT_DEFAULT, LIVE_MOMENT_DEFAULT } from "@site/src/utils/storageDefaults";
import styles from "./styles.module.css";

export default function GameState({
  attempt: showAttempt,
  moments,
}: {
  attempt?: boolean;
  moments: Moment[];
}) {
  const { value: storedAttempt, set: setStoredAttempt } = useStorageState("live-attempt");
  const { value: storedMomentLabel, set: setStoredMomentLabel } = useStorageState("live-moment");

  const attempt = storedAttempt !== null ? Number(storedAttempt) : LIVE_ATTEMPT_DEFAULT;
  const defaultMoment = moments.find((m) => m.label === LIVE_MOMENT_DEFAULT) ?? moments[0];
  const moment = moments.find((m) => m.label === storedMomentLabel) ?? defaultMoment;
  const guidePath = `/guide/${moment.split.toLowerCase()}#${slugify(moment.label)}`;

  const dropdownOptions = moments
    .filter((m) => {
      if ("secret" in m && m.secret && !secretMode) return false;
      return m.kind === "encounter" || m.kind === "battle" || m.label === moment.label;
    })
    .map((m) => m.label);

  function handleMomentChange(v: string) {
    if (v === LIVE_MOMENT_DEFAULT) removeState("live-moment");
    else setStoredMomentLabel(v);
  }

  function handleAttemptChange(v: string) {
    const n = Number(v) || LIVE_ATTEMPT_DEFAULT;
    if (n === LIVE_ATTEMPT_DEFAULT) removeState("live-attempt");
    else setStoredAttempt(String(n));
  }

  return (
    <>
      <GoLiveButton moment={moment} attempt={showAttempt ? attempt : undefined} />
      <Card title="Game State">
        {showAttempt && (
          <Row
            row={[
              "Attempt:",
              {
                input: {
                  value: String(attempt),
                  validate: (v) =>
                    v === "" || (/^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 99),
                  onChange: handleAttemptChange,
                },
              },
            ]}
          />
        )}
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
