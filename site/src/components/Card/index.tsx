import { createContext, useContext, useState } from "react";
import styles from "./styles.module.css";

const CardDetailCtx = createContext(false);
export const useCardDetail = () => useContext(CardDetailCtx);

export function CardDetail({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CardDetailCtx.Provider value={isOpen}>
      {children}
      <button className={styles.detailToggle} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.chevron}>{isOpen ? "−" : "+"}</span>
      </button>
    </CardDetailCtx.Provider>
  );
}

export default function Card({
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
  );
}
