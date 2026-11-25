import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CaseStudy from "@/components/projects/CaseStudy";
import { projectIds, useProjects } from "@/data/projects";
import { useHash } from "@/hooks/use-hash";
import { useT } from "@/i18n/context";
import { parseProjectHash } from "@/lib/hash-route";

const setMeta = (selector: string, content: string) =>
  document.querySelector(selector)?.setAttribute("content", content);

/**
 * One page, two views chosen by the URL hash: the portfolio itself, or a
 * featured project's case study (#project/<id>). Secondary projects
 * (#project/<id> for a non-featured id) open their row on the portfolio.
 * The language (?lang=en) is independent of the hash, so switching it keeps
 * the current view.
 */
const Index = () => {
  const t = useT();
  const projects = useProjects();
  const featured = projects.filter((p) => p.featured);
  const hash = useHash();
  const route = parseProjectHash(hash, projectIds);
  const caseIndex = route ? featured.findIndex((p) => p.id === route.id) : -1;
  const caseProject = caseIndex >= 0 ? featured[caseIndex] : null;
  const isFirstRender = useRef(true);

  // Title and description follow both the view and the language.
  useEffect(() => {
    const title = caseProject ? t.meta.caseTitle(caseProject.title) : t.meta.title;
    const description = caseProject ? caseProject.summary : t.meta.description;
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', caseProject ? title : t.meta.shareTitle);
    setMeta('meta[property="og:description"]', description);
  }, [caseProject, t]);

  // After every view change, put the reader in the right place.
  useEffect(() => {
    const firstRender = isFirstRender.current;
    isFirstRender.current = false;
    const frame = requestAnimationFrame(() => {
      if (caseProject) {
        const chapter = route?.chapter ? document.getElementById(`chapter-${route.chapter}`) : null;
        if (chapter) chapter.scrollIntoView({ behavior: "instant", block: "start" });
        else window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      const targetId = route ? `project-${route.id}` : hash.slice(1);
      if (targetId) document.getElementById(targetId)?.scrollIntoView({ behavior: "instant", block: "start" });
      else if (!firstRender) window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
    // Runs on hash changes only (not on language changes, so switching
    // language never moves the page).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        onClick={(e) => {
          // Changing the hash would leave a case study, so move focus directly.
          e.preventDefault();
          const main = document.getElementById("main");
          main?.focus();
          main?.scrollIntoView({ block: "start" });
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        {t.a11y.skipToContent}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {caseProject ? (
          <CaseStudy
            key={caseProject.id}
            project={caseProject}
            number={String(caseIndex + 1).padStart(2, "0")}
            next={featured[(caseIndex + 1) % featured.length] ?? null}
          />
        ) : (
          <>
            <About />
            <Projects openRowId={route?.id ?? null} />
            <Experience />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
