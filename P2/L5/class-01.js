
// Localizar botones
const btn1 = document.getElementById('btn1');
const btnp1 = document.getElementById('btn-plus-1');
const btnp2 = document.getElementById('btn-plus-2');

// Localizar display en el dom
const dsp1 = document.getElementById('dsp1');

const msg = "Aaaaaahhh Zingoñaaaaaa!!!!";

btn1.onclick = () => {

    // escribir el mensaje en el log
    console.log(msg);

    // escribir en el display
    dsp1.innerHTML = msg;
}

btnp1.onclick = () => {
    dsp1.innerHTML += ' 1'
}

btnp2.onclick = () => {
    dsp1.innerHTML += ' 2'
}