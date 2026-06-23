import { aboutValues } from "../data/about";
import { media } from "../utils/site";
import { PageHero } from "../components/layout/PageHero";
import { PageShell } from "../components/layout/PageShell";
import { ProcessSection } from "../components/sections/ProcessSection";

export function AboutPage() {
  return <PageShell active="about" title="关于索卓科技">
    <PageHero index="05" eyebrow="ABOUT SOZO" className="page-hero--about" title={<>把工程变成<br /><span>可体验的现场</span></>} description="索卓科技的核心不是同时做很多东西，而是把硬件、飞行和创客实践整理成可感知、可操作、可展示的产品体验。" image="soldering.jpg" />
    <section className="section belief-section"><div data-reveal><span className="eyebrow">OUR BELIEF</span><h2>从真实工作台里长出来的品牌</h2></div><div data-reveal><p>西安索卓科技有限公司是一支以工程实践为核心的硬件与创客团队。我们关注 FPV 穿越机、无人机、桌面工程工具、创客教育和科技展示，但这些方向最终指向同一种能力：把工程变成体验。</p><p>团队具备嵌入式硬件、结构设计、3D 打印、整机调试和活动执行经验。SOZO Dock 是当前最清晰的产品主线，其他经验则构成它背后的技术信任与场景来源。</p></div></section>
    <section className="values-band">{aboutValues.map(([Icon, title, en, desc]) => <div data-reveal key={title}><Icon size={36} weight="thin" /><small>{en}</small><strong>{title}</strong><p>{desc}</p></div>)}</section>
    <section className="section studio-story"><figure data-reveal><img src={media("tool-workstation.jpg")} alt="索卓工程工作台" /></figure><div data-reveal><span className="eyebrow">THE WORKBENCH</span><h2>工作台<br /><span>是想法进入现实的第一站</span></h2><p>结构、焊接、测试、调试和失败都发生在这里。我们保留真实研发过程，因为可信度来自过程，而不只是最终效果图。</p></div></section>
    <ProcessSection />
  </PageShell>;
}
