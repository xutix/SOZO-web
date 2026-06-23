import { useState } from "react";
import { Broadcast, Check, EnvelopeSimple, MapPin, PaperPlaneTilt, Phone } from "@phosphor-icons/react";
import { contactChannels, cooperationTags } from "../data/contact";
import { PageShell } from "../components/layout/PageShell";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  return <PageShell active="contact" title="联系合作">
    <section className="contact-hero"><div data-reveal><span className="eyebrow">OPEN CHANNEL · 06</span><h1>把你的工程问题<br />接入索卓</h1><p>如果你正在寻找硬件产品开发、无人机展示或创客教育合作，欢迎联系索卓科技。</p></div><div className="contact-signal"><i /><span>CHANNEL STATUS</span><strong>AVAILABLE</strong></div></section>
    <section className="section contact-layout">
      <div className="contact-details" data-reveal>
        <h2>{contactChannels.company}</h2>
        <a href={`mailto:${contactChannels.email}`}><EnvelopeSimple />{contactChannels.email}</a>
        <span><Phone />{contactChannels.phone}</span>
        <span><MapPin />{contactChannels.location}</span>
        <span><Broadcast />{contactChannels.domain}</span>
        <div className="cooperation-tags">{cooperationTags.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
      <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }} data-reveal>
        {sent ? <div className="form-success"><Check size={42} /><h2>信息已记录</h2><p>这是网站演示状态。正式上线时可接入企业邮箱或表单服务。</p><button type="button" className="button" onClick={() => setSent(false)}>返回表单</button></div> : <>
          <label>你的称呼<input name="name" required placeholder="姓名 / 团队" /></label>
          <label>联系方式<input name="contact" required placeholder="邮箱 / 电话 / 微信" /></label>
          <label>合作方向<select name="type"><option>硬件产品开发</option><option>SOZO Dock 产品合作</option><option>无人机与 FPV</option><option>创客教育与科技活动</option></select></label>
          <label>项目简述<textarea name="message" required rows="6" placeholder="说说你想实现的工程想法"></textarea></label>
          <button className="button button--solid" type="submit">发送合作意向 <PaperPlaneTilt /></button>
        </>}
      </form>
    </section>
  </PageShell>;
}
