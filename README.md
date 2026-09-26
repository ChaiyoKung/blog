# Blog

This is my personal blog. Most posts are Thai tutorials from my daily work and hobbies, with step-by-step screenshots.

Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and [Bun](https://bun.sh).

## Getting Started

Install [Bun](https://bun.sh) first, then:

```sh
bun install
cp .env.example .env
```

| Command              | What it does                              |
| :------------------- | :---------------------------------------- |
| `bun dev`            | Starts the dev server at `localhost:4321` |
| `bun build`          | Builds the production site into `dist/`   |
| `bun preview`        | Previews the build                        |
| `bun run test --run` | Runs the unit tests once                  |

## Writing a New Post

Add a `.md` file to `src/content/blog/`. The file name is the post URL, so `my-post.md` lives at `/blog/my-post/`.

```yaml
---
title: "Post title" # required
description: "Short summary" # required
createdAt: "Jan 22, 2025" # required
updatedAt: "Mar 1, 2025" # optional
heroImage: "/blog/my-post/banner.png" # optional
tags: # optional
  - "Astro"
  - "Bun"
---
```

Put images in `public/blog/<post-name>/`. For the writing style, see `docs/blog-writing-style.md`.

## Credit

Based on the [Astro blog template](https://github.com/withastro/astro/tree/latest/examples/blog), which takes its design from [Bear Blog](https://github.com/HermanMartinus/bearblog/).
