import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Atom,
  Broadcast,
  Check,
  Circuitry,
  Cube,
  EnvelopeSimple,
  Gauge,
  GraduationCap,
  List,
  MapPin,
  Microphone,
  Monitor,
  PaperPlaneTilt,
  Phone,
  SlidersHorizontal,
  Sparkle,
  Wrench,
  X,
} from "@phosphor-icons/react";

const base = import.meta.env.BASE_URL;
const media = (name) => `${base}media/${name}`;

const pages = {
  home: { file: "index.html", label: "首页" },
  products: { file: "products.html", label: "产品方向" },
  dock: { file: "dock.html", label: "SOZO Dock" },
  fpv: { file: "fpv.html", label: "FPV 与无人机" },
  cases: { file: "cases.html", label: "服务案例" },
  about: { file: "about.html", label: "关于我们" },
  contact: { file: "contact.html", label: "联系合作" },
};

const href = (key) => `${base}${pages[key].file}`;

function currentPage() {
  const file = window.location.pathname.split("/").pop() || "index.html";
  return Object.entries(pages).find(([, page]) => page.file === file)?.[0] || "home";
}

function useReveals() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Brand({ compact = false }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href={href("home")} aria-label="SOZO Tech 首页">
      <img src={media("logo.png")} alt="" />
      <span><b>SOZO Tech</b><small>索卓科技</small></span>
    </a>
  );
}

function SiteHeader({ active }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);
  const nav = ["products", "dock", "fpv", "cases", "about"];
  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="主导航">
        {nav.map((key) => <a className={active === key ? "active" : ""} href={href(key)} key={key}>{pages[key].label}</a>)}
      </nav>
      <a className="nav-contact" href={href("contact")}>联系合作 <ArrowRight weight="bold" /></a>
      <button className="menu-button" aria-label="打开菜单" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X /> : <List />}
      </button>
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        {Object.entries(pages).filter(([key]) => key !== "home").map(([key, page], index) => (
          <a href={href(key)} key={key}><span>0{index + 1}</span>{page.label}<ArrowRight /></a>
        ))}
      </div>
    </header>
  );
}

function SignalTag({ eyebrow, title, className = "" }) {
  return <div className={`signal-tag ${className}`}><i /><span><small>{eyebrow}</small>{title}</span></div>;
}

function ArrowLink({ to, children }) {
  return <a className="arrow-link" href={to}>{children}<ArrowRight weight="bold" /></a>;
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div><span className="eyebrow">START A PROJECT · 07</span><h2>让工程信号，接入真实世界。</h2></div>
        <ArrowLink to={href("contact")}>联系合作</ArrowLink>
      </div>
      <div className="footer-grid">
        <Brand compact />
        <div><small>业务方向</small><a href={href("dock")}>SOZO Dock</a><a href={href("fpv")}>FPV 与无人机</a><a href={href("cases")}>服务与案例</a></div>
        <div><small>联系</small><a href="mailto:xutic@icloud.com">xutic@icloud.com</a><span>西安 · 中国</span><span>sozotech.cn</span></div>
        <div className="footer-meta"><span>© 2026 SOZO Tech</span><span>陕ICP备XXXXXXXX号</span></div>
      </div>
    </footer>
  );
}

function PageShell({ active, children, title }) {
  useReveals();
  useEffect(() => { document.title = `${title} · SOZO Tech 索卓科技`; window.scrollTo(0, 0); }, [title]);
  return <><a className="skip-link" href="#content">跳到主要内容</a><SiteHeader active={active} /><main id="content">{children}</main><Footer /></>;
}

