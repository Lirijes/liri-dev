import { useCopy } from "@/i18n/context";
import { Connector, Diagram, DiagramGroup, DiagramNode, Flow, Legend, StepFlow, type Step } from "./kit";

// Verified against the NodiaApi and nodia repositories (Program.cs,
// CompanyMemberAttribute.cs, migrations, compose.yaml, src/lib/api.ts).
// Layout is shared; only the words differ between languages.

const architectureCopy = {
  en: {
    description:
      "The React frontend signs in with Supabase Auth and receives a JWT. It calls the Nodia API with that token. The API verifies the token using Supabase's signing keys, checks company membership and is the only component that reads or writes PostgreSQL. Supabase's own Data API has no access to the tables: Row Level Security is on without policies and privileges are revoked. A planned AI layer — documents and search, RAG, Semantic Kernel with Ollama, agents with tool calling, multi-step workflows and human approval — will sit behind the API.",
    figureLabel: "Nodia system architecture",
    compactOnlyPath: "only path",
    compactDataSubtitle: "Supabase · RLS locked",
    compactPlannedTitle: "AI layer — planned",
    compactPlannedSubtitle: "Documents, RAG, agents · Semantic Kernel + Ollama",
    title: "System architecture",
    authSubtitle: "Sign up · sign in",
    authItems: ["Issues signed JWTs"],
    signInJwt: "sign in · JWT",
    frontendItems: ["Protected routes", "Sends the token with every API call"],
    apiItems: ["Verifies the JWT with Supabase's signing keys", "Company membership checks", "EF Core · Swagger"],
    efOnlyPath: "EF Core · only path",
    dataItems: ["Companies · memberships", "EF Core migrations"],
    aiGroup: "AI layer — planned, behind the API",
    aiItems: [
      "Documents & search",
      "RAG",
      "Semantic Kernel · Ollama",
      "Agents & tool calling",
      "Multi-step workflows",
      "Human approval",
    ],
    dataApiSubtitle: "No access to the tables",
    dataApiItems: ["RLS on, without policies", "Privileges revoked for anon / authenticated, including future tables"],
    footnote: "In development, the frontend and API run together in Docker Compose; Supabase is hosted.",
  },
  sv: {
    description:
      "React-frontenden loggar in med Supabase Auth och får en JWT. Den anropar Nodia-API:et med den token. API:et verifierar token med Supabases signeringsnycklar, kontrollerar medlemskapet i företaget och är den enda komponenten som läser från eller skriver till PostgreSQL. Supabases eget Data API har ingen åtkomst till tabellerna: Row Level Security är påslaget utan policies och rättigheterna är återkallade. Ett planerat AI-lager — dokument och sökning, RAG, Semantic Kernel med Ollama, agenter med tool calling, arbetsflöden i flera steg och mänskligt godkännande — kommer att ligga bakom API:et.",
    figureLabel: "Nodias systemarkitektur",
    compactOnlyPath: "enda vägen",
    compactDataSubtitle: "Supabase · låst med RLS",
    compactPlannedTitle: "AI-lager — planerat",
    compactPlannedSubtitle: "Dokument, RAG, agenter · Semantic Kernel + Ollama",
    title: "Systemarkitektur",
    authSubtitle: "Registrering · inloggning",
    authItems: ["Utfärdar signerade JWT:er"],
    signInJwt: "inloggning · JWT",
    frontendItems: ["Skyddade routes", "Skickar token med varje API-anrop"],
    apiItems: ["Verifierar JWT:n med Supabases signerings­nycklar", "Kontroll av medlemskap i företaget", "EF Core · Swagger"],
    efOnlyPath: "EF Core · enda vägen",
    dataItems: ["Företag · medlemskap", "EF Core-migreringar"],
    aiGroup: "AI-lager — planerat, bakom API:et",
    aiItems: [
      "Dokument & sökning",
      "RAG",
      "Semantic Kernel · Ollama",
      "Agenter & tool calling",
      "Arbetsflöden i flera steg",
      "Mänskligt godkännande",
    ],
    dataApiSubtitle: "Ingen åtkomst till tabellerna",
    dataApiItems: [
      "RLS påslaget, utan policies",
      "Rättigheter återkallade för anon / authenticated, även för framtida tabeller",
    ],
    footnote: "Under utveckling körs frontenden och API:et tillsammans i Docker Compose; Supabase är en molntjänst.",
  },
};

