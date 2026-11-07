import rss from "@astrojs/rss";
import { SITE_TITLE } from "../../consts";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { toLocale } from "../../i18n/config";
import { getLocaleStaticPaths } from "../../i18n/staticPaths";
import { useTranslations } from "../../i18n/ui";
import { getBlogSlug, localePath } from "../../i18n/utils";
import { getBlogsByLocale } from "../../utils/getBlogsByLocale";

const parser = new MarkdownIt();

export const getStaticPaths = getLocaleStaticPaths;

export async function GET(context) {
  const locale = toLocale(context.params.locale);
  const t = useTranslations(locale);
  const blogs = await getBlogsByLocale(locale);
  return rss({
    title: SITE_TITLE,
    description: t("site.description"),
    site: context.site,
    trailingSlash: false,
    stylesheet: "/rss/styles.xsl",
    customData: `<language>${locale}</language>`,
    items: blogs.map((blog) => ({
      ...blog.data,
      link: localePath(locale, `blog/${getBlogSlug(blog.id)}/`),
      // Note: this will not process components or JSX expressions in MDX files.
      content: sanitizeHtml(parser.render(blog.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
  });
}
