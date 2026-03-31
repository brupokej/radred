import Card from "@site/src/components/Card";
import { spriteUrl } from "@site/src/utils/sprites";
import styles from "./styles.module.css";

export interface Pokemon {
  sprite: string;
  name: string;
  level: number;
  nature: string;
  ability: string;
  item: string;
  move1: string;
  move2: string;
  move3: string;
  move4: string;
  hp: number;
  warnings?: string[];
}

export default function Team({ team, title = "Team" }: { team: Pokemon[]; title?: string }) {
  return (
    <Card title={title}>
      <div className={styles.content}>
        <TeamGrid team={team} />
      </div>
    </Card>
  );
}

function TeamGrid({ team }: { team: Pokemon[] }) {
  const slots = Array.from({ length: 6 }, (_, i) => team[i] ?? null);
  return (
    <div className={styles.grid}>
      {slots.map((pokemon, i) => (
        <PokemonCard key={i} pokemon={pokemon} />
      ))}
    </div>
  );
}

function PokemonCard({ pokemon }: { pokemon: Pokemon | null }) {
  const warn = new Set(pokemon?.warnings ?? []);
  const wc = (field: string) => (warn.has(field) ? styles.fieldWarning : "");

  return (
    <div className={`${styles.card} ${!pokemon ? styles.cardEmpty : ""}`}>
      {pokemon ? (
        <img src={spriteUrl(pokemon.sprite)} alt={pokemon.name} className={styles.sprite} />
      ) : (
        <div className={styles.emptySprite}>✕</div>
      )}
      <div className={`${styles.name} ${wc("name")}`}>{pokemon?.name ?? "-"}</div>
      <div className={`${styles.level} ${wc("level")}`}>{pokemon?.level ?? "-"}</div>
      <div className={styles.divider} />
      <div className={`${styles.detail} ${wc("nature")}`}>{pokemon?.nature ?? "-"}</div>
      <div className={`${styles.detail} ${wc("ability")}`}>{pokemon?.ability ?? "-"}</div>
      <div className={`${styles.detail} ${wc("item")}`}>{pokemon?.item ?? "-"}</div>
      <div className={styles.divider} />
      <div className={`${styles.move} ${wc("move1")}`}>{pokemon?.move1 ?? "-"}</div>
      <div className={`${styles.move} ${wc("move2")}`}>{pokemon?.move2 ?? "-"}</div>
      <div className={`${styles.move} ${wc("move3")}`}>{pokemon?.move3 ?? "-"}</div>
      <div className={`${styles.move} ${wc("move4")}`}>{pokemon?.move4 ?? "-"}</div>
    </div>
  );
}
