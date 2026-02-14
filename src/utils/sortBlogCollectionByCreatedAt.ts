import type { CollectionEntry } from "astro:content";

export function sortBlogCollectionByCreatedAt(
  all: CollectionEntry<"blog">[],
  order: "asc" | "desc" = "asc"
): CollectionEntry<"blog">[] {
  return all.sort((a, b) => {
    const aValue = a.data.createdAt.valueOf();
    const bValue = b.data.createdAt.valueOf();

    if (order === "asc") {
      return aValue - bValue;
    }

    return bValue - aValue;
  });
}
