// src/utils/gamify.js
export function addPoints(points=10) {
  const cur = parseInt(localStorage.getItem("ignite-points")||"0",10);
  const next = cur + points;
  localStorage.setItem("ignite-points", String(next));
  maybeUnlockBadge(next);
  return next;
}
export function maybeUnlockBadge(points) {
  const badges = JSON.parse(localStorage.getItem("ignite-badges")||"[]");
  const mapping = [
    { key: "spark", label: "First Spark", when: 10 },
    { key: "ember", label: "Ember", when: 50 },
    { key: "blaze", label: "Blaze", when: 150 },
  ];
  mapping.forEach(m => {
    if (points >= m.when && !badges.find(b => b.key === m.key)) {
      badges.push({ key: m.key, label: m.label, earnedAt: new Date().toISOString() });
      alert(`🏅 Badge unlocked: ${m.label}`);
    }
  });
  localStorage.setItem("ignite-badges", JSON.stringify(badges));
}
