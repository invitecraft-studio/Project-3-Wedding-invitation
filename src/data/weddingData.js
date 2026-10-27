// ─────────────────────────────────────────────────────────────
//  Everything on the site comes from this one file.
//  Change the names, date, venues, story and RSVP number here.
//  (All names, venues and stories are sample content.)
// ─────────────────────────────────────────────────────────────

// ▼▼ RE-DATE THE WHOLE SITE WITH THESE TWO LINES ▼▼
const WEDDING_DATE = "2027-03-27"; // YYYY-MM-DD (Nikah + Walima, same day)
const RSVP_BY_DATE = "2027-03-10"; // YYYY-MM-DD
// ▲▲ labels, calendar files and the countdown all follow ▲▲

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function parts(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, d, dow: WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()], month: MONTHS[m - 1] };
}
function longDay(iso) {
  const p = parts(iso);
  return `${p.dow}, ${p.d} ${p.month} ${p.y}`;
}
function shortDay(iso) {
  const p = parts(iso);
  return `${p.d} ${p.month} ${p.y}`;
}

export const couple = {
  bride: "Aaliya",
  groom: "Rayyan",
  brideFull: "Aaliya Fatima Shaik",
  groomFull: "Rayyan Ahmed Khan",
  hashtag: "#AaliyaWedsRayyan",
};

export const weddingDayLong = longDay(WEDDING_DATE);      // Saturday, 27 March 2027
export const weddingDayShort = shortDay(WEDDING_DATE);    // 27 March 2027
export const weddingWeekday = parts(WEDDING_DATE).dow;    // Saturday
export const weddingDotted = WEDDING_DATE.split("-").reverse().join(".");
export const rsvpDeadline = shortDay(RSVP_BY_DATE);
export const weddingTarget = `${WEDDING_DATE}T11:00:00+05:30`; // countdown ends at the Nikah

export const place = "Vijayawada, Andhra Pradesh";

// ── Greeting, Quran verse and dua ──
export const salaam = {
  arabic: "السلام عليكم ورحمة الله وبركاته",
  text: "Assalamu Alaikum wa Rahmatullahi wa Barakatuh",
};

export const verse = {
  arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  text: "Among His signs is that He created partners for you from among yourselves, so that you may find peace in them, and He placed love and mercy between you.",
  ref: "Surah Ar-Rum, 30:21",
  note: "We begin our married life in the name of Allah, and we would be so grateful to have your duas with us.",
};

export const dua = {
  arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  translit: "Barakallahu laka wa baraka alayka wa jama‘a baynakuma fi khayr",
  text: "May Allah bless you, shower His blessings upon you, and unite you both in goodness.",
  ref: "The dua taught for the newly married",
};

