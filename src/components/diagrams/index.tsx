import type { DiagramId } from "@/types/project";
import { InspectoArchitecture } from "./inspecto";
import { MinSommarAccess, MinSommarRewards } from "./minsommar";
import { NodiaArchitecture, NodiaRequestFlow } from "./nodia";
import { SitemapPipeline } from "./sitemap";

/**
 * Renders a project diagram by id. `compact` gives a simplified version for
 * project cards; diagrams without one ignore it.
 */
export const ProjectDiagram = ({ id, compact }: { id: DiagramId; compact?: boolean }) => {
  switch (id) {
    case "nodia-architecture":
      return <NodiaArchitecture compact={compact} />;
    case "nodia-request-flow":
      return <NodiaRequestFlow />;
    case "minsommar-access":
      return <MinSommarAccess />;
    case "minsommar-rewards":
      return <MinSommarRewards />;
    case "inspecto-architecture":
      return <InspectoArchitecture />;
    case "sitemap-pipeline":
      return <SitemapPipeline />;
  }
};
