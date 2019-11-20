// Lista re recursos a precargar
var imagenes = {
    tile_neutra: "res/tile_neutra.png",
    tile_roja: "res/tile_roja.png",
    tile_azul: "res/tile_azul.png",
    menu_fondo : "res/menu_fondo.png",
    boton_jugar : "res/boton_jugar.png",
    fondo_mar : "res/fondo.jpg",
    attack: "res/attack_small.png"
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
