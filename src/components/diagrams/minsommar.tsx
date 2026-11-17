import { useCopy } from "@/i18n/context";
import { Connector, Diagram, DiagramGroup, DiagramNode, StepFlow, type Step } from "./kit";

// Verified against the minsommar repository: supabase/migrations
// (strict_rls, multi_parent, reward_redemptions) and
// src/integrations/supabase/family-session.server.ts.
// Layout is shared; only the words differ between languages.

const accessCopy = {
  en: {
    title: "Access model: two ways in, one family scope",
    description:
      "Parents sign in with Supabase Auth. Children have no account: they open a family link, and the server sets a signed, httpOnly cookie containing only the family id. Parents query the database directly through the Supabase client, where a Row Level Security policy based on is_family_member(family_id) protects every family table, and use SECURITY DEFINER functions for invites, reward approvals and member removal. Server functions serve both parents and children: they resolve the family from the parent's verified token and membership, or from the child's signed cookie, and because they use the service role, each one checks the family scope itself.",
    whoGroup: "Who is asking",
    parentTitle: "Parent",
    parentSubtitle: "Supabase account",
    parentItems: ["Signs in and gets a JWT", "Several parents per family: one owner, the rest join by invitation"],
    childTitle: "Child",
    childSubtitle: "No account — family link",
    childItems: [
      "Opens /f/<token>, a revocable link shared by a parent",
      "Gets a signed, httpOnly cookie holding only the family id",
    ],
    resolves: "every request resolves to one family",
    howGroup: "How data is reached",
    clientTitle: "Supabase client under RLS",
    clientSubtitle: "Parents only",
    clientItems: [
      "Policy on every family table: is_family_member(family_id)",
      "SECURITY DEFINER functions for invites, reward approvals and removing members",
    ],
    serverTitle: "Server functions",
    serverSubtitle: "Parents and children · service role",
    serverItems: [
      "Family from the parent's verified token + membership, or the child's signed cookie",
      "Service role bypasses RLS, so every function checks the family scope itself",
    ],
    dbSubtitle: "Every row belongs to a family",
    dbItems: [
      "families · family_members (owner / parent) · family_invites",
      "children · activities · completions · bucket items · rewards · reward redemptions",
    ],
  },
  sv: {
    title: "Behörighetsmodell: två vägar in, en familj i taget",
    description:
      "Föräldrar loggar in med Supabase Auth. Barn har inget konto: de öppnar en familjelänk, och servern sätter en signerad httpOnly-cookie som bara innehåller familjens id. Föräldrar frågar databasen direkt via Supabase-klienten, där en Row Level Security-policy byggd på is_family_member(family_id) skyddar varje familjetabell, och använder SECURITY DEFINER-funktioner för inbjudningar, godkännanden av belöningar och borttagning av medlemmar. Serverfunktionerna betjänar både föräldrar och barn: de tar fram familjen från förälderns verifierade token och medlemskap, eller från barnets signerade cookie, och eftersom de använder service role kontrollerar varje funktion familjeavgränsningen själv.",
    whoGroup: "Vem frågar",
    parentTitle: "Förälder",
    parentSubtitle: "Supabase-konto",
    parentItems: ["Loggar in och får en JWT", "Flera föräldrar per familj: en ägare, övriga går med via inbjudan"],
    childTitle: "Barn",
    childSubtitle: "Inget konto — familjelänk",
    childItems: [
      "Öppnar /f/<token>, en länk som en förälder delar och kan återkalla",
      "Får en signerad httpOnly-cookie som bara innehåller familjens id",
    ],
    resolves: "varje anrop leder till exakt en familj",
    howGroup: "Hur datan nås",
    clientTitle: "Supabase-klienten under RLS",
    clientSubtitle: "Bara föräldrar",
    clientItems: [
      "Policy på varje familjetabell: is_family_member(family_id)",
      "SECURITY DEFINER-funktioner för inbjudningar, godkännanden av belöningar och borttagning av medlemmar",
    ],
    serverTitle: "Serverfunktioner",
    serverSubtitle: "Föräldrar och barn · service role",
    serverItems: [
      "Familjen från förälderns verifierade token + medlemskap, eller från barnets signerade cookie",
      "Service role går förbi RLS, så varje funktion kontrollerar familjeavgränsningen själv",
    ],
    dbSubtitle: "Varje rad tillhör en familj",
    dbItems: [
      "families · family_members (owner / parent) · family_invites",
      "children · activities · completions · bucket items · rewards · reward redemptions",
    ],
  },
};

