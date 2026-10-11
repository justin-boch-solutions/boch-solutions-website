// Löst den TypeScript-Pfad-Alias "@/..." für Node auf, damit Skripte dieselben
// Module importieren können wie die Next.js-App. Nur für scripts/, nicht für den Build.
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const base = join(root, specifier.slice(2));
    for (const kandidat of [`${base}.ts`, `${base}.tsx`, join(base, "index.ts")]) {
      if (existsSync(kandidat)) {
        return nextResolve(pathToFileURL(kandidat).href, context);
      }
    }
  }
  return nextResolve(specifier, context);
}
