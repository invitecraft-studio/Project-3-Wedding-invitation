import { useRef, useState } from "react";
import { story } from "../data/weddingData.js";
import { useLang } from "../i18n.jsx";

export default function Story() {
  const { t } = useLang();
  const track = useRef(null);
  const [idx, setIdx] = useState(0);

  const onScroll = () => {
    const el = track.current; if (!el) return;
    const card = el.children[0]; const w = card.offsetWidth + 18;
    setIdx(Math.round(el.scrollLeft / w));
  };
  const go = (d) => {
    const el = track.current; const w = el.children[0].offsetWidth + 18;
    el.scrollTo({ left: Math.max(0, (idx + d)) * w, behavior: "smooth" });
  };

  return (
    <section className="story day reveal" id="story" data-nav="story">
      <p className="eyebrow">{t("swipe")} →</p>
      <h2 className="h2">{t("storyTitle")}</h2>
      <p className="sub">{t("storySub")}</p>
      <div className="story-track" ref={track} onScroll={onScroll}>
        {story.map((s, i) => (
          <article key={s.title} className="story-card">
            <span className="story-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="story-year">{s.year}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
      <div className="story-ctrl">
        <button type="button" onClick={() => go(-1)} aria-label="Previous" disabled={idx === 0}>‹</button>
        <div className="dots" aria-hidden="true">{story.map((s, i) => <i key={s.title} className={i === idx ? "on" : ""} />)}</div>
        <button type="button" onClick={() => go(1)} aria-label="Next" disabled={idx === story.length - 1}>›</button>
      </div>
    </section>
  );
}
