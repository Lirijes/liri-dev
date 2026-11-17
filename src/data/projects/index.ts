import type { Lang } from "@/i18n/lang";
import { useLang } from "@/i18n/context";
import type { Project } from "@/types/project";
import { projectsEn } from "./en";
import { projectsSv } from "./sv";

export const projectsByLang: Record<Lang, Project[]> = { sv: projectsSv, en: projectsEn };

/** Language-neutral project ids (the same in every language). */
export const projectIds = projectsEn.map((p) => p.id);

/** The projects in the visitor's language. */
export const useProjects = (): Project[] => projectsByLang[useLang()];
