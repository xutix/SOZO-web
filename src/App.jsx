import { lazy, Suspense } from "react";
import { currentPage } from "./utils/site";

const pageComponents = {
  home: lazy(() => import("./pages/HomePage").then(({ HomePage }) => ({ default: HomePage }))),
  products: lazy(() => import("./pages/ProductsPage").then(({ ProductsPage }) => ({ default: ProductsPage }))),
  dock: lazy(() => import("./pages/DockPage").then(({ DockPage }) => ({ default: DockPage }))),
  fpv: lazy(() => import("./pages/FpvPage").then(({ FpvPage }) => ({ default: FpvPage }))),
  cases: lazy(() => import("./pages/CasesPage").then(({ CasesPage }) => ({ default: CasesPage }))),
  gallery: lazy(() => import("./pages/GalleryPage").then(({ GalleryPage }) => ({ default: GalleryPage }))),
  about: lazy(() => import("./pages/AboutPage").then(({ AboutPage }) => ({ default: AboutPage }))),
  contact: lazy(() => import("./pages/ContactPage").then(({ ContactPage }) => ({ default: ContactPage }))),
};

export function App() {
  const Page = pageComponents[currentPage()] || pageComponents.home;
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}
