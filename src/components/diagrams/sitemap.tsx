import { Connector, Diagram, DiagramGroup, DiagramNode, Flow } from "./kit";

// Verified against the SitemapGenerator repository (Controllers/HomeController.cs).
// Note: it reads a single page — it does not crawl a whole site.

export const SitemapPipeline = () => (
  <Diagram
    title="From URL to XML"
    description="The user submits a URL and picks an output mode. The server fetches the page with HttpClient and parses it with HtmlAgilityPack. In sitemap mode, every link on the page is resolved to an absolute URL and written as a url entry with loc, lastmod and a priority based on path depth, in the sitemaps.org namespace. In HTML data mode, every element in the page body is written as an Element with its tag name, text and attributes. The XML is shown in the browser or downloaded."
    legend={["client", "server"]}
  >
    <div className="space-y-1">
      {/* Shared steps */}
      <Flow>
        <DiagramNode kind="client" title="Form" subtitle="URL + output mode" />
        <Connector label="POST" />
        <DiagramNode kind="server" title="Fetch" subtitle="HttpClient" items={["Downloads the page's HTML"]} />
        <Connector />
        <DiagramNode kind="server" title="Parse" subtitle="HtmlAgilityPack" items={["HTML into a document tree"]} />
      </Flow>

      <Connector vertical label="one of two modes" />

      <DiagramGroup label="Build XML">
        <div className="grid gap-3 md:grid-cols-2">
          <DiagramNode
            kind="server"
            title="Sitemap"
            subtitle="sitemaps.org schema"
            items={[
              "Every <a href> on the page, resolved to an absolute URL",
              "<url> with loc, lastmod and a priority by path depth",
            ]}
          />
          <DiagramNode
            kind="server"
            title="HTML data"
            subtitle="Structured extract"
            items={["Every element in <body> as <Element>", "With its tag name, text and attributes"]}
          />
        </div>
      </DiagramGroup>

      <Connector vertical />

      <DiagramNode kind="client" title="XML output" subtitle="Shown in the browser or downloaded as a file" />
    </div>
  </Diagram>
);
