import { useRef } from "react";

/* A card that leans toward the pointer or finger, with a moving glare. */
export default function Tilt({ children, max = 9, className = "", ...rest }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", (x * max * 2).toFixed(2) + "deg");
    el.style.setProperty("--rx", (-y * max * 2).toFixed(2) + "deg");
    el.style.setProperty("--gx", ((x + 0.5) * 100).toFixed(1) + "%");
    el.style.setProperty("--gy", ((y + 0.5) * 100).toFixed(1) + "%");
  };
  const leave = () => {
    const el = ref.current; if (!el) return;
    ["--rx", "--ry"].forEach((k) => el.style.setProperty(k, "0deg"));
  };
  return (
    <div ref={ref} className={"tilt " + className} onPointerMove={move} onPointerLeave={leave} onPointerUp={leave} {...rest}>
      {children}
    </div>
  );
}
