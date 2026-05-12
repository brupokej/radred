import { resolveBox, type Box } from "@site/src/utils/box";
import { resolvePokemon, type PokemonData } from "@site/src/utils/pokemon";

export const CALC_GEN = 9;

export interface CalcSideState {
  species: string;
  level: number;
  nature: string;
  ability: string;
  item: string;
  ivs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  evs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  boosts: { atk: number; def: number; spa: number; spd: number; spe: number };
  status: string;
  curHP: number;
  moves: [string, string, string, string];
}

export const DEFAULT_SIDE: CalcSideState = {
  species: "",
  level: 100,
  nature: "Hardy",
  ability: "",
  item: "",
  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
  evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  status: "",
  curHP: 100,
  moves: ["", "", "", ""],
};

export function pokemonDataToSide(data: PokemonData): CalcSideState {
  const moves = (data.moves ?? []).filter((m): m is string => Boolean(m));
  return {
    species: data.pokedexKey ?? data.name,
    level:
      typeof data.level === "string"
        ? parseInt(data.level) || 100
        : (data.level ?? 100),
    nature: data.nature ?? "Hardy",
    ability: data.ability ?? "",
    item: data.item ?? "",
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...(data.ivs ?? {}) },
    evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...(data.evs ?? {}) },
    boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    status: "",
    curHP: 100,
    moves: [moves[0] ?? "", moves[1] ?? "", moves[2] ?? "", moves[3] ?? ""],
  };
}

export function boxToTeam(box: Box): PokemonData[] {
  const resolved = resolveBox(box);
  const all = resolved.pokemon.map(resolvePokemon);
  const team = resolved.team;
  if (!team?.length) return all;
  return team.map((name) => all.find((p) => p.name === name)).filter(Boolean) as PokemonData[];
}
