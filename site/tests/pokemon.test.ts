import { describe, expect, it } from "vitest";
import { resolvePokemon } from "../src/utils/pokemon";

describe("resolvePokemon", () => {
  it("merges update", () => {
    const pokemon = {
      base: { name: "Litten", level: 5, ability: "Blaze", moves: ["Ember", "Growl", "Scratch"] },
      update: {
        name: "Torracat",
        level: 16,
        moves: ["Fake Out", "Double Kick", "Fire Fang", "Leer"],
      },
    };
    expect(resolvePokemon(pokemon)).toEqual({
      name: "Torracat",
      level: 16,
      ability: "Blaze",
      moves: ["Fake Out", "Double Kick", "Fire Fang", "Leer"],
    });
  });
});