function HomeHero() {
  return (
    <section className="signal-hero">
      <div className="hero-copy" data-reveal>
        <span className="eyebrow">ENGINEERING SIGNAL FIELD · ONLINE</span>
        <h1>从结构到飞行，<br />把工程想法<br />做成<span>真实产品</span>。</h1>
        <p>索卓科技是一支从 FPV、硬件研发和创客实践中成长起来的工程团队。</p>
        <div className="hero-actions"><a className="button button--solid" href={href("products")}>探索产品方向 <ArrowRight /></a><a className="button" href={href("contact")}>联系合作</a></div>
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

const directions = [
  { num: "01", key: "dock", en: "DESKTOP CONTROL", title: "SOZO Dock", desc: "桌面控制中心与工程桌面入口", image: "dock-exhibit.jpg" },
  { num: "02", key: "fpv", en: "FLIGHT SYSTEM", title: "FPV 与无人机", desc: "穿越机整机、调试与展示飞行", image: "fpv-studio.jpg" },
  { num: "03", key: "cases", en: "ENGINEERING TOOLS", title: "工程工具", desc: "滑动电烙铁、桌面工具与原型开发", image: "soldering-product.jpg" },
  { num: "04", key: "cases", en: "MAKER LAB", title: "创客教育", desc: "课程、展项与科技活动互动方案", image: "robot-dog.jpg" },
];

function DirectionRail() {
  return (
    <section className="section direction-section">
      <div className="section-heading" data-reveal><div><span className="eyebrow">DIRECTION NODES · 01—04</span><h2>我们正在做的事</h2></div><p>从桌面控制到飞行系统，四个方向共享同一种工程方法。</p></div>
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

const featured = [
  { tag: "PRODUCT R&D", title: "SOZO Dock 桌面控制中心", image: "dock-first-light.jpg", to: "dock" },
  { tag: "FLIGHT EXECUTION", title: "FPV 飞行展示与活动执行", image: "fpv-flight-2.jpg", to: "fpv" },
  { tag: "MAKER EDUCATION", title: "高校创客课程与科技活动", image: "maker-class.jpg", to: "cases" },
];

function ProjectStrip() {
  return (
    <section className="section projects-section">
      <div className="section-heading" data-reveal><div><span className="eyebrow">SELECTED WORK · 03</span><h2>精选项目</h2></div><ArrowLink to={href("cases")}>查看全部案例</ArrowLink></div>
      <div className="project-strip">{featured.map((item, index) => <a href={href(item.to)} className={`project-tile project-tile--${index + 1}`} key={item.title} data-reveal><img src={media(item.image)} alt="" /><span>{item.tag}</span><h3>{item.title}</h3><ArrowRight /></a>)}</div>
    </section>
  );
}

function HomePage() {
  return <PageShell active="home" title="工程造物、FPV 无人机与创客教育"><HomeHero /><DirectionRail /><ProjectStrip /></PageShell>;
}

function PageHero({ index, eyebrow, title, description, image, children, className = "" }) {
  return (
    <section className={`page-hero ${className}`}>
      <div className="page-hero__copy" data-reveal><span className="eyebrow">{eyebrow} · {index}</span><h1>{title}</h1><p>{description}</p>{children}</div>
      <figure className="page-hero__image"><img src={media(image)} alt="" /><span className="image-index">{index} / SIGNAL FIELD</span></figure>
    </section>
  );
}

function ProductsPage() {
  return <PageShell active="products" title="产品方向">
    <PageHero index="01" eyebrow="PRODUCT DIRECTIONS" className="page-hero--products page-hero--immersive" title={<>四个方向<br /><span>一套工程方法</span></>} description="我们从真实需求出发，把结构、电子、固件、桌面工具、飞行器与展示体验连接成可落地的产品。" image="tool-workstation.jpg" />
    <section className="section product-manifest"><div className="section-heading" data-reveal><div><span className="eyebrow">SYSTEM MAP</span><h2>产品与能力坐标</h2></div><p>每个方向独立成页，但它们共享原型验证、现场测试与持续迭代。</p></div>{directions.map((item) => <a href={href(item.key)} className="manifest-row" key={item.num} data-reveal><span>{item.num}</span><div><small>{item.en}</small><h3>{item.title}</h3></div><p>{item.desc}</p><figure><img src={media(item.image)} alt="" /></figure><ArrowRight /></a>)}</section>
    <ProcessSection />
  </PageShell>;
}

function ProcessSection() {
  const steps = [["01", "真实需求", "从使用场景与现场问题出发", "访谈 · 场景拆解"], ["02", "快速原型", "结构、硬件与固件并行验证", "建模 · 焊接 · 调试"], ["03", "工程测试", "在桌面、飞行与活动现场中检验", "数据 · 可靠性 · 体验"], ["04", "持续交付", "迭代到真正可用、可展示的状态", "复盘 · 优化 · 支持"]];
  return <section className="section process-section"><div className="section-heading" data-reveal><div><span className="eyebrow">ENGINEERING LOOP</span><h2>从想法到现场</h2></div><p>每一步都有明确输入、验证动作与工程输出，不让产品停留在概念阶段。</p></div><div className="process-grid">{steps.map(([n, t, d, note]) => <div data-reveal key={n}><span>{n}</span><small>{note}</small><h3>{t}</h3><p>{d}</p></div>)}</div></section>;
}

const dockFeatures = [
  { icon: Sparkle, title: "灯效氛围", en: "LIGHT FIELD", text: "左、中、右三段 WS2812 被映射成连续逻辑灯带，让整张桌面拥有统一、可编排的反馈界面。", facts: [["250", "默认灯珠"], ["3", "独立灯区"], ["11+", "动态模式"]], chips: ["彩虹流动", "流星", "亚克力呼吸", "桌面极光", "玻璃流光", "低频涟漪", "专注模式"] },
  { icon: Gauge, title: "敲击交互", en: "TAP INPUT", text: "双 LSM6DS3 通过 SPI 采集左右结构振动，结合声音瞬态确认敲击，降低桌面误触发。", facts: [["2", "IMU 传感器"], ["L/R", "区域识别"], ["3", "敲击序列"]], chips: ["左右识别", "双击动作", "三击切换", "多击输入", "声音融合", "学习与校准"] },
  { icon: Monitor, title: "电脑控制", en: "PC CONTROL", text: "BLE HID 将敲击动作映射为电脑多媒体与快捷控制，同时保留 USB 串口配置和状态输出。", facts: [["BLE", "无线控制"], ["HID", "标准协议"], ["USB", "配置链路"]], chips: ["播放 / 暂停", "上下曲", "音量与静音", "锁屏", "灯效快捷动作", "串口命令"] },
  { icon: Microphone, title: "音频律动", en: "AUDIO REACTIVE", text: "INMP441 通过 I²S 获取声音能量，实时计算 RMS、包络与鼓点，让光效跟随环境或 PC 音频。", facts: [["I²S", "数字拾音"], ["RMS", "能量分析"], ["BEAT", "鼓点检测"]], chips: ["快速 / 慢速能量", "可调增益", "Attack / Release", "MIC / PC 音源", "鼓点脉冲"] },
  { icon: SlidersHorizontal, title: "桌面整合", en: "DESK WORKFLOW", text: "增高架、收纳、控制与状态反馈被整合为同一工作入口，参数可保存并持续迭代。", facts: [["ESP32-C3", "主控制器"], ["25ms", "灯效刷新"], ["APP", "上位机接口"]], chips: ["桌面增高", "设备收纳", "状态反馈", "参数保存", "固件升级", "App 通信"] },
];

function DockPage() {
  const [feature, setFeature] = useState(0);
  return <PageShell active="dock" title="SOZO Dock 桌面控制中心">
    <PageHero index="02" eyebrow="DESKTOP CONTROL" className="page-hero--dock page-hero--immersive" title={<>SOZO Dock<br /><span>桌面不只是桌面</span></>} description="面向工程师与创客的桌面控制中心。以桌面增高架为载体，把灯效、敲击交互、音频律动和电脑控制整合到工程桌面。" image="dock-ambient.jpg"><div className="status-pill"><i /> 原型验证与功能迭代中</div></PageHero>
    <section className="section dock-annotation"><div className="section-heading" data-reveal><div><span className="eyebrow">CONTROL SURFACE</span><h2>让桌面成为输入与反馈界面</h2></div><p>真实产品照片承担结构表达，标注只解释已验证的功能区域。</p></div><figure data-reveal><img src={media("dock-exhibit.jpg")} alt="SOZO Dock 展示实景" /><SignalTag className="dock-note dock-note--a" eyebrow="LIGHT SYSTEM" title="多路灯效" /><SignalTag className="dock-note dock-note--b" eyebrow="CONTROL MODULE" title="电脑通信" /><SignalTag className="dock-note dock-note--c" eyebrow="WORK SURFACE" title="桌面整合" /></figure></section>
    <section className="section feature-console"><div className="feature-tabs" role="tablist" aria-label="SOZO Dock 核心功能">{dockFeatures.map((item, index) => <button role="tab" aria-selected={feature === index} onClick={() => setFeature(index)} key={item.title}><span>0{index + 1}</span>{item.title}</button>)}</div><div className="feature-display" data-reveal>{(() => { const item = dockFeatures[feature]; const Icon = item.icon; return <><Icon size={44} weight="thin" /><small>{item.en}</small><h2>{item.title}</h2><p>{item.text}</p><div className="feature-facts">{item.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><div className="feature-chips">{item.chips.map((chip) => <span key={chip}>{chip}</span>)}</div><a className="arrow-link" href="https://github.com/xutix/SOZO-DOCK" target="_blank" rel="noreferrer">查看固件实现 <ArrowRight /></a></>; })()}</div></section>
    <HardwareSystem />
    <section className="section development-band" data-reveal><div><span className="eyebrow">CURRENT STATUS · LIVE</span><h2>诚实记录每一次点亮。</h2><p>SOZO Dock 当前处于原型验证与功能迭代阶段，正在优化灯效系统、敲击识别、音频律动和桌面控制体验。</p></div><figure><img src={media("dock-development.jpg")} alt="SOZO Dock 研发阶段" /></figure></section>
  </PageShell>;
}

function HardwareSystem() {
  const nodes = [[Gauge, "双 LSM6DS3", "SENSING", "左右振动与区域敲击"], [Microphone, "INMP441", "AUDIO", "RMS、包络与鼓点检测"], [Circuitry, "ESP32-C3", "CONTROL", "传感融合与动作路由"], [Sparkle, "三路 WS2812", "LIGHT", "左中右统一灯效引擎"], [Broadcast, "BLE HID", "WIRELESS", "多媒体与快捷控制"], [Monitor, "USB Serial", "INTERFACE", "配置、遥测与调试"], [SlidersHorizontal, "Command Router", "FIRMWARE", "参数、模式与状态管理"], [Atom, "PC App", "DESKTOP", "可视化配置与设备入口"]];
  return <section className="section hardware-system"><div className="section-heading" data-reveal><div><span className="eyebrow">HARDWARE SIGNAL MAP</span><h2>硬件系统</h2></div><p>输入、融合、控制与反馈组成完整信号链；每一层都可以独立调试和持续迭代。</p></div><div className="hardware-flow"><span>INPUT / 输入</span><ArrowRight /><span>PROCESS / 处理</span><ArrowRight /><span>OUTPUT / 反馈</span></div><div className="hardware-line">{nodes.map(([Icon, title, en, desc]) => <div className="hardware-node" data-reveal key={title}><Icon size={38} weight="thin" /><small>{en}</small><strong>{title}</strong><p>{desc}</p></div>)}</div></section>;
}

function FpvPage() {
  const caps = [[Cube, "整机搭建", "从真实机架、动力与载荷需求出发完成整机配置。", ["结构与载荷匹配", "动力系统配置"]], [SlidersHorizontal, "飞控调试", "完成飞控参数、姿态响应与飞行手感调校。", ["滤波与 PID", "模式与失控保护"]], [Broadcast, "图传链路", "围绕视频传输、天线和现场链路进行验证。", ["链路与天线布局", "现场干扰验证"]], [PaperPlaneTilt, "展示飞行", "提供活动飞行、拉烟、拉旗与互动演示。", ["飞行脚本与安全区", "现场执行与保障"]]];
  return <PageShell active="fpv" title="FPV 与无人机方案">
    <PageHero index="03" eyebrow="FLIGHT SYSTEM" className="page-hero--fpv page-hero--immersive" title={<>从结构、调试<br />到飞行展示。</>} description="围绕 FPV 穿越机、无人机整机、活动飞行和定制应用，提供结构设计、装配调试、展示执行与技术支持。" image="fpv-flight-1.jpg"><div className="flight-meta"><span>FIELD TESTED</span><span>REAL AIRFRAME</span><span>NO GENERIC PARTS</span></div></PageHero>
    <section className="section capability-grid"><div className="section-heading" data-reveal><div><span className="eyebrow">FLIGHT CAPABILITY</span><h2>把飞行体验建立在工程验证上</h2></div><p>从装配前的结构判断，到飞行后的数据复盘，能力被拆成可执行、可验证的工程环节。</p></div><div className="capability-cards">{caps.map(([Icon, title, text, details], i) => <article data-reveal key={title}><span>0{i + 1}</span><Icon size={40} weight="thin" /><div><small>0{i + 1} / FLIGHT MODULE</small><h3>{title}</h3><p>{text}</p><ul>{details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}</div></section>
    <section className="section airframe-section"><div className="airframe-copy" data-reveal><span className="eyebrow">AUTHENTIC STRUCTURE</span><h2>真实结构，真实飞行。</h2><p>所有结构展示严格基于现有整机与机架素材。不替换顶板、底板、侧板和绑带，不添加不存在的零件。</p><ArrowLink to={href("contact")}>讨论无人机方案</ArrowLink></div><div className="airframe-images"><figure data-reveal><img src={media("fpv-studio.jpg")} alt="御风 5 整机棚拍" /></figure><figure data-reveal><img src={media("fpv-structure.jpg")} alt="御风 5 真实机架结构" /></figure></div></section>
    <section className="flight-band"><img src={media("fpv-flight-2.jpg")} alt="FPV 飞行展示" /><div data-reveal><span className="eyebrow">FIELD EXECUTION · LINK VERIFIED</span><h2>速度感来自真实飞行，<br />不是虚构结构。</h2><p>飞行器、图传链路与现场安全共同组成一次可靠的展示执行。</p><div className="flight-tags"><span>REAL AIRFRAME</span><span>FIELD TESTED</span><span>SAFETY CHECKED</span></div></div></section>
  </PageShell>;
}

const caseData = [
  { category: "产品原型", title: "SOZO Dock 原型验证", meta: "结构 · 灯效 · 桌面交互", image: "dock-first-light.jpg" },
  { category: "无人机", title: "FPV 飞行展示", meta: "整机调试 · 现场飞行", image: "fpv-flight-2.jpg" },
  { category: "创客教育", title: "高校无人机创客课程", meta: "课程设计 · 工程实践", image: "maker-class.jpg" },
  { category: "互动展示", title: "校企活动机械狗展示", meta: "互动设备 · 现场执行", image: "robot-dog.jpg" },
  { category: "产品原型", title: "模块化滑动电烙铁", meta: "结构设计 · 原型打样", image: "soldering-slider.png" },
  { category: "互动展示", title: "科技展会低空经济展项", meta: "展项布置 · 技术讲解", image: "expo-booth.jpg" },
];

function CasesPage() {
  const filters = ["全部", "产品原型", "无人机", "创客教育", "互动展示"];
  const [filter, setFilter] = useState("全部");
  const shown = useMemo(() => filter === "全部" ? caseData : caseData.filter((item) => item.category === filter), [filter]);
  return <PageShell active="cases" title="服务与案例">
    <PageHero index="04" eyebrow="SERVICES & FIELD WORK" title={<>从原型研发，<br />到现场交付。</>} description="面向企业、学校、科技馆与活动方，提供硬件原型、FPV 技术、互动展示与创客课程服务。" image="expo-booth.jpg" />
    <section className="section service-list"><div className="section-heading" data-reveal><div><span className="eyebrow">SERVICE MODULES · 04</span><h2>服务能力</h2></div></div>{[["01", "硬件产品原型开发", "结构、电子、固件、3D 打印、小批量打样与功能验证"], ["02", "无人机与 FPV 技术服务", "整机、飞控调试、图传链路、展示飞行与定制载荷"], ["03", "科技活动与互动展示", "机器人、无人机、FPV 模拟器、扑翼机与科技展项"], ["04", "创客教育课程设计", "工程意识、无人机、电子创客课程与实训内容"]].map(([n, t, d]) => <div className="service-row" data-reveal key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</section>
    <section className="section case-browser"><div className="section-heading" data-reveal><div><span className="eyebrow">PROJECT ARCHIVE</span><h2>真实项目记录</h2></div></div><div className="case-filters" role="group" aria-label="案例分类">{filters.map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><div className="case-grid">{shown.map((item) => <article className="case-card is-visible" key={item.title}><figure><img src={media(item.image)} alt="" /><span>{item.category}</span></figure><small>{item.meta}</small><h3>{item.title}</h3></article>)}</div></section>
  </PageShell>;
}

function AboutPage() {
  return <PageShell active="about" title="关于索卓科技">
    <PageHero index="05" eyebrow="ABOUT SOZO" className="page-hero--about" title={<>产品不是 PPT<br />里的概念。</>} description="产品是桌面上的电路、飞行中的姿态、展会现场的互动，以及用户真正愿意上手的体验。" image="soldering.jpg" />
    <section className="section belief-section"><div data-reveal><span className="eyebrow">OUR BELIEF</span><h2>从工程现场和飞行实践中成长。</h2></div><div data-reveal><p>西安索卓科技有限公司是一支以工程实践为核心的硬件与创客团队，长期关注 FPV 穿越机、无人机、桌面工程工具、创客教育和科技展示场景。</p><p>团队具备嵌入式硬件、结构设计、3D 打印、整机调试和活动执行经验，曾参与图传研发、穿越机产品开发和高校创客项目。</p></div></section>
    <section className="values-band">{[[Atom, "工程优先", "ENGINEERING FIRST", "让结构、电路和现场验证先于包装与概念。"], [Check, "真实可靠", "REAL & RELIABLE", "只展示已经做过、测试过并能够解释的成果。"], [Circuitry, "持续迭代", "ITERATE", "用原型、数据与反馈推动每一轮产品优化。"], [Broadcast, "开放协作", "COLLABORATE", "与客户、学校和伙伴共同定义可落地的方案。"]].map(([Icon, title, en, desc]) => <div data-reveal key={title}><Icon size={36} weight="thin" /><small>{en}</small><strong>{title}</strong><p>{desc}</p></div>)}</section>
    <section className="section studio-story"><figure data-reveal><img src={media("tool-workstation.jpg")} alt="索卓工程工作台" /></figure><div data-reveal><span className="eyebrow">THE WORKBENCH</span><h2>工作台，是想法进入现实的第一站。</h2><p>结构、焊接、测试、调试和失败都发生在这里。我们保留真实研发过程，因为可信度来自过程，而不只是最终效果图。</p></div></section>
    <ProcessSection />
  </PageShell>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return <PageShell active="contact" title="联系合作">
    <section className="contact-hero"><div data-reveal><span className="eyebrow">OPEN CHANNEL · 06</span><h1>把你的工程问题，<br />接入索卓。</h1><p>如果你正在寻找硬件产品开发、无人机展示或创客教育合作，欢迎联系索卓科技。</p></div><div className="contact-signal"><i /><span>CHANNEL STATUS</span><strong>AVAILABLE</strong></div></section>
    <section className="section contact-layout"><div className="contact-details" data-reveal><h2>西安索卓科技有限公司</h2><a href="mailto:xutic@icloud.com"><EnvelopeSimple />xutic@icloud.com</a><span><Phone />电话位置预留</span><span><MapPin />西安 · 中国</span><span><Broadcast />sozotech.cn</span><div className="cooperation-tags">{["SOZO Dock", "硬件产品开发", "无人机展示", "FPV 技术服务", "创客课程", "科技活动执行"].map((item) => <span key={item}>{item}</span>)}</div></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }} data-reveal>{sent ? <div className="form-success"><Check size={42} /><h2>信息已记录</h2><p>这是网站演示状态。正式上线时可接入企业邮箱或表单服务。</p><button type="button" className="button" onClick={() => setSent(false)}>返回表单</button></div> : <><label>你的称呼<input name="name" required placeholder="姓名 / 团队" /></label><label>联系方式<input name="contact" required placeholder="邮箱 / 电话 / 微信" /></label><label>合作方向<select name="type"><option>硬件产品开发</option><option>SOZO Dock 产品合作</option><option>无人机与 FPV</option><option>创客教育与科技活动</option></select></label><label>项目简述<textarea name="message" required rows="6" placeholder="说说你想实现的工程想法"></textarea></label><button className="button button--solid" type="submit">发送合作意向 <PaperPlaneTilt /></button></>}</form></section>
  </PageShell>;
}

export function App() {
  const page = currentPage();
  if (page === "products") return <ProductsPage />;
  if (page === "dock") return <DockPage />;
  if (page === "fpv") return <FpvPage />;
  if (page === "cases") return <CasesPage />;
  if (page === "about") return <AboutPage />;
  if (page === "contact") return <ContactPage />;
  return <HomePage />;
}
