// game variables

var tileSize = 8;
var climates = ["desert", "tropical", "snowy", "oceanic"];

var gameStates = {
    playerAttacking: 1,
    playerMoving: 2,
    playerFarming: 3,
    gameInit: 4,
    turnBase: 5,
};

var UIStates = {
    map: 1,
    troopsDialog: 2,
};

var colores = [
    {
        fillColor: "#ff8600",
        strokeColor: "#c26100"
    },
    {
        fillColor: "#109c00",
        strokeColor: "#064f00"
    },
    {
        fillColor: "#0052f2",
        strokeColor: "#0040ae"
    },
    {
        fillColor: "#f3dc04",
        strokeColor: "#c2ac04"
    },
    {
        fillColor: "#fb0002",
        strokeColor: "#c50002"
    },
    {
        fillColor: "#da0594",
        strokeColor: "#ae0570"
    }
];

var continentes = {
    'A': new Continente("#c26100", "#ff8600", [], 0, "A"),
    'B': new Continente("#064f00", "#109c00", [], 0, "B"),
    'C': new Continente("#0040ae", "#0052f2", [], 0, "C"),
    'D': new Continente("#c2ac04", "#f3dc04", [], 0, "D"),
    'E': new Continente("#c50002", "#fb0002", [], 0, "E"),
    'F': new Continente("#ae0570", "#da0594", [], 0, "F"),
};

var provincias = {
    'A': new Provincia([], "A"),
    'B': new Provincia([], "B"),
    'C': new Provincia([], "C"),
    'D': new Provincia([], "D"),
    'E': new Provincia([], "E"),
    'F': new Provincia([], "F"),
    'G': new Provincia([], "G"),
    'H': new Provincia([], "H"),
    'I': new Provincia([], "I"),
    'J': new Provincia([], "J"),
    'K': new Provincia([], "K"),
    'L': new Provincia([], "L"),
    'M': new Provincia([], "M"),
    'N': new Provincia([], "N"),
    'O': new Provincia([], "O"),
    'P': new Provincia([], "P"),
    'Q': new Provincia([], "Q"),
    'R': new Provincia([], "R"),
    'S': new Provincia([], "S"),
    'T': new Provincia([], "T"),
    'U': new Provincia([], "U"),
    'V': new Provincia([], "V"),
    'W': new Provincia([], "W"),
    'X': new Provincia([], "X"),
    'Y': new Provincia([], "Y"),
    'Z': new Provincia([], "Z"),
};

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

