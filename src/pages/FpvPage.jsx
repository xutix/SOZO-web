import { useEffect, useMemo, useRef, useState } from "react";
import { flightCapabilities } from "../data/fpv";
import { href, media } from "../utils/site";
import { ArrowLink } from "../components/ui/ArrowLink";
import { PageHero } from "../components/layout/PageHero";
import { PageShell } from "../components/layout/PageShell";

const airframeSlides = [
  {
    image: "gallery/asset-18.jpg",
    tag: "01 / STUDIO",
    title: "整机棚拍",
    text: "基于真实御风 5 整机素材，保留结构比例与装配细节。",
  },
  {
    image: "gallery/asset-23.jpg",
    tag: "02 / EXPLODED",
    title: "结构拆解",
    text: "展示真实机架与零件关系，不补造不存在的结构。",
  },
  {
    image: "gallery/asset-20.jpg",
    tag: "03 / FIELD",
    title: "外场飞行",
    text: "用真实飞行照片承载速度感，光轨只作为辅助层。",
  },
  {
    image: "gallery/asset-17.jpg",
    tag: "04 / DETAIL",
    title: "连接细节",
    text: "把局部工程细节放进同一套滚动叙事里。",
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function AirframeScrollShowcase() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const raw = (window.innerHeight * 0.34 - rect.top) / travel;
      setProgress(clamp(raw, 0, 1));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const activeIndex = useMemo(() => {
    return clamp(Math.round(progress * (airframeSlides.length - 1)), 0, airframeSlides.length - 1);
  }, [progress]);

  return (
    <section className="section airframe-section airframe-section--scroll" ref={sectionRef}>
      <div className="airframe-scroll__sticky">
        <div className="airframe-copy" data-reveal>
          <span className="eyebrow">AUTHENTIC STRUCTURE</span>
          <h2>真实结构<br /><span>真实飞行</span></h2>
          <p>所有结构展示严格基于现有整机与机架素材。不替换顶板、底板、侧板和绑带，不添加不存在的零件。</p>
          <ArrowLink to={href("contact")}>讨论无人机方案</ArrowLink>
        </div>

        <div className="airframe-carousel" aria-label="真实 FPV 素材滚动展示">
          {airframeSlides.map((slide, index) => {
            const depth = index - progress * (airframeSlides.length - 1);
            const distance = Math.abs(depth);
            const x = depth * 250;
            const y = distance * 26 + depth * 8;
            const rotate = depth * 5.5;
            const scale = Math.max(0.78, 1 - distance * 0.075);
            const opacity = clamp(1 - distance * 0.28, 0.18, 1);

            return (
              <figure
                className="airframe-slide"
                key={slide.image}
                style={{
                  "--slide-x": `${x}px`,
                  "--slide-y": `${y}px`,
                  "--slide-r": `${rotate}deg`,
                  "--slide-s": scale,
                  "--slide-o": opacity,
                  zIndex: 20 - Math.round(distance * 3),
                }}
              >
                <img src={media(slide.image)} alt={slide.title} loading="lazy" decoding="async" />
                <figcaption>
                  <span>{slide.tag}</span>
                  <strong>{slide.title}</strong>
                  <em>{slide.text}</em>
                </figcaption>
              </figure>
            );
          })}
          <div className="airframe-carousel__hud" aria-hidden="true">
            <span>{airframeSlides[activeIndex].tag}</span>
            <strong>{airframeSlides[activeIndex].title}</strong>
            <i><b style={{ width: `${progress * 100}%` }} /></i>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FpvPage() {
  return <PageShell active="fpv" title="FPV 与无人机方案">
    <PageHero index="03" eyebrow="FLIGHT SYSTEM" className="page-hero--fpv page-hero--immersive" title={<>从结构调试<br /><span>到飞行展示</span></>} description="围绕 FPV 穿越机、无人机整机、活动飞行和定制应用，提供结构设计、装配调试、展示执行与技术支持。" image="fpv-flight-1.jpg"><div className="flight-meta"><span>FIELD TESTED</span><span>REAL AIRFRAME</span><span>NO GENERIC PARTS</span></div></PageHero>
    <section className="section capability-grid"><div className="section-heading" data-reveal><div><span className="eyebrow">FLIGHT CAPABILITY</span><h2>把飞行体验建立在工程验证上</h2></div><p>从装配前的结构判断，到飞行后的数据复盘，能力被拆成可执行、可验证的工程环节。</p></div><div className="capability-cards">{flightCapabilities.map(([Icon, title, text, details], i) => <article data-reveal key={title}><span>0{i + 1}</span><Icon size={40} weight="thin" /><div><small>0{i + 1} / FLIGHT MODULE</small><h3>{title}</h3><p>{text}</p><ul>{details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}</div></section>
    <AirframeScrollShowcase />
    <section className="flight-band"><img src={media("fpv-studio.jpg")} alt="FPV 飞行器现场检查" /><div data-reveal><span className="eyebrow">FIELD EXECUTION · LINK VERIFIED</span><h2>速度感来自真实飞行<br /><span>不是虚构结构</span></h2><p>飞行器、图传链路与现场安全共同组成一次可靠的展示执行。</p><div className="flight-band__tags"><span>REAL AIRFRAME</span><span>FIELD TESTED</span><span>SAFETY CHECKED</span></div></div></section>
  </PageShell>;
}
