var audioActivado = false;

function activarAudio() {
    if (!audioActivado) {
        sonidoClick.play().then(function () {
            sonidoClick.pause();
            sonidoClick.currentTime = 0;
        });
        audioActivado = true;
    }
}

// ===== SONIDOS =====
var sonidoClick = new Audio("sounds/click.mp3");
var sonidoAcierto = new Audio("sounds/success.mp3");
var sonidoFallo = new Audio("sounds/fail.mp3");
var sonidoVictoria = new Audio("sounds/win.mp3");
var sonidoDerrota = new Audio("sounds/lose.mp3");

// ===== CRONO =====
function Crono(display) {
    this.display = display;
    this.cent = 0;
    this.seg = 0;
    this.min = 0;
    this.timer = null;
}

Crono.prototype.formato = function (n) {
    return n < 10 ? "0" + n : n;
};

Crono.prototype.tic = function () {
    this.cent++;

    if (this.cent === 100) {
        this.seg++;
        this.cent = 0;
    }

    if (this.seg === 60) {
        this.min++;
        this.seg = 0;
    }

    this.display.textContent =
        this.formato(this.min) + ":" +
        this.formato(this.seg) + ":" +
        this.formato(this.cent);
};

Crono.prototype.start = function () {
    var self = this;

    if (!this.timer) {
        this.timer = setInterval(function () {
            self.tic();
        }, 10);
    }
};

Crono.prototype.stop = function () {
    clearInterval(this.timer);
    this.timer = null;
};

Crono.prototype.reset = function () {
    this.cent = 0;
    this.seg = 0;
    this.min = 0;
    this.display.textContent = "00:00:00";
};

// ===== BLOQUEO =====
function bloquearControles() {
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = true;
}

// ===== LIMPIEZA =====
function quitarMagia(elemento) {
    setTimeout(function () {
        elemento.classList.remove("magic");
    }, 400);
}

// ===== VARIABLES =====
var clave = [];
var intentos = 7;
var usados = [];
var juegoActivo = false;

var casillas = document.querySelectorAll(".secret div");
var botones = document.querySelectorAll(".num");
var displayIntentos = document.getElementById("intentos");
var displayTiempo = document.getElementById("tiempo");
var mensaje = document.getElementById("mensaje");
var btnStart = document.getElementById("start");
var btnStop = document.getElementById("stop");

var crono = new Crono(displayTiempo);

// ===== CLAVE =====
function generarClave() {
    var nums = [0,1,2,3,4,5,6,7,8,9];
    clave = [];

    while (clave.length < 4) {
        var i = Math.floor(Math.random() * nums.length);
        clave.push(nums.splice(i, 1)[0]);
    }
}

// ===== NUEVA PARTIDA =====
function nuevaPartida() {
    generarClave();
    intentos = 7;
    usados = [];
    juegoActivo = true;

    displayIntentos.textContent = intentos;

    for (var i = 0; i < casillas.length; i++) {
        casillas[i].textContent = "*";
        casillas[i].className = "";
    }

    for (var j = 0; j < botones.length; j++) {
        botones[j].disabled = false;
        botones[j].classList.remove("used");
    }

    mensaje.textContent = "El grimorio está abierto. El ritual ha comenzado.";
    mensaje.className = "msg-info";

    btnStop.classList.remove("stop-activo");
}

// ===== CLICK =====
function manejarClick(boton) {
    activarAudio();

    if (!juegoActivo) return;

    var num = parseInt(boton.textContent, 10);

    sonidoClick.play();

    if (!crono.timer) {
        crono.start();
        mensaje.textContent = "El tiempo mágico ha comenzado…";
        mensaje.className = "msg-info";
    }

    if (usados.indexOf(num) !== -1) return;

    usados.push(num);
    boton.disabled = true;
    boton.classList.add("used");

    intentos--;
    displayIntentos.textContent = intentos;

    var acierto = false;

    for (var i = 0; i < clave.length; i++) {
        if (clave[i] === num) {
            casillas[i].textContent = num;
            casillas[i].classList.add("correct", "magic");
            quitarMagia(casillas[i]);
            acierto = true;
        }
    }

    if (acierto) {
        sonidoAcierto.play();
        mensaje.textContent = "El número ha respondido al hechizo.";
        mensaje.className = "msg-ok";
    } else {
        sonidoFallo.play();
        mensaje.textContent = "El número no pertenece al destino.";
        mensaje.className = "msg-error";
    }

    comprobarEstado();
}

// ===== EVENTOS =====
for (var j = 0; j < botones.length; j++) {
    botones[j].addEventListener("click", function () {
        manejarClick(this);
    });
}

// ===== ESTADO =====
function comprobarEstado() {

    var ganado = true;

    for (var i = 0; i < casillas.length; i++) {
        if (casillas[i].textContent === "*") {
            ganado = false;
            break;
        }
    }

    if (ganado) {
        crono.stop();
        sonidoVictoria.play();

        bloquearControles();

        mensaje.textContent =
            "El grimorio ha sido descifrado. Tiempo: " +
            displayTiempo.textContent +
            " | Intentos usados: " + (7 - intentos);

        mensaje.className = "msg-ok";
        juegoActivo = false;
    }

    if (intentos === 0) {
        crono.stop();

        for (var i = 0; i < casillas.length; i++) {
            casillas[i].textContent = "*";
            casillas[i].classList.add("explosion");
        }

        sonidoDerrota.play();

        bloquearControles();

        mensaje.textContent =
            "El ritual ha fallado. La clave era " + clave.join("");

        mensaje.className = "msg-error";
        juegoActivo = false;
    }
}

// ===== CONTROLES =====
btnStart.onclick = function () {
    crono.start();
    mensaje.textContent = "El ritual se activa…";
    mensaje.className = "msg-info";
};

btnStop.onclick = function () {
    crono.stop();
    btnStop.classList.add("stop-activo");

    mensaje.textContent = "El ritual ha sido sellado.";
    mensaje.className = "msg-stop";
};

document.getElementById("reset").onclick = function () {
    crono.reset();
    nuevaPartida();

    btnStart.disabled = false;
    btnStop.disabled = false;
};

// ===== INIT =====
nuevaPartida();