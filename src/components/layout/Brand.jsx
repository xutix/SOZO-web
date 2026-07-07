import { href, media } from "../../utils/site";

export function Brand({ compact = false }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href={href("home")} aria-label="SOZO Tech 首页">
      <img src={media("logo.png")} alt="" />
      <span><b><i>SOZO</i><i>Tech</i></b></span>
    </a>
  );
}
