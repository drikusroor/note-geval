import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkWikiLink from "remark-wiki-link";
import { unified } from "unified";

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkWikiLink, {
      hrefTemplate: (permalink: string) => `/notes/${permalink}`,
      aliasDivider: "|",
    })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
