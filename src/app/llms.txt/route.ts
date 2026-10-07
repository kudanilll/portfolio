import { getSiteUrl, socialProfiles } from "@/common/seo-metadata";
import { expertise } from "@/data/expertise";
import { works } from "@/data/works";

// llms.txt (https://llmstxt.org): a plain summary for AI assistants such as
// ChatGPT, Claude and Perplexity. Built from the same data as the page, so it
// stays in sync, and generated once at build time.
export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl();

  const body = `# Achmad Daniel Syahputra

> Creative developer in Bekasi, Indonesia. Builds websites, Android apps and backends with Next.js, GSAP, Flutter and Go, and runs Nielcode, a web and app development agency.

The portfolio is one page at ${siteUrl}/ in English, with an Indonesian version behind the EN/ID switch.

## Selected works

${works.map((work) => `- [${work.title}](${work.href}): ${work.description.en} (${work.category})`).join("\n")}

## Expertise

${expertise.join(", ")}

## Contact

- Email: hello.achmaddaniel@gmail.com
${socialProfiles.map((url) => `- ${url}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
