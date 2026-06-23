import { useEffect } from "react";
import { useReveals } from "../../hooks/useReveals";
import { Footer } from "./Footer";
import { SiteHeader } from "./SiteHeader";

export function PageShell({ active, children, title }) {
  useReveals();

  useEffect(() => {
    document.title = `${title} · SOZO Tech 索卓科技`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <>
      <a className="skip-link" href="#content">跳到主要内容</a>
      <SiteHeader active={active} />
      <main id="content">{children}</main>
      <Footer />
    </>
  );
}
