import Stars from "./Stars.jsx";
import { couple, weddingDayShort, dua, credit } from "../data/weddingData.js";
import { useLang } from "../i18n.jsx";

export default function Footer() {
  const { t } = useLang();
  const share = () => {
    const text = `Assalamu Alaikum! You are invited to the wedding of ${couple.bride} & ${couple.groom} on ${weddingDayShort}.\n${window.location.origin}${window.location.pathname}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };
  return (
    <footer className="footer night">
      <Stars count={40} />
      <p className="f-names">{couple.bride}<i>&amp;</i>{couple.groom}</p>
      <p className="f-line">{weddingDayShort} · {couple.hashtag}</p>
      <p className="f-arabic" lang="ar" dir="rtl">{dua.arabic}</p>
      <p className="f-verse">{dua.text}</p>
      <p className="f-verse">{t("footerNote")}</p>
      <button type="button" className="btn btn-line" onClick={share}>{t("share")}</button>
      <p className="f-credit">{credit}</p>
    </footer>
  );
}
