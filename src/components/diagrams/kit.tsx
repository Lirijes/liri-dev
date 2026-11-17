import { Fragment, type ReactNode } from "react";
import { useT } from "@/i18n/context";
import { cn } from "@/lib/utils";

/**
 * Small building blocks for technical diagrams, rendered as HTML instead of
 * images so text stays sharp, selectable and readable on every screen size.
 *
 * Visual language, in the site's editorial style (square boxes, serif labels,
 * thin ink lines), used the same way in every diagram:
 *   client   – ink outline            browser / frontend
 *   server   – burgundy outline       APIs and server-side code
 *   data     – double ink rule        databases and storage
 *   external – light outline          third-party services
 *   planned  – dashed, muted, italic  not built yet
 *   blocked  – tinted, struck         access that is deliberately denied
 */

export type NodeKind = "client" | "server" | "data" | "external" | "planned" | "blocked";

// Diagrams switch from vertical (phones) to horizontal at this breakpoint.
// Literal class strings so Tailwind can see them at build time.
export type Breakpoint = "md" | "lg" | "xl";
const bp = {
  md: { row: "flex-col md:flex-row", wide: "hidden md:flex", narrow: "flex md:hidden" },
  lg: { row: "flex-col lg:flex-row", wide: "hidden lg:flex", narrow: "flex lg:hidden" },
  xl: { row: "flex-col xl:flex-row", wide: "hidden xl:flex", narrow: "flex xl:hidden" },
} as const;

const nodeStyles: Record<NodeKind, { box: string; subtitle: string }> = {
  client: { box: "border-[1.5px] border-foreground bg-background", subtitle: "text-muted-foreground" },
  server: { box: "border-[1.5px] border-primary bg-background", subtitle: "text-primary" },
  data: { box: "border-[3px] border-double border-foreground bg-background", subtitle: "text-muted-foreground" },
  external: { box: "border-[1.5px] border-foreground/35 bg-background/60", subtitle: "text-muted-foreground" },
  planned: {
    box: "border-[1.5px] border-dashed border-muted-foreground/60 bg-transparent",
    subtitle: "text-muted-foreground",
  },
  blocked: { box: "border-[1.5px] border-transparent bg-foreground/[0.06]", subtitle: "text-primary" },
};

interface DiagramNodeProps {
  kind: NodeKind;
  title: string;
  subtitle?: string;
  items?: string[];
  className?: string;
}

