import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { dockFeatures, dockPromiseCards, dockSupportCards, hardwareNodes } from "../data/dock";
import { href, media } from "../utils/site";
import { PageHero } from "../components/layout/PageHero";
import { PageShell } from "../components/layout/PageShell";
import { SignalTag } from "../components/ui/SignalTag";

function DockHeroModel() {
  return (
    <div className="dock-hero-model">
      <svg className="dock-model-svg" viewBox="0 0 760 420" focusable="false">
        <defs>
          <linearGradient id="dockAcrylic" x1="16%" y1="16%" x2="86%" y2="84%">
            <stop offset="0%" stopColor="#f2fbff" stopOpacity=".78" />
            <stop offset="44%" stopColor="#bdeeff" stopOpacity=".34" />
            <stop offset="100%" stopColor="#7edcff" stopOpacity=".16" />
          </linearGradient>
          <linearGradient id="dockEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e9fbff" stopOpacity=".12" />
            <stop offset="48%" stopColor="#d5f7ff" stopOpacity=".86" />
            <stop offset="100%" stopColor="#7edcff" stopOpacity=".18" />
          </linearGradient>
          <linearGradient id="dockMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5f6f7b" />
            <stop offset="44%" stopColor="#d5e7ee" />
            <stop offset="100%" stopColor="#4f6674" />
          </linearGradient>
          <filter id="dockHeroGlow" x="-30%" y="-80%" width="160%" height="240%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.32 0 0 0 0 0.82 0 0 0 0 1 0 0 0 .7 0" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <ellipse className="dock-model-shadow" cx="384" cy="334" rx="280" ry="35" />
        <path className="dock-model-underlight" d="M143 222 C275 196 438 172 654 140" />
        <g className="dock-model-legs">
          <path className="dock-model-leg dock-model-leg--back" d="M116 144 L116 205" />
          <path className="dock-model-leg dock-model-leg--back" d="M586 83 L586 151" />
          <path className="dock-model-leg" d="M159 218 L159 296" />
          <path className="dock-model-leg" d="M655 142 L655 238" />
          <ellipse className="dock-model-foot" cx="159" cy="302" rx="31" ry="8" />
          <ellipse className="dock-model-foot" cx="655" cy="244" rx="31" ry="8" />
          <ellipse className="dock-model-foot dock-model-foot--back" cx="116" cy="209" rx="23" ry="6" />
          <ellipse className="dock-model-foot dock-model-foot--back" cx="586" cy="156" rx="23" ry="6" />
        </g>
        <path className="dock-model-rail dock-model-rail--rear" d="M118 146 L586 84" />
        <path className="dock-model-board" d="M101 129 L582 65 Q605 62 622 75 L690 126 Q704 137 686 145 L177 220 Q155 223 139 210 L86 166 Q73 154 101 129Z" />
        <path className="dock-model-board-core" d="M137 137 L580 81 Q596 79 609 89 L654 123 Q664 131 651 136 L184 202 Q168 204 157 196 L118 163 Q109 154 137 137Z" />
        <path className="dock-model-edge dock-model-edge--front" d="M145 214 L684 138" />
        <path className="dock-model-edge dock-model-edge--left" d="M94 160 L145 214" />
        <path className="dock-model-edge dock-model-edge--right" d="M620 77 L684 138" />
        <path className="dock-model-rail dock-model-rail--front" d="M158 245 C284 221 455 197 654 166" />
        <g className="dock-model-caps">
          <circle cx="119" cy="146" r="15" />
          <circle cx="586" cy="84" r="15" />
          <circle cx="159" cy="214" r="18" />
          <circle cx="655" cy="139" r="18" />
        </g>
        <g className="dock-model-leg-overlays">
          <path className="dock-model-leg dock-model-leg--back" d="M116 146 L116 205" />
          <path className="dock-model-leg dock-model-leg--back" d="M586 86 L586 154" />
          <path className="dock-model-leg" d="M159 213 L159 294" />
          <path className="dock-model-leg" d="M655 139 L655 236" />
        </g>
        <path className="dock-model-glint" d="M194 133 C306 114 438 95 566 82" />
      </svg>
      <span className="dock-model-note">ACRYLIC · ALUMINUM · DESK LIGHT</span>
    </div>
  );
}

