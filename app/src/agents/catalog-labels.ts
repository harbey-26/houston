import type { TFunction } from "i18next";

export interface CatalogCopy {
  name: string;
  description: string;
}

/**
 * The minimal shape both an `AgentConfig` (builtin / installed agents) and a
 * `StoreListing` (remote store catalog) satisfy — enough to localize a card.
 */
interface CatalogEntry {
  id: string;
  name: string;
  description: string;
  author?: string;
}

/**
 * Localized display name + description for a new-agent store card.
 *
 * First-party agents ship translations under `agents:catalog.<id>`, so the
 * store renders them in the user's language. Two authors count as
 * first-party: our rebranded builtins (`author === "NodoFlux"`,
 * `personal-assistant` / `blank`) and the bundled upstream store listings
 * (`author === "Houston"`: bookkeeping, legal, sales, …), which keep their
 * upstream author string so their `catalog.<id>` translations still apply.
 *
 * Third-party / community agents keep their author's language (the App Store
 * model), so any other author falls back to the raw strings. The
 * `defaultValue` guard also covers a first-party agent that doesn't yet have
 * a `catalog.<id>` entry: it renders the in-catalog English rather than a
 * raw key.
 */
const FIRST_PARTY_AUTHORS = new Set(["NodoFlux", "Houston"]);

export function localizeCatalogCopy(entry: CatalogEntry, t: TFunction): CatalogCopy {
  if (!entry.author || !FIRST_PARTY_AUTHORS.has(entry.author)) {
    return { name: entry.name, description: entry.description };
  }
  return {
    name: t(`agents:catalog.${entry.id}.name`, { defaultValue: entry.name }),
    description: t(`agents:catalog.${entry.id}.description`, {
      defaultValue: entry.description,
    }),
  };
}
