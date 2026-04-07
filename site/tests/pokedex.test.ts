import { describe, expect, it } from "vitest";
import { getHp, pokedex } from "../src/utils/pokedex";

describe("pokedex", () => {
  it("has data", () => {
    expect(pokedex["Litten"]).toEqual({
      atk: 65,
      def: 40,
      hp: 45,
      spa: 60,
      spd: 40,
      spe: 70,
    });
  });
});

describe("getHp", () => {
  it("calculates", () => {
    const pokemon = { name: "Litten", level: 5 };
    expect(getHp(pokemon)).toEqual(21);
  });
});
