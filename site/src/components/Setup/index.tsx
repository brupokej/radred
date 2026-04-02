import Card from "@site/src/components/Card";
import styles from "./styles.module.css";

export default function Setup({ children }: { children: React.ReactNode }) {
  return (
    <Card title="Game Setup">
      <div className={styles.rows}>{children}</div>
    </Card>
  );
}
