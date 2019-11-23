// Lista rerecursos a precargar
var imagenes = {
    menu_fondo: "res/PNG/menu.png",
    attack: "res/SVG/attack.svg",
    //attack: "res/attack_new_small.png",
    boton_empezar: "res/PNG/empezar.png",
    boton_add: "res/PNG/add_players.png",
    boton_remove: "res/PNG/remove_players.png",
    fondo_mar: "res/PNG/fondo.jpg",
    summary: "res/PNG/summary_small.png",
    turn: "res/SVG/turno.svg",
    //turn: "res/turn_small.png",
    dice: "res/SVG/dices.svg",
    //dice: "res/dice.png",
    tDialogAdd: "res/PNG/add_troops.png",
    tDialogRemove: "res/PNG/remove_troops.png",
    tDialogOk: "res/PNG/accept.png",
    tDialogBackground: "res/PNG/dialog_troops.png",
    messages: "res/SVG/messages.svg",
    //messages: "res/messages_small.png"
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
