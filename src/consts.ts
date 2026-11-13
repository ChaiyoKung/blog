// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "ChaiyoKung Blog";
export const SITE_DESCRIPTION = "Welcome to my blog!";

/** Use the env value. Fall back to the default when it is missing or empty. */
function envOrDefault(value: string | undefined, fallback: string): string {
  return value?.trim() || fallback;
}

/**
 * Giscus comments use GitHub Discussions.
 * The defaults are the IDs of this blog. They are public, not secret.
 * Set the `PUBLIC_GISCUS_*` env vars to use another repo.
 * Get the IDs from https://giscus.app.
 */
export const GISCUS = {
  repo: envOrDefault(import.meta.env.PUBLIC_GISCUS_REPO, "ChaiyoKung/blog"),
  repoId: envOrDefault(import.meta.env.PUBLIC_GISCUS_REPO_ID, "R_kgDOOKEX3Q"),
  category: envOrDefault(import.meta.env.PUBLIC_GISCUS_CATEGORY, "Comments"),
  categoryId: envOrDefault(
    import.meta.env.PUBLIC_GISCUS_CATEGORY_ID,
    "DIC_kwDOOKEX3c4DLDBb"
  ),
} as const;