export const MinSommarAccess = () => {
  const c = useCopy(accessCopy);
  return (
    <Diagram title={c.title} description={c.description} legend={["client", "server", "data"]}>
      <div className="space-y-1">
        <DiagramGroup label={c.whoGroup}>
          <div className="grid gap-3 md:grid-cols-2">
            <DiagramNode kind="client" title={c.parentTitle} subtitle={c.parentSubtitle} items={c.parentItems} />
            <DiagramNode kind="client" title={c.childTitle} subtitle={c.childSubtitle} items={c.childItems} />
          </div>
        </DiagramGroup>

        <Connector vertical label={c.resolves} />

        <DiagramGroup label={c.howGroup}>
          <div className="grid gap-3 md:grid-cols-2">
            <DiagramNode kind="data" title={c.clientTitle} subtitle={c.clientSubtitle} items={c.clientItems} />
            <DiagramNode kind="server" title={c.serverTitle} subtitle={c.serverSubtitle} items={c.serverItems} />
          </div>
        </DiagramGroup>

        <Connector vertical />

        <DiagramNode kind="data" title="PostgreSQL (Supabase)" subtitle={c.dbSubtitle} items={c.dbItems} />
      </div>
    </Diagram>
  );
};

const rewardsCopy: Record<"en" | "sv", { title: string; description: string; steps: Step[] }> = {
  en: {
    title: "Approving a reward safely",
    description:
      "A child asks for a reward, which creates a pending request. A parent approves it through a SECURITY DEFINER function that checks the parent is a family member and the request is still pending, locks the row and takes a per-child advisory lock, then recalculates the child's balance from completed activities minus approved rewards. If the balance doesn't cover the cost, the approval is refused.",
    steps: [
      {
        title: "Child asks for a reward",
        detail:
          "Created through a server function as a pending request — at most one pending request per reward, and no more than the child's available points cover.",
      },
      {
        title: "A parent approves",
        detail: "Calls approve_reward_redemption, a SECURITY DEFINER function in the database.",
        stops: [{ code: "✕", label: "not signed in or not in the family" }],
      },
      {
        title: "Lock",
        detail:
          "Locks the request row and takes a per-child advisory lock, so two parents approving at the same time are handled one after the other.",
        stops: [{ code: "✕", label: "request already decided" }],
      },
      {
        title: "Recalculate the balance",
        detail: "Points earned from completed activities minus approved rewards. No balance is stored, so nothing can drift.",
        stops: [{ code: "✕", label: "not enough points" }],
      },
      { title: "Approved", detail: "Records the decision time and which parent approved it.", kind: "success" },
    ],
  },
  sv: {
    title: "Säkra godkännanden av belöningar",
    description:
      "Ett barn ber om en belöning, vilket skapar en väntande förfrågan. En förälder godkänner den via en SECURITY DEFINER-funktion som kontrollerar att föräldern är medlem i familjen och att förfrågan fortfarande väntar, låser raden och tar ett advisory lock per barn, och sedan räknar om barnets saldo från genomförda aktiviteter minus godkända belöningar. Räcker inte saldot till nekas godkännandet.",
    steps: [
      {
        title: "Barnet ber om en belöning",
        detail:
          "Skapas via en serverfunktion som en väntande förfrågan — högst en väntande förfrågan per belöning, och aldrig mer än barnets tillgängliga poäng räcker till.",
      },
      {
        title: "En förälder godkänner",
        detail: "Anropar approve_reward_redemption, en SECURITY DEFINER-funktion i databasen.",
        stops: [{ code: "✕", label: "inte inloggad eller inte med i familjen" }],
      },
      {
        title: "Lås",
        detail:
          "Låser förfrågans rad och tar ett advisory lock per barn, så att två föräldrar som godkänner samtidigt hanteras en i taget.",
        stops: [{ code: "✕", label: "förfrågan är redan avgjord" }],
      },
      {
        title: "Räkna om saldot",
        detail:
          "Poäng från genomförda aktiviteter minus godkända belöningar. Inget saldo lagras, så ingenting kan hamna i otakt.",
        stops: [{ code: "✕", label: "inte tillräckligt med poäng" }],
      },
      { title: "Godkänt", detail: "Sparar när beslutet togs och vilken förälder som godkände.", kind: "success" },
    ],
  },
};

export const MinSommarRewards = () => {
  const c = useCopy(rewardsCopy);
  return (
    <Diagram title={c.title} description={c.description}>
      <StepFlow steps={c.steps} />
    </Diagram>
  );
};
