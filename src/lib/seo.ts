// Shared SEO helpers for Rise Advisory dynamic routes.

export const SITE_NAME = "Rise Advisory";
export const ORG_NAME = "Rise Advisory";
export const ORG_LOGO = "/logo.png"; // resolved from public/ at runtime

/** Clamp text to a max length on a word boundary, appending an ellipsis. */
export function clamp(input: string, max: number): string {
  const s = (input ?? "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:!\-]+$/, "") + "…";
}

/** Title format: "<page> | Rise Advisory", clamped to 60 chars total. */
export function buildTitle(page: string): string {
  const suffix = ` | ${SITE_NAME}`;
  const budget = 60 - suffix.length;
  return clamp(page, budget) + suffix;
}

/** Description clamped to 155 chars. */
export function buildDescription(text: string): string {
  return clamp(text, 155);
}
