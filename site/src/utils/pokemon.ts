import { Pokemon } from "@site/src/components/Team";

type MoveKey = "move1" | "move2" | "move3" | "move4";
export const MOVE_KEYS: MoveKey[] = ["move1", "move2", "move3", "move4"];
const WARNING_FIELDS = ["name", "level", "nature", "ability", "item"] as const;

export type PokemonOverrides = Partial<Omit<Pokemon, MoveKey | "previous">> & {
  moves?: (string | null | undefined)[];
};

export function changePokemon(base: Pokemon, overrides: PokemonOverrides = {}): Pokemon {
  const previous: Record<string, unknown> = {};

  const o = overrides as Record<string, unknown>;
  const b = base as Record<string, unknown>;
  for (const field of WARNING_FIELDS) {
    if (o[field] !== undefined && o[field] !== b[field]) {
      previous[field] = b[field];
    }
  }

  const baseMoves = new Set(MOVE_KEYS.map((k) => base[k]).filter((m): m is string => !!m));

  let moveOverrides: Partial<Pick<Pokemon, MoveKey>> | undefined;

  if (overrides.moves !== undefined) {
    moveOverrides = {};
    MOVE_KEYS.forEach((key, i) => {
      const move = overrides.moves![i] ?? null;
      moveOverrides![key] = move;
      if (move && !baseMoves.has(move)) {
        previous[key] = base[key] ?? null;
      }
    });
  }

  const { moves: _moves, ...rest } = overrides;

  return {
    ...base,
    ...rest,
    ...(moveOverrides ?? {}),
    previous: Object.keys(previous).length > 0 ? previous : undefined,
  };
}
