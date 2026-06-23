import { ArrowRight } from "@phosphor-icons/react";
import { featuredProjects, productAnchorPoints, directions } from "../data/home";
import { href, media } from "../utils/site";
import { PageShell } from "../components/layout/PageShell";
import { ArrowLink } from "../components/ui/ArrowLink";
import { SignalTag } from "../components/ui/SignalTag";

function HomeHero() {
  return (
    <section className="signal-hero">
      <div className="hero-copy" data-reveal>
        <span className="eyebrow">ENGINEERING SIGNAL FIELD · ONLINE</span>
        <h1>从桌面到飞行<br />把工程想法<br />做成<span>真实产品</span></h1>
        <p>索卓科技把真实工程现场里的结构、电子、飞行和互动体验，整理成可验证、可展示、可购买的产品。SOZO Dock 是这套能力的第一个清晰入口。</p>
        <div className="hero-actions"><a className="button button--solid" href={href("dock")}>查看 SOZO Dock <ArrowRight /></a><a className="button" href={href("products")}>了解产品方向</a></div>
      </div>
      <div className="field-stage" aria-label="SOZO 工程信号场">
        <figure className="field-photo field-photo--workbench"><img src={media("workbench.jpg")} alt="索卓科技工程工作台" /></figure>
        <figure className="field-photo field-photo--dock"><img src={media("dock-ambient.jpg")} alt="SOZO Dock 桌面控制中心" /></figure>
        <figure className="field-photo field-photo--flight"><img src={media("fpv-flight-1.jpg")} alt="御风 5 FPV 飞行器飞行中" /></figure>
        <figure className="field-photo field-photo--lab"><img src={media("maker-class.jpg")} alt="创客教育课程现场" /></figure>
        <div className="orbit orbit--one" /><div className="orbit orbit--two" />
        <SignalTag className="tag-dock" eyebrow="DESKTOP CONTROL" title="桌面控制" />
        <SignalTag className="tag-flight" eyebrow="FLIGHT SYSTEM" title="飞行系统" />
        <SignalTag className="tag-tools" eyebrow="ENGINEERING TOOLS" title="工程工具" />
        <SignalTag className="tag-lab" eyebrow="MAKER LAB" title="创客实验" />
        <div className="datum"><span>N 34.2672°</span><b /></div>
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
