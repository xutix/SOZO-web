export function SignalTag({ eyebrow, title, className = "" }) {
  return <div className={`signal-tag ${className}`}><i /><span><small>{eyebrow}</small>{title}</span></div>;
}
