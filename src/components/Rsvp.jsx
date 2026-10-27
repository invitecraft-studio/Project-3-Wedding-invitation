import { useState } from "react";
import { couple, rsvp } from "../data/weddingData.js";
import { downloadPass } from "../utils/pass.js";
import { useLang } from "../i18n.jsx";

export default function Rsvp() {
  const { t, guest } = useLang();
  const [name, setName] = useState(guest || "");
  const [answer, setAnswer] = useState("yes");
  const [guests, setGuests] = useState(1);
  const [which, setWhich] = useState("both");
  const [meal, setMeal] = useState("Non-vegetarian (halal)");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [lanterns, setLanterns] = useState([]);

  function release(text) {
    const id = Date.now();
    setLanterns((l) => [...l, { id, text, left: 20 + Math.random() * 60 }]);
    window.setTimeout(() => setLanterns((l) => l.filter((x) => x.id !== id)), 9000);
  }

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name so the family knows who replied."); return; }
    setError("");
    const whichText = { both: "Nikah and Walima", nikah: "the Nikah only", walima: "the Walima only" }[which];
    const body = answer === "yes"
      ? `Assalamu Alaikum! This is ${name.trim()}. We joyfully accept ${couple.bride} & ${couple.groom}'s wedding invitation.\nGuests: ${guests}\nAttending: ${whichText}\nMeal: ${meal}`
      : `Assalamu Alaikum! This is ${name.trim()}. We are sorry we cannot attend ${couple.bride} & ${couple.groom}'s wedding, but you will both be in our duas.`;
    const text = body + (msg.trim() ? `\n\nDua: ${msg.trim()}` : "");
    release(msg.trim() || "Barakallahu lakuma wa baraka alaykuma");
    const base = rsvp.whatsapp ? `https://wa.me/${rsvp.whatsapp}` : "https://wa.me/";
    window.setTimeout(() => window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank", "noopener"), 900);
  }

  return (
    <section className="rsvp night reveal" id="rsvp" data-nav="rsvp">
      <h2 className="h2">{t("rsvpTitle")}</h2>
      <p className="sub">{t("rsvpSub")} {rsvp.deadline}</p>

      <form className="rsvp-form" onSubmit={submit} noValidate>
        <label>Your name
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>

        <fieldset>
          <legend>Can you come?</legend>
          <div className="choices">
            <label className={answer === "yes" ? "is-on" : ""}>
              <input type="radio" name="answer" checked={answer === "yes"} onChange={() => setAnswer("yes")} />Accept with joy
            </label>
            <label className={answer === "no" ? "is-on" : ""}>
              <input type="radio" name="answer" checked={answer === "no"} onChange={() => setAnswer("no")} />Regretfully decline
            </label>
          </div>
        </fieldset>

        {answer === "yes" && (
          <>
            <div className="row">
              <label>Guests (including you)
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <label>Meal
                <select value={meal} onChange={(e) => setMeal(e.target.value)}>
                  <option>Non-vegetarian (halal)</option>
                  <option>Vegetarian</option>
                </select>
              </label>
            </div>
            <label>Which celebrations?
              <select value={which} onChange={(e) => setWhich(e.target.value)}>
                <option value="both">Nikah and Walima</option>
                <option value="nikah">Nikah only</option>
                <option value="walima">Walima only</option>
              </select>
            </label>
          </>
        )}

        <label>A dua or message for the couple (optional)
          <textarea rows="3" value={msg} onChange={(e) => setMsg(e.target.value)} />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="rsvp-actions">
          <button type="submit" className="btn btn-gold">{t("send")}</button>
          <button type="button" className="btn btn-line" onClick={() => downloadPass(name.trim())}>{t("pass")}</button>
        </div>
        <p className="rsvp-tip">Your dua rises as a lantern on this page, and the reply opens in WhatsApp, ready to send.</p>
      </form>

      <div className="lantern-sky" aria-hidden="true">
        {lanterns.map((l) => (
          <div key={l.id} className="lantern-rise" style={{ left: l.left + "%" }}>
            <span className="lr-body" />
            <span className="lr-text">{l.text.slice(0, 80)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
