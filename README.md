# Esther & Daniel: Christian wedding invitation website

A mobile-first wedding site built with React and Vite. It opens like an invitation card, then shows a live countdown, story, ceremony and reception cards, schedule, maps, wedding party, good-to-know notes and a WhatsApp RSVP.

## Run it
```bash
npm install
npm run dev
```

## Change the details
Edit **`src/data/weddingData.js`**. Everything comes from that file:
- `WEDDING_DATE` and `RSVP_BY_DATE` (first lines) re-date the whole site, including the countdown and calendar files.
- Names, parents, wedding party, story, venues, schedule, dress code and travel notes.
- `rsvp.whatsapp`: the number that receives RSVPs, with country code and no `+` (for example `919876543210`). Leave it empty to let the guest choose a contact.

Card artwork is in `src/assets/` (`cover.jpg`, `ceremony-bg.jpg`, `reception-bg.jpg`). The text on the cards is real text, so it updates from the data file.

## Deploy (Vercel)
1. Push to GitHub, then import the repo in Vercel (framework: Vite).
2. In `index.html`, replace `YOUR-SITE.vercel.app` (3 places) with your real link so WhatsApp shows the preview image from `public/og-share.jpg`.
3. If WhatsApp shows an old preview, add `?v=2` to the link.

## Before using this for a client
- **Artwork licences.** `ceremony-bg.jpg` still carries the original designer's "Mishita Graphics" watermark. Use a licensed, watermark-free version of that artwork for any paid or public job. Check the licence of the other two images as well.
- Names, story, parents and venues in this project are sample content.
