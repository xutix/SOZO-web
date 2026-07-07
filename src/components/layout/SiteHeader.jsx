import { useEffect, useState } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { navActiveGroups, pages, primaryNav, productMenu } from "../../data/navigation";
import { href } from "../../utils/site";
import { Brand } from "./Brand";

export function SiteHeader({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const mobileNav = primaryNav;
  const isMegaOpen = Boolean(megaOpen);

  const isNavActive = (key) => {
    const group = navActiveGroups[key] || [key];
    return group.includes(active);
  };

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY || window.pageYOffset || 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setScrolled(y > 18);
      setHidden(y > 130 && y > lastY + 3);
      lastY = Math.max(0, y);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (open || isMegaOpen) setHidden(false);
  }, [open, isMegaOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMegaOpen(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""} ${isMegaOpen ? "is-mega-open" : ""} ${open ? "is-menu-open" : ""}`}
      onMouseLeave={() => setMegaOpen(null)}
    >
      <Brand />
      <nav className="desktop-nav" aria-label="主导航">
        {primaryNav.map((key) => {
          const isProducts = key === "products";
          const link = (
            <a
              className={`${isNavActive(key) ? "active" : ""} nav-${key}`}
              href={href(key)}
              aria-haspopup={isProducts ? "true" : undefined}
              aria-expanded={isProducts ? megaOpen === "products" : undefined}
              onMouseEnter={() => setMegaOpen(isProducts ? "products" : null)}
              onFocus={() => setMegaOpen(isProducts ? "products" : null)}
            >
              {pages[key].label}
            </a>
          );

          if (!isProducts) return <span className="nav-item" key={key}>{link}</span>;

          return (
            <span
              className="nav-item nav-item--products"
              key={key}
              onMouseEnter={() => setMegaOpen("products")}
              onMouseLeave={() => setMegaOpen(null)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setMegaOpen(null);
              }}
            >
              {link}
              <span className={`nav-mega ${megaOpen === "products" ? "open" : ""}`}>
                <small>{productMenu.eyebrow}</small>
                {productMenu.items.map((item) => (
                  <a href={`${import.meta.env.BASE_URL}${item.file}`} key={item.label}>
                    {item.label}
                  </a>
                ))}
              </span>
            </span>
          );
        })}
      </nav>
      <button className="menu-button" aria-label={open ? "关闭菜单" : "打开菜单"} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X /> : <List />}
      </button>
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        {mobileNav.map((key, index) => (
          <a href={href(key)} key={key} onClick={() => setOpen(false)}><span>0{index + 1}</span>{pages[key].label}<ArrowRight /></a>
        ))}
      </div>
    </header>
  );
}
