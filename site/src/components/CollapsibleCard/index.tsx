import { useState } from "react";
import styles from "./styles.module.css";

export default function CollapsibleCard({
  title,
  id,
  children,
}: {
  title: React.ReactNode;
  id?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <details className={styles.card} id={id} open={isOpen}>
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
