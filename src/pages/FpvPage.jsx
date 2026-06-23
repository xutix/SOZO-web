import { flightCapabilities } from "../data/fpv";
import { href, media } from "../utils/site";
import { ArrowLink } from "../components/ui/ArrowLink";
import { PageHero } from "../components/layout/PageHero";
import { PageShell } from "../components/layout/PageShell";

export function FpvPage() {
  return <PageShell active="fpv" title="FPV 与无人机方案">
    <PageHero index="03" eyebrow="FLIGHT SYSTEM" className="page-hero--fpv page-hero--immersive" title={<>从结构调试<br /><span>到飞行展示</span></>} description="围绕 FPV 穿越机、无人机整机、活动飞行和定制应用，提供结构设计、装配调试、展示执行与技术支持。" image="fpv-flight-1.jpg"><div className="flight-meta"><span>FIELD TESTED</span><span>REAL AIRFRAME</span><span>NO GENERIC PARTS</span></div></PageHero>
    <section className="section capability-grid"><div className="section-heading" data-reveal><div><span className="eyebrow">FLIGHT CAPABILITY</span><h2>把飞行体验建立在工程验证上</h2></div><p>从装配前的结构判断，到飞行后的数据复盘，能力被拆成可执行、可验证的工程环节。</p></div><div className="capability-cards">{flightCapabilities.map(([Icon, title, text, details], i) => <article data-reveal key={title}><span>0{i + 1}</span><Icon size={40} weight="thin" /><div><small>0{i + 1} / FLIGHT MODULE</small><h3>{title}</h3><p>{text}</p><ul>{details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}</div></section>
    <section className="section airframe-section"><div className="airframe-copy" data-reveal><span className="eyebrow">AUTHENTIC STRUCTURE</span><h2>真实结构<br /><span>真实飞行</span></h2><p>所有结构展示严格基于现有整机与机架素材。不替换顶板、底板、侧板和绑带，不添加不存在的零件。</p><ArrowLink to={href("contact")}>讨论无人机方案</ArrowLink></div><div className="airframe-images"><figure data-reveal><img src={media("fpv-studio.jpg")} alt="御风 5 整机棚拍" /></figure><figure data-reveal><img src={media("fpv-structure.jpg")} alt="御风 5 真实机架结构" /></figure></div></section>
    <section className="flight-band"><img src={media("fpv-studio.jpg")} alt="FPV 飞行器现场检查" /><div data-reveal><span className="eyebrow">FIELD EXECUTION · LINK VERIFIED</span><h2>速度感来自真实飞行<br /><span>不是虚构结构</span></h2><p>飞行器、图传链路与现场安全共同组成一次可靠的展示执行。</p><div className="flight-band__tags"><span>REAL AIRFRAME</span><span>FIELD TESTED</span><span>SAFETY CHECKED</span></div></div></section>
  </PageShell>;
}
