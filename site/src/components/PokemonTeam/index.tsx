import CollapsibleCard from "@site/src/components/CollapsibleCard";
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
}

export default function PokemonTeam({ team }: { team: Pokemon[] }) {
  return (
    <CollapsibleCard title="Team">
      <div className={styles.content}>
        <TeamGrid team={team} />
      </div>
    </CollapsibleCard>
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
  return (
    <div className={styles.card}>
      {pokemon ? (
        <img src={spriteUrl(pokemon.sprite)} alt={pokemon.name} className={styles.sprite} />
      ) : (
        <div className={styles.emptySprite}>✕</div>
      )}
      <div className={styles.name}>{pokemon?.name ?? "-"}</div>
      <div className={styles.level}>{pokemon?.level ?? "-"}</div>
      <div className={styles.divider} />
      <div className={styles.detail}>{pokemon?.nature ?? "-"}</div>
      <div className={styles.detail}>{pokemon?.ability ?? "-"}</div>
      <div className={styles.detail}>{pokemon?.item ?? "-"}</div>
      <div className={styles.divider} />
      <div className={styles.move}>{pokemon?.move1 ?? "-"}</div>
      <div className={styles.move}>{pokemon?.move2 ?? "-"}</div>
      <div className={styles.move}>{pokemon?.move3 ?? "-"}</div>
      <div className={styles.move}>{pokemon?.move4 ?? "-"}</div>
    </div>
  );
}
