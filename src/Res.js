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
    balaDerecha: "res/PNG/SOLDADOS/bala_derecha.png",
    balaIzquierda: "res/PNG/SOLDADOS/bala_izquierda.png",
    forest: "res/PNG/FONDOS/forest.jpg",
    desert: "res/PNG/FONDOS/desert.jpg",
    snowy: "res/PNG/FONDOS/snowy.jpg",
    tropical: "res/PNG/FONDOS/tropical.jpg",

    // Soldados
    disparar_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_derecha_verde.png",
    disparar_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_disparo_izquierda_verde.png",
    derrota_derecha_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_derecha_verde.png",
    derrota_izquierda_verde: "res/PNG/SOLDADOS/VERDE/animacion_derrota_izquierda_verde.png",
    soldado_derecha_verde: "res/PNG/SOLDADOS/VERDE/disparo_derecha_verde.png",
    soldado_izquierda_verde: "res/PNG/SOLDADOS/VERDE/disparo_izquierda_verde.png",

    disparar_derecha_amarillo: "res/PNG/SOLDADOS/AMARILLO/animacion_disparo_derecha_amarillo.png",
    disparar_izquierda_amarillo: "res/PNG/SOLDADOS/AMARILLO/animacion_disparo_izquierda_amarillo.png",
    derrota_derecha_amarillo: "res/PNG/SOLDADOS/AMARILLO/animacion_derrota_derecha_amarillo.png",
    derrota_izquierda_amarillo: "res/PNG/SOLDADOS/AMARILLO/animacion_derrota_izquierda_amarillo.png",
    soldado_derecha_amarillo: "res/PNG/SOLDADOS/AMARILLO/disparo_derecha_amarillo.png",
    soldado_izquierda_amarillo: "res/PNG/SOLDADOS/AMARILLO/disparo_izquierda_amarillo.png",

    disparar_derecha_azul: "res/PNG/SOLDADOS/AZUL/animacion_disparo_derecha_azul.png",
    disparar_izquierda_azul: "res/PNG/SOLDADOS/AZUL/animacion_disparo_izquierda_azul.png",
    derrota_derecha_azul: "res/PNG/SOLDADOS/AZUL/animacion_derrota_derecha_azul.png",
    derrota_izquierda_azul: "res/PNG/SOLDADOS/AZUL/animacion_derrota_izquierda_azul.png",
    soldado_derecha_azul: "res/PNG/SOLDADOS/AZUL/disparo_derecha_azul.png",
    soldado_izquierda_azul: "res/PNG/SOLDADOS/AZUL/disparo_izquierda_azul.png",

    disparar_derecha_rosa: "res/PNG/SOLDADOS/ROSA/animacion_disparo_derecha_rosa.png",
    disparar_izquierda_rosa: "res/PNG/SOLDADOS/ROSA/animacion_disparo_izquierda_rosa.png",
    derrota_derecha_rosa: "res/PNG/SOLDADOS/ROSA/animacion_derrota_derecha_rosa.png",
    derrota_izquierda_rosa: "res/PNG/SOLDADOS/ROSA/animacion_derrota_izquierda_rosa.png",
    soldado_derecha_rosa: "res/PNG/SOLDADOS/ROSA/disparo_derecha_rosa.png",
    soldado_izquierda_rosa: "res/PNG/SOLDADOS/ROSA/disparo_izquierda_rosa.png",

    disparar_derecha_rojo: "res/PNG/SOLDADOS/ROJO/animacion_disparo_derecha_rojo.png",
    disparar_izquierda_rojo: "res/PNG/SOLDADOS/ROJO/animacion_disparo_izquierda_rojo.png",
    derrota_derecha_rojo: "res/PNG/SOLDADOS/ROJO/animacion_derrota_derecha_rojo.png",
    derrota_izquierda_rojo: "res/PNG/SOLDADOS/ROJO/animacion_derrota_izquierda_rojo.png",
    soldado_derecha_rojo: "res/PNG/SOLDADOS/ROJO/disparo_derecha_rojo.png",
    soldado_izquierda_rojo: "res/PNG/SOLDADOS/ROJO/disparo_izquierda_rojo.png",

    disparar_derecha_naranja: "res/PNG/SOLDADOS/NARANJA/animacion_disparo_derecha_naranja.png",
    disparar_izquierda_naranja: "res/PNG/SOLDADOS/NARANJA/animacion_disparo_izquierda_naranja.png",
    derrota_derecha_naranja: "res/PNG/SOLDADOS/NARANJA/animacion_derrota_derecha_naranja.png",
    derrota_izquierda_naranja: "res/PNG/SOLDADOS/NARANJA/animacion_derrota_izquierda_naranja.png",
    soldado_derecha_naranja: "res/PNG/SOLDADOS/NARANJA/disparo_derecha_naranja.png",
    soldado_izquierda_naranja: "res/PNG/SOLDADOS/NARANJA/disparo_izquierda_naranja.png",
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
