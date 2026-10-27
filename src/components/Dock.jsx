import { useEffect, useState } from "react";
import { useLang } from "../i18n.jsx";

const ITEMS = [
  ["top", "navHome"], ["story", "navStory"], ["events", "navEvents"], ["roads", "navRoads"], ["rsvp", "navRsvp"],
];

export default function Dock() {
  const { t, lang, setLang } = useLang();
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.nav); }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    document.querySelectorAll("[data-nav]").forEach((el) => io.observe(el));
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <nav className="dock" aria-label="Sections">
        {ITEMS.map(([id, key]) => (
          <a key={id} href={`#${id}`} className={active === id ? "is-on" : ""}>{t(key)}</a>
        ))}
        <button type="button" className="dock-lang" onClick={() => setLang(lang === "en" ? "te" : "en")} aria-label="Switch language">
          {lang === "en" ? "తె" : "EN"}
        </button>
      </nav>
    </>
  );
}