function DockPromise() {
  return (
    <section className="section dock-promise">
      <div className="section-heading" data-reveal>
        <div><span className="eyebrow">PRODUCT POSITIONING</span><h2>不是一个带灯的架子</h2></div>
        <p>SOZO Dock 要解决的不只是桌面收纳，而是让工程桌面拥有状态、反馈和控制能力。</p>
      </div>
      <div className="dock-promise__grid">
        {dockPromiseCards.map(([num, title, desc]) => <article data-reveal key={title}><span>{num}</span><h3>{title}</h3><p>{desc}</p></article>)}
      </div>
    </section>
  );
}

function DockExplodeScroll() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const raw = (window.innerHeight * 0.38 - rect.top) / travel;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const partStyle = (shift, scale = 1, fade = 0) => ({
    transform: `translate3d(0, ${Math.round(progress * shift)}px, 0) scale(${1 + progress * (scale - 1)})`,
    opacity: Math.max(0, 1 - progress * fade),
  });

  return (
    <section className="dock-explode" ref={sectionRef}>
      <div className="dock-explode__sticky">
        <div className="dock-explode__copy" data-reveal>
          <span className="eyebrow">SCROLL EXPLODED VIEW</span>
          <h2>滑动拆开<br /><span>桌面控制中心</span></h2>
          <p>用分层方式解释 SOZO Dock 的工作逻辑：半透明桌面、灯效反馈、铝型材支撑、控制与传感模块。这里是官网演示层级，最终结构以后用实拍或 3D 模型替换。</p>
          <div className="dock-explode__progress" aria-hidden="true">
            <i style={{ width: `${Math.round(progress * 100)}%` }} />
            <span>{Math.round(progress * 100)}%</span>
          </div>
        </div>

        <div className="dock-explode__stage" aria-label="SOZO Dock 分层解构演示">
          <img className="dock-explode__ghost" src={media("dock-ambient.jpg")} alt="" />
          <div className="dock-explode__part dock-explode__part--cover" style={partStyle(-170, 1.02)}>
            <span>FROSTED ACRYLIC SURFACE</span>
          </div>
          <div className="dock-explode__part dock-explode__part--light" style={partStyle(-78, 1.04)}>
            <span>WS2812 LIGHT FIELD</span>
            <i />
          </div>
          <div className="dock-explode__part dock-explode__part--frame" style={partStyle(64, 1)}>
            <span>ALUMINUM RAIL FRAME</span>
          </div>
          <div className="dock-explode__part dock-explode__part--legs" style={partStyle(144, 1)}>
            <i /><i /><i /><i />
            <span>DESK SUPPORT</span>
          </div>
          <div className="dock-explode__part dock-explode__part--control" style={partStyle(218, .98)}>
            <small>CONTROL</small>
            <strong>ESP32-C3 / IMU / MIC</strong>
            <p>输入、处理和灯效反馈汇入桌面控制链路。</p>
          </div>
          <div className="dock-explode__signal dock-explode__signal--a" style={partStyle(-120, 1, .18)}>LIGHT</div>
          <div className="dock-explode__signal dock-explode__signal--b" style={partStyle(120, 1, .18)}>INPUT</div>
        </div>
      </div>
    </section>
  );
}

function HardwareSystem() {
  return (
    <section className="section hardware-system">
      <div className="section-heading" data-reveal><div><span className="eyebrow">HARDWARE SIGNAL MAP</span><h2>硬件系统</h2></div><p>输入、融合、控制与反馈组成完整信号链；每一层都可以独立调试和持续迭代。</p></div>
      <div className="hardware-flow"><span>INPUT / 输入</span><ArrowRight /><span>PROCESS / 处理</span><ArrowRight /><span>OUTPUT / 反馈</span></div>
      <div className="hardware-line">{hardwareNodes.map(([Icon, title, en, desc]) => <div className="hardware-node" data-reveal key={title}><Icon size={38} weight="thin" /><small>{en}</small><strong>{title}</strong><p>{desc}</p></div>)}</div>
    </section>
  );
}

