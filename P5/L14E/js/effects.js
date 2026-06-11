const explosionParticles = [];

function createExplosion(x, y) {
  for (let i = 0; i < 36; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1.5;

    explosionParticles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 4 + 2,
      life: 40,
      maxLife: 40
    });
  }
}

function updateEffects() {
  for (const particle of explosionParticles) {
    particle.x += particle.vx;
    particle.y += particle.vy;

    particle.vx *= 0.96;
    particle.vy *= 0.96;

    particle.life--;
  }

  for (let i = explosionParticles.length - 1; i >= 0; i--) {
    if (explosionParticles[i].life <= 0) {
      explosionParticles.splice(i, 1);
    }
  }
}

function drawEffects() {
  for (const particle of explosionParticles) {
    const alpha = particle.life / particle.maxLife;

    ctx.save();

    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#ffb84d";

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = alpha * 0.6;
    ctx.fillStyle = "#ff5c7a";

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 1.8 * alpha, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}