import { ArrowRight, DownloadSimple, FileText, Question, Sparkle } from "@phosphor-icons/react";
import { href } from "../utils/site";
import { PageShell } from "../components/layout/PageShell";

const supportEntries = [
  {
    icon: DownloadSimple,
    eyebrow: "DOWNLOAD",
    title: "软件下载",
    desc: "SOZO Dock 桌面控制软件将优先支持 Windows，macOS 版本后续跟进。",
    status: "准备中",
  },
  {
    icon: FileText,
    eyebrow: "MANUAL",
    title: "用户手册",
    desc: "面向普通用户的快速开始、灯效设置、桌面连接和日常使用说明。",
    status: "规划中",
  },
  {
    icon: Sparkle,
    eyebrow: "CHANGELOG",
    title: "更新日志",
    desc: "记录 Dock App、产品能力和公开版本变化，方便用户了解每次更新。",
    status: "预留",
  },
  {
    icon: Question,
    eyebrow: "FAQ",
    title: "常见问题",
    desc: "整理连接、灯效、拾音、敲击交互和使用场景中的常见问题。",
    status: "预留",
  },
];

export function SupportPage() {
  return (
    <PageShell active="support" title="支持">
      <section className="support-hero">
        <div data-reveal>
          <span className="eyebrow">SUPPORT · SOZO DOCK</span>
          <h1>让产品发布后<br /><span>有人能顺利用起来</span></h1>
          <p>支持中心先作为轻量入口预留。后续 SOZO Dock 发布时，这里会承接软件下载、用户手册、更新日志和常见问题。</p>
        </div>
      </section>

      <section className="section support-grid">
        {supportEntries.map((item) => {
          const Icon = item.icon;
          return (
            <article data-reveal key={item.title}>
              <Icon />
              <small>{item.eyebrow}</small>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <span>{item.status}</span>
            </article>
          );
        })}
      </section>

      <section className="section support-note">
        <div data-reveal>
          <span className="eyebrow">PRODUCT FIRST</span>
          <h2>先把入口建好，内容跟着产品发布补齐</h2>
        </div>
        <p data-reveal>当前阶段不把支持中心做成复杂文档系统，只保留清晰入口。等 Dock App、Windows 版本和用户手册稳定后，再逐步填充内容。</p>
        <a className="arrow-link" href={href("contact")} data-reveal>联系合作 <ArrowRight /></a>
      </section>
    </PageShell>
  );
}
