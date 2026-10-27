import { useEffect, useRef, useState } from "react";
import Stars from "./Stars.jsx";
import Crescent from "./Crescent.jsx";
import { couple } from "../data/weddingData.js";
import { useLang } from "../i18n.jsx";

const HOLD_MS = 1100;
const C = 2 * Math.PI * 84;

function SealArt() {
  return (
    <svg viewBox="0 0 160 160" width="150" height="150" aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#c0364d" />
          <stop offset="0.55" stopColor="#7a1a2c" />
          <stop offset="1" stopColor="#4a0d19" />
        </radialGradient>
      </defs>
      <path
        d="M80 6c14 0 18 8 30 10s22 8 26 22 10 18 12 32-4 20-10 32-8 22-22 30-20 6-34 10-22-4-34-10-20-18-26-30-14-18-12-32 8-20 14-32 14-18 28-22 12-10 26-10z"
        fill="url(#wax)" stroke="#2f060f" strokeWidth="1.5"
      />
      <circle cx="80" cy="80" r="52" fill="none" stroke="#e6cf94" strokeWidth="1.2" opacity="0.7" />
      <circle cx="80" cy="80" r="47" fill="none" stroke="#e6cf94" strokeWidth="0.6" opacity="0.5" />
      <g transform="translate(49 36) scale(2)" color="#e6cf94"><Crescent size={32} /></g>
      <text x="80" y="124" textAnchor="middle" fill="#e6cf94" fontFamily="Pinyon Script, cursive" fontSize="26">
        {couple.bride[0]} &amp; {couple.groom[0]}
      </text>
    </svg>
  );
}

export default function Seal({ onStart, onDone }) {
  const { t, guest } = useLang();
  const [p, setP] = useState(0);
  const [cracked, setCracked] = useState(false);
  const raf = useRef(0);
  const t0 = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; cancelAnimationFrame(raf.current); };
  }, []);

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    cancelAnimationFrame(raf.current);
    setP(1); setCracked(true);
    if (navigator.vibrate) navigator.vibrate(35);
    onStart();
    window.setTimeout(onDone, 1500);
  }
  function down() {
    if (doneRef.current) return;
    cancelAnimationFrame(raf.current);
    t0.current = performance.now();
    const tick = (now) => {
      const v = Math.min(1, (now - t0.current) / HOLD_MS);
      setP(v);
      if (v >= 1) { finish(); return; }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }
  function up() {
    if (doneRef.current) return;
    cancelAnimationFrame(raf.current);
    setP(0);
  }
  const key = (e) => {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!e.repeat) down(); }
  };
  const keyUp = (e) => { if (e.key === " " || e.key === "Enter") up(); };

  return (
    <div className={"seal-screen" + (cracked ? " is-cracked" : "")}>
      <Stars count={90} />
      <Crescent size={64} className="seal-moon" />
      <div className="seal-wrap">
        {guest && <p className="seal-for">{t("forGuest")} {guest}</p>}
        <div className="seal-ring" style={{ "--p": p }}>
          <svg viewBox="0 0 180 180" className="seal-progress" aria-hidden="true">
            <circle cx="90" cy="90" r="84" fill="none" stroke="rgba(230,207,148,0.2)" strokeWidth="2" />
            <circle cx="90" cy="90" r="84" fill="none" stroke="#e6cf94" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - p)} transform="rotate(-90 90 90)" />
          </svg>
          <button
            type="button"
            className={"seal-btn" + (p > 0 && !cracked ? " is-holding" : "")}
            style={{ transform: `scale(${1 + p * 0.1})` }}
            aria-label="Press and hold to open the invitation"
            onPointerDown={down} onPointerUp={up} onPointerLeave={up} onPointerCancel={up}
            onKeyDown={key} onKeyUp={keyUp} onContextMenu={(e) => e.preventDefault()}
          >
            <span className="seal-half seal-half--l"><SealArt /></span>
            <span className="seal-half seal-half--r"><SealArt /></span>
          </button>
        </div>
        <p className="seal-bismillah" lang="ar" dir="rtl">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
        <p className="seal-hint">{t("holdSeal")}</p>
        <button type="button" className="seal-skip" onClick={finish}>{t("skip")}</button>
      </div>
    </div>
  );
}
