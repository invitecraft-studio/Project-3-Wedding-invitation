import { events, couple } from "../data/weddingData.js";

const pad2 = (n) => String(n).padStart(2, "0");

function toICSDate(date) {
  return (
    date.getUTCFullYear() + pad2(date.getUTCMonth() + 1) + pad2(date.getUTCDate()) +
    "T" + pad2(date.getUTCHours()) + pad2(date.getUTCMinutes()) + "00Z"
  );
}

export function downloadICS(eventKey) {
  const ev = events[eventKey];
  if (!ev) return;
  const names = `${couple.bride} & ${couple.groom}`;
  const start = toICSDate(new Date(ev.icsStart));
  const end = toICSDate(new Date(ev.icsEnd));
  const title = `${ev.title}: ${names}`;
  const ua = navigator.userAgent;

  // Android: open Google Calendar with the event pre-filled.
  if (/Android/.test(ua)) {
    window.location.href =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(title) +
      "&dates=" + start + "/" + end +
      "&details=" + encodeURIComponent(ev.quote) +
      "&location=" + encodeURIComponent(ev.venue);
    return;
  }

  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding-Invitation//EN",
    "BEGIN:VEVENT",
    "UID:" + eventKey + "-" + couple.bride + couple.groom + "@wedding",
    "DTSTAMP:" + toICSDate(new Date()),
    "DTSTART:" + start, "DTEND:" + end,
    "SUMMARY:" + title,
    "LOCATION:" + ev.venue,
    "DESCRIPTION:" + ev.quote,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");

  // iPhone: the native "Add to Calendar" sheet opens from a calendar data URI.
  if (/iP(hone|ad|od)/.test(ua)) {
    window.location.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
    return;
  }

  // Desktop: download the .ics file.
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = eventKey + "-" + couple.bride.toLowerCase() + "-" + couple.groom.toLowerCase() + ".ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
