import cover from "../assets/cover.jpg";
import Stars from "./Stars.jsx";
import Tilt from "./Tilt.jsx";
import { couple, weddingDayLong, place } from "../data/weddingData.js";
import { useLang } from "../i18n.jsx";

export default function Hero() {
  const { t, guest } = useLang();
  return (
    <section className="hero night" id="top" data-nav="top">
      <div className="hero-bg" style={{ backgroundImage: `url(${cover})` }} aria-hidden="true" />
      <Stars count={50} />
      <p className="hero-kicker">{guest ? `${t("dear")} ${guest},` : t("salaam")}</p>
      <div className="hero-float">
        <Tilt className="hero-tilt">
          <div className="cover-card" style={{ backgroundImage: `url(${cover})` }}>
            <div className="cover-text">
              <p className="cv-small">{t("together")}</p>
              <h1 className="cv-mono" aria-label={`The wedding invitation of ${couple.bride} and ${couple.groom}`}>
                <span aria-hidden="true">{couple.bride[0]}</span>
                <i aria-hidden="true">&amp;</i>
                <span aria-hidden="true">{couple.groom[0]}</span>
              </h1>
              <p className="cv-names">{couple.bride} <i>&amp;</i> {couple.groom}</p>
              <p className="cv-small">{t("invite")}</p>
              <p className="cv-date">{weddingDayLong}</p>
              <p className="cv-small">{place}</p>
            </div>
            <span className="cover-shine" aria-hidden="true" />
          </div>
        </Tilt>
      </div>
      <a className="scroll-hint" href="#verse" aria-label="Scroll down">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </a>
    </section>
  );
}
