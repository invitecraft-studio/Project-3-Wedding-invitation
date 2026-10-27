import { useCallback, useEffect, useMemo, useState } from "react";
import Seal from "./components/Seal.jsx";
import PetalField from "./components/PetalField.jsx";
import Hero from "./components/Hero.jsx";
import Verse from "./components/Verse.jsx";
import Countdown from "./components/Countdown.jsx";
import Story from "./components/Story.jsx";
import Events from "./components/Events.jsx";
import Roads from "./components/Roads.jsx";
import Family from "./components/Family.jsx";
import Rsvp from "./components/Rsvp.jsx";
import Footer from "./components/Footer.jsx";
import Dock from "./components/Dock.jsx";
import Lightbox from "./components/Lightbox.jsx";
import { CeremonyArt, ReceptionArt, ART_RATIO } from "./components/InviteArt.jsx";
import { LangCtx, T } from "./i18n.jsx";

export default function App() {
  const [started, setStarted] = useState(false); // seal cracked: the site mounts underneath
  const [sealGone, setSealGone] = useState(false);
  const [zoom, setZoom] = useState(null);        // "ceremony" | "reception" | null
  const [lang, setLang] = useState("en");

  // A personal link looks like  yoursite.com/?guest=Fatima%20Begum
  const guest = useMemo(() => {
    const g = new URLSearchParams(window.location.search).get("guest");
    return g ? g.replace(/[<>]/g, "").slice(0, 40) : "";
  }, []);
  const ctx = useMemo(() => ({ lang, setLang, guest, t: (k) => T[lang][k] ?? T.en[k] ?? k }), [lang, guest]);

  const closeZoom = useCallback(() => setZoom(null), []);

  useEffect(() => {
    document.documentElement.lang = lang === "te" ? "te" : "en";
  }, [lang]);

  // Gentle scroll-reveal once the seal is broken.
  useEffect(() => {
    if (!started) return;
    const els = document.querySelectorAll(".reveal");
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [started]);

  return (
    <LangCtx.Provider value={ctx}>
      {!sealGone && <Seal onStart={() => setStarted(true)} onDone={() => setSealGone(true)} />}

      {started && (
        <>
          <PetalField />
          <Dock />
          <div className="site-wrap">
            <main>
              <Hero />
              <Verse />
              <Countdown />
              <Story />
              <Events onZoom={setZoom} />
              <Roads />
              <Family />
              <Rsvp />
            </main>
            <Footer />
          </div>
          <Lightbox
            open={zoom !== null}
            onClose={closeZoom}
            ratio={zoom ? ART_RATIO[zoom] : 0.7}
            label={zoom === "reception" ? "Walima invitation" : "Nikah invitation"}
          >
            {zoom === "ceremony" && <CeremonyArt />}
            {zoom === "reception" && <ReceptionArt />}
          </Lightbox>
        </>
      )}
    </LangCtx.Provider>
  );
}
