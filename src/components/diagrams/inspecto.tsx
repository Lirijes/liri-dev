import { useCopy } from "@/i18n/context";
import { Connector, Diagram, DiagramNode, Flow } from "./kit";

// Verified against the inspecto and inspecto-api repositories: the frontend
// calls supabase.from(...) directly; the API is not called by the frontend.
// The project is paused, so the diagram shows what exists — no next step.
// Layout is shared; only the words differ between languages.

const copy = {
  en: {
    title: "Dashboard and API on one database",
    description:
      "The React dashboard reads and writes data directly in Supabase. The ASP.NET Core Web API is built against the same PostgreSQL database with Entity Framework Core, separately from the dashboard.",
    dashboardTitle: "React dashboard",
    dashboardItems: ["Auth and CRUD through supabase-js"],
    today: "supabase-js",
    supabaseItems: ["Facilities, cases and inspections in one shared schema"],
    apiItems: ["Controllers, DTOs and a service layer", "JWT authentication · Swagger"],
  },
  sv: {
    title: "Dashboard och API mot samma databas",
    description:
      "React-dashboarden läser och skriver data direkt i Supabase. ASP.NET Core Web API:et är byggt mot samma PostgreSQL-databas med Entity Framework Core, separat från dashboarden.",
    dashboardTitle: "React-dashboard",
    dashboardItems: ["Autentisering och CRUD via supabase-js"],
    today: "supabase-js",
    supabaseItems: ["Anläggningar, ärenden och inspektioner i ett gemensamt schema"],
    apiItems: ["Controllers, DTO:er och ett servicelager", "JWT-autentisering · Swagger"],
  },
};

export const InspectoArchitecture = () => {
  const c = useCopy(copy);
  return (
    <Diagram title={c.title} description={c.description} legend={["client", "server", "data"]}>
      <Flow>
        <DiagramNode kind="client" title={c.dashboardTitle} subtitle="TypeScript · Vite" items={c.dashboardItems} />
        <Connector label={c.today} />
        <DiagramNode kind="data" title="Supabase" subtitle="PostgreSQL · Auth" items={c.supabaseItems} />
        <Connector label="EF Core" direction="backward" />
        <DiagramNode kind="server" title="ASP.NET Core Web API" subtitle="C# · EF Core" items={c.apiItems} />
      </Flow>
    </Diagram>
  );
};
