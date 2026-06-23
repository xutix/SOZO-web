import { pages } from "../data/navigation";

export const base = import.meta.env.BASE_URL;

export const media = (name) => `${base}media/${name}`;

export const href = (key) => `${base}${pages[key].file}`;

export function currentPage() {
  const file = window.location.pathname.split("/").pop() || "index.html";
  return Object.entries(pages).find(([, page]) => page.file === file)?.[0] || "home";
}
