import { useState } from "react";
import { media } from "../../utils/site";

export function PageHero({ index, eyebrow, title, description, image, video, videoPlaybackRate = 1, children, visual, className = "" }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const hasVideo = Boolean(video && !videoFailed);

  return (
    <section className={`page-hero ${className}`}>
      <div className="page-hero__copy" data-reveal><span className="eyebrow">{eyebrow} · {index}</span><h1>{title}</h1><p>{description}</p>{children}</div>
      <figure className={`page-hero__image ${hasVideo ? "page-hero__image--video" : ""}`}>
        {hasVideo ? <video
          className="page-hero__video"
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
          controlsList="nodownload noplaybackrate nofullscreen"
          aria-hidden="true"
          tabIndex={-1}
          preload="metadata"
          onLoadedMetadata={(event) => { event.currentTarget.playbackRate = videoPlaybackRate; }}
          onCanPlay={(event) => {
            event.currentTarget.playbackRate = videoPlaybackRate;
            event.currentTarget.play().catch(() => {});
          }}
          onError={() => setVideoFailed(true)}
        /> : null}
        <img src={media(image)} alt="" />
        <span className="image-index">{index} / SIGNAL FIELD</span>
      </figure>
      {visual ? <div className="page-hero__visual" aria-hidden="true">{visual}</div> : null}
    </section>
  );
}