export const DiagramNode = ({ kind, title, subtitle, items, className }: DiagramNodeProps) => {
  const style = nodeStyles[kind];
  const muted = kind === "planned" || kind === "blocked";
  return (
    <div className={cn("min-w-0 flex-1 break-words hyphens-auto px-4 py-3.5", style.box, className)}>
      <p
        className={cn(
          "font-display text-[1.375rem] leading-tight",
          muted ? "text-muted-foreground" : "text-foreground",
          kind === "planned" && "italic"
        )}
      >
        {kind === "blocked" && (
          <span aria-hidden className="mr-1.5 text-primary">
            ✕
          </span>
        )}
        {title}
      </p>
      {subtitle && <p className={cn("mt-1 text-[0.8125rem] leading-snug", style.subtitle)}>{subtitle}</p>}
      {items && items.length > 0 && (
        <ul className="mt-2.5 space-y-1">
          {items.map((item) => (
            <li key={item} className="text-[0.8125rem] leading-snug text-ink-soft">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ArrowSvg = ({ vertical, planned, reverse }: { vertical?: boolean; planned?: boolean; reverse?: boolean }) => {
  const stroke = planned ? "hsl(var(--muted-foreground) / 0.7)" : "hsl(var(--foreground))";
  const dash = planned ? "5 4" : undefined;
  return vertical ? (
    <svg aria-hidden width="12" height="28" viewBox="0 0 12 28" className={cn("shrink-0", reverse && "rotate-180")}>
      <line x1="6" y1="0" x2="6" y2="22" stroke={stroke} strokeWidth="1.25" strokeDasharray={dash} />
      <path d="M2 20 L6 27 L10 20" fill="none" stroke={stroke} strokeWidth="1.25" />
    </svg>
  ) : (
    <svg aria-hidden width="56" height="12" viewBox="0 0 56 12" className={cn("shrink-0", reverse && "rotate-180")}>
      <line x1="0" y1="6" x2="54" y2="6" stroke={stroke} strokeWidth="1.25" strokeDasharray={dash} />
      <path d="M48 2 L55 6 L48 10" fill="none" stroke={stroke} strokeWidth="1.25" />
    </svg>
  );
};

interface ConnectorProps {
  label?: string;
  /** "backward" points the arrow at the previous node. */
  direction?: "forward" | "backward";
  planned?: boolean;
  breakpoint?: Breakpoint;
  /** Always vertical, for connectors between stacked rows. */
  vertical?: boolean;
}

export const Connector = ({ label, direction = "forward", planned, breakpoint = "md", vertical }: ConnectorProps) => {
  const reverse = direction === "backward";
  const labelClass = cn("text-xs leading-tight text-muted-foreground", planned && "italic");
  if (vertical) {
    return (
      <div className="flex items-center gap-2.5 py-1.5 pl-5">
        <ArrowSvg vertical planned={planned} reverse={reverse} />
        {label && <span className={labelClass}>{label}</span>}
      </div>
    );
  }
  return (
    <>
      <div className={cn(bp[breakpoint].wide, "max-w-[96px] shrink-0 flex-col items-center justify-center gap-1.5 px-1.5")}>
        {label && <span className={cn(labelClass, "text-center")}>{label}</span>}
        <ArrowSvg planned={planned} reverse={reverse} />
      </div>
      <div className={cn(bp[breakpoint].narrow, "items-center gap-2.5 py-1.5 pl-5")}>
        <ArrowSvg vertical planned={planned} reverse={reverse} />
        {label && <span className={labelClass}>{label}</span>}
      </div>
    </>
  );
};

/** A row of nodes and connectors; stacks vertically below the breakpoint. */
export const Flow = ({
  children,
  breakpoint = "md",
  className,
}: {
  children: ReactNode;
  breakpoint?: Breakpoint;
  className?: string;
}) => <div className={cn("flex items-stretch", bp[breakpoint].row, className)}>{children}</div>;

/** A labelled boundary around related nodes, e.g. a runtime environment or a planned layer. */
export const DiagramGroup = ({
  label,
  planned,
  children,
  className,
}: {
  label: string;
  planned?: boolean;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "p-3 sm:p-4",
      planned ? "border-[1.5px] border-dashed border-muted-foreground/50" : "border border-foreground/20",
      className
    )}
  >
    <p className="label mb-3 text-muted-foreground">{label}</p>
    {children}
  </div>
);

// Swatches per legend entry; the labels come from the translations (t.diagram).
const legendSwatches = {
  built: "border-[1.5px] border-foreground",
  planned: "border-[1.5px] border-dashed border-muted-foreground",
  client: "border-[1.5px] border-foreground",
  server: "border-[1.5px] border-primary",
  data: "border-[3px] border-double border-foreground",
  blocked: "bg-foreground/[0.08]",
} as const;

export type LegendKey = keyof typeof legendSwatches;

export const Legend = ({ items }: { items: LegendKey[] }) => {
  const t = useT();
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5" aria-label={t.diagram.legend}>
      {items.map((key) => (
        <li key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span aria-hidden className={cn("h-3 w-4", legendSwatches[key])} />
          {t.diagram[key]}
        </li>
      ))}
    </ul>
  );
};

/**
 * Wrapper for every full diagram: a serif caption, an optional legend, a text
 * description for screen readers, and the diagram on a deeper paper panel
 * (edge to edge on phones, where every pixel of width helps legibility).
 */
export const Diagram = ({
  title,
  description,
  legend,
  children,
}: {
  title: string;
  description: string;
  legend?: LegendKey[];
  children: ReactNode;
}) => (
  <figure className="space-y-4">
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <figcaption className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{title}</figcaption>
      {legend && <Legend items={legend} />}
    </div>
    <p className="sr-only">{description}</p>
    <div className="-mx-[var(--gutter)] bg-paper-deep px-[var(--gutter)] py-8 sm:mx-0 sm:px-8 sm:py-10 lg:px-10">
      {children}
    </div>
  </figure>
);

export interface Step {
  title: string;
  detail?: string;
  /** Outcomes that stop the flow at this step, e.g. { code: "401", label: "invalid token" }. */
  stops?: { code: string; label: string }[];
  kind?: "default" | "success";
}

/** A numbered, always-vertical sequence — readable at any width. */
export const StepFlow = ({ steps }: { steps: Step[] }) => (
  <ol className="border-t border-foreground">
    {steps.map((step, i) => (
      <Fragment key={step.title}>
        <li className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-foreground/15 py-5 md:grid-cols-[3rem_1fr_minmax(0,16rem)] md:gap-x-6">
          <span aria-hidden className="font-display text-xl leading-6 text-primary">
            {step.kind === "success" ? "✓" : i + 1}
          </span>
          <div className="min-w-0">
            <p className="font-medium leading-6">{step.title}</p>
            {step.detail && <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.detail}</p>}
          </div>
          {step.stops && step.stops.length > 0 && (
            <ul className="col-start-2 mt-2 space-y-1 md:col-start-3 md:mt-0 md:text-right">
              {step.stops.map((stop) => (
                <li key={stop.code + stop.label} className="text-[0.8125rem] leading-snug text-primary">
                  <span className="font-medium">{stop.code}</span> <span className="text-ink-soft">— {stop.label}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      </Fragment>
    ))}
  </ol>
);
