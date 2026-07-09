import { ArrowRight } from "@phosphor-icons/react";
import { href, media } from "../utils/site";
import { PageShell } from "../components/layout/PageShell";

const homePanels = [
  {
    eyebrow: "SOZO TECH",
    title: ["把工程能力", "做成真实产品"],
    description: "索卓科技围绕 SOZO Dock、FPV 与桌面工程工具，把真实研发现场里的结构、电子和体验整理成可验证、可展示、可交付的产品。",
    image: "tool-workstation.jpg",
    primary: { label: "查看 SOZO Dock", to: "dock" },
    secondary: { label: "了解产品方向", to: "products" },
    align: "left-bottom",
  },
  {
    eyebrow: "FIRST PRODUCT",
    title: "SOZO Dock",
    description: "从真实工作台出发，把灯效反馈、敲击输入、桌面控制和电脑通信收进一块清晰的硬件入口。",
    image: "dock-ambient.jpg",
    primary: { label: "进入产品页", to: "dock" },
    align: "left-bottom",
  },
  {
    eyebrow: "FLIGHT SYSTEM",
    title: "FPV 与无人机",
    description: "整机装配、图传链路、飞控调试与现场展示执行，构成索卓面向真实飞行场景的工程能力。",
    image: "fpv-flight-1.jpg",
    primary: { label: "查看飞行系统", to: "fpv" },
    align: "right-bottom",
  },
  {
    eyebrow: "ENGINEERING TOOLS",
    title: "从工作台长出来的工具",
    description: "模块化烙铁、桌面供电、升降桌和控制界面，都来自日常研发里反复出现的效率问题。",
    image: "soldering-product.jpg",
    primary: { label: "查看案例记录", to: "cases" },
    align: "left-bottom",
  },
  {
    eyebrow: "MAKER EDUCATION",
    title: "把技术变成可参与体验",
    description: "展会、课程和校企活动让工程能力被看见，也让产品判断回到真实用户和真实场景。",
    video: "robot-dog-school.mp4",
    poster: "robot-dog.jpg",
    primary: { label: "浏览项目图库", to: "gallery" },
    secondary: { label: "联系合作", to: "contact" },
    align: "left-bottom",
  },
];

function PanelActions({ primary, secondary }) {
  return (
    <div className="cinematic-panel__actions">
      {primary && (
        <a className="button button--solid" href={href(primary.to)}>
          {primary.label}
          <ArrowRight />
        </a>
      )}
      {secondary && (
        <a className="button" href={href(secondary.to)}>
          {secondary.label}
        </a>
      )}
    </div>
  );
}

function HomePanel({ panel, index }) {
  const mediaClass = panel.video ? "cinematic-panel__media cinematic-panel__media--video" : "cinematic-panel__media";

  return (
    <section className={`cinematic-panel cinematic-panel--${panel.align}`} data-reveal>
      <div className={mediaClass} aria-hidden="true">
        {panel.image && <img src={media(panel.image)} alt="" />}
        {panel.video && (
          <>
            <img className="cinematic-panel__poster" src={media(panel.poster)} alt="" />
            <video src={media(panel.video)} poster={media(panel.poster)} autoPlay muted loop playsInline preload="metadata" />
          </>
        )}
      </div>
      <div className="cinematic-panel__shade" />
      <div className="cinematic-panel__copy">
        <span className="eyebrow">{panel.eyebrow} / 0{index + 1}</span>
        <h1>{Array.isArray(panel.title) ? panel.title.map((line) => <span key={line}>{line}</span>) : panel.title}</h1>
        <p>{panel.description}</p>
        <PanelActions primary={panel.primary} secondary={panel.secondary} />
      </div>
      <div className="cinematic-panel__index">0{index + 1} / 0{homePanels.length}</div>
    </section>
  );
}

export function HomePage() {
  return (
    <PageShell active="home" title="工程造物、FPV 无人机与创客教育">
      <div className="home-cinematic" aria-label="索卓科技全屏产品叙事">
        {homePanels.map((panel, index) => (
          <HomePanel panel={panel} index={index} key={panel.eyebrow} />
        ))}
      </div>
    </PageShell>
  );
}
