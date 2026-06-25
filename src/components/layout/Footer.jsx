import { href } from "../../utils/site";
import { ArrowLink } from "../ui/ArrowLink";
import { Brand } from "./Brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div><span className="eyebrow">PROJECT CHANNEL</span><h2>把工程信号接入真实产品</h2></div>
        <ArrowLink to={href("contact")}>联系合作</ArrowLink>
      </div>
      <div className="footer-grid">
        <Brand compact />
        <div><small>业务方向</small><a href={href("dock")}>SOZO Dock</a><a href={href("fpv")}>FPV 与无人机</a><a href={href("cases")}>服务与案例</a></div>
        <div><small>联系</small><a href="mailto:xutic@icloud.com">xutic@icloud.com</a><span>西安 · 中国</span><span>sozotech.cn</span></div>
        <div className="footer-meta"><small>SOZO SIGNAL FIELD</small><span>© 2026 SOZO Tech</span><span>陕ICP备2026016108号-1</span></div>
      </div>
    </footer>
  );
}
