import { ArrowRight } from "@phosphor-icons/react";
import { directions } from "../data/home";
import { href, media } from "../utils/site";
import { PageHero } from "../components/layout/PageHero";
import { PageShell } from "../components/layout/PageShell";
import { ProcessSection } from "../components/sections/ProcessSection";

export function ProductsPage() {
  return <PageShell active="products" title="产品方向">
    <PageHero index="01" eyebrow="PRODUCT DIRECTIONS" className="page-hero--products page-hero--immersive" title={<>以产品为主线<br /><span>把工程能力落地</span></>} description="SOZO Dock 是当前阶段的核心产品；FPV、工程工具和创客教育，是支撑这款产品与后续生态的真实工程能力。" image="tool-workstation.jpg" />
    <section className="section product-manifest">
      <div className="section-heading" data-reveal><div><span className="eyebrow">SYSTEM MAP</span><h2>产品与能力坐标</h2></div><p>网站不把所有业务平铺展示，而是围绕一个清晰产品，呈现索卓如何把工程变成可用体验。</p></div>
      {directions.map((item) => <a href={href(item.key)} className={`manifest-row ${item.key === "dock" ? "manifest-row--primary" : ""}`} key={item.num} data-reveal><span>{item.num}</span><div><small>{item.en}</small><h3>{item.title}</h3></div><p>{item.desc}</p><figure><img src={media(item.image)} alt="" /></figure><ArrowRight /></a>)}
    </section>
    <ProcessSection />
  </PageShell>;
}
