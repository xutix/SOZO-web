import { useMemo, useState } from "react";
import { caseData, caseFilters, serviceModules } from "../data/cases";
import { media } from "../utils/site";
import { PageHero } from "../components/layout/PageHero";
import { PageShell } from "../components/layout/PageShell";

export function CasesPage() {
  const [filter, setFilter] = useState("全部");
  const shown = useMemo(() => filter === "全部" ? caseData : caseData.filter((item) => item.category === filter), [filter]);

  return <PageShell active="cases" title="服务与案例">
    <PageHero index="04" eyebrow="SERVICES & FIELD WORK" className="page-hero--cases page-hero--immersive" title={<>从原型研发<br /><span>走进展会现场</span></>} description="面向企业、学校、科技馆与活动方，提供硬件原型、FPV 技术、互动展示与创客课程服务。" image="robot-dog.jpg" />
    <section className="section service-list"><div className="section-heading" data-reveal><div><span className="eyebrow">SERVICE MODULES · 04</span><h2>服务能力</h2></div></div>{serviceModules.map(([n, t, d]) => <div className="service-row" data-reveal key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</section>
    <section className="section case-browser"><div className="section-heading" data-reveal><div><span className="eyebrow">PROJECT ARCHIVE</span><h2>真实项目记录</h2></div></div><div className="case-filters" role="group" aria-label="案例分类">{caseFilters.map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><div className="case-grid">{shown.map((item) => <article className="case-card is-visible" key={item.title}><figure><img src={media(item.image)} alt="" /><span>{item.category}</span></figure><small>{item.meta}</small><h3>{item.title}</h3></article>)}</div></section>
  </PageShell>;
}
