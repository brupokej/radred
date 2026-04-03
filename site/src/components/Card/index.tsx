import { useState } from "react";
import styles from "./styles.module.css";

export default function Card({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={styles.cardContainer}>
      <details className={styles.card} open={isOpen}>
        <summary
          className={`${styles.summary} ${isOpen ? styles.summaryOpen : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          <span>{title}</span>
          <span className={styles.chevron}>{isOpen ? "−" : "+"}</span>
        </summary>
        {children}
      </details>
    </div>
  );
}
