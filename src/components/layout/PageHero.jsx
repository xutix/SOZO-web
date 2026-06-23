import { media } from "../../utils/site";

export function PageHero({ index, eyebrow, title, description, image, children, className = "" }) {
  return (
    <section className={`page-hero ${className}`}>
      <div className="page-hero__copy" data-reveal><span className="eyebrow">{eyebrow} · {index}</span><h1>{title}</h1><p>{description}</p>{children}</div>
      <figure className="page-hero__image"><img src={media(image)} alt="" /><span className="image-index">{index} / SIGNAL FIELD</span></figure>
    </section>
  );
}
