/**
 * Project links live in the URL hash — "#project/nodia" or, for a chapter of a
 * case study, "#project/nodia/decisions" — so every project is shareable and
 * the site keeps working on any static host without server rewrites.
 */
const PREFIX = "#project/";

export const projectHash = (id: string, chapter?: string) => `${PREFIX}${id}${chapter ? `/${chapter}` : ""}`;

export interface ProjectRoute {
  id: string;
  chapter: string | null;
}

/** Reads a project route from a hash; unknown project ids give null. */
export function parseProjectHash(hash: string, validIds: readonly string[]): ProjectRoute | null {
  if (!hash.startsWith(PREFIX)) return null;
  const [id, chapter] = decodeURIComponent(hash.slice(PREFIX.length)).split("/");
  return validIds.includes(id) ? { id, chapter: chapter || null } : null;
}
