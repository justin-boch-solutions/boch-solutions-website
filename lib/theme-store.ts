const EVENT = "jb-theme-change";

export type Theme = "dark" | "light";

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("jb-theme", theme);
  window.dispatchEvent(new Event(EVENT));
}

export const themeStore = { subscribe, getSnapshot, getServerSnapshot, setTheme };
