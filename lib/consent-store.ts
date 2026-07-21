const EVENT = "jb-consent-change";
const STORAGE_KEY = "jb-consent";

export interface Consent {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
}

export type ConsentState = { hasChosen: false } | ({ hasChosen: true } & Consent);

const defaultState: ConsentState = { hasChosen: false };

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): ConsentState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.statistics !== "boolean" || typeof parsed?.marketing !== "boolean") {
      return defaultState;
    }
    return { hasChosen: true, necessary: true, statistics: parsed.statistics, marketing: parsed.marketing };
  } catch {
    return defaultState;
  }
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
