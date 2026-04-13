export function slugify(input: string | number | (string | number)[]): string {
  if (Array.isArray(input)) return input.map(slugify).join("-");
  if (typeof input === "number") return String(input).padStart(2, "0");
  return input
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, "")
    .replace(/\s+/g, "-");
}
