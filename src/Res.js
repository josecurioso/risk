// Lista rerecursos a precargar
var imagenes = {
    tile_neutra: "res/tile_neutra.png", // colores de las tiles ya no se necesitan, se pinta directamente desde el canvas
    tile_roja: "res/tile_roja.png",
    tile_azul: "res/tile_azul.png",
    menu_fondo: "res/menu_fondo.png",
    attack: "res/attack_new_small.png",
    boton_empezar: "res/empezar.png",
    boton_add: "res/add_players.png",
    boton_remove: "res/remove_players.png",
    fondo_mar: "res/fondo.jpg",
    summary: "res/summary_small.png",
    turn: "res/turn_small.png",
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice) {
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function () {
        if (indice < rutasImagenes.length - 1) {
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
