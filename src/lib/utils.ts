/** Convert a string to a URL-friendly slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Format an integer rupee amount, e.g. 45000 -> "₹45,000". */
export function formatINR(amount: number): string {
  if (!amount || amount <= 0) return "On request";
  return "₹" + amount.toLocaleString("en-IN");
}

/** Format a cost range, e.g. (40000, 60000) -> "₹40,000 – ₹60,000". */
export function formatRange(min: number, max: number): string {
  if (!min && !max) return "On request";
  if (min && max && min !== max) return `${formatINR(min)} – ${formatINR(max)}`;
  return formatINR(min || max);
}

/** Parse a JSON string field that holds an array; returns [] on failure. */
export function parseList<T = string>(value: string | null | undefined): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

/** Turn a textarea (one item per line) into a JSON string array. */
export function linesToJSON(text: string): string {
  const items = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return JSON.stringify(items);
}

/** Turn a JSON string array back into newline-separated text for editing. */
export function jsonToLines(value: string | null | undefined): string {
  return parseList(value).join("\n");
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
