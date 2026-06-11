const obstacles = [];

let obstacleTimer = 0;

function createObstacle() {
  obstacles.push({
    x: Math.random() * 2 - 1,
    z: 1,
    width: Math.random() * 28 + 32,
    height: Math.random() * 34 + 34
  });
}

function updateObstacles() {
  if (gameOver) {
    return;
  }

  obstacleTimer++;

  if (obstacleTimer > 80) {
    createObstacle();
    obstacleTimer = 0;
  }

  for (const obstacle of obstacles) {
    obstacle.z -= 0.006;
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    if (obstacles[i].z <= 0.05) {
      obstacles.splice(i, 1);
    }
  }
}

function projectObstacle(obstacle) {
  const depth = Math.max(obstacle.z, 0.12);

  const scale = 1 / depth;

  const baseY = trench.innerTopY + 20;
  const rangeY = canvas.height - baseY + 80;

  return {
    x: canvas.width / 2 + obstacle.x * scale * 120,
    y: baseY + (1 - depth) * rangeY,
    width: obstacle.width * scale,
    height: obstacle.height * scale
  };
}

function drawObstacles() {
  for (const obstacle of obstacles) {
    const projected = projectObstacle(obstacle);
    drawObstacle(projected);
  }
}

function drawObstacle(obstacle) {
  ctx.save();

  ctx.fillStyle = "rgba(12, 30, 50, 0.95)";
  ctx.strokeStyle = "#ff5c7a";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.rect(
    obstacle.x - obstacle.width / 2,
    obstacle.y - obstacle.height,
    obstacle.width,
    obstacle.height
  );
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 180, 190, 0.65)";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(obstacle.x - obstacle.width / 2, obstacle.y - obstacle.height * 0.65);
  ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y - obstacle.height * 0.65);

  ctx.moveTo(obstacle.x - obstacle.width * 0.2, obstacle.y - obstacle.height);
  ctx.lineTo(obstacle.x - obstacle.width * 0.2, obstacle.y);

  ctx.moveTo(obstacle.x + obstacle.width * 0.22, obstacle.y - obstacle.height);
  ctx.lineTo(obstacle.x + obstacle.width * 0.22, obstacle.y);

  ctx.stroke();

  ctx.restore();
}

function checkObstacleCollisions() {
  if (gameOver) {
    return;
  }

  const zTolerance = 0.055;

  const playerBox = {
    x: player.x - player.width * 0.28,
    y: player.y - player.height * 0.28,
    width: player.width * 0.56,
    height: player.height * 0.56
  };

  for (const obstacle of obstacles) {
    const sameDepth = Math.abs(obstacle.z - player.z) < zTolerance;

    if (!sameDepth) {
      continue;
    }

    const projected = projectObstacle(obstacle);

    const obstacleBox = {
      x: projected.x - projected.width * 0.38,
      y: projected.y - projected.height * 0.75,
      width: projected.width * 0.76,
      height: projected.height * 0.55
    };

    if (rectsOverlap(playerBox, obstacleBox)) {
      gameOver = true;
      stateText.textContent = "Impacto en la trinchera";
      createExplosion(player.x, player.y);
      return;
    }
  }
}

function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}