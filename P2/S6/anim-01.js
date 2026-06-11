console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 300;
canvas.height = 300;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Posición del elemento a animar
let x = 30;
let y = 40;

let VELX = 3;
let VELY = 1;

//-- Función principal de animación
function update() 
{
  console.log("test update");
  //-- Algoritmo de animación:
  //-- 1) Actualizar posiciones de los elementos


  //Comprobar la colisión, y cambiar de signo (rebote)
  //-- Condición de rebote en extremos del canvas
  if (x < 0 || x >= (canvas.width - 20) ) {
    VELX = -VELX;
  }

  if (y < 0 || y >= (canvas.height - 20)) {
    VELY = -VELY;
  }

  //-- Fisica del movimiento rectilíneo uniforme horizontal
  x = x + VELX;
  y = y + VELY;  

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();
    ctx.rect(x, y, 20, 20);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();