const stars = [];

for (let i = 0; i < 90; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * starLimitY,
    size: Math.random() * 1.8 + 0.4,
    phase: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.04 + 0.01
  });
}

function drawSpaceBackground() {
  ctx.fillStyle = "#02040c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawStars();
  drawPlanet();
  drawEnemyFleet();
}

function drawStars() {
  ctx.fillStyle = "#ffffff";

  for (const star of stars) {
    const alpha = 0.35 + Math.sin(time * star.twinkleSpeed + star.phase) * 0.3;

    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

function drawPlanet() {
  const planetX = canvas.width - 130;
  const planetY = 85;
  const radius = 42;

  ctx.save();

  const glow = ctx.createRadialGradient(
    planetX, planetY, radius * 0.6,
    planetX, planetY, radius * 1.8
  );
  glow.addColorStop(0, "rgba(140, 170, 255, 0.22)");
  glow.addColorStop(1, "rgba(140, 170, 255, 0)");

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(planetX, planetY, radius * 1.8, 0, Math.PI * 2);
  ctx.fill();

  const planetGradient = ctx.createRadialGradient(
    planetX - 10, planetY - 12, 8,
    planetX, planetY, radius
  );
  planetGradient.addColorStop(0, "#c9d7ff");
  planetGradient.addColorStop(0.45, "#708eff");
  planetGradient.addColorStop(1, "#344b9b");

  ctx.fillStyle = planetGradient;
  ctx.beginPath();
  ctx.arc(planetX, planetY, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.22;
  ctx.fillStyle = "#0a1020";
  ctx.beginPath();
  ctx.arc(planetX + 10, planetY + 8, radius - 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(230, 240, 255, 0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(planetX, planetY, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(220, 232, 255, 0.45)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(planetX, planetY + 4, radius + 18, 12, -0.25, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

function drawEnemyFleet() {
  drawEnemyShip(145, 82, 1.05, 0.95);
  drawEnemyShip(78, 122, 0.42, 0.68);
  drawEnemyShip(222, 118, 0.36, 0.62);
}

function drawEnemyShip(x, y, scale = 1, alpha = 0.9) {
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.globalAlpha = alpha * 0.22;
  ctx.fillStyle = "#050914";
  ctx.beginPath();
  ctx.moveTo(-104, 0);
  ctx.lineTo(60, -24);
  ctx.lineTo(106, 0);
  ctx.lineTo(60, 24);
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#121a2e";
  ctx.beginPath();
  ctx.moveTo(-90, 0);
  ctx.lineTo(55, -16);
  ctx.lineTo(95, 0);
  ctx.lineTo(55, 16);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-12, -13);
  ctx.lineTo(30, -24);
  ctx.lineTo(46, -12);
  ctx.lineTo(2, -6);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-26, 7);
  ctx.lineTo(26, 7);
  ctx.lineTo(12, 17);
  ctx.lineTo(-18, 16);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(170, 205, 255, 0.28)";
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-40, 0);
  ctx.lineTo(70, 0);
  ctx.stroke();

  ctx.strokeStyle = "rgba(210, 228, 255, 0.40)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-90, 0);
  ctx.lineTo(55, -16);
  ctx.lineTo(95, 0);
  ctx.lineTo(55, 16);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = "rgba(190, 210, 255, 0.18)";
  ctx.fillRect(6, -16, 10, 8);

  ctx.fillStyle = "rgba(120, 170, 255, 0.75)";
  ctx.fillRect(-74, -5, 10, 3);
  ctx.fillRect(-74, 2, 10, 3);

  ctx.restore();
}