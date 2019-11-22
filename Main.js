// Canvas y contexto del Canvas
var canvas = document.getElementById("canvas");
//var canvasText = document.getElementById("canvasText");
var contexto = canvas.getContext("2d");
//var contextoText = canvasText.getContext("2d");
var escaladoMinimo = 1;

// Controles
var controles = {};

// Capas
var layer;
var gameLayer;
var menuLayer;

// Inicio capas y bucle del juego
function iniciarJuego() {
    menuLayer = new GameLayer();
    //menuLayer = new MenuLayer();
    layer = menuLayer;
    setInterval(loop, 1000 / 30);
}

function loop() {
    layer.actualizar();
    if (entrada === entradas.pulsaciones) {
        layer.calcularPulsaciones(pulsaciones);
    }
    layer.procesarControles();
    layer.dibujar();

    actualizarPulsaciones();
}

function actualizarPulsaciones() {
    for (let i = 0; i < pulsaciones.length; i++) {
        if (pulsaciones[i].tipo === tipoPulsacion.inicio) {
            pulsaciones[i].tipo = tipoPulsacion.mantener;
        }
    }
}

// Cambio de escalado
window.addEventListener('load', resize, false);

function resize() {
    console.log("Resize")
    var escaladoAncho = parseFloat(window.innerWidth / canvas.width);
    var escaladoAlto = parseFloat(window.innerHeight / canvas.height);

    escaladoMinimo = Math.min(escaladoAncho, escaladoAlto);

    canvas.width = canvas.width * escaladoMinimo;
    canvas.height = canvas.height * escaladoMinimo;

    //canvasText.width = canvasText.width * escaladoMinimo;
    //canvasText.height = canvasText.height * escaladoMinimo;

    contexto.scale(escaladoMinimo, escaladoMinimo);
    //contextoText.scale(escaladoMinimo, escaladoMinimo);
}
