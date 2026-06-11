function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  time++;
  updatePlayer();
  updateObstacles();
  checkObstacleCollisions();
  updateEffects();
}

function drawScene() {
  clearCanvas();
  drawSpaceBackground();
  drawTrench();
  drawObstacles();
  drawPlayer();
  drawEffects();
  drawGameOverMessage();
}

function gameLoop() {
  update();
  drawScene();

  animationId = requestAnimationFrame(gameLoop);
}

gameLoop();

function drawGameOverMessage() {
  if (!gameOver) {
    return;
  }

  ctx.save();

  ctx.fillStyle = "rgba(2, 4, 12, 0.55)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff5c7a";
  ctx.font = "bold 38px Arial";
  ctx.textAlign = "center";
  ctx.fillText("IMPACTO", canvas.width / 2, canvas.height / 2 - 10);

  ctx.fillStyle = "#dbe7f7";
  ctx.font = "18px Arial";
  ctx.fillText("Pulsa R para reiniciar", canvas.width / 2, canvas.height / 2 + 26);

  ctx.restore();
}

function resetGame() {
  obstacles.length = 0;
  obstacleTimer = 0;
  explosionParticles.length = 0;

  player.x = canvas.width / 2;
  player.y = canvas.height - 95;
  player.vx = 0;
  player.vy = 0;
  player.roll = 0;

  gameOver = false;
  stateText.textContent = "Preparado para entrar en la trinchera";
}

document.addEventListener("keydown", function (event) {
  if (event.key.toLowerCase() === "r") {
    resetGame();
  }
});