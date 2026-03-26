import styles from "./styles.module.css";

const SPRITE_BASE = "https://raw.githubusercontent.com/Autumnchi/coloured-home-sprites/main";

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

interface PokemonTeamProps {
  team: Pokemon[];
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className={styles.card}>
      <img
        src={`${SPRITE_BASE}/${pokemon.sprite}.png`}
        alt={pokemon.name}
        className={styles.sprite}
      />
      <div className={styles.name}>{pokemon.name}</div>
      <div className={styles.level}>{pokemon.level}</div>
      <div className={styles.detail}>{pokemon.nature}</div>
      <div className={styles.detail}>{pokemon.ability}</div>
      <div className={styles.detail}>{pokemon.item}</div>
      <div className={styles.divider} />
      <div className={styles.move}>{pokemon.move1}</div>
      <div className={styles.move}>{pokemon.move2}</div>
      <div className={styles.move}>{pokemon.move3}</div>
      <div className={styles.move}>{pokemon.move4}</div>
    </div>
  );
}

export default function PokemonTeam({ team }: PokemonTeamProps) {
  return (
    <div className={styles.grid}>
      {team.map((pokemon, i) => (
        <PokemonCard key={i} pokemon={pokemon} />
      ))}
    </div>
  );
}
