const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const stateEl = document.getElementById("state");
const relocateBtn = document.getElementById("relocateBtn");
const resetBtn = document.getElementById("resetBtn");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let gem = null;
let brut = null;
let yelis = [];
let animationId = null;

function setState(text) {
  stateEl.textContent = text;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function drawBackground() {
  ctx.fillStyle = "#161c28";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = "#1d2636";
  for (let i = 0; i < WIDTH; i += 60) {
    ctx.fillRect(i, HEIGHT - 80, 40, 80);
  }

  ctx.strokeStyle = "#263248";
  ctx.lineWidth = 2;

  for (let x = 0; x < WIDTH; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
  }

  for (let y = 0; y < HEIGHT; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }
}

function createGem() {
  gem = {
    x: random(120, WIDTH - 120),
    y: random(100, HEIGHT - 120),
    radius: 18
  };
}

function drawGem() {
  ctx.save();
  ctx.translate(gem.x, gem.y);

  ctx.fillStyle = "#b05cff";
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(16, 0);
  ctx.lineTo(0, 22);
  ctx.lineTo(-16, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#f3ddff";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

class Character {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  moveTowards(targetX, targetY, factor = 1) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 0.001) {
      this.x += (dx / dist) * this.speed * factor;
      this.y += (dy / dist) * this.speed * factor;
    }

    this.x = clamp(this.x, this.radius, WIDTH - this.radius);
    this.y = clamp(this.y, this.radius, HEIGHT - this.radius);
  }
}

class Brut extends Character {
  constructor(x, y) {
    super(x, y, 24, 1.2);
    this.name = "Brut";
  }

  update() {
    this.moveTowards(gem.x, gem.y);
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(0, -18, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(-14, -4, 28, 42);

    ctx.strokeStyle = "#f1c27d";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(8, -20);
    ctx.lineTo(28, -12);
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Brut", 0, -34);

    ctx.restore();
  }
}

class Yeli extends Character {
  constructor(x, y, role) {
    super(x, y, 16, 1.5);
    this.role = role;
    this.wanderAngle = random(0, Math.PI * 2);
    this.wanderTimer = 0;
  }

  update() {
    if (this.role === "follower") {
      this.followBrut();
    } else if (this.role === "runner") {
      this.seekGem();
    } else if (this.role === "wanderer") {
      this.wander();
    } else if (this.role === "Kevin") {
      this.kevin();
    }
  }

  followBrut() {
    const d = distance(this.x, this.y, brut.x, brut.y);

    if (d > 70) {
      this.moveTowards(brut.x, brut.y);
    } else {
      this.moveTowards(brut.x + 30, brut.y + 10, 0.4);
    }
  }

  seekGem() {
    const dGem = distance(this.x, this.y, gem.x, gem.y);

    if (dGem < 220) {
      this.moveTowards(gem.x, gem.y, 1.25);
    } else {
      this.followBrut();
    }
  }

  kevin() {
    const dGem = distance(this.x, this.y, gem.x, gem.y);

    if (dGem < 620) {
      this.moveTowards(gem.x, gem.y, 2);
    } else {
      this.followBrut();
    }
  }

  wander() {
    this.wanderTimer--;

    if (this.wanderTimer <= 0) {
      this.wanderAngle = random(0, Math.PI * 2);
      this.wanderTimer = 40 + Math.floor(random(0, 40));
    }

    this.x += Math.cos(this.wanderAngle) * this.speed * 0.7;
    this.y += Math.sin(this.wanderAngle) * this.speed * 0.7;

    this.x = clamp(this.x, this.radius, WIDTH - this.radius);
    this.y = clamp(this.y, this.radius, HEIGHT - this.radius);

    const dGem = distance(this.x, this.y, gem.x, gem.y);
    if (dGem < 120) {
      this.moveTowards(gem.x, gem.y, 0.9);
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.fillStyle = "#ffd54a";
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#dbe7ff";
    ctx.beginPath();
    ctx.arc(-6, -2, 5, 0, Math.PI * 2);
    ctx.arc(6, -2, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-6, -2, 8, 0, Math.PI * 2);
    ctx.arc(6, -2, 8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#2b6cff";
    ctx.fillRect(-10, 8, 20, 12);

    ctx.fillStyle = "#fff";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.role, 0, -22);

    ctx.restore();
  }
}

function setupScene() {
  createGem();

  brut = new Brut(120, HEIGHT / 2);

  yelis = [
    new Yeli(70, HEIGHT / 2 - 40, "follower"),
    new Yeli(90, HEIGHT / 2 + 30, "runner"),
    new Yeli(60, HEIGHT / 2 + 80, "wanderer"),
    new Yeli(60, HEIGHT / 2 + 80, "Kevin")
  ];

  setState("Brut y los Yelis buscan la gema");
}

function checkGemFound() {
  const brutClose = distance(brut.x, brut.y, gem.x, gem.y) < brut.radius + gem.radius;

  if (brutClose) {
    setState("Brut ha encontrado la gema");
    return true;
  }

  for (const yeli of yelis) {
    const yeliClose = distance(yeli.x, yeli.y, gem.x, gem.y) < yeli.radius + gem.radius;

    if (yeliClose) {
      setState(`Un Yeli (${yeli.role}) ha encontrado la gema`);
      return true;
    }
  }

  return false;
}

function update() {
  brut.update();
  yelis.forEach((yeli) => yeli.update());
}

function draw() {
  drawBackground();
  drawGem();
  brut.draw();
  yelis.forEach((yeli) => yeli.draw());
}

function loop() {
  update();
  draw();

  checkGemFound();

  animationId = requestAnimationFrame(loop);
}

function resetScene() {
  cancelAnimationFrame(animationId);
  setupScene();
  loop();
}

relocateBtn.addEventListener("click", () => {
  createGem();
  setState("La gema ha cambiado de sitio");
});

resetBtn.addEventListener("click", resetScene);

setupScene();
loop();

// Test de funciones

// drawBackground();

// createGem();
// drawGem();

// brut = new Brut(120, HEIGHT / 2);
// brut.draw();

// Jlo = new Yeli(70, HEIGHT / 2 - 40, "wanderer");
// Jlo.draw();
