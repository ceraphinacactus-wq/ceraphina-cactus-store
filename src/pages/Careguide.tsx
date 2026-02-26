import React from "react";

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <section className="card" style={{ marginBottom: 16 }}>
      <div className="cardHeader">
        <h2 className="h2" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span aria-hidden="true" style={{ fontSize: 18 }}>{icon ?? "•"}</span>
          {title}
        </h2>
      </div>
      <div className="cardBody">{children}</div>
    </section>
  );
};

export default function CareGuide() {
  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <header style={{ marginBottom: 18 }}>
        <h1 className="h1">Cactus Care Guide</h1>
        <p className="muted" style={{ marginTop: 6, maxWidth: 900 }}>
          Quick, practical bullet notes for healthy columnar cactus growth indoors and outdoors.
          Adjust for your exact climate, pot size, and season.
        </p>
      </header>

      {/* Root Bound / Repotting */}
      <Section title="Root Bound & Repotting" icon="🪴">
        <ul className="bullets">
          <li><strong>Signs of root bound:</strong> water runs straight through, slowed growth, plant dries out unusually fast, roots circling the pot, or the pot bulging/cracking.</li>
          <li><strong>When to repot:</strong> typically when roots fill the pot or you’re watering much more often than normal; also after purchase if the soil stays wet too long.</li>
          <li><strong>Size up gradually:</strong> go up ~1–2 inches in pot diameter; oversized pots hold extra moisture and increase rot risk.</li>
          <li><strong>After repotting:</strong> wait 3–7 days before watering (longer if roots were damaged) to let micro-tears callus.</li>
          <li><strong>Soil + drainage:</strong> always use a fast-draining mix and a pot with a drainage hole; never let the pot sit in a saucer of water.</li>
        </ul>
      </Section>

      {/* Indoor Lighting */}
      <Section title="Indoor Lighting" icon="💡">
        <ul className="bullets">
          <li><strong>Goal:</strong> bright, consistent light for compact growth (avoid stretching/etiolation).</li>
          <li><strong>Distance matters:</strong> moving a light closer can increase intensity more than “buying a slightly stronger bulb.”</li>
          <li><strong>Bulb “strength” basics:</strong> watts = power draw; <strong>lumens</strong> (visible brightness) aren’t perfect for plants; <strong>PPFD</strong> is what matters for growth.</li>
          <li><strong>Recommended targets (typical range):</strong> aim roughly <strong>200–500 PPFD</strong> at the cactus tops for steady growth.</li>
          <li><strong>DLI guidance:</strong> aim roughly <strong>10–25 DLI</strong> depending on growth stage, acclimation, and season (more is not always better).</li>
          <li><strong>Photoperiod:</strong> 12–16 hours/day indoors is common; keep it consistent.</li>
          <li><strong>Measure it:</strong> use free light measuring apps like <strong>PPFD Meter</strong> (Android) to get a baseline and compare changes.</li>
          <li><strong>Heat + airflow:</strong> lights can warm the canopy—use airflow to prevent hot spots and pest issues.</li>
        </ul>
      </Section>

      {/* Watering */}
      <Section title="Watering & Seasonal Rhythm" icon="💧">
        <ul className="bullets">
          <li><strong>Deep water, then dry:</strong> water thoroughly until it drains, then let soil dry out before watering again.</li>
          <li><strong>Frequency depends on:</strong> pot size, soil mix, temperature, airflow, and light intensity—not a fixed schedule.</li>
          <li><strong>Safer rule:</strong> if unsure, wait an extra day or two—overwatering is the fastest way to rot columnar cactus.</li>
          <li><strong>Winter slowdown:</strong> less light + cooler temps = slower drinking; reduce watering accordingly.</li>
        </ul>
      </Section>

      {/* Transitioning Outdoors */}
      <Section title="Transitioning Outdoors (Hardening Off)" icon="☀️">
        <ul className="bullets">
          <li><strong>Filtered afternoon light:</strong> bright light with shade during the harshest afternoon hours (e.g., under shade cloth, dappled tree shade, porch overhang).</li>
          <li><strong>Hardening off is required:</strong> indoor-grown cactus can sunburn quickly—introduce outdoor light gradually over 7–14 days.</li>
          <li><strong>Week 1 approach:</strong> start with early morning sun or bright shade; avoid direct midday sun.</li>
          <li><strong>Week 2 approach:</strong> slowly increase direct sun exposure in small increments (15–30 minutes more per day as tolerated).</li>
          <li><strong>Sun protection options:</strong> shade cloth (30–50%), patio umbrellas, moving to east-facing light, or placing behind other plants for partial shade.</li>
          <li><strong>Watch for burn:</strong> bleaching, tan patches, or crispy spots—reduce sun immediately and return to filtered light.</li>
          <li><strong>Wind:</strong> outdoor wind increases water use—monitor soil moisture more closely after moving outside.</li>
        </ul>
      </Section>

      {/* Propagation */}
      <Section title="Propagating Cuttings" icon="🌵">
        <ul className="bullets">
          <li><strong>Clean cut:</strong> use a clean blade; make a straight cut and keep orientation (top stays top).</li>
          <li><strong>Callus time:</strong> let the cutting dry in a shaded, airy place until the cut end calluses (often 7–14 days depending on thickness/humidity).</li>
          <li><strong>Planting:</strong> set into dry, well-draining mix; keep upright and stable.</li>
          <li><strong>First watering:</strong> wait until roots begin (or at least a solid callus), then water lightly; increase as rooting establishes.</li>
          <li><strong>Light while rooting:</strong> bright shade/filtered light is best—avoid harsh direct sun until rooted.</li>
          <li><strong>Rot prevention:</strong> avoid wet soil during early rooting; too much moisture before roots is the #1 cause of rot.</li>
        </ul>
      </Section>

      {/* Common Pests & Issues */}
      <Section title="Common Pests & Issues (and Prevention)" icon="🛡️">
        <ul className="bullets">
          <li><strong>Prevention:</strong> good airflow, avoid overwatering, keep soil fast-draining, and don’t crowd plants tightly.</li>
          <li><strong>Quarantine new plants:</strong> isolate new arrivals for 1–2 weeks to avoid spreading pests.</li>
          <li><strong>Mealybugs:</strong> white cottony clusters; remove with cotton swab + isopropyl alcohol; repeat weekly until gone.</li>
          <li><strong>Spider mites:</strong> fine webbing, speckling; increase airflow, rinse gently, and treat with appropriate miticide if needed.</li>
          <li><strong>Scale:</strong> hard bumps; physically remove and spot-treat; persistence matters.</li>
          <li><strong>Fungus gnats:</strong> usually from overly moist soil; let soil dry more and consider sticky traps; improve drainage.</li>
          <li><strong>Rot:</strong> soft/mushy areas or dark spreading spots—stop watering, increase airflow, and cut above rot if needed.</li>
          <li><strong>Etiolation:</strong> skinny, stretched growth—needs more light intensity or closer lights (increase PPFD gradually).</li>
          <li><strong>Scars/corking:</strong> older base may harden naturally; differentiate from active rot (rot is soft/wet and spreads).</li>
        </ul>
      </Section>

      {/* Dormancy / Hibernation */}
      <Section title="Dormancy / Hibernation (Optional)" icon="🌙">
        <ul className="bullets">
          <li><strong>When it happens:</strong> cooler temps + shorter days can slow growth dramatically—this is normal.</li>
          <li><strong>Water less:</strong> during dormancy, reduce watering to prevent rot (the cactus drinks much less).</li>
          <li><strong>Light still matters:</strong> keep bright light if possible; low light + cool + wet soil is the danger zone.</li>
          <li><strong>Warm + bright = growth:</strong> if you keep it warm and strongly lit indoors, it may not fully go dormant.</li>
        </ul>
      </Section>

      <footer className="muted" style={{ marginTop: 18 }}>
        Tip: For best results, match your soil mix and watering habits to your light intensity.
      </footer>
    </main>
  );
}