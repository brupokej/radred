import styles from "./styles.module.css";

export function Note({
  note,
  color = "secondary",
}: {
  note: string[];
  color?: "secondary" | "info" | "warning" | "danger";
}) {
  return (
    <div className={`${styles.note} ${styles[color]}`}>
      {note.map((line, i) => (
        <div key={i} className={styles.line}>
          {line}
        </div>
      ))}
    </div>
  );
}
