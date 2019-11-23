// Lista rerecursos a precargar
var imagenes = {
    menu_fondo: "res/menu.png",
    attack: "res/attack_new_small.png",
    boton_empezar: "res/empezar.png",
    boton_add: "res/add_players.png",
    boton_remove: "res/remove_players.png",
    fondo_mar: "res/fondo.jpg",
    summary: "res/summary_small.png",
    turn: "res/turn_small.png",
    dice: "res/dice.png",
    tDialogAdd: "res/add_troops.png",
    tDialogRemove: "res/remove_troops.png",
    tDialogOk: "res/accept.png",
    tDialogBackground: "res/dialog_troops.png",
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
