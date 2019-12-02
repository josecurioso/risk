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
    balaDerecha: "res/PNG/bala_derecha.png",
    balaIzquierda: "res/PNG/bala_izquierda.png",
    forest: "res/PNG/RESIZED/forest.jpg",
    desert: "res/PNG/RESIZED/desert.jpg",
    snowy: "res/PNG/RESIZED/snowy.jpg",
    tropical: "res/PNG/RESIZED/tropical.jpg",

    // Soldados
    disparo_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_derecha_verde.png",
    disparar_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_izquierda_verde.png",
    derrota_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_derecha_verde.png",
    derrota_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_izquierda.png",
    soldado_derecha_verde: "res/PNG/SOLDADOS/VERDE/disparo_derecha_verde.png",
    soldado_izquierda_verde: "res/PNG/SOLDADOS/VERDE/disparo_izquierda_verde.png",

    disparo_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_derecha_verde.png",
    disparar_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_izquierda_verde.png",
    derrota_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_derecha_verde.png",
    derrota_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_izquierda.png",
    soldado_derecha_verde: "res/PNG/SOLDADOS/VERDE/disparo_derecha_verde.png",
    soldado_izquierda_verde: "res/PNG/SOLDADOS/VERDE/disparo_izquierda_verde.png",

    disparo_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_derecha_verde.png",
    disparar_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_izquierda_verde.png",
    derrota_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_derecha_verde.png",
    derrota_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_izquierda.png",
    soldado_derecha_verde: "res/PNG/SOLDADOS/VERDE/disparo_derecha_verde.png",
    soldado_izquierda_verde: "res/PNG/SOLDADOS/VERDE/disparo_izquierda_verde.png",

    disparo_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_derecha_verde.png",
    disparar_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_izquierda_verde.png",
    derrota_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_derecha_verde.png",
    derrota_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_izquierda.png",
    soldado_derecha_verde: "res/PNG/SOLDADOS/VERDE/disparo_derecha_verde.png",
    soldado_izquierda_verde: "res/PNG/SOLDADOS/VERDE/disparo_izquierda_verde.png",

    disparo_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_derecha_verde.png",
    disparar_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_izquierda_verde.png",
    derrota_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_derecha_verde.png",
    derrota_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_izquierda.png",
    soldado_derecha_verde: "res/PNG/SOLDADOS/VERDE/disparo_derecha_verde.png",
    soldado_izquierda_verde: "res/PNG/SOLDADOS/VERDE/disparo_izquierda_verde.png",

    disparo_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_derecha_verde.png",
    disparar_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_izquierda_verde.png",
    derrota_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_derecha_verde.png",
    derrota_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_izquierda.png",
    soldado_derecha_verde: "res/PNG/SOLDADOS/VERDE/disparo_derecha_verde.png",
    soldado_izquierda_verde: "res/PNG/SOLDADOS/VERDE/disparo_izquierda_verde.png",
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