export const NodiaArchitecture = ({ compact }: { compact?: boolean }) => {
  const c = useCopy(architectureCopy);

  if (compact) {
    return (
      <figure className="space-y-3" aria-label={c.figureLabel}>
        <p className="sr-only">{c.description}</p>
        <Flow breakpoint="xl">
          <DiagramNode kind="client" title="Frontend" subtitle="React · TypeScript" />
          <Connector label="JWT" breakpoint="xl" />
          <DiagramNode kind="server" title="Nodia API" subtitle="ASP.NET Core · .NET 10" />
          <Connector label={c.compactOnlyPath} breakpoint="xl" />
          <DiagramNode kind="data" title="PostgreSQL" subtitle={c.compactDataSubtitle} />
        </Flow>
        <DiagramNode kind="planned" title={c.compactPlannedTitle} subtitle={c.compactPlannedSubtitle} />
        <Legend items={["built", "planned"]} />
      </figure>
    );
  }

  return (
    <Diagram title={c.title} description={c.description} legend={["client", "server", "data", "planned", "blocked"]}>
      <div className="space-y-4">
        <Flow breakpoint="xl">
          <DiagramNode kind="external" title="Supabase Auth" subtitle={c.authSubtitle} items={c.authItems} />
          <Connector label={c.signInJwt} direction="backward" breakpoint="xl" />
          <DiagramNode kind="client" title="Frontend" subtitle="React · TypeScript · Vite" items={c.frontendItems} />
          <Connector label="/api · Bearer JWT" breakpoint="xl" />
          <DiagramNode kind="server" title="Nodia API" subtitle="ASP.NET Core · .NET 10" items={c.apiItems} />
          <Connector label={c.efOnlyPath} breakpoint="xl" />
          <DiagramNode kind="data" title="PostgreSQL" subtitle="Supabase" items={c.dataItems} />
        </Flow>

        <div className="grid gap-3 lg:grid-cols-3">
          <DiagramGroup label={c.aiGroup} planned className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
              {c.aiItems.map((item) => (
                <DiagramNode key={item} kind="planned" title={item} />
              ))}
            </div>
          </DiagramGroup>
          <DiagramNode kind="blocked" title="Supabase Data API" subtitle={c.dataApiSubtitle} items={c.dataApiItems} />
        </div>

        <p className="text-xs text-muted-foreground">{c.footnote}</p>
      </div>
    </Diagram>
  );
};

const requestFlowCopy: Record<"en" | "sv", { title: string; description: string; steps: Step[] }> = {
  en: {
    title: "How a request is authorized",
    description:
      "Every API request goes through the same checks, in this order. A missing, invalid or expired token gives 401. A valid token without a proper user, or an anonymous session, gives 403. On company routes, a non-member gets 404 — the same as for a company that doesn't exist — and a member with too low a role gets 403. Queries are also filtered on the caller's membership.",
    steps: [
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
    ],
  },
  sv: {
    title: "Så auktoriseras ett anrop",
    description:
      "Varje API-anrop går igenom samma kontroller, i den här ordningen. En token som saknas, är ogiltig eller har gått ut ger 401. En giltig token utan en riktig användare, eller en anonym session, ger 403. På företagsroutes får den som inte är medlem 404 — samma svar som för ett företag som inte finns — och en medlem med för låg roll får 403. Frågorna filtreras dessutom på anroparens medlemskap.",
    steps: [
      {
        title: "Anrop med en Bearer-token",
        detail: "React-appen skickar access token från Supabase med varje anrop till /api.",
      },
      {
        title: "Validera JWT:n",
        detail: "Signaturen mot Supabases publicerade nycklar, plus issuer, audience och giltighetstid (30 s clock skew).",
        stops: [{ code: "401", label: "token saknas, är ogiltig eller har gått ut" }],
      },
      {
        title: "Kräv en riktig, inloggad användare",
        detail:
          "Gäller varje endpoint som inte uttryckligen är markerad som publik. Subject måste vara ett giltigt användar-id; anonyma Supabase-sessioner avvisas.",
        stops: [{ code: "403", label: "anonym session eller ogiltigt subject" }],
      },
      {
        title: "Kontrollera medlemskap i företaget",
        detail: "På routes med {companyId} slår ett filter upp anroparens roll i just det företaget.",
        stops: [
          { code: "404", label: "inte medlem — samma svar som för ett företag som inte finns" },
          { code: "403", label: "för låg roll" },
        ],
      },
      {
        title: "Kör en avgränsad fråga",
        detail: "Frågan filtrerar också på anroparens medlemskap, som ett andra lager bakom filtret.",
      },
      { title: "Svar", detail: "Bara data från företag som användaren tillhör.", kind: "success" },
    ],
  },
};

export const NodiaRequestFlow = () => {
  const c = useCopy(requestFlowCopy);
  return (
    <Diagram title={c.title} description={c.description}>
      <StepFlow steps={c.steps} />
    </Diagram>
  );
};
