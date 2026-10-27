import { couple, events, venues, weddingDayLong, rsvp } from "../data/weddingData.js";

/* Draws a personal guest pass on a canvas and downloads it as a PNG. */
export async function downloadPass(guestName) {
  try { await document.fonts?.ready; } catch { /* ignore */ }
  const W = 900, H = 1400;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d");
  const gold = "#e6cf94";

  const bg = x.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#2a0a12"); bg.addColorStop(0.5, "#4a0d19"); bg.addColorStop(1, "#16060a");
  x.fillStyle = bg; x.fillRect(0, 0, W, H);

  // faint star lattice
  x.strokeStyle = "rgba(230,207,148,0.07)"; x.lineWidth = 1;
  for (let gx = 40; gx < W; gx += 70) for (let gy = 40; gy < H; gy += 70) {
    x.save(); x.translate(gx, gy);
    x.strokeRect(-18, -18, 36, 36); x.rotate(Math.PI / 4); x.strokeRect(-18, -18, 36, 36); x.restore();
  }
  x.strokeStyle = gold; x.lineWidth = 3; x.strokeRect(36, 36, W - 72, H - 72);
  x.lineWidth = 1; x.strokeRect(52, 52, W - 104, H - 104);

  x.textAlign = "center"; x.fillStyle = gold;
  x.font = '64px Amiri, "Noto Naskh Arabic", serif'; x.direction = "rtl";
  x.fillText("بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", W / 2, 170);
  x.direction = "ltr";

  // crescent
  x.beginPath(); x.arc(W / 2, 250, 30, 0, Math.PI * 2); x.fill();
  x.globalCompositeOperation = "destination-out"; x.beginPath(); x.arc(W / 2 + 14, 244, 26, 0, Math.PI * 2); x.fill();
  x.globalCompositeOperation = "source-over";

  x.fillStyle = "#fbf6ee";
  x.font = '500 28px Jost, sans-serif'; if ("letterSpacing" in x) x.letterSpacing = "10px";
  x.fillText("GUEST PASS", W / 2, 340);
  if ("letterSpacing" in x) x.letterSpacing = "0px";

  x.fillStyle = gold; x.font = '130px "Pinyon Script", cursive';
  x.fillText(`${couple.bride} & ${couple.groom}`, W / 2, 490);
  x.strokeStyle = "rgba(230,207,148,0.5)"; x.beginPath(); x.moveTo(200, 540); x.lineTo(W - 200, 540); x.stroke();

  x.fillStyle = "rgba(251,246,238,0.7)"; x.font = 'italic 32px "Cormorant Garamond", serif';
  x.fillText("Admit", W / 2, 610);
  let size = 78; const name = (guestName || "Our dear guest").slice(0, 32);
  do { x.font = `600 ${size}px "Cormorant Garamond", serif`; size -= 2; } while (x.measureText(name).width > W - 220 && size > 30);
  x.fillStyle = "#fbf6ee"; x.fillText(name, W / 2, 700);

  const block = (title, ev, venue, y) => {
    x.fillStyle = gold; x.font = '500 26px Jost, sans-serif'; if ("letterSpacing" in x) x.letterSpacing = "8px";
    x.fillText(title, W / 2, y); if ("letterSpacing" in x) x.letterSpacing = "0px";
    x.fillStyle = "#fbf6ee"; x.font = '600 40px "Cormorant Garamond", serif';
    x.fillText(`${weddingDayLong}`, W / 2, y + 58);
    x.font = '500 36px "Cormorant Garamond", serif'; x.fillText(`${ev.time}  ·  ${venue.name}`, W / 2, y + 108);
  };
  block("THE NIKAH", events.ceremony, venues.ceremony, 830);
  block("THE WALIMA", events.reception, venues.reception, 1030);

  x.fillStyle = "rgba(230,207,148,0.8)"; x.font = 'italic 30px "Cormorant Garamond", serif';
  x.fillText(couple.hashtag, W / 2, 1270);
  x.font = '400 22px Jost, sans-serif'; x.fillStyle = "rgba(251,246,238,0.55)";
  x.fillText(`Kindly reply by ${rsvp.deadline}`, W / 2, 1320);

  const a = document.createElement("a");
  a.href = c.toDataURL("image/png");
  a.download = `guest-pass-${(guestName || "guest").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
  document.body.appendChild(a); a.click(); a.remove();
}
