import { useCopy } from "@/i18n/context";
import { Connector, Diagram, DiagramGroup, DiagramNode, Flow } from "./kit";

// Verified against the SitemapGenerator repository (Controllers/HomeController.cs).
// Note: it reads a single page — it does not crawl a whole site.
// Layout is shared; only the words differ between languages.

const copy = {
  en: {
    title: "From URL to XML",
    description:
      "The user submits a URL and picks an output mode. The server fetches the page with HttpClient and parses it with HtmlAgilityPack. In sitemap mode, every link on the page is resolved to an absolute URL and written as a url entry with loc, lastmod and a priority based on path depth, in the sitemaps.org namespace. In HTML data mode, every element in the page body is written as an Element with its tag name, text and attributes. The XML is shown in the browser or downloaded.",
    formTitle: "Form",
    formSubtitle: "URL + output mode",
    fetchTitle: "Fetch",
    fetchItems: ["Downloads the page's HTML"],
    parseTitle: "Parse",
    parseItems: ["HTML into a document tree"],
    modes: "one of two modes",
    buildGroup: "Build XML",
    sitemapSubtitle: "sitemaps.org schema",
    sitemapItems: [
      "Every <a href> on the page, resolved to an absolute URL",
      "<url> with loc, lastmod and a priority by path depth",
    ],
    htmlTitle: "HTML data",
    htmlSubtitle: "Structured extract",
    htmlItems: ["Every element in <body> as <Element>", "With its tag name, text and attributes"],
    outputTitle: "XML output",
    outputSubtitle: "Shown in the browser or downloaded as a file",
  },
  sv: {
    title: "Från URL till XML",
    description:
      "Användaren skickar in en URL och väljer vilket resultat den vill ha. Servern hämtar sidan med HttpClient och parsar den med HtmlAgilityPack. I sitemap-läget görs varje länk på sidan om till en absolut URL och skrivs som en url-post med loc, lastmod och en prioritet utifrån sökvägens djup, i sitemaps.org-namnrymden. I HTML-dataläget skrivs varje element i sidans body som ett Element med taggnamn, text och attribut. XML:en visas i webbläsaren eller laddas ner.",
    formTitle: "Formulär",
    formSubtitle: "URL + val av resultat",
    fetchTitle: "Hämta",
    fetchItems: ["Laddar ner sidans HTML"],
    parseTitle: "Parsa",
    parseItems: ["HTML till ett dokumentträd"],
    modes: "ett av två lägen",
    buildGroup: "Bygg XML",
    sitemapSubtitle: "sitemaps.org-schemat",
    sitemapItems: [
      "Varje <a href> på sidan, omgjord till en absolut URL",
      "<url> med loc, lastmod och en prioritet utifrån sökvägens djup",
    ],
    htmlTitle: "HTML-data",
    htmlSubtitle: "Strukturerat utdrag",
    htmlItems: ["Varje element i <body> som <Element>", "Med taggnamn, text och attribut"],
    outputTitle: "XML-resultat",
    outputSubtitle: "Visas i webbläsaren eller laddas ner som en fil",
  },
};

export const SitemapPipeline = () => {
  const c = useCopy(copy);
  return (
    <Diagram title={c.title} description={c.description} legend={["client", "server"]}>
      <div className="space-y-1">
        {/* Shared steps */}
        <Flow>
          <DiagramNode kind="client" title={c.formTitle} subtitle={c.formSubtitle} />
          <Connector label="POST" />
          <DiagramNode kind="server" title={c.fetchTitle} subtitle="HttpClient" items={c.fetchItems} />
          <Connector />
          <DiagramNode kind="server" title={c.parseTitle} subtitle="HtmlAgilityPack" items={c.parseItems} />
        </Flow>

        <Connector vertical label={c.modes} />

        <DiagramGroup label={c.buildGroup}>
          <div className="grid gap-3 md:grid-cols-2">
            <DiagramNode kind="server" title="Sitemap" subtitle={c.sitemapSubtitle} items={c.sitemapItems} />
            <DiagramNode kind="server" title={c.htmlTitle} subtitle={c.htmlSubtitle} items={c.htmlItems} />
          </div>
        </DiagramGroup>

        <Connector vertical />

        <DiagramNode kind="client" title={c.outputTitle} subtitle={c.outputSubtitle} />
      </div>
    </Diagram>
  );
};
