import { useEffect } from "react";

export default function Lightbox({ open, onClose, label, ratio = 0.7, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">&times;</button>
      <div className="lightbox-card" style={{ "--r": ratio }} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
