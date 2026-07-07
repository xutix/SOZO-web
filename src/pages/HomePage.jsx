import { ArrowRight } from "@phosphor-icons/react";
import { featuredProjects, productAnchorPoints, directions } from "../data/home";
import { href, media } from "../utils/site";
import { PageShell } from "../components/layout/PageShell";
import { ArrowLink } from "../components/ui/ArrowLink";

function HomeHero() {
  return (
    <section className="signal-hero signal-hero--v2">
      <div className="hero-copy" data-reveal>
        <span className="eyebrow">ENGINEERING PRODUCT FIELD</span>
        <h1>把工程能力<br /><span>做成真实产品</span></h1>
        <p>索卓科技围绕 SOZO Dock、FPV 与桌面工程工具，把真实研发现场里的结构、电子和体验，整理成可验证、可展示、可交付的产品。</p>
        <div className="hero-actions"><a className="button button--solid" href={href("dock")}>查看 SOZO Dock <ArrowRight /></a><a className="button" href={href("products")}>了解产品方向</a></div>
      </div>
      <div className="home-stage" aria-label="SOZO 工程产品舞台" data-reveal>
        <figure className="home-stage__ambient"><img src={media("tool-workstation.jpg")} alt="索卓科技工程桌面" /></figure>
        <figure className="home-stage__product"><img src={media("dock-ambient.jpg")} alt="SOZO Dock 桌面控制中心" /></figure>
        <figure className="home-stage__signal"><img src={media("fpv-flight-1.jpg")} alt="FPV 飞行器真实照片" /></figure>
        <div className="home-stage__hud">
          <small>01 / FIRST PRODUCT</small>
          <strong>SOZO Dock</strong>
          <span>Desktop control center</span>
        </div>
        <div className="home-stage__rail" />
      </div>
    </section>
  );
}

function ProductAnchor() {
  return (
    <section className="section product-anchor">
      <div className="product-anchor__copy" data-reveal>
        <span className="eyebrow">FIRST PRODUCT · SOZO DOCK</span>
        <h2>第一块控制硬件<br /><span>从真实桌面开始</span></h2>
        <p>SOZO Dock 不是一个带灯的桌面架，而是桌面系统的第一块控制硬件。它把工程师每天面对的桌面，变成有状态、有反馈、可控制的工作入口。</p>
        <div className="product-anchor__actions">
          <ArrowLink to={href("dock")}>进入产品页</ArrowLink>
          <a href={href("contact")}>产品合作</a>
        </div>
      </div>
      <figure className="product-anchor__image" data-reveal>
        <img src={media("dock-ambient.jpg")} alt="SOZO Dock 桌面控制中心" />
        <figcaption>SOZO Dock comes from a real engineering workbench.</figcaption>
      </figure>
      <div className="product-anchor__points" data-reveal>
        {productAnchorPoints.map(([title, desc], index) => <div key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{desc}</p></div>)}
      </div>
    </section>
  );
}

function DirectionRail() {
  return (
    <section className="section direction-section">
      <div className="section-heading" data-reveal><div><span className="eyebrow">DIRECTION NODES · 01—04</span><h2>从一个产品展开一套工程能力</h2></div><p>SOZO Dock 是当前主线，FPV、工程工具和创客教育构成它背后的真实经验与应用场景。</p></div>
      <div className="direction-rail">
        {directions.map((item) => (
          <a className="direction-node" href={href(item.key)} key={item.num} data-reveal>
            <span className="node-num">{item.num}</span>
            <div className="node-image"><img src={media(item.image)} alt="" /></div>
            <div className="node-copy"><small>{item.en}</small><h3>{item.title}</h3><p>{item.desc}</p></div>
            <ArrowRight className="node-arrow" />
          </a>
        ))}
      </div>
    </section>
  );
}

function ProjectStrip() {
  return (
    <section className="section projects-section">
      <div className="section-heading" data-reveal><div><span className="eyebrow">SELECTED WORK · 03</span><h2>真实项目是产品信任的一部分</h2></div><ArrowLink to={href("cases")}>查看全部案例</ArrowLink></div>
      <div className="project-strip">
        {featuredProjects.map((item, index) => <a href={href(item.to)} className={`project-tile project-tile--${index + 1}`} key={item.title} data-reveal><img src={media(item.image)} alt="" /><span>{item.tag}</span><h3>{item.title}</h3><ArrowRight /></a>)}
      </div>
    </section>
  );
}

export function HomePage() {
  return <PageShell active="home" title="工程造物、FPV 无人机与创客教育"><HomeHero /><ProductAnchor /><DirectionRail /><ProjectStrip /></PageShell>;
}