function DockSupport() {
  return (
    <section className="section dock-support">
      <div className="section-heading" data-reveal>
        <div><span className="eyebrow">SOFTWARE & SUPPORT</span><h2>软件、手册与更新会集中在这里</h2></div>
        <p>首发以 Windows 用户为核心，文档保持普通用户能看懂；macOS、更新日志和下载入口按产品发布节奏逐步开放。</p>
      </div>
      <div className="dock-support__grid">
        {dockSupportCards.map((item) => <article data-reveal key={item.title}><small>{item.eyebrow}</small><h3>{item.title}</h3><p>{item.desc}</p><span>{item.status}</span></article>)}
      </div>
    </section>
  );
}

export function DockPage() {
  const [feature, setFeature] = useState(0);

  return <PageShell active="dock" title="SOZO Dock 桌面控制中心">
    <PageHero
      index="02"
      eyebrow="DESKTOP CONTROL"
      className="page-hero--dock page-hero--immersive"
      title={<>SOZO Dock<br /><span>桌面不只是桌面</span></>}
      description="面向工程师与创客的桌面控制中心。它不是从效果图开始的概念，而是从真实工程桌面长出来的第一块控制硬件。"
      image="dock-ambient.jpg"
      visual={<DockHeroModel />}
    >
      <div className="status-pill"><i /> 原型验证与功能迭代中</div>
    </PageHero>
    <DockExplodeScroll />
    <DockPromise />
    <section className="section dock-annotation"><div className="section-heading" data-reveal><div><span className="eyebrow">CONTROL SURFACE</span><h2>让桌面成为输入与反馈界面</h2></div><p>真实产品照片承担结构表达，标注只解释已验证的功能区域。</p></div><figure data-reveal><img src={media("dock-exhibit.jpg")} alt="SOZO Dock 展示实景" /><SignalTag className="dock-note dock-note--a" eyebrow="LIGHT SYSTEM" title="多路灯效" /><SignalTag className="dock-note dock-note--b" eyebrow="CONTROL MODULE" title="电脑通信" /><SignalTag className="dock-note dock-note--c" eyebrow="WORK SURFACE" title="桌面整合" /></figure></section>
    <section className="section feature-console"><div className="feature-tabs" role="tablist" aria-label="SOZO Dock 核心功能">{dockFeatures.map((item, index) => <button role="tab" aria-selected={feature === index} onClick={() => setFeature(index)} key={item.title}><span>0{index + 1}</span>{item.title}</button>)}</div><div className="feature-display" data-reveal>{(() => { const item = dockFeatures[feature]; const Icon = item.icon; return <><Icon size={44} weight="thin" /><small>{item.en}</small><h2>{item.title}</h2><p>{item.text}</p><div className="feature-facts">{item.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><div className="feature-chips">{item.chips.map((chip) => <span key={chip}>{chip}</span>)}</div><a className="arrow-link" href="https://github.com/xutix/SOZO-DOCK" target="_blank" rel="noreferrer">查看固件实现 <ArrowRight /></a></>; })()}</div></section>
    <HardwareSystem />
    <DockSupport />
    <section className="section development-band" data-reveal><div><span className="eyebrow">CURRENT STATUS · LIVE</span><h2>诚实记录每一次点亮</h2><p>SOZO Dock 当前处于原型验证与功能迭代阶段，正在优化灯效系统、敲击识别、音频律动和桌面控制体验。</p></div><figure><img src={media("dock-development.jpg")} alt="SOZO Dock 研发阶段" /></figure></section>
  </PageShell>;
}
