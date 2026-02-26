export default function CareGuidePage() {
  return (
    <div className="container">
      <h2>Ceraphina Cactus Care Guide</h2>

      {/* WATERING */}
      <section>
        <h3>💧 Watering</h3>
        <ul>
          <li>Water deeply, then allow soil to dry completely.</li>
          <li>Never water on a schedule — water based on dryness.</li>
          <li>In summer: every 10–21 days depending on heat and airflow.</li>
          <li>In winter: reduce watering significantly.</li>
          <li>Always use well-draining soil.</li>
          <li>Never allow roots to sit in standing water.</li>
        </ul>
      </section>

      {/* LIGHTING */}
      <section>
        <h3>💡 Indoor Lighting</h3>
        <ul>
          <li>Provide bright, direct light.</li>
          <li>South-facing windows preferred.</li>
          <li>Supplement with grow lights if needed.</li>
          <li>Target PPFD: 300–600 μmol/m²/s.</li>
          <li>Target DLI: 20–35 mol/day.</li>
          <li>Use free light meter apps (like PPFD Meter for Android).</li>
          <li>Higher wattage bulbs = more intensity (not just brightness).</li>
        </ul>
      </section>

      {/* TRANSITION OUTDOORS */}
      <section>
        <h3>☀️ Transitioning Outdoors</h3>
        <ul>
          <li>Introduce gradually over 7–14 days.</li>
          <li>Start in bright shade.</li>
          <li>Increase sun exposure slowly.</li>
          <li>Filtered afternoon light = sun through tree cover or shade cloth.</li>
          <li>Protect from harsh midday sun at first.</li>
          <li>Use shade cloth if needed.</li>
        </ul>
      </section>

      {/* HARDENING OFF */}
      <section>
        <h3>🌞 Hardening Off</h3>
        <ul>
          <li>Expose to direct sun for short intervals.</li>
          <li>Increase exposure daily.</li>
          <li>Watch for sunburn (white/yellow patches).</li>
          <li>Stress too fast = permanent scarring.</li>
        </ul>
      </section>

      {/* ROOT BOUND */}
      <section>
        <h3>🪴 Root Bound & Repotting</h3>
        <ul>
          <li>Repot when roots circle heavily around the pot.</li>
          <li>Choose pot 1–2 inches wider.</li>
          <li>Allow roots to dry 3–5 days before watering after repotting.</li>
          <li>Use Ceraphina Basic or Premium Soil Mix.</li>
        </ul>
      </section>

      {/* PROPAGATION */}
      <section>
        <h3>🌵 Propagation</h3>
        <ul>
          <li>Use clean, sterile blade.</li>
          <li>Allow cutting to callous 7–14 days.</li>
          <li>Plant in dry soil.</li>
          <li>Do not water until roots begin forming.</li>
          <li>Keep in bright indirect light during rooting.</li>
        </ul>
      </section>

      {/* PESTS */}
      <section>
        <h3>🐛 Common Pests & Issues</h3>
        <ul>
          <li>Mealybugs</li>
          <li>Spider mites</li>
          <li>Fungus gnats</li>
          <li>Root rot (from overwatering)</li>
        </ul>

        <h4>Prevention</h4>
        <ul>
          <li>Ensure excellent drainage.</li>
          <li>Increase airflow.</li>
          <li>Inspect regularly.</li>
          <li>Isolate infected plants.</li>
          <li>Use 70% isopropyl alcohol for spot treatment.</li>
        </ul>
      </section>

      {/* DORMANCY */}
      <section>
        <h3>❄️ Winter Dormancy</h3>
        <ul>
          <li>Reduce watering dramatically.</li>
          <li>Keep above 40°F.</li>
          <li>Lower light levels are acceptable.</li>
          <li>Growth slows or stops during dormancy.</li>
        </ul>
      </section>
    </div>
  );
}