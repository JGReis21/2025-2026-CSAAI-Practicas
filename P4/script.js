var grid = document.getElementById("grid");
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");

var pairSelect = document.getElementById("pairSelect");
var levelSelect = document.getElementById("levelSelect");

var toggleLabels = document.getElementById("toggleLabels");

var volumeToggle = document.getElementById("volumeToggle");
var volumeSlider = document.getElementById("volumeSlider");

var beatSound = document.getElementById("beatSound");
var music = document.getElementById("music");

var levelSpan = document.getElementById("level");
var timeSpan = document.getElementById("time");
var statusSpan = document.getElementById("status");
var roundSpan = document.getElementById("round");
var wordDisplay = document.getElementById("wordDisplay");

// ================== ESTADO ==================
var cells = [];
var gameRunning = false;
var timer = 0;
var interval = null;
var musicActive = false;
var currentLevel = 1;

// ================== PARES (NUEVO ESTILO) ==================
var pairs = {
  celestial: {
    words: ["SOL", "LUNA"],
    icons: ["☀️", "🌙"]
  },

  astral: {
    words: ["ASTRA", "LUMEN"],
    icons: ["✨", "🌌"]
  },

  temporal: {
    words: ["FUTURO", "PASADO"],
    icons: ["⏳", "📜"]
  },

  alquimia: {
    words: ["ORO", "PLATA"],
    icons: ["🪙", "⚪"]
  },

  ritual: {
    words: ["HECHIZO", "RITUAL"],
    icons: ["🔮", "🕯️"]
  }
};

// ================== GRID ==================
for (var i = 0; i < 8; i++) {
  var div = document.createElement("div");
  div.className = "cell";
  grid.appendChild(div);
  cells.push(div);
}

// ================== UTILIDADES ==================
function shuffle(array) {
  var copy = array.slice();
  copy.sort(function () {
    return Math.random() - 0.5;
  });
  return copy;
}

function getPattern(level) {
  if (level === 1) return [0,0,0,0,1,1,1,1];
  if (level === 2) return [0,0,1,1,0,0,1,1];
  if (level === 3) return [0,1,0,1,0,1,0,1];
  if (level >= 4) return shuffle([0,0,0,0,1,1,1,1]);
}

// ================== GRID UPDATE ==================
function updateGrid(level) {
  var p = pairs[pairSelect.value];
  var pattern = getPattern(level);

  for (var i = 0; i < cells.length; i++) {
    var idx = pattern[i];
    var cell = cells[i];

    cell.innerHTML =
      '<div class="emoji">' + p.icons[idx] + '</div>' +
      '<span style="display:' + (toggleLabels.checked ? "block" : "none") + '">' +
      p.words[idx] +
      '</span>';

    cell.dataset.word = p.words[idx];
  }
}

// ================== LABELS ==================
toggleLabels.addEventListener("change", function () {
  updateGrid(currentLevel);
});

// ================== SONIDO ==================
function playBeat(level) {
  beatSound.pause();
  beatSound.currentTime = 0;

  beatSound.playbackRate = 1 + level * 0.1;
  beatSound.volume = volumeSlider.value;

  beatSound.play();
}

// ================== NIVEL ==================
function runLevel(level, callback) {

  updateGrid(level);

  var speed = Math.max(300, 1000 - level * 150);
  var i = 0;

  function step() {

    if (!gameRunning) {
      if (callback) callback();
      return;
    }

    for (var j = 0; j < cells.length; j++) {
      cells[j].classList.remove("active");
    }

    cells[i].classList.add("active");
    wordDisplay.textContent = cells[i].dataset.word;

    playBeat(level);

    i++;

    if (i < 8) {
      setTimeout(step, speed);
    } else {
      if (callback) callback();
    }
  }

  step();
}

// ================== START ==================
function startGame() {

  if (gameRunning) return;

  gameRunning = true;
  statusSpan.textContent = "Jugando";

  startBtn.disabled = true;
  pairSelect.disabled = true;
  levelSelect.disabled = true;

  timer = 0;
  interval = setInterval(function () {
    timer++;
    timeSpan.textContent = timer + "s";
  }, 1000);

  if (musicActive) {
    music.volume = volumeSlider.value;
    music.currentTime = 0;
    music.play();
  }

  var startLevel = parseInt(levelSelect.value);
  var level = startLevel;

  function nextLevel() {

    if (!gameRunning) return;

    if (level > 5) {
      endGame();
      return;
    }

    currentLevel = level;
    levelSpan.textContent = level + "/5";
    roundSpan.textContent = level + "/5";

    wordDisplay.textContent = "Preparado...";

    setTimeout(function () {

      runLevel(level, function () {
        level++;
        nextLevel();
      });

    }, 1000);
  }

  nextLevel();
}

// ================== STOP ==================
function stopGame() {

  gameRunning = false;

  clearInterval(interval);

  music.pause();
  music.currentTime = 0;

  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.remove("active");
  }

  statusSpan.textContent = "Detenido";

  startBtn.disabled = false;
  pairSelect.disabled = false;
  levelSelect.disabled = false;

  wordDisplay.textContent = "Pulsa comenzar";
}

// ================== END ==================
function endGame() {
  stopGame();
  wordDisplay.textContent = "¡Partida finalizada!";
  statusSpan.textContent = "Finalizado";
}

// ================== AUDIO ==================
volumeToggle.onclick = function () {

  musicActive = !musicActive;

  if (musicActive) {
    volumeToggle.textContent = "Desactivar música";
    volumeSlider.style.display = "block";
  } else {
    volumeToggle.textContent = "Activar música";
    volumeSlider.style.display = "none";
    music.pause();
  }
};

volumeSlider.oninput = function () {
  music.volume = volumeSlider.value;
};

// ================== INIT ==================
updateGrid(1);