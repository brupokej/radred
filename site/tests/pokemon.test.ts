import { describe, expect, it } from "vitest";
import { changePokemon } from "../src/utils/pokemon";

describe("changePokemon", () => {
  describe("move highlighting", () => {
    it("highlights only net-new moves, not moves that shift position", () => {
      // Houndour's original moveset has Incinerate in slot 0.
      // The update puts Dark Pulse in slot 0 and shifts Incinerate to slot 1.
      // Only Dark Pulse should be highlighted — Incinerate was already known.
      const pokemon = {
        base: {
          name: "Houndour",
          level: 16,
          moves: ["Incinerate", "Leer", "Snarl", "Sucker Punch"],
        },
      };

      const result = changePokemon(pokemon, {
        name: "Houndoom",
        moves: ["Dark Pulse", "Incinerate", "Leer", "Sucker Punch"],
      });

      expect(result).toEqual({
        base: {
          name: "Houndour",
          level: 16,
          moves: ["Incinerate", "Leer", "Snarl", "Sucker Punch"],
        },
        update: {
          name: "Houndoom",
          moves: ["Dark Pulse", "Incinerate", "Leer", "Sucker Punch"],
        },
      });
    });
  });
});
