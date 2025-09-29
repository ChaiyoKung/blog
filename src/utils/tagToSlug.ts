/**
 * Converts a tag string to a URL-safe slug.
 * - Lowercases the string
 * - Replaces spaces with hyphens
 * - Removes non-alphanumeric and non-hyphen characters
 * @param tag The raw tag string
 * @returns The normalized slug
 */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
