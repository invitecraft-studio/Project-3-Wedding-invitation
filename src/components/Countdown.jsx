import { useEffect, useState } from "react";
import Stars from "./Stars.jsx";
import { weddingTarget, weddingDayLong, events } from "../data/weddingData.js";
import { downloadICS } from "../utils/ics.js";
import { useLang } from "../i18n.jsx";

const pad = (n) => String(n).padStart(2, "0");

function remaining() {
  let diff = new Date(weddingTarget).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
  const mins = Math.floor(diff / 60000); diff -= mins * 60000;
  return { days, hours, mins, secs: Math.floor(diff / 1000) };
}

function Ring({ value, max, label, big }) {
  const R = 46, C = 2 * Math.PI * R;
  const frac = Math.min(1, value / max);
  return (
    <div className="ring">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(230,207,148,0.18)" strokeWidth="2.5" />
        <circle cx="50" cy="50" r={R} fill="none" stroke="#e6cf94" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - frac)} transform="rotate(-90 50 50)" style={{ transition: "stroke-dashoffset 0.9s ease" }} />
      </svg>
      <b className={big ? "big" : ""}>{big ? value : pad(value)}</b>
      <span>{label}</span>
    </div>
  );
}

export default function Countdown() {
  const { t } = useLang();
  const [r, setR] = useState(remaining);
  useEffect(() => {
    const id = setInterval(() => setR(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="countdown night reveal" id="countdown">
      <Stars count={40} />
      {r ? (
        <>
          <h2 className="cd-title">{t("countTitle")}</h2>
          <div className="rings" role="timer" aria-live="off">
            <Ring value={r.days} max={365} label={t("days")} big />
            <Ring value={r.hours} max={24} label={t("hours")} />
            <Ring value={r.mins} max={60} label={t("mins")} />
            <Ring value={r.secs} max={60} label={t("secs")} />
          </div>
          <p className="cd-note">{weddingDayLong}, {events.ceremony.time}</p>
          <button type="button" className="btn btn-gold" onClick={() => downloadICS("ceremony")}>{t("addCal")}</button>
        </>
      ) : (
        <>
          <h2 className="cd-title">{t("married")}</h2>
          <p className="cd-note">{t("marriedNote")}</p>
        </>
      )}
    </section>
  );
}
