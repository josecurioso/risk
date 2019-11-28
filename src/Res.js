// Lista rerecursos a precargar
var imagenes = {
    fondo_mar: "res/SVG/mar.svg",
    menu_fondo: "res/SVG/menu.svg",
    attack: "res/SVG/attack.svg",
    boton_empezar: "res/SVG/empezar.svg",
    boton_add: "res/SVG/add_players.svg",
    boton_remove: "res/SVG/remove_players.svg",
    turn: "res/SVG/turno.svg",
    passTurn: "res/SVG/passTurn.svg",
    tDialogOk: "res/SVG/accept.svg",
    tDialogBackground: "res/SVG/dialog_troops.svg",
    messages: "res/SVG/messages.svg",
    cross: "res/SVG/cross.svg",
    move: "res/SVG/move.svg",
    farm_civilians: "res/SVG/farm_civilians.svg",
    farm_horses: "res/SVG/farm_horses.svg",
    farm_wood: "res/SVG/farm_wood.svg",
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
