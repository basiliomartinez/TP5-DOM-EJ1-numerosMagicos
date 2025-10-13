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

  alert("¡Juego iniciado! Adiviná el número del 1 al 100.");
}

// Muestra el contador en pantalla
function actualizarIntentosUI() {
  if (msgIntentos) {
    msgIntentos.textContent = `Intentos: ${intentos}`;
  }
}

/**
 * Lee el valor del input, valida que sea un entero 1–100
 * y devuelve ese número. Si no es válido, devuelve null y muestra alert.
 * Esto centraliza la validación en un solo lugar (limpieza de responsabilidades).
 */
function leerYValidarNumero() {
  const valor = inputNumero.value.trim();
  if (valor === "") {
    alert("Por favor, ingresá un número.");
    return null;
  }

  const n = Number(valor);

  // Validamos: entero y dentro del rango
  if (!Number.isInteger(n) || n < 1 || n > 100) {
    alert("El número debe ser un entero entre 1 y 100.");
    return null;
  }
  return n; //si pasó todas las validaciones, devolvés el número entero válido.
}

/*
 * Maneja el submit del formulario:
 * - evita recarga (preventDefault)
 * - chequea estado del juego
 * - valida número
 * - compara con el número mágico y da pistas por alert
 * - si acierta, finaliza el juego
 */

function verificarIntento(e) {
  e.preventDefault();

  // entra acá cuando enJuego es false
  if (!enJuego) {
    alert("Primero presioná 'Comenzar' para iniciar el juego.");
    return;
  }

  const n = leerYValidarNumero();
  if (n === null) {
    inputNumero.focus();
    return; // corto aca si la entrada no sirve
  }

  // 3) Contabilizar intento válido y reflejar en UI
  intentos++;
  actualizarIntentosUI();

  if (n === numeroMagico) {
    alert(
      `🎉 ¡Adivinaste! El número mágico era ${numeroMagico}. Intentos: ${intentos}`
    );
    finalizarJuego();
  } else if (n > numeroMagico) {
    alert("❌ No es. Pista: tu número es MAYOR que el número mágico.");
  } else {
    alert("❌ No es. Pista: tu número es MENOR que el número mágico.");
  }

  // UX: seleccionamos el texto del input para teclear el próximo intento al toque
  inputNumero.select();
  /*Hace que el texto dentro del input quede seleccionado (resaltado) automáticamente.
  Diferencia con focus()
focus() solo pone el cursor en el input.
select() selecciona todo el contenido (y también enfoca).
*/
}

/**
 * Finaliza el juego deshabilitando controles.
 * Evita intentos fuera de partida y deja el botón como "Reiniciar".
 */
function finalizarJuego() {
  enJuego = false;
  inputNumero.setAttribute("disabled", "true");
  btnEnviar.setAttribute("disabled", "true");
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
//Enviar intento (submit del form)
formIntento.addEventListener("submit", verificarIntento);


//Para que en el Navbar me recargue
document.querySelectorAll('a[href="#como-jugar"], a[href="#juego"]').forEach(a => {
  a.addEventListener('click', (e) => { e.preventDefault(); location.reload(); });
});

/*
e.preventDefault();
Anula el comportamiento por defecto del link (que sería hacer scroll al elemento con ese hash).
Así evitamos que vaya a #como-jugar o #juego* ya que a simple vista no hacia scroll

location.reload();
Recarga la página actual.
Es equivalente a tocar el botón recargar del navegador.
Resetea tu juego (variables vuelven al estado inicial).
*/