import { describe, expect, it } from "vitest";
import { getBox, resolveBox } from "../src/utils/box";

const _litten = {
  name: "Litten",
  level: "5",
  ability: "Blaze",
  moves: ["Ember", "Growl", "Scratch"],
};

const _dreepy = {
  name: "Dreepy",
  level: "30",
  moves: ["Astonish", "Bite", "Infestation", "Quick Attack"],
};

describe("getBox", () => {
  it("adds", () => {
    const box1 = getBox({ add: [_litten] });
    expect(box1).toEqual({
      base: { pokemon: [] },
      updates: [{ pokemon: [{ ..._litten, boxOrder: 0 }] }],
    });
    const resolvedBox1 = resolveBox(box1);
    expect(resolvedBox1).toEqual({
      pokemon: [{ base: { ..._litten, boxOrder: 0 } }],
    });
  });

  it("renames", () => {
    const _torracat = {
      name: "Torracat",
      level: 16,
      moves: ["Fake Out", "Double Kick", "Fire Fang", "Leer"],
    };
    const box1 = { base: { pokemon: [{ base: { ..._litten, boxOrder: 0 } }] } };
    const box2 = getBox({ box: box1, update: { Litten: _torracat } });
    expect(box2).toEqual({
      base: box1.base,
      updates: [{ pokemon: [_torracat], renames: { Litten: "Torracat" } }],
    });
    const resolvedBox2 = resolveBox(box2);
    expect(resolvedBox2).toEqual({
      pokemon: [
        {
          base: { ..._litten, boxOrder: 0 },
          update: _torracat,
        },
      ],
      renames: { Litten: "Torracat" },
    });
  });

  it("multiple updates", () => {
    const _drakloak = { name: "Drakloak" };
    const _dragapult = {
      name: "Dragapult",
      moves: ["Astonish", "Dragon Darts", "Infestation", "Quick Attack"],
    };
    const box1 = { base: { pokemon: [{ base: { ..._dreepy, boxOrder: 0 } }] } };
    const box2 = getBox({
      box: box1,
      cap: 68,
      update: [{ Dreepy: _drakloak }, { Drakloak: _dragapult }],
    });
    expect(box2).toEqual({
      base: box1.base,
      updates: [
        { cap: { level: 68 } },
        { pokemon: [_drakloak], renames: { Dreepy: "Drakloak" } },
        { pokemon: [_dragapult], renames: { Drakloak: "Dragapult" } },
      ],
    });
    const resolvedBox2 = resolveBox(box2);
    expect(resolvedBox2).toEqual({
      pokemon: [
        {
          base: { ..._dreepy, boxOrder: 0 },
          update: { ...{ level: 68 }, ..._drakloak, ..._dragapult },
        },
      ],
      renames: { Dreepy: "Drakloak", Drakloak: "Dragapult" },
    });
  });

  it("excludes from cap", () => {
    const box1 = {
      base: {
        pokemon: [{ base: { ..._litten, boxOrder: 0 } }, { base: { ..._dreepy, boxOrder: 1 } }],
      },
    };
    const box2 = getBox({
      box: box1,
      cap: { level: 68, exclude: ["Litten"] },
    });
    expect(box2).toEqual({
      base: box1.base,
      updates: [{ cap: { level: 68, exclude: ["Litten"] } }],
    });
    const resolvedBox2 = resolveBox(box2);
    expect(resolvedBox2).toEqual({
      pokemon: [
        {
          base: { ..._litten, boxOrder: 0 },
        },
        {
          base: { ..._dreepy, boxOrder: 1 },
          update: { level: 68 },
        },
      ],
    });
  });

  it("removes", () => {
    const box1 = {
      base: {
        pokemon: [{ base: { ..._litten, boxOrder: 0 } }, { base: { ..._dreepy, boxOrder: 1 } }],
      },
    };
    const box2 = getBox({
      box: box1,
      remove: ["Litten"],
    });
    expect(box2).toEqual({
      base: box1.base,
      updates: [{ removed: ["Litten"] }],
    });
    const resolvedBox2 = resolveBox(box2);
    expect(resolvedBox2).toEqual({
      pokemon: [
        {
          base: { ..._litten, boxOrder: 0 },
        },
        {
          base: { ..._dreepy, boxOrder: 1 },
        },
      ],
      removed: ["Litten"],
    });
  });

  it("sets team", () => {
    const box1 = {
      base: {
        pokemon: [{ base: { ..._litten, boxOrder: 0 } }, { base: { ..._dreepy, boxOrder: 1 } }],
      },
    };
    const box2 = getBox({
      box: box1,
      team: ["Litten"],
      extraTeam: ["Dreepy"],
    });
    expect(box2).toEqual({ base: { ...box1.base, team: ["Litten"], extraTeam: ["Dreepy"] } });
    const resolvedBox2 = resolveBox(box2);
    expect(resolvedBox2).toEqual({ ...box1.base, team: ["Litten"], extraTeam: ["Dreepy"] });
  });
});
