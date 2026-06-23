import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { dockFeatures, dockPromiseCards, dockSupportCards, hardwareNodes } from "../data/dock";
import { href, media } from "../utils/site";
import { PageHero } from "../components/layout/PageHero";
import { PageShell } from "../components/layout/PageShell";
import { SignalTag } from "../components/ui/SignalTag";

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
    <PageHero index="02" eyebrow="DESKTOP CONTROL" className="page-hero--dock page-hero--immersive" title={<>SOZO Dock<br /><span>桌面不只是桌面</span></>} description="面向工程师与创客的桌面控制中心。它不是从效果图开始的概念，而是从真实工程桌面长出来的第一块控制硬件。" image="dock-ambient.jpg"><div className="status-pill"><i /> 原型验证与功能迭代中</div></PageHero>
    <DockPromise />
    <section className="section dock-annotation"><div className="section-heading" data-reveal><div><span className="eyebrow">CONTROL SURFACE</span><h2>让桌面成为输入与反馈界面</h2></div><p>真实产品照片承担结构表达，标注只解释已验证的功能区域。</p></div><figure data-reveal><img src={media("dock-exhibit.jpg")} alt="SOZO Dock 展示实景" /><SignalTag className="dock-note dock-note--a" eyebrow="LIGHT SYSTEM" title="多路灯效" /><SignalTag className="dock-note dock-note--b" eyebrow="CONTROL MODULE" title="电脑通信" /><SignalTag className="dock-note dock-note--c" eyebrow="WORK SURFACE" title="桌面整合" /></figure></section>
    <section className="section feature-console"><div className="feature-tabs" role="tablist" aria-label="SOZO Dock 核心功能">{dockFeatures.map((item, index) => <button role="tab" aria-selected={feature === index} onClick={() => setFeature(index)} key={item.title}><span>0{index + 1}</span>{item.title}</button>)}</div><div className="feature-display" data-reveal>{(() => { const item = dockFeatures[feature]; const Icon = item.icon; return <><Icon size={44} weight="thin" /><small>{item.en}</small><h2>{item.title}</h2><p>{item.text}</p><div className="feature-facts">{item.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><div className="feature-chips">{item.chips.map((chip) => <span key={chip}>{chip}</span>)}</div><a className="arrow-link" href="https://github.com/xutix/SOZO-DOCK" target="_blank" rel="noreferrer">查看固件实现 <ArrowRight /></a></>; })()}</div></section>
    <HardwareSystem />
    <DockSupport />
    <section className="section development-band" data-reveal><div><span className="eyebrow">CURRENT STATUS · LIVE</span><h2>诚实记录每一次点亮</h2><p>SOZO Dock 当前处于原型验证与功能迭代阶段，正在优化灯效系统、敲击识别、音频律动和桌面控制体验。</p></div><figure><img src={media("dock-development.jpg")} alt="SOZO Dock 研发阶段" /></figure></section>
  </PageShell>;
}
