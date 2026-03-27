import { useState } from "react";
import styles from "./styles.module.css";

export default function CollapsibleCard({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <details className={styles.card} open={isOpen}>
      <summary
        className={`${styles.summary} ${isOpen ? styles.summaryOpen : ""}`}
        onClick={(e) => e.preventDefault()}
      >
        <span>{title}</span>
        <a
          className={styles.toggle}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? "[hide]" : "[show]"}
        </a>
      </summary>
      {children}
    </details>
  );
}
