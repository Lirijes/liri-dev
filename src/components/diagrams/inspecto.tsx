import { useCopy } from "@/i18n/context";
import { Connector, Diagram, DiagramNode, Flow } from "./kit";

// Verified against the inspecto and inspecto-api repositories: the frontend
// calls supabase.from(...) directly; the API is not called by the frontend yet.
// Layout is shared; only the words differ between languages.

const copy = {
  en: {
    title: "Current architecture and next step",
    description:
      "Today the React dashboard reads and writes data directly in Supabase. The ASP.NET Core Web API is built against the same PostgreSQL database with Entity Framework Core, but the dashboard doesn't call it yet. The planned next step is for the dashboard to go through the API.",
    dashboardTitle: "React dashboard",
    dashboardItems: ["Auth and CRUD through supabase-js"],
    today: "today",
    supabaseItems: ["Facilities, cases and inspections in one shared schema"],
    apiItems: ["Controllers, DTOs and a service layer", "JWT authentication · Swagger"],
    nextTitle: "Next step: the dashboard calls the API instead of the database",
    nextSubtitle: "Validation and business rules in one place",
  },
  sv: {
    title: "Nuvarande arkitektur och nästa steg",
    description:
      "I dag läser och skriver React-dashboarden data direkt i Supabase. ASP.NET Core Web API:et är byggt mot samma PostgreSQL-databas med Entity Framework Core, men dashboarden anropar det inte än. Nästa planerade steg är att dashboarden går via API:et.",
    dashboardTitle: "React-dashboard",
    dashboardItems: ["Autentisering och CRUD via supabase-js"],
    today: "i dag",
    supabaseItems: ["Anläggningar, ärenden och inspektioner i ett gemensamt schema"],
    apiItems: ["Controllers, DTO:er och ett servicelager", "JWT-autentisering · Swagger"],
    nextTitle: "Nästa steg: dashboarden anropar API:et i stället för databasen",
    nextSubtitle: "Validering och affärsregler på ett ställe",
  },
};

export const InspectoArchitecture = () => {
  const c = useCopy(copy);
  return (
    <Diagram title={c.title} description={c.description} legend={["client", "server", "data", "planned"]}>
      <div className="space-y-4">
        <Flow>
          <DiagramNode kind="client" title={c.dashboardTitle} subtitle="TypeScript · Vite" items={c.dashboardItems} />
          <Connector label={c.today} />
          <DiagramNode kind="data" title="Supabase" subtitle="PostgreSQL · Auth" items={c.supabaseItems} />
          <Connector label="EF Core" direction="backward" />
          <DiagramNode kind="server" title="ASP.NET Core Web API" subtitle="C# · EF Core" items={c.apiItems} />
        </Flow>
        <DiagramNode kind="planned" title={c.nextTitle} subtitle={c.nextSubtitle} />
      </div>
    </Diagram>
  );
};
