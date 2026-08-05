import { readdir, readFile } from "node:fs/promises";

const legacyCss = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
const systemCss = await readFile(new URL("../src/styles/v2-system.css", import.meta.url), "utf8");
const pageShell = await readFile(new URL("../src/components/layout/PageShell.jsx", import.meta.url), "utf8");
const footer = await readFile(new URL("../src/components/layout/Footer.jsx", import.meta.url), "utf8");
const main = await readFile(new URL("../src/main.jsx", import.meta.url), "utf8");
const pageDirectory = new URL("../src/pages/", import.meta.url);

const withoutComments = (source) => source.replace(/\/\*[\s\S]*?\*\//g, "");
const sharedSelector = /^(?:\.site-header|\.desktop-nav|\.mobile-nav|\.menu-button|\.site-footer|\.footer-cta|\.footer-grid|\.page-hero__|\.page-hero(?:$|[.:#\s>+~])|main#content)/;
const legacySelectors = [];

for (const match of withoutComments(legacyCss).matchAll(/([^{}]+)\{/g)) {
  const selectors = match[1].split(",").map((selector) => selector.trim());
  for (const selector of selectors) {
    if (sharedSelector.test(selector)) legacySelectors.push(selector);
  }
}

const failures = [];
if (legacySelectors.length > 0) {
  failures.push(`legacy shared selectors remain in src/styles.css: ${legacySelectors.join(", ")}`);
}

for (const selector of [".site-header", ".site-footer", ".page-hero", ".footer-cta", "main#content"]) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!new RegExp(`^${escaped}(?:$|[.:#\\s>+~])`, "m").test(withoutComments(systemCss))) {
    failures.push(`shared owner missing from src/styles/v2-system.css: ${selector}`);
  }
}

const legacyImport = (main.match(/import\s+["']\.\/styles\.css["']/g) || []).length;
const systemImport = (main.match(/import\s+["']\.\/styles\/v2-system\.css["']/g) || []).length;
if (legacyImport !== 1 || systemImport !== 1 || main.indexOf('import "./styles.css"') > main.indexOf('import "./styles/v2-system.css"')) {
  failures.push("main.jsx must load styles.css once before v2-system.css once");
}

if ((pageShell.match(/<Footer\b/g) || []).length !== 1 || (pageShell.match(/<main\b/g) || []).length !== 1) {
  failures.push("PageShell must render exactly one main and one Footer");
}

if ((footer.match(/<footer\b/g) || []).length !== 1) {
  failures.push("Footer must render exactly one footer element");
}

for (const fileName of await readdir(pageDirectory)) {
  if (!fileName.endsWith(".jsx")) continue;
  const pageSource = await readFile(new URL(fileName, pageDirectory), "utf8");
  const shellCount = (pageSource.match(/<PageShell\b/g) || []).length;
  const footerCount = (pageSource.match(/<Footer\b/g) || []).length;
  if (shellCount !== 1) failures.push(`src/pages/${fileName} must mount exactly one PageShell`);
  if (footerCount !== 0) failures.push(`src/pages/${fileName} must not mount Footer directly`);
}

if (failures.length > 0) {
  console.error("Style ownership check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Style ownership check passed: shared shell has one CSS owner and one Footer mount.");
