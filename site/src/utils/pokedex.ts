const DATA_URL = "https://raw.githubusercontent.com/JwowSquared/Radical-Red-Pokedex/master/data.js";

let _cached: Map<string, number[]> | null = null;
let _promise: Promise<Map<string, number[]>> | null = null;

function buildMap(raw: string): Map<string, number[]> {
  const sanitized = raw
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/\bNone\b/g, "null");
  // eslint-disable-next-line no-eval
  const data = eval("(" + sanitized + ")") as {
    species: Record<number, { key: string; stats: number[] }>;
  };
  const map = new Map<string, number[]>();
  for (const entry of Object.values(data.species)) {
    if (entry.key && entry.stats) {
      map.set(entry.key.toLowerCase(), entry.stats);
    }
  }
  return map;
}

export function calcMaxHp(baseHp: number, level: number): number {
  return Math.floor(((2 * baseHp + 31) * level) / 100) + level + 10;
}

export function fetchPokedex(): Promise<Map<string, number[]>> {
  if (_cached) return Promise.resolve(_cached);
  if (!_promise) {
    _promise = fetch(DATA_URL)
      .then((r) => r.text())
      .then((text) => {
        _cached = buildMap(text);
        return _cached;
      });
  }
  return _promise;
}
