import ceremonyBg from "../assets/ceremony-bg.jpg";
import receptionBg from "../assets/reception-bg.jpg";
import { couple, events, venues, weddingWeekday, weddingDayShort } from "../data/weddingData.js";

/* The two printed invitation cards. Used as small thumbnails in the
   timeline and at full size in the lightbox (they scale with their container). */

export const ART_RATIO = { ceremony: 900 / 1472, reception: 720 / 1237 };

export function CeremonyArt() {
  const c = events.ceremony;
  return (
    <div className="art art-ceremony" style={{ backgroundImage: `url(${ceremonyBg})` }}>
      <div className="art-text">
        <p className="a-small">With the blessings of Allah, we invite you to the marriage of</p>
        <p className="a-names">{couple.bride} <i>&amp;</i> {couple.groom}</p>
        <p className="a-title">{c.title}</p>
        <p className="a-small a-date-s">{weddingWeekday}, {weddingDayShort}</p>
        <p className="a-small">{c.time}</p>
        <p className="a-small a-venue-s">{venues.ceremony.name}</p>
      </div>
    </div>
  );
}

export function ReceptionArt() {
  const r = events.reception;
  return (
    <div className="art art-reception" style={{ backgroundImage: `url(${receptionBg})` }}>
      <div className="art-text">
        <p className="a-small">Please join us for the</p>
        <p className="a-script">Walima Reception</p>
        <p className="a-small">celebrating the marriage of</p>
        <p className="a-big">{couple.bride}</p>
        <p className="a-small a-and">and</p>
        <p className="a-big">{couple.groom}</p>
        <p className="a-date">{weddingWeekday}, {weddingDayShort}</p>
        <p className="a-small">{r.time} onwards</p>
        <p className="a-venue">{venues.reception.name}</p>
        <p className="a-small">{venues.reception.hall}, Bharathi Nagar</p>
      </div>
    </div>
  );
}
