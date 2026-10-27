import { useState } from "react";
import Tilt from "./Tilt.jsx";
import { CeremonyArt, ReceptionArt } from "./InviteArt.jsx";
import { events, venues, schedule } from "../data/weddingData.js";
import { downloadICS } from "../utils/ics.js";
import { useLang } from "../i18n.jsx";

const Sun = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor" /><g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7L7 17M17 7l1.7-1.7" /></g></svg>
);
const Moon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="currentColor" /></svg>
);

export default function Events({ onZoom }) {
  const { t } = useLang();
  const [ev, setEv] = useState("ceremony");
  const e = events[ev];
  const v = venues[ev];
  const sch = ev === "ceremony" ? schedule.morning : schedule.evening;
  const Art = ev === "ceremony" ? CeremonyArt : ReceptionArt;

  return (
    <section className="events" id="events" data-nav="events" data-ev={ev}>
      <div className="events-inner">
        <p className="eyebrow">{t("eventsTitle")}</p>
        <div className="switch" role="tablist" aria-label="Choose a celebration" data-ev={ev}>
          <span className="switch-thumb" aria-hidden="true" />
          <button type="button" role="tab" aria-selected={ev === "ceremony"} onClick={() => setEv("ceremony")}>
            <Sun /> <span>{t("nikah")}<small>{events.ceremony.time}</small></span>
          </button>
          <button type="button" role="tab" aria-selected={ev === "reception"} onClick={() => setEv("reception")}>
            <Moon /> <span>{t("walima")}<small>{events.reception.time}</small></span>
          </button>
        </div>

        <div className="events-grid" key={ev}>
          <div className="ev-card">
            <Tilt max={7}>
              <button type="button" className="ev-art" onClick={() => onZoom(ev)} aria-label={`View the ${ev === "ceremony" ? "Nikah" : "Walima"} invitation full screen`}>
                <Art />
                <span className="ev-art-hint">{t("enlarge")}</span>
              </button>
            </Tilt>
          </div>

          <div className="ev-info">
            <p className="ev-day">{e.day}</p>
            <h3 className="ev-title">{e.title}</h3>
            <p className="ev-time">{e.time} <i>·</i> {e.until}</p>
            <p className="ev-quote">“{e.quote}”</p>
            <div className="ev-links">
              <button type="button" className="btn btn-line" onClick={() => downloadICS(ev)}>+ {t("addCal")}</button>
              <a className="btn btn-line" href={`https://www.google.com/maps/search/?api=1&query=${v.mapsQuery}`} target="_blank" rel="noopener noreferrer">{t("directions")}</a>
            </div>

            <h4 className="ev-sub">{t("scheduleTitle")}</h4>
            <ol className="ev-sched">
              {sch.items.map((it) => (
                <li key={it.time + it.what}>
                  <time>{it.time}</time>
                  <div><strong>{it.what}</strong>{it.note && <p>{it.note}</p>}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="ev-venue">
          <div className="ev-venue-text">
            <h4>{v.name}</h4>
            {v.hall && <p className="ev-hall">{v.hall}</p>}
            <p>{v.address}</p>
            <a className="btn btn-line" href={`https://www.google.com/maps/search/?api=1&query=${v.mapsQuery}`} target="_blank" rel="noopener noreferrer">{t("openMaps")}</a>
          </div>
          <div className="ev-map">
            <iframe key={ev} title={`Map of ${v.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={v.mapsEmbed} />
          </div>
        </div>
      </div>
    </section>
  );
}
