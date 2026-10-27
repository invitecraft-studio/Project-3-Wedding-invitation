import { useMemo } from "react";

export default function Stars({ count = 70 }) {
  const stars = useMemo(
    () => Array.from({ length: count }, () => ({
      l: Math.random() * 100, t: Math.random() * 100,
      s: 1 + Math.random() * 2.2, d: 2.5 + Math.random() * 4, dl: -Math.random() * 6,
    })),
    [count]
  );
  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} style={{ left: s.l + "%", top: s.t + "%", width: s.s, height: s.s, animationDuration: s.d + "s", animationDelay: s.dl + "s" }} />
      ))}
    </div>
  );
}
