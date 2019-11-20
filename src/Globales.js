// game variables

var tileSize = 8;
var climates = ["desert", "tropical", "snowy", "oceanic"];

var gameStates = {
    playerAttacking : 1,
    playerMoving : 2,
}

// old variables

var pulsaciones = []; // actuales registradas

var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;

var entradas = {}; // tipos
entradas.pulsaciones = 1;
entradas.teclado = 2;
entradas.gamepad = 3;
var entrada = entradas.pulsaciones;
var escaladoMinimo = 1;

var nivelActual = 0;

var estados = {};

var orientaciones = {};

