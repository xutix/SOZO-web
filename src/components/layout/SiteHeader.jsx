import { useEffect, useState } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { pages, primaryNav } from "../../data/navigation";
import { href } from "../../utils/site";
import { Brand } from "./Brand";

export function SiteHeader({ active }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="主导航">
        {primaryNav.map((key) => <a className={active === key ? "active" : ""} href={href(key)} key={key}>{pages[key].label}</a>)}
      </nav>
      <a className="nav-contact" href={href("contact")}>联系合作 <ArrowRight weight="bold" /></a>
      <button className="menu-button" aria-label="打开菜单" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X /> : <List />}
      </button>
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        {Object.entries(pages).filter(([key]) => key !== "home").map(([key, page], index) => (
          <a href={href(key)} key={key}><span>0{index + 1}</span>{page.label}<ArrowRight /></a>
        ))}
      </div>
    </header>
  );
}
