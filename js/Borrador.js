/*
==== ORDEN "PROFE"
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

/**
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
  inputNumero.value = "";
  inputNumero.focus();

  // Cambiamos texto del botón para indicar que ahora reinicia:
  btnStart.textContent = "Reiniciar";

  actualizarIntentosUI();

  // En clase ayuda para probar; en producción podrías quitarlo.
  console.log("DEBUG - Número mágico:", numeroMagico);

  alert("¡Juego iniciado! Adiviná un número del 1 al 100.");
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
  return n;
}

/**
 * Maneja el submit del formulario:
 * - evita recarga (preventDefault)
 * - chequea estado del juego
 * - valida número
 * - compara con el número mágico y da pistas por alert
 * - si acierta, finaliza el juego
 */
function verificarIntento(e) {
  e.preventDefault();

  if (!enJuego) {
    alert("Primero presioná 'Comenzar' para iniciar el juego.");
    return;
  }

  const n = leerYValidarNumero();
  if (n === null) {
    inputNumero.focus();
    return; // ya mostramos el alert de error
  }

  intentos++;
  actualizarIntentosUI();

  if (n === numeroMagico) {
    alert(`🎉 ¡Adivinaste! El número mágico era ${numeroMagico}. Intentos: ${intentos}`);
    finalizarJuego();
  } else if (n > numeroMagico) {
    alert("❌ No es. Pista: tu número es MAYOR que el número mágico.");
  } else {
    alert("❌ No es. Pista: tu número es MENOR que el número mágico.");
  }

  // UX: seleccionamos el texto del input para teclear el próximo intento al toque
  inputNumero.select();
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

/** Actualiza el contador visual de intentos (separado para mantener SRP). */
function actualizarIntentosUI() {
  msgIntentos.textContent = `Intentos: ${intentos}`;
}

// ============ 2) VARIABLES ============

// Estado del juego
let numeroMagico = null;
let intentos = 0;
let enJuego = false;

// Referencias a la UI (las resolvemos una sola vez)
const btnStart = document.getElementById("btn-start");
const formIntento = document.getElementById("form-intento");
const inputNumero = document.getElementById("input-numero");
const btnEnviar = document.getElementById("btn-enviar");
const msgIntentos = document.getElementById("msg-intentos");

// ============ 3) LOGICA / EVENTOS ============

// Botón Comenzar / Reiniciar
btnStart.addEventListener("click", iniciarJuego);

// Enviar intento (submit del form)
formIntento.addEventListener("submit", verificarIntento);


/* ===== Navegación interna con feedback visual ===== */

/**
 * Aplica resaltados breves al llegar a una sección.
 * - Siempre pulsa la sección.
 * - En #juego: si el juego ya está en curso, resalta el input; si no, resalta el botón Comenzar.
 * - En #como-jugar: resalta el título del hero.
 */
function handleInPageNav(target) {
  if (!target) return;

  // Pulse a la sección
  target.classList.add('pulse-highlight');
  setTimeout(() => target.classList.remove('pulse-highlight'), 900);

  if (target.id === 'juego') {
    const card = document.querySelector('#juego .card');
    if (card) {
      card.classList.add('pulse-highlight');
      setTimeout(() => card.classList.remove('pulse-highlight'), 900);
    }

    // Si ya estamos jugando, enfocar input; si no, resaltar botón Comenzar
    if (typeof enJuego !== 'undefined' && enJuego) {
      if (inputNumero) {
        inputNumero.classList.add('field-highlight');
        inputNumero.focus();
        setTimeout(() => inputNumero.classList.remove('field-highlight'), 1200);
      }
    } else {
      if (btnStart) {
        btnStart.classList.add('field-highlight');
        setTimeout(() => btnStart.classList.remove('field-highlight'), 1200);
      }
    }
  }

  if (target.id === 'como-jugar') {
    const heroTitle = document.querySelector('#como-jugar h1');
    if (heroTitle) {
      heroTitle.classList.add('field-highlight');
      setTimeout(() => heroTitle.classList.remove('field-highlight'), 1200);
    }
  }
}

// Cerrar el menú colapsado en mobile y aplicar feedback visual tras el click
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', () => {
    // Dejamos que el navegador maneje el hash y el scroll (no prevenimos).
    // Luego de un pequeño delay (para que el scroll comience), cerramos el menú y aplicamos feedback.
    setTimeout(() => {
      const navCollapse = document.getElementById('navbarNav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const instance = bootstrap.Collapse.getOrCreateInstance(navCollapse);
        instance.hide();
      }
      const target = document.querySelector(a.getAttribute('href'));
      if (target) handleInPageNav(target);
    }, 300);
  });
});

// También aplicamos feedback si la página carga con hash, o si el hash cambia
window.addEventListener('DOMContentLoaded', () => {
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) handleInPageNav(target);
  }
});
window.addEventListener('hashchange', () => {
  const target = document.querySelector(location.hash);
  if (target) handleInPageNav(target);
});
