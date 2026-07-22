const EVENT = "jb-consent-change";
const STORAGE_KEY = "jb-consent";

export interface Consent {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
}

export type ConsentState = { hasChosen: false } | ({ hasChosen: true } & Consent);

const defaultState: ConsentState = { hasChosen: false };

// useSyncExternalStore requires getSnapshot to return a referentially stable
// value when nothing has changed, or React re-renders in an infinite loop.
// Cache the last raw localStorage value alongside the parsed result so we
// only allocate a new state object when the underlying value actually changed.
let cachedRaw: string | null = null;
let cachedState: ConsentState = defaultState;

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): ConsentState {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }

  if (raw === cachedRaw) return cachedState;

  cachedRaw = raw;
  if (!raw) {
    cachedState = defaultState;
    return cachedState;
  }

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.statistics !== "boolean" || typeof parsed?.marketing !== "boolean") {
      cachedState = defaultState;
    } else {
      cachedState = {
        hasChosen: true,
        necessary: true,
        statistics: parsed.statistics,
        marketing: parsed.marketing,
      };
    }
  } catch {
    cachedState = defaultState;
  }

  return cachedState;
}

function getServerSnapshot(): ConsentState {
  return defaultState;
}

function set(consent: Consent) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new Event(EVENT));
}

function acceptAll() {
  set({ necessary: true, statistics: true, marketing: true });
}

function rejectAll() {
  set({ necessary: true, statistics: false, marketing: false });
}

function reset() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(EVENT));
}

export const consentStore = { subscribe, getSnapshot, getServerSnapshot, set, acceptAll, rejectAll, reset };
