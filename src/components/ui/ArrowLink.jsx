import { ArrowRight } from "@phosphor-icons/react";

export function ArrowLink({ to, children }) {
  return <a className="arrow-link" href={to}>{children}<ArrowRight weight="bold" /></a>;
}
