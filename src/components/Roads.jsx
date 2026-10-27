import { cities, travel, goodToKnow } from "../data/weddingData.js";
import { useLang } from "../i18n.jsx";

// Equirectangular projection of coastal Andhra Pradesh onto a 360 x 300 canvas.
const LON0 = 77.6, LON1 = 84.2, LAT0 = 18.6, LAT1 = 13.0, W = 360, H = 300, PAD = 14;
const px = (lon) => PAD + ((lon - LON0) / (LON1 - LON0)) * (W - PAD * 2);
const py = (lat) => PAD + ((LAT0 - lat) / (LAT0 - LAT1)) * (H - PAD * 2);

const COAST = [[84.2, 18.6], [83.6, 18.1], [83.25, 17.75], [82.7, 17.2], [82.25, 16.95], [81.7, 16.4], [81.15, 16.15], [80.8, 15.9], [80.35, 15.8], [80.1, 15.3], [80.05, 14.5], [80.25, 13.7], [80.3, 13.0]];
const land = "M" + COAST.map(([lo, la]) => `${px(lo).toFixed(1)} ${py(la).toFixed(1)}`).join(" L") + ` L${PAD} ${H - PAD} L${PAD} ${PAD} Z`;
const coastLine = "M" + COAST.map(([lo, la]) => `${px(lo).toFixed(1)} ${py(la).toFixed(1)}`).join(" L");

export default function Roads() {
  const { t } = useLang();
  const home = cities.find((c) => c.home);
  const hx = px(home.lon), hy = py(home.lat);

  return (
    <section className="roads night reveal" id="roads" data-nav="roads">
      <h2 className="h2">{t("roadsTitle")}</h2>
      <p className="sub">{t("roadsSub")}</p>

      <div className="map-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="map" role="img" aria-label="Schematic map of Andhra Pradesh with routes converging on Vijayawada">
          <path d={land} fill="rgba(230,207,148,0.07)" />
          <path d={coastLine} fill="none" stroke="rgba(230,207,148,0.55)" strokeWidth="1.2" />
          <text x={W - 20} y={H - 40} textAnchor="end" className="map-sea">Bay of Bengal</text>
          {cities.filter((c) => !c.home).map((c, i) => {
            const x = px(c.lon), y = py(c.lat);
            const mx = (x + hx) / 2 + (y > hy ? -14 : 14), my = (y + hy) / 2 + (x > hx ? -12 : 12);
            return (
              <g key={c.name}>
                <path d={`M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${hx.toFixed(1)} ${hy.toFixed(1)}`}
                  className="route" pathLength="100" style={{ animationDelay: `${0.2 + i * 0.25}s` }} />
                <circle cx={x} cy={y} r="3" fill="#e6cf94" />
                <text x={x + (x > hx ? 7 : -7)} y={y + 3} textAnchor={x > hx ? "start" : "end"} className="map-city">{c.name}</text>
              </g>
            );
          })}
          <circle cx={hx} cy={hy} r="14" className="pulse" />
          <circle cx={hx} cy={hy} r="5.5" fill="#fbf6ee" stroke="#c9a45c" strokeWidth="2" />
          <text x={hx + 9} y={hy - 9} textAnchor="start" className="map-home">Vijayawada</text>
        </svg>
        <p className="map-note">Schematic map, not to scale.</p>
      </div>

      <div className="travel">
        {travel.map((x) => (
          <div key={x.title}><h4>{x.title}</h4><p>{x.text}</p></div>
        ))}
      </div>

      <h3 className="know-title">{t("know")}</h3>
      <div className="know">
        {goodToKnow.map((g, i) => (
          <details key={g.title} open={i === 0}>
            <summary>{g.title}</summary>
            <p>{g.text}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
