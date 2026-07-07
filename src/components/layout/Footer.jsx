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
        <nav className="footer-links" aria-label="页脚导航">
          <a href={href("dock")}>SOZO Dock</a>
          <a href={href("fpv")}>FPV 与无人机</a>
          <a href={href("products")}>产品总览</a>
          <a href={href("cases")}>合作服务</a>
          <a href={href("gallery")}>项目现场</a>
          <a href={href("support")}>支持</a>
        </nav>
        <div className="footer-contact-line">
          <a href="mailto:xutic@icloud.com">xutic@icloud.com</a>
          <span>西安 · 中国</span>
          <span>sozotech.cn</span>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 SOZO Tech</span>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">陕ICP备2026016108号-1</a>
      </div>
    </footer>
  );
}
