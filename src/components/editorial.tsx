import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Small shared pieces of the editorial layout. Every section opens the same
 * way — a dark rule with a small label above it — which is what keeps the
 * different parts of the page reading as one design.
 */

export const SectionHead = ({
  label,
  aside,
  className,
  as: Tag = "h2",
}: {
  label: string;
  aside?: ReactNode;
  className?: string;
  as?: ElementType;
}) => (
  <div className={cn("flex items-baseline justify-between gap-4 border-t border-foreground pt-3.5", className)}>
    <Tag className="label">{label}</Tag>
    {aside && <p className="label text-muted-foreground">{aside}</p>}
  </div>
);

/** Fades content up once as it scrolls into view; shown immediately for reduced motion. */
export const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

/** Small uppercase term + value pair used in fact columns. */
export const Fact = ({ term, children }: { term: string; children: ReactNode }) => (
  <div>
    <dt className="label text-muted-foreground">{term}</dt>
    <dd className="mt-1.5 text-sm leading-relaxed">{children}</dd>
  </div>
);
