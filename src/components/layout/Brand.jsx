import { href, media } from "../../utils/site";

export function Brand({ compact = false }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href={href("home")} aria-label="SOZO Tech 首页">
      <img src={media("logo.png")} alt="" />
      <span><b>SOZO Tech</b><small>索卓科技</small></span>
    </a>
  );
}