// ── Venues (sample places in Vijayawada; swap for the real ones) ──
export const venues = {
  ceremony: {
    name: "Jamia Masjid",
    address: "Governorpet, Vijayawada, Andhra Pradesh 520002",
    mapsQuery: "Jamia+Masjid+Governorpet+Vijayawada",
    mapsEmbed: "https://maps.google.com/maps?q=Jamia%20Masjid%20Governorpet%20Vijayawada&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  reception: {
    name: "Novotel Vijayawada Varun",
    hall: "V Convention",
    address: "Bharathi Nagar, Gunadala, Vijayawada, Andhra Pradesh 520008",
    mapsQuery: "Novotel+Vijayawada+Varun",
    mapsEmbed: "https://maps.google.com/maps?q=Novotel%20Vijayawada%20Varun&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
};

// ── The two celebrations ──
export const events = {
  ceremony: {
    key: "ceremony",
    title: "Nikah Ceremony",
    day: weddingDayLong,
    time: "11:00 AM",
    until: "about 12:30 PM",
    venue: `${venues.ceremony.name}, Governorpet, Vijayawada`,
    quote: "Join us as we are united in Nikah, in the presence of our families and your duas.",
    icsStart: `${WEDDING_DATE}T11:00:00+05:30`,
    icsEnd: `${WEDDING_DATE}T12:30:00+05:30`,
  },
  reception: {
    key: "reception",
    title: "Walima Reception",
    day: weddingDayLong,
    time: "7:00 PM",
    until: "about 10:30 PM",
    venue: `${venues.reception.name}, Vijayawada`,
    quote: "An evening of dinner, duas and joy to celebrate the newlyweds.",
    icsStart: `${WEDDING_DATE}T19:00:00+05:30`,
    icsEnd: `${WEDDING_DATE}T22:30:00+05:30`,
  },
};

// ── Our story (sample copy; replace with the couple's own) ──
export const story = [
  {
    year: "2025",
    title: "A rishta from Guntur",
    text: "A khala who knew both families spoke Rayyan's name at Aaliya's home over evening chai. Two sets of parents, a plate of double ka meetha and a long, happy conversation followed.",
  },
  {
    year: "2025",
    title: "Istikhara and a yes",
    text: "Both of them prayed for guidance and took their time. When the answer came, it came as peace, and both families said yes on the same day.",
  },
  {
    year: "2026",
    title: "The engagement in Nellore",
    text: "Surrounded by cousins, sweets and the scent of attar, rings were exchanged and the date was fixed. Aaliya's grandmother declared it the best day of the year.",
  },
  {
    year: "2027",
    title: "Nikah, and a lifetime",
    text: "With the blessings of our parents and the duas of everyone we love, we begin a home built on love, mercy and faith.",
  },
];

// ── Order of the day ──
export const schedule = {
  morning: {
    heading: "The Nikah",
    venue: venues.ceremony.name,
    items: [
      { time: "10:30 AM", what: "Guests arrive and are seated", note: "Volunteers will help you find a place." },
      { time: "11:00 AM", what: "Tilawat-e-Quran", note: "A recitation to begin the day with barakah." },
      { time: "11:20 AM", what: "Khutba-e-Nikah", note: "The sermon of marriage by the Qazi." },
      { time: "11:40 AM", what: "Ijab-o-Qubool", note: "The acceptance, the Mahr and the signing of the Nikahnama." },
      { time: "12:15 PM", what: "Dua and Mubarakbad", note: "Greet the families and share your duas." },
      { time: "1:00 PM", what: "Wedding lunch", note: "Biryani and Andhra specialities, served in the hall next door." },
    ],
  },
  evening: {
    heading: "The Walima",
    venue: `${venues.reception.name}, ${venues.reception.hall}`,
    items: [
      { time: "7:00 PM", what: "Guests arrive", note: "Welcome sharbat and a photo wall." },
      { time: "7:30 PM", what: "Tilawat and Naat", note: "" },
      { time: "8:00 PM", what: "Grand entrance of the couple", note: "" },
      { time: "8:30 PM", what: "Walima dinner", note: "Halal, with vegetarian dishes as well." },
      { time: "9:30 PM", what: "Cake, family photographs and gifts of love", note: "" },
      { time: "10:15 PM", what: "Dua and Rukhsati", note: "A tearful, joyful send-off for the bride." },
    ],
  },
};

// ── People ──
export const families = [
  {
    side: "The bride’s family",
    names: "Mr. Shaik Abdul Rahman and Mrs. Nasreen Begum",
    note: "Parents of Aaliya, Guntur",
  },
  {
    side: "The groom’s family",
    names: "Mr. Mohammed Ibrahim Khan and Mrs. Sultana Begum",
    note: "Parents of Rayyan, Nellore",
  },
];

export const party = [
  { initials: "ZS", name: "Zainab Shaik", role: "Sister of the bride", note: "Aaliya’s little sister, and the keeper of every secret." },
  { initials: "SK", name: "Sameer Khan", role: "Brother of the groom", note: "Rayyan’s elder brother, who has been rehearsing his speech since 2025." },
  { initials: "MB", name: "Mariyam Begum", role: "Best friend of the bride", note: "Aaliya’s friend since school in Guntur." },
  { initials: "FM", name: "Faizan Mohammed", role: "Best friend of the groom", note: "Rayyan’s friend from college and his partner in cricket." },
  { initials: "HS", name: "Hana Sultana", role: "Cousin of the groom", note: "In charge of the mehendi, the music and the mischief." },
  { initials: "ZA", name: "Zaid Ahmed", role: "Cousin of the bride", note: "The family’s unofficial photographer and chief of the biryani queue." },
];

// ── Good to know ──
export const goodToKnow = [
  {
    title: "What to wear",
    text: "Modest, festive attire is perfect: sarees, salwar kameez, sherwanis and abayas are all welcome. Maroon, gold, ivory and black echo our invitation and look beautiful together.",
  },
  {
    title: "Prayer and quiet",
    text: "A clean prayer space is arranged at both venues, and we will pause the programme for Dhuhr and Maghrib. Please keep phones silent during the Khutba and the Nikah.",
  },
  {
    title: "Photographs",
    text: "Our photographers will capture the day. Please ask before photographing anyone, especially the ladies, and feel free to share your own pictures with us afterwards.",
  },
  {
    title: "Little guests and gifts",
    text: "Children are warmly welcome. Your presence and your duas are the greatest gift, so please do not trouble yourselves with more.",
  },
];

export const travel = [
  { title: "By air", text: "Vijayawada Airport (Gannavaram) is about 45 minutes from the city by road, and cabs are available outside." },
  { title: "By train", text: "Vijayawada Junction is the main station, and autos and cabs are available outside." },
  { title: "Where to stay", text: "The Walima venue is also a hotel, so guests travelling from out of town can stay on site. Please book early, as March is a busy month." },
  { title: "Between venues", text: "Both venues are in Vijayawada, a short drive apart. Cars will be arranged for the families after the Nikah lunch." },
];

// ── RSVP ──
// Put the number that should receive RSVPs, with country code and no + or spaces
// (for example "919876543210"). If left empty, WhatsApp opens and lets the guest pick a contact.
export const rsvp = {
  whatsapp: "",
  deadline: rsvpDeadline,
};

export const credit = "Website by InviteCraft Studio";

// ── Where guests travel from (real coordinates, drawn on the schematic map) ──
export const cities = [
  { name: "Vijayawada", lat: 16.51, lon: 80.65, home: true },
  { name: "Guntur", lat: 16.31, lon: 80.44 },
  { name: "Nellore", lat: 14.44, lon: 79.99 },
  { name: "Tirupati", lat: 13.63, lon: 79.42 },
  { name: "Kurnool", lat: 15.83, lon: 78.04 },
  { name: "Rajahmundry", lat: 17.0, lon: 81.78 },
  { name: "Visakhapatnam", lat: 17.69, lon: 83.22 },
];
