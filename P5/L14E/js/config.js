const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const stateText = document.getElementById("state");

let animationId = null;
let time = 0;
let gameOver = false;

const starLimitY = 350;
const trenchHorizonY = 150;