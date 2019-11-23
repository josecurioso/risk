// Lista rerecursos a precargar
var imagenes = {
    fondo_mar: "res/PNG/fondo.jpg",
    menu_fondo: "res/SVG/menu.svg",
    attack: "res/SVG/attack.svg",
    boton_empezar: "res/SVG/empezar.svg",
    boton_add: "res/SVG/add_players.svg",
    boton_remove: "res/SVG/remove_players.svg",
    turn: "res/SVG/turno.svg",
    dice: "res/SVG/dices.svg",
    tDialogOk: "res/SVG/accept.svg",
    tDialogBackground: "res/SVG/dialog_troops.svg",
    messages: "res/SVG/messages.svg",
    //menu_fondo: "res/PNG/menu.png",
    //attack: "res/attack_new_small.png",
    //boton_empezar: "res/PNG/empezar.png",
    //boton_add: "res/PNG/add_players.png",
    //boton_remove: "res/PNG/remove_players.png",
    //summary: "res/PNG/summary_small.png",
    //turn: "res/turn_small.png",
    //dice: "res/dice.png",
    //tDialogAdd: "res/PNG/add_troops.png",
    //tDialogRemove: "res/PNG/remove_troops.png",
    //tDialogOk: "res/PNG/accept.png",
    //tDialogBackground: "res/PNG/dialog_troops.png",
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
