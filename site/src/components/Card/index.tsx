import styles from "./styles.module.css";

export default function Card({
  title,
  children,
  className,
  halfCard,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  halfCard?: boolean;
}) {
  return (
    <div className={`${styles.cardContainer}${halfCard ? ` ${styles.halfCard}` : ""}${className ? ` ${className}` : ""}`}>
      <div className={styles.card} data-card>
        <div className={styles.header} data-card-title>{title}</div>
        {children}
      </div>
    </div>
  );
}
