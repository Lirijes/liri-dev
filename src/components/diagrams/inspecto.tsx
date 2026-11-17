import { Connector, Diagram, DiagramNode, Flow } from "./kit";

// Verified against the inspecto and inspecto-api repositories: the frontend
// calls supabase.from(...) directly; the API is not called by the frontend yet.

export const InspectoArchitecture = () => (
  <Diagram
    title="Current architecture and next step"
    description="Today the React dashboard reads and writes data directly in Supabase. The ASP.NET Core Web API is built against the same PostgreSQL database with Entity Framework Core, but the dashboard doesn't call it yet. The planned next step is for the dashboard to go through the API."
    legend={["client", "server", "data", "planned"]}
  >
    <div className="space-y-4">
      <Flow>
        <DiagramNode
          kind="client"
          title="React dashboard"
          subtitle="TypeScript · Vite"
          items={["Auth and CRUD through supabase-js"]}
        />
        <Connector label="today" />
        <DiagramNode
          kind="data"
          title="Supabase"
          subtitle="PostgreSQL · Auth"
          items={["Facilities, cases and inspections in one shared schema"]}
        />
        <Connector label="EF Core" direction="backward" />
        <DiagramNode
          kind="server"
          title="ASP.NET Core Web API"
          subtitle="C# · EF Core"
          items={["Controllers, DTOs and a service layer", "JWT authentication · Swagger"]}
        />
      </Flow>
      <DiagramNode
        kind="planned"
        title="Next step: the dashboard calls the API instead of the database"
        subtitle="Validation and business rules in one place"
      />
    </div>
  </Diagram>
);
