import { Connector, Diagram, DiagramGroup, DiagramNode, StepFlow } from "./kit";

// Verified against the minsommar repository: supabase/migrations
// (strict_rls, multi_parent, reward_redemptions) and
// src/integrations/supabase/family-session.server.ts.

export const MinSommarAccess = () => (
  <Diagram
    title="Access model: two ways in, one family scope"
    description="Parents sign in with Supabase Auth. Children have no account: they open a family link, and the server sets a signed, httpOnly cookie containing only the family id. Parents query the database directly through the Supabase client, where a Row Level Security policy based on is_family_member(family_id) protects every family table, and use SECURITY DEFINER functions for invites, reward approvals and member removal. Server functions serve both parents and children: they resolve the family from the parent's verified token and membership, or from the child's signed cookie, and because they use the service role, each one checks the family scope itself."
    legend={["client", "server", "data"]}
  >
    <div className="space-y-1">
      <DiagramGroup label="Who is asking">
        <div className="grid gap-3 md:grid-cols-2">
          <DiagramNode
            kind="client"
            title="Parent"
            subtitle="Supabase account"
            items={["Signs in and gets a JWT", "Several parents per family: one owner, the rest join by invitation"]}
          />
          <DiagramNode
            kind="client"
            title="Child"
            subtitle="No account — family link"
            items={[
              "Opens /f/<token>, a revocable link shared by a parent",
              "Gets a signed, httpOnly cookie holding only the family id",
            ]}
          />
        </div>
      </DiagramGroup>

      <Connector vertical label="every request resolves to one family" />

      <DiagramGroup label="How data is reached">
        <div className="grid gap-3 md:grid-cols-2">
          <DiagramNode
            kind="data"
            title="Supabase client under RLS"
            subtitle="Parents only"
            items={[
              "Policy on every family table: is_family_member(family_id)",
              "SECURITY DEFINER functions for invites, reward approvals and removing members",
            ]}
          />
          <DiagramNode
            kind="server"
            title="Server functions"
            subtitle="Parents and children · service role"
            items={[
              "Family from the parent's verified token + membership, or the child's signed cookie",
              "Service role bypasses RLS, so every function checks the family scope itself",
            ]}
          />
        </div>
      </DiagramGroup>

      <Connector vertical />

      <DiagramNode
        kind="data"
        title="PostgreSQL (Supabase)"
        subtitle="Every row belongs to a family"
        items={[
          "families · family_members (owner / parent) · family_invites",
          "children · activities · completions · bucket items · rewards · reward redemptions",
        ]}
      />
    </div>
  </Diagram>
);

export const MinSommarRewards = () => (
  <Diagram
    title="Approving a reward safely"
    description="A child asks for a reward, which creates a pending request. A parent approves it through a SECURITY DEFINER function that checks the parent is a family member and the request is still pending, locks the row and takes a per-child advisory lock, then recalculates the child's balance from completed activities minus approved rewards. If the balance doesn't cover the cost, the approval is refused."
  >
    <StepFlow
      steps={[
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
      ]}
    />
  </Diagram>
);
