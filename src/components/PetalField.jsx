import { useMemo } from "react";

const KINDS = ["rose", "blush", "rose", "gold"];

export default function PetalField() {
  const petals = useMemo(() => {
    const count = typeof window !== "undefined" && window.innerWidth < 700 ? 12 : 22;
    return Array.from({ length: count }, (_, i) => {
      const kind = KINDS[i % KINDS.length];
      const size = kind === "gold" ? 4 + Math.random() * 4 : 8 + Math.random() * 9;
      return {
        id: i,
        kind,
        left: Math.random() * 100,
        size,
        h: kind === "gold" ? size : size * 1.3,
        duration: 14 + Math.random() * 14,
        delay: Math.random() * 16,
        opacity: 0.45 + Math.random() * 0.45,
      };
    });
  }, []);

  return (
    <div className="petal-field" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={"petal petal--" + p.kind}
          style={{
            left: p.left + "vw",
            width: p.size,
            height: p.h,
            animationDuration: p.duration + "s",
            animationDelay: p.delay + "s",
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
