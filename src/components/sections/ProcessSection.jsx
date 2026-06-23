import { engineeringLoop } from "../../data/process";

export function ProcessSection() {
  return (
    <section className="section process-section">
      <div className="section-heading" data-reveal>
        <div><span className="eyebrow">ENGINEERING LOOP</span><h2>从想法到现场</h2></div>
        <p>每一步都有明确输入、验证动作与工程输出，不让产品停留在概念阶段。</p>
      </div>
      <div className="process-grid">
        {engineeringLoop.map(([n, t, d, note]) => <div data-reveal key={n}><span>{n}</span><small>{note}</small><h3>{t}</h3><p>{d}</p></div>)}
      </div>
    </section>
  );
}
