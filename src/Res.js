// Lista rerecursos a precargar
var imagenes = {
    fondo_mar: "res/SVG/mar.svg",
    menu_fondo: "res/SVG/menu.svg",
    boton_empezar: "res/SVG/empezar.svg",
    boton_add: "res/SVG/add_players.svg",
    boton_remove: "res/SVG/remove_players.svg",
    turn: "res/SVG/turno.svg",
    tDialogOk: "res/SVG/accept.svg",
    tDialogBackground: "res/SVG/dialog_troops.svg",
    messages: "res/SVG/messages.svg",
    cross: "res/SVG/cross.svg",
    farm_civilians: "res/SVG/farm_civilians.svg",
    farm_horses: "res/SVG/farm_horses.svg",
    farm_wood: "res/SVG/farm_wood.svg",
    attack_icon: "res/SVG/attack_icon.svg",
    move_icon: "res/SVG/move_icon.svg",
    pass_turn_icon: "res/SVG/pass_turn_icon.svg",
    btnBackNaranja: "res/SVG/btns/btnBack_naranja.svg",
    btnBackVerde: "res/SVG/btns/btnBack_verde.svg",
    btnBackAzul: "res/SVG/btns/btnBack_azul.svg",
    btnBackAmarillo: "res/SVG/btns/btnBack_amarillo.svg",
    btnBackRojo: "res/SVG/btns/btnBack_rojo.svg",
    btnBackRosa: "res/SVG/btns/btnBack_rosa.svg",
    dispararDerecha: "res/PNG/animacion_disparo_derecha.png",
    dispararIzquierda: "res/PNG/animacion_disparo_izquierda.png",
    derrotaDerecha: "res/PNG/animacion_derrota_derecha.png",
    derrotaIzquierda: "res/PNG/animacion_derrota_izquierda.png",
    balaDerecha: "res/PNG/bala_derecha.png",
    balaIzquierda: "res/PNG/bala_izquierda.png",
    soldado_derecha: "res/PNG/disparo_derecha.png",
    soldado_izquierda: "res/PNG/disparo_izquierda.png"
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
