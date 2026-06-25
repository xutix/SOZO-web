import { useEffect, useMemo, useRef, useState } from "react";
import { PageHero } from "../components/layout/PageHero";
import { PageShell } from "../components/layout/PageShell";
import { galleryCategories, galleryItems } from "../data/gallery";
import { media } from "../utils/site";

const typeFilters = [
  { key: "全部", label: "全部素材" },
  { key: "image", label: "照片" },
  { key: "video", label: "视频" },
];

const categoryIntro = {
  "SOZO Dock": "桌面控制中心、灯效验证与研发记录。",
  "展会与教育": "展会现场、课程活动与互动展示。",
  "FPV 与无人机": "穿越机结构、外场飞行与无人机展示。",
  "研发现场": "工作台、装配、焊接和真实工程过程。",
  "工程工具": "桌面工具、模块化结构与工程桌搭。",
  "站内视频": "用于展示动态过程和现场氛围的视频记录。",
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function ScrollScrubVideo({ src, title }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = clamp((window.innerHeight * 0.28 - rect.top) / travel, 0, 1);
      setProgress(nextProgress);

      if (Number.isFinite(video.duration) && video.duration > 0) {
        try {
          video.currentTime = Math.min(video.duration - 0.04, video.duration * nextProgress);
        } catch {
          // Some browsers briefly reject seeking before enough metadata is ready.
        }
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    video.pause();
    video.addEventListener("loadedmetadata", update);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", update);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className="section motion-study" ref={sectionRef}>
      <div className="motion-study__sticky">
        <div className="motion-study__copy" data-reveal>
          <span className="eyebrow">SCROLL MOTION TEST</span>
          <h2>皮影蝴蝶<br /><span>随滚动预览</span></h2>
          <p>这里先用已有视频做“滚轮驱动”的验证：滚动页面时，视频时间轴跟着滚动进度前进。后续如果要上线正式效果，可以换成更清晰的短视频或帧序列。</p>
        </div>
        <figure className="motion-study__stage" data-progress={`${Math.round(progress * 100)}%`}>
          <video ref={videoRef} src={media(src)} muted playsInline preload="metadata" aria-label={title} />
          <figcaption>
            <span>{title}</span>
            <i><b style={{ width: `${progress * 100}%` }} /></i>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function GalleryPage() {
  const [category, setCategory] = useState("全部");
  const [type, setType] = useState("全部");

  const heroImage = useMemo(() => {
    const preferred = galleryItems.find((item) => item.category === "工程工具" && item.type === "image");
    return preferred?.src || galleryItems.find((item) => item.type === "image")?.src || "tool-workstation.jpg";
  }, []);

  const shown = useMemo(() => {
    return galleryItems.filter((item) => {
      const categoryMatched = category === "全部" || item.category === category;
      const typeMatched = type === "全部" || item.type === type;
      return categoryMatched && typeMatched;
    });
  }, [category, type]);

  const imageCount = galleryItems.filter((item) => item.type === "image").length;
  const videoCount = galleryItems.filter((item) => item.type === "video").length;
  const categoryCount = galleryCategories.filter((item) => item !== "全部").length;

  return (
    <PageShell active="gallery" title="项目图集">
      <PageHero
        index="08"
        eyebrow="MEDIA LIBRARY"
        className="page-hero--gallery page-hero--immersive"
        title={<>真实项目<br /><span>影像记录</span></>}
        description="这里收录索卓科技在产品研发、FPV 飞行、工程工具、创客教育和活动展示中的真实照片与视频。所有画面都来自实际项目和工作现场。"
        image={heroImage}
      />

      <section className="section gallery-console">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow">FIELD RECORDS</span>
            <h2>项目图集</h2>
          </div>
          <p>图集不是素材仓库，而是给合作方和用户快速理解 SOZO Tech 的真实项目、工程现场和产品气质。</p>
        </div>

        <div className="gallery-dashboard" data-reveal>
          <div>
            <span>{imageCount}</span>
            <p>现场照片</p>
          </div>
          <div>
            <span>{videoCount}</span>
            <p>视频记录</p>
          </div>
          <div>
            <span>{categoryCount}</span>
            <p>项目方向</p>
          </div>
          <div>
            <span>REAL</span>
            <p>真实现场</p>
          </div>
        </div>

        <div className="gallery-toolbar" data-reveal>
          <div className="gallery-filters" aria-label="素材分类">
            {galleryCategories.map((item) => (
              <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>
                {item}
              </button>
            ))}
          </div>
          <div className="gallery-filters gallery-filters--type" aria-label="素材类型">
            {typeFilters.map((item) => (
              <button className={type === item.key ? "active" : ""} onClick={() => setType(item.key)} key={item.key}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <section className="gallery-showcase" aria-label="精选素材展示" data-reveal>
          <div className="gallery-showcase__copy">
            <span className="eyebrow">REAL MATERIALS</span>
            <h2>真实素材<br /><span>先有画面再有页面</span></h2>
            <p>参考大厂产品页的空间感，把照片从“文件网格”变成可判断氛围、构图和用途的展示台。这里不做假结构，只把真实图片放到更好的观看关系里。</p>
          </div>
          <div className="gallery-showcase__stage" aria-hidden="true">
            <figure className="gallery-float gallery-float--a"><img src={media("gallery/asset-01.jpg")} alt="" loading="lazy" /></figure>
            <figure className="gallery-float gallery-float--b"><img src={media("gallery/asset-25.jpg")} alt="" loading="lazy" /></figure>
            <figure className="gallery-float gallery-float--c"><img src={media("gallery/asset-43.jpg")} alt="" loading="lazy" /></figure>
          </div>
        </section>

        <ScrollScrubVideo src="gallery/video-02.mp4" title="皮影蝴蝶视频" />

        <div className="gallery-grid" aria-live="polite">
          {shown.map((item) => (
            <article className={`gallery-card gallery-card--${item.type}`} key={item.id}>
              <figure>
                {item.type === "video" ? (
                  <video src={media(item.src)} controls muted playsInline preload="metadata" />
                ) : (
                  <img src={media(item.src)} alt={item.title} loading="lazy" decoding="async" />
                )}
                <span>{item.type === "video" ? "VIDEO" : "PHOTO"}</span>
              </figure>
              <div className="gallery-card__body">
                <small>{item.category}</small>
                <h3>{item.title}</h3>
                <p>{categoryIntro[item.category] || item.use}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
