import { useState } from "react";
import styles from "./styles.module.css";

export default function Card({
  title,
  children,
  className,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`${styles.cardContainer}${className ? ` ${className}` : ""}`}>
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
