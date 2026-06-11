const trench = {
  horizonY: trenchHorizonY,
  innerTopY: trenchHorizonY + 216,

  visibleBottomY: canvas.height,
  renderBottomY: canvas.height + 110,

  innerFarWidth: 95,
  innerNearWidth: 430,

  outerFarWidth: 170,
  outerNearWidth: 1380,

  wallFarHeight: 30,
  wallNearHeight: 190,

  lineSpacing: 32,
  speed: 0.8,
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getTrenchSlice(innerY) {
  const centerX = canvas.width / 2;

  const rawT =
    (innerY - trench.innerTopY) / (trench.renderBottomY - trench.innerTopY);

  const t = Math.max(0, Math.min(1, rawT));

  const innerWidth =
    trench.innerFarWidth + (trench.innerNearWidth - trench.innerFarWidth) * t;

  const outerWidth =
    trench.outerFarWidth + (trench.outerNearWidth - trench.outerFarWidth) * t;

  const wallHeight =
    trench.wallFarHeight + (trench.wallNearHeight - trench.wallFarHeight) * t;

  return {
    innerY: innerY,
    outerY: innerY - wallHeight,
    outerLeft: centerX - outerWidth / 2,
    innerLeft: centerX - innerWidth / 2,
    innerRight: centerX + innerWidth / 2,
    outerRight: centerX + outerWidth / 2
  };
}

function drawFarTrench() {
  const centerX = canvas.width / 2;

  const topY = starLimitY - 7;
  const bottomY = trench.innerTopY;

  const topInnerWidth = 60;
  const bottomInnerWidth = trench.innerFarWidth;

  const topOuterWidth = 115;
  const bottomOuterWidth = trench.outerFarWidth;

  const topWallHeight = 12;
  const bottomWallHeight = trench.wallFarHeight;

  const top = {
    innerY: topY,
    outerY: topY - topWallHeight,
    innerLeft: centerX - topInnerWidth / 2,
    innerRight: centerX + topInnerWidth / 2,
    outerLeft: centerX - topOuterWidth / 2,
    outerRight: centerX + topOuterWidth / 2
  };

  const bottom = {
    innerY: bottomY,
    outerY: bottomY - bottomWallHeight,
    innerLeft: centerX - bottomInnerWidth / 2,
    innerRight: centerX + bottomInnerWidth / 2,
    outerLeft: centerX - bottomOuterWidth / 2,
    outerRight: centerX + bottomOuterWidth / 2
  };

  ctx.save();

  ctx.fillStyle = "rgba(5, 13, 26, 0.68)";

  ctx.beginPath();
  ctx.moveTo(top.innerLeft, top.innerY);
  ctx.lineTo(top.innerRight, top.innerY);
  ctx.lineTo(bottom.innerRight, bottom.innerY);
  ctx.lineTo(bottom.innerLeft, bottom.innerY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(7, 18, 34, 0.58)";

  ctx.beginPath();
  ctx.moveTo(top.outerLeft, top.outerY);
  ctx.lineTo(top.innerLeft, top.innerY);
  ctx.lineTo(bottom.innerLeft, bottom.innerY);
  ctx.lineTo(bottom.outerLeft, bottom.outerY);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(top.innerRight, top.innerY);
  ctx.lineTo(top.outerRight, top.outerY);
  ctx.lineTo(bottom.outerRight, bottom.outerY);
  ctx.lineTo(bottom.innerRight, bottom.innerY);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(66, 217, 255, 0.38)";
  ctx.lineWidth = 1.4;

  ctx.beginPath();

  ctx.moveTo(top.outerLeft, top.outerY);
  ctx.lineTo(bottom.outerLeft, bottom.outerY);

  ctx.moveTo(top.innerLeft, top.innerY);
  ctx.lineTo(bottom.innerLeft, bottom.innerY);

  ctx.moveTo(top.innerRight, top.innerY);
  ctx.lineTo(bottom.innerRight, bottom.innerY);

  ctx.moveTo(top.outerRight, top.outerY);
  ctx.lineTo(bottom.outerRight, bottom.outerY);

  ctx.moveTo(top.outerLeft, top.outerY);
  ctx.lineTo(top.innerLeft, top.innerY);
  ctx.lineTo(top.innerRight, top.innerY);
  ctx.lineTo(top.outerRight, top.outerY);

  ctx.stroke();

  ctx.restore();
}

function drawTrenchSurfaces() {
  const top = getTrenchSlice(trench.innerTopY);
  const bottom = getTrenchSlice(trench.renderBottomY);

  ctx.save();

  ctx.fillStyle = "rgba(7, 18, 34, 0.92)";
  ctx.beginPath();
  ctx.moveTo(top.innerLeft, top.innerY);
  ctx.lineTo(top.innerRight, top.innerY);
  ctx.lineTo(bottom.innerRight, bottom.innerY);
  ctx.lineTo(bottom.innerLeft, bottom.innerY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(8, 24, 45, 0.82)";
  ctx.beginPath();
  ctx.moveTo(top.outerLeft, top.outerY);
  ctx.lineTo(top.innerLeft, top.innerY);
  ctx.lineTo(bottom.innerLeft, bottom.innerY);
  ctx.lineTo(bottom.outerLeft, bottom.outerY);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(top.innerRight, top.innerY);
  ctx.lineTo(top.outerRight, top.outerY);
  ctx.lineTo(bottom.outerRight, bottom.outerY);
  ctx.lineTo(bottom.innerRight, bottom.innerY);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawOuterSurfacePanels() {
  const top = getTrenchSlice(trench.innerTopY);
  const bottom = getTrenchSlice(trench.renderBottomY);

  ctx.save();

  ctx.strokeStyle = "rgba(66, 217, 255, 0.28)";
  ctx.lineWidth = 1.1;

  for (let i = 1; i <= 4; i++) {
    const offset = i * 90;

    ctx.beginPath();
    ctx.moveTo(top.outerLeft - offset * 0.25, top.outerY + 6);
    ctx.lineTo(bottom.outerLeft - offset, bottom.outerY);
    ctx.stroke();
  }

  for (let i = 1; i <= 4; i++) {
    const offset = i * 90;

    ctx.beginPath();
    ctx.moveTo(top.outerRight + offset * 0.25, top.outerY + 6);
    ctx.lineTo(bottom.outerRight + offset, bottom.outerY);
    ctx.stroke();
  }

  for (
    let innerY = trench.innerTopY + 20;
    innerY < trench.renderBottomY;
    innerY += trench.lineSpacing * 2
  ) {
    const slice = getTrenchSlice(innerY);

    ctx.beginPath();

    ctx.moveTo(slice.outerLeft - 360, slice.outerY);
    ctx.lineTo(slice.outerLeft, slice.outerY);

    ctx.moveTo(slice.outerRight, slice.outerY);
    ctx.lineTo(slice.outerRight + 360, slice.outerY);

    ctx.stroke();
  }

  ctx.restore();
}

function drawTrenchSidePanels() {
  const top = getTrenchSlice(trench.innerTopY);
  const bottom = getTrenchSlice(trench.renderBottomY);

  const divisions = 3;

  ctx.save();

  ctx.strokeStyle = "rgba(66, 217, 255, 0.34)";
  ctx.lineWidth = 1.1;

  for (let i = 1; i <= divisions; i++) {
    const p = i / (divisions + 1);

    const leftTopX = lerp(top.outerLeft, top.innerLeft, p);
    const leftTopY = lerp(top.outerY, top.innerY, p);
    const leftBottomX = lerp(bottom.outerLeft, bottom.innerLeft, p);
    const leftBottomY = lerp(bottom.outerY, bottom.innerY, p);

    ctx.beginPath();
    ctx.moveTo(leftTopX, leftTopY);
    ctx.lineTo(leftBottomX, leftBottomY);
    ctx.stroke();

    const rightTopX = lerp(top.innerRight, top.outerRight, p);
    const rightTopY = lerp(top.innerY, top.outerY, p);
    const rightBottomX = lerp(bottom.innerRight, bottom.outerRight, p);
    const rightBottomY = lerp(bottom.innerY, bottom.outerY, p);

    ctx.beginPath();
    ctx.moveTo(rightTopX, rightTopY);
    ctx.lineTo(rightBottomX, rightBottomY);
    ctx.stroke();
  }

  ctx.restore();
}

function drawTrenchDepthLines(offset) {
  ctx.save();

  ctx.strokeStyle = "rgba(66, 217, 255, 0.78)";
  ctx.lineWidth = 1.5;

  for (
    let innerY = trench.innerTopY + offset;
    innerY < trench.renderBottomY;
    innerY += trench.lineSpacing
  ) {
    const slice = getTrenchSlice(innerY);

    ctx.beginPath();

    ctx.moveTo(slice.innerLeft, slice.innerY);
    ctx.lineTo(slice.innerRight, slice.innerY);

    ctx.moveTo(slice.outerLeft, slice.outerY);
    ctx.lineTo(slice.innerLeft, slice.innerY);

    ctx.moveTo(slice.innerRight, slice.innerY);
    ctx.lineTo(slice.outerRight, slice.outerY);

    ctx.stroke();
  }

  ctx.restore();
}

function drawTrenchEdges() {
  const top = getTrenchSlice(trench.innerTopY);
  const bottom = getTrenchSlice(trench.renderBottomY);

  ctx.save();

  ctx.strokeStyle = "#42d9ff";
  ctx.lineWidth = 2.2;

  ctx.beginPath();

  ctx.moveTo(top.outerLeft, top.outerY);
  ctx.lineTo(bottom.outerLeft, bottom.outerY);

  ctx.moveTo(top.outerRight, top.outerY);
  ctx.lineTo(bottom.outerRight, bottom.outerY);

  ctx.moveTo(top.innerLeft, top.innerY);
  ctx.lineTo(bottom.innerLeft, bottom.innerY);

  ctx.moveTo(top.innerRight, top.innerY);
  ctx.lineTo(bottom.innerRight, bottom.innerY);

  ctx.stroke();

  ctx.strokeStyle = "rgba(140, 220, 255, 0.55)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(top.outerLeft, top.outerY);
  ctx.lineTo(top.innerLeft, top.innerY);
  ctx.lineTo(top.innerRight, top.innerY);
  ctx.lineTo(top.outerRight, top.outerY);
  ctx.stroke();

  ctx.restore();
}

function drawTrench() {
  const offset = (time * trench.speed) % trench.lineSpacing;

  drawFarTrench();
  drawTrenchSurfaces();
  drawOuterSurfacePanels();
  drawTrenchSidePanels();
  drawTrenchDepthLines(offset);
  drawTrenchEdges();
}