import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectDiagram } from "@/components/diagrams";
import { useT } from "@/i18n/context";
import { paragraphs } from "@/lib/text";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

/**
 * Secondary projects as one-line rows. Every row starts closed; opening
 * one reveals a short overview, technical highlights, links and a screenshot.
 */
const Row = ({ project, defaultOpen }: { project: Project; defaultOpen: boolean }) => {
  const t = useT();
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const panelId = useId();
  const image = project.images?.[0];

  return (
    <li id={`project-${project.id}`} className="scroll-mt-8 border-b border-rule">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-baseline gap-x-4 py-5 text-left"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-x-5 gap-y-1 sm:flex-row sm:items-baseline">
            <span className="text-[1.3125rem] font-medium leading-tight tracking-[-0.02em] transition-colors group-hover:text-primary">
              {project.title}
            </span>
            <span className="font-mono text-[0.8125rem] text-muted-foreground">{project.tagline}</span>
          </span>
          <span aria-hidden className="text-xl leading-none">
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={t.projects.detailsLabel(project.title)}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 pb-12 pt-2 md:grid-cols-12 md:gap-x-6">
              <div className="space-y-6 md:col-span-6 lg:col-span-5">
                <div className="space-y-4 leading-relaxed text-ink-soft">
                  {paragraphs(project.overview).map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
                {project.highlights && (
                  <div>
                    <p className="label text-muted-foreground">{t.projects.technicalHighlights}</p>
                    <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span aria-hidden className="text-primary">
                            —
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.links.length > 0 && (
                  <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {project.links.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="link">
                        {link.type === "demo" || link.label === "GitHub" ? link.label : t.projects.onGitHub(link.label)} ↗
                      </a>
                    ))}
                  </p>
                )}
              </div>
              {image && (
                <img
                  src={image}
                  alt={t.projects.screenshotAlt(project.title)}
                  loading="lazy"
                  className={cn(
                    "block h-auto w-full md:col-span-6 md:col-start-7",
                    "shadow-[0_18px_48px_-30px_hsl(var(--foreground)/0.4)]"
                  )}
                />
              )}
              {project.diagrams?.map((id) => (
                <div key={id} className="md:col-span-12">
                  <ProjectDiagram id={id} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const ProjectIndex = ({
  projects,
  openId,
}: {
  projects: Project[];
  /** A row opened by a shared link. */
  openId: string | null;
}) => (
  <ul className="border-t border-rule">
    {projects.map((project) => (
      <Row
        // Re-mount when a link opens a different row, so it starts open.
        key={`${project.id}-${openId === project.id}`}
        project={project}
        defaultOpen={openId === project.id}
      />
    ))}
  </ul>
);

export default ProjectIndex;
