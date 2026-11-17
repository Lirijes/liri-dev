/**
 * Splits a text into paragraphs on blank lines ("\n\n" in the data), so
 * project texts can be written as several paragraphs.
 */
export const paragraphs = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
