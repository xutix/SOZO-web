import { useEffect, useState } from "react";
import { media } from "../../utils/site";

export function PageHero({
  index,
  eyebrow,
  title,
  description,
  image,
  video,
  videoPlaybackRate = 1,
  children,
  visual,
  variant,
  page,
  className = "",
}) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const hasVideo = Boolean(video);
  const canUseVideo = Boolean(video && !videoFailed);
  const shouldRenderVideo = Boolean(canUseVideo && shouldLoadVideo);
  const heroVariant = variant || (hasVideo ? "video" : "image");
  const variantClass = heroVariant === "video" ? "page-hero--video-stage" : "page-hero--image-stage";
  const pageClass = page ? `page-hero--${page}` : "";
  const heroClassName = ["page-hero", variantClass, pageClass, className].filter(Boolean).join(" ");

  useEffect(() => {
    setVideoReady(false);
    setVideoFailed(false);
    setShouldLoadVideo(false);

    if (!video) return undefined;
    if (typeof window === "undefined") return undefined;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const saveData = navigator.connection?.saveData;

    if (prefersReducedMotion || saveData) {
      return undefined;
    }

    let cancelled = false;
    let idleId;
    let timeoutId;

    const loadVideo = () => {
      if (!cancelled) setShouldLoadVideo(true);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadVideo, { timeout: 1600 });
    } else {
      timeoutId = window.setTimeout(loadVideo, 900);
    }

    return () => {
      cancelled = true;
      if (idleId) window.cancelIdleCallback?.(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [video]);

  return (
    <section className={heroClassName}>
      <div className="page-hero__copy" data-reveal><span className="eyebrow">{eyebrow} · {index}</span><h1>{title}</h1><p>{description}</p>{children}</div>
      <figure className={`page-hero__image ${canUseVideo ? "page-hero__image--video" : ""} ${videoReady ? "is-video-ready" : ""}`}>
        <img className="page-hero__poster" src={media(image)} alt="" loading={hasVideo ? "eager" : "lazy"} decoding="async" />
        {shouldRenderVideo ? <video
          className={`page-hero__video ${videoReady ? "is-ready" : ""}`}
          src={media(video)}
          poster={media(image)}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          x-webkit-airplay="deny"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate nofullscreen"
          aria-hidden="true"
          tabIndex={-1}
          preload="none"
          onLoadedMetadata={(event) => { event.currentTarget.playbackRate = videoPlaybackRate; }}
          onCanPlay={(event) => {
            event.currentTarget.playbackRate = videoPlaybackRate;
            setVideoReady(true);
            event.currentTarget.play().catch(() => {});
          }}
          onPlaying={() => setVideoReady(true)}
          onError={() => {
            setVideoReady(false);
            setVideoFailed(true);
          }}
        /> : null}
        <span className="image-index">{index} / SIGNAL FIELD</span>
      </figure>
      {visual ? <div className="page-hero__visual" aria-hidden="true">{visual}</div> : null}
    </section>
  );
}
