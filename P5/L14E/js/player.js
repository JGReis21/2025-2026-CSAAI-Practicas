const player = {
  x: canvas.width / 2,
  y: canvas.height - 95,
  width: 92,
  height: 58,
  speed: 4.2,
  vx: 0,
  vy: 0,
  roll: 0,
  z: 0.22
};

const keys = {
  left: false,
  right: false,
  up: false,
  down: false
};

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    keys.left = true;
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    keys.right = true;
  }

  if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
    keys.up = true;
  }

  if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
    keys.down = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    keys.left = false;
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    keys.right = false;
  }

  if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
    keys.up = false;
  }

  if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
    keys.down = false;
  }
});

function updatePlayer() {
  if (gameOver) {
    return;
  }

  player.vx = 0;
  player.vy = 0;

  if (keys.left) {
    player.vx = -player.speed;
  }

  if (keys.right) {
    player.vx = player.speed;
  }

  if (keys.up) {
    player.vy = -player.speed;
  }

  if (keys.down) {
    player.vy = player.speed;
  }

  player.x += player.vx;
  player.y += player.vy;

  limitPlayerMovement();
  updatePlayerRoll();
}

function limitPlayerMovement() {
  const limits = {
    minX: canvas.width * 0.26,
    maxX: canvas.width * 0.74,
    minY: canvas.height * 0.66,
    maxY: canvas.height * 0.88
  };

  player.x = Math.max(limits.minX, Math.min(limits.maxX, player.x));
  player.y = Math.max(limits.minY, Math.min(limits.maxY, player.y));
}

function updatePlayerRoll() {
  const targetRoll = player.vx * 0.035;

  player.roll += (targetRoll - player.roll) * 0.16;
}

function drawPlayer() {
  if (gameOver) {
    return;
  }

  drawStarfighter(player.x, player.y, player.width, player.height, player.roll);
}

function drawStarfighter(x, y, width, height, roll) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(roll);

  drawEngineGlow(width, height);
  drawShipBody(width, height);
  drawShipWings(width, height);
  drawShipEngines(width, height);
  drawShipCockpit(width, height);

  ctx.restore();
}

function drawEngineGlow(width, height) {
  const flameSize = 8 + Math.sin(time * 0.25) * 3;

  ctx.save();

  ctx.globalAlpha = 0.75;
  ctx.fillStyle = "rgba(255, 130, 60, 0.65)";

  ctx.beginPath();
  ctx.moveTo(-width * 0.22, height * 0.28);
  ctx.lineTo(-width * 0.15, height * 0.28 + flameSize);
  ctx.lineTo(-width * 0.08, height * 0.28);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(width * 0.08, height * 0.28);
  ctx.lineTo(width * 0.15, height * 0.28 + flameSize);
  ctx.lineTo(width * 0.22, height * 0.28);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawShipBody(width, height) {
  ctx.fillStyle = "#d8e4f2";
  ctx.strokeStyle = "#6f8fb8";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, -height * 0.48);
  ctx.lineTo(width * 0.16, height * 0.18);
  ctx.lineTo(0, height * 0.38);
  ctx.lineTo(-width * 0.16, height * 0.18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawShipWings(width, height) {
  ctx.fillStyle = "#c4d3e5";
  ctx.strokeStyle = "#6f8fb8";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(-width * 0.08, -height * 0.08);
  ctx.lineTo(-width * 0.48, -height * 0.38);
  ctx.lineTo(-width * 0.36, -height * 0.18);
  ctx.lineTo(-width * 0.12, height * 0.06);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-width * 0.11, height * 0.1);
  ctx.lineTo(-width * 0.5, height * 0.34);
  ctx.lineTo(-width * 0.34, height * 0.38);
  ctx.lineTo(-width * 0.08, height * 0.18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width * 0.08, -height * 0.08);
  ctx.lineTo(width * 0.48, -height * 0.38);
  ctx.lineTo(width * 0.36, -height * 0.18);
  ctx.lineTo(width * 0.12, height * 0.06);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width * 0.11, height * 0.1);
  ctx.lineTo(width * 0.5, height * 0.34);
  ctx.lineTo(width * 0.34, height * 0.38);
  ctx.lineTo(width * 0.08, height * 0.18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#e8f3ff";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(-width * 0.48, -height * 0.38);
  ctx.lineTo(-width * 0.58, -height * 0.45);

  ctx.moveTo(width * 0.48, -height * 0.38);
  ctx.lineTo(width * 0.58, -height * 0.45);

  ctx.moveTo(-width * 0.5, height * 0.34);
  ctx.lineTo(-width * 0.6, height * 0.4);

  ctx.moveTo(width * 0.5, height * 0.34);
  ctx.lineTo(width * 0.6, height * 0.4);

  ctx.stroke();
}

function drawShipEngines(width, height) {
  ctx.fillStyle = "#6f7f95";
  ctx.strokeStyle = "#e8f3ff";
  ctx.lineWidth = 1.5;

  const engines = [
    [-width * 0.24, -height * 0.12],
    [width * 0.24, -height * 0.12],
    [-width * 0.24, height * 0.18],
    [width * 0.24, height * 0.18]
  ];

  for (const [engineX, engineY] of engines) {
    ctx.beginPath();
    ctx.ellipse(engineX, engineY, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

function drawShipCockpit(width, height) {
  ctx.fillStyle = "#15263d";
  ctx.strokeStyle = "#8fd3ff";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.ellipse(0, -height * 0.12, width * 0.08, height * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}