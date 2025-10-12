/*
==== ORDEN
1) FUNCIONES
2) VARIABLES QUE YO DECLARO
3) LOGICA / EVENTOS
*/

// ============ 1) FUNCIONES ============

/**
 * Devuelve un entero aleatorio entre min y max (ambos inclusive).
 * Usamos Math.random() que genera [0,1) y lo escalamos al rango deseado.
 */
function enteroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 * Inicia o reinicia el juego:
 * - crea el número mágico
 * - resetea contador de intentos
 * - habilita input y botón Enviar
 * - da foco al input para UX rápida
 */

function iniciarJuego() {
  numeroMagico = enteroAleatorio(1, 100);
  intentos = 0;
  enJuego = true;

  // habilitamos controles y preparamos la UI:
  inputNumero.removeAttribute("disabled");
  btnEnviar.removeAttribute("disabled");
  inputNumero.value = ""; // limpia el campo
  inputNumero.focus(); // lleva el cursor al campo

  // Cambiamos texto del botón para indicar que ahora reinicia:
  btnStart.textContent = "Reiniciar";

  actualizarIntentosUI();

  // luego lo quitare en produccion
  console.log("DEBUG - Número mágico:", numeroMagico);

  alert("¡Juego iniciado! Adiviná un número del 1 al 100.");
}

// Muestra el contador en pantalla
function actualizarIntentosUI() {
  if (msgIntentos) {
    msgIntentos.textContent = `Intentos: ${intentos}`;
  }
}

// ============ 2) VARIABLES ============

let numeroMagico = null; //todavia no hay numero secreto hasta iniciar el juego
let intentos = 0; //contador arranca de cero
let enJuego = false; //bandera: no hay partida actica hasta tocar Comenzar

//Referencia UI
const btnStart = document.getElementById("btn-start");
const formIntento = document.getElementById("form-intento");
const inputNumero = document.getElementById("input-numero");
const btnEnviar = document.getElementById("btn-enviar");
const msgIntentos = document.getElementById("msg-intentos");

// ============ 3) LÓGICA / EVENTOS ============

// Botón Comenzar / Reiniciar

if (btnStart) {
  btnStart.addEventListener("click", iniciarJuego);
}
