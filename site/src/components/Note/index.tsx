import styles from "./styles.module.css";

export function Note({
  note,
  variant = "secondary",
}: {
  note: string[];
  variant?: "secondary" | "info" | "warning" | "danger";
}) {
  return (
    <div className={`${styles.note} ${styles[variant]}`}>
      {note.map((line, i) => (
        <div key={i} className={styles.line}>
          {line}
        </div>
      ))}
    </div>
  );
}
