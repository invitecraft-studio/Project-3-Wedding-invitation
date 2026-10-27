import { families, party, couple } from "../data/weddingData.js";
import { useLang } from "../i18n.jsx";

export default function Family() {
  const { t } = useLang();
  return (
    <section className="family day reveal" id="family">
      <h2 className="h2">{t("familyTitle")}</h2>
      <p className="sub">{t("familySub")}</p>
      <div className="hosts">
        {families.map((f) => (
          <div key={f.side}>
            <h3>{f.side}</h3>
            <p className="host-names">{f.names}</p>
            <p className="host-note">{f.note}</p>
          </div>
        ))}
      </div>
      <ul className="party">
        {party.map((p) => (
          <li key={p.name}>
            <span className="p-arch" aria-hidden="true">{p.initials}</span>
            <h4>{p.name}</h4>
            <b>{p.role}</b>
            <p>{p.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
