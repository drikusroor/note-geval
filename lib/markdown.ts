import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkWikiLink from "remark-wiki-link";
import { unified } from "unified";

import { resolveInternalLink } from "./utils/links";

export async function markdownToHtml(markdown: string, currentPath = "") {
  const result = await unified()
    .use(remarkParse)
    .use(remarkWikiLink, {
      hrefTemplate: (permalink: string) => {
        const resolved = resolveInternalLink(permalink, currentPath);
        return `/notes/${resolved || permalink}`;
      },
      aliasDivider: "|",
    })
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
