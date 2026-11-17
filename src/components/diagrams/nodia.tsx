import { Connector, Diagram, DiagramGroup, DiagramNode, Flow, Legend, StepFlow } from "./kit";

// Verified against the NodiaApi and nodia repositories (Program.cs,
// CompanyMemberAttribute.cs, migrations, compose.yaml, src/lib/api.ts).

const architectureDescription =
  "The React frontend signs in with Supabase Auth and receives a JWT. It calls the Nodia API with that token. The API verifies the token using Supabase's signing keys, checks company membership and is the only component that reads or writes PostgreSQL. Supabase's own Data API has no access to the tables: Row Level Security is on without policies and privileges are revoked. A planned AI layer — documents and search, RAG, Semantic Kernel with Ollama, agents with tool calling, multi-step workflows and human approval — will sit behind the API.";

export const NodiaArchitecture = ({ compact }: { compact?: boolean }) => {
  if (compact) {
    return (
      <figure className="space-y-3" aria-label="Nodia system architecture">
        <p className="sr-only">{architectureDescription}</p>
        <Flow breakpoint="xl">
          <DiagramNode kind="client" title="Frontend" subtitle="React · TypeScript" />
          <Connector label="JWT" breakpoint="xl" />
          <DiagramNode kind="server" title="Nodia API" subtitle="ASP.NET Core · .NET 10" />
          <Connector label="only path" breakpoint="xl" />
          <DiagramNode kind="data" title="PostgreSQL" subtitle="Supabase · RLS locked" />
        </Flow>
        <DiagramNode
          kind="planned"
          title="AI layer — planned"
          subtitle="Documents, RAG, agents · Semantic Kernel + Ollama"
        />
        <Legend items={["built", "planned"]} />
      </figure>
    );
  }

  return (
    <Diagram
      title="System architecture"
      description={architectureDescription}
      legend={["client", "server", "data", "planned", "blocked"]}
    >
      <div className="space-y-4">
        <Flow breakpoint="xl">
          <DiagramNode kind="external" title="Supabase Auth" subtitle="Sign up · sign in" items={["Issues signed JWTs"]} />
          <Connector label="sign in · JWT" direction="backward" breakpoint="xl" />
          <DiagramNode
            kind="client"
            title="Frontend"
            subtitle="React · TypeScript · Vite"
            items={["Protected routes", "Sends the token with every API call"]}
          />
          <Connector label="/api · Bearer JWT" breakpoint="xl" />
          <DiagramNode
            kind="server"
            title="Nodia API"
            subtitle="ASP.NET Core · .NET 10"
            items={["Verifies the JWT with Supabase's signing keys", "Company membership checks", "EF Core · Swagger"]}
          />
          <Connector label="EF Core · only path" breakpoint="xl" />
          <DiagramNode
            kind="data"
            title="PostgreSQL"
            subtitle="Supabase"
            items={["Companies · memberships", "EF Core migrations"]}
          />
        </Flow>

        <div className="grid gap-3 lg:grid-cols-3">
          <DiagramGroup label="AI layer — planned, behind the API" planned className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
              {[
                "Documents & search",
                "RAG",
                "Semantic Kernel · Ollama",
                "Agents & tool calling",
                "Multi-step workflows",
                "Human approval",
              ].map((item) => (
                <DiagramNode key={item} kind="planned" title={item} />
              ))}
            </div>
          </DiagramGroup>
          <DiagramNode
            kind="blocked"
            title="Supabase Data API"
            subtitle="No access to the tables"
            items={["RLS on, without policies", "Privileges revoked for anon / authenticated, including future tables"]}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          In development, the frontend and API run together in Docker Compose; Supabase is hosted.
        </p>
      </div>
    </Diagram>
  );
};

export const NodiaRequestFlow = () => (
  <Diagram
    title="How a request is authorized"
    description="Every API request goes through the same checks, in this order. A missing, invalid or expired token gives 401. A valid token without a proper user, or an anonymous session, gives 403. On company routes, a non-member gets 404 — the same as for a company that doesn't exist — and a member with too low a role gets 403. Queries are also filtered on the caller's membership."
  >
    <StepFlow
      steps={[
        {
          title: "Request with a Bearer token",
          detail: "The React app sends the Supabase access token with every /api call.",
        },
        {
          title: "Validate the JWT",
          detail: "Signature against Supabase's published keys, plus issuer, audience and lifetime (30 s clock skew).",
          stops: [{ code: "401", label: "missing, invalid or expired token" }],
        },
        {
          title: "Require a real, signed-in user",
          detail:
            "Applies to every endpoint unless it is explicitly marked public. The subject must be a valid user id; anonymous Supabase sessions are rejected.",
          stops: [{ code: "403", label: "anonymous session or invalid subject" }],
        },
        {
          title: "Check company membership",
          detail: "On routes with {companyId}, a filter looks up the caller's role in that company.",
          stops: [
            { code: "404", label: "not a member — same as a company that doesn't exist" },
            { code: "403", label: "role too low" },
          ],
        },
        {
          title: "Run a scoped query",
          detail: "The query also filters on the caller's membership, as a second layer behind the filter.",
        },
        { title: "Response", detail: "Only data from companies the user belongs to.", kind: "success" },
      ]}
    />
  </Diagram>
);
