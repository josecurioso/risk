class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.mapa = new Mapa(60, 60);

        this.cargarMapa("res/"+nivelActual+".txt");
    }

    actualizar (){

    }


    dibujar () {
        this.mapa.dibujar();
    }


    procesarControles( ){

    }


    cargarMapa(ruta){
        let fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            let texto = fichero.responseText;
            let lineas = texto.split('\n');
            for (let i = 0; i < lineas.length; i++){
                let linea = lineas[i];
                for (let j = 0; j < linea.length; j++){
                    let simbolo = linea[j];
                    //console.log("Coor: " + i + " " + j);
                    this.cargarObjetoMapa(simbolo,j,i);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y) {
        switch(simbolo) {
            case "0":
                this.mapa.addTile(new Tile(x, y, null), x, y);
                break;
            case "R":
                this.mapa.addTile(new Tile(x, y, "R"), x, y);
                break;
            case "A":
                this.mapa.addTile(new Tile(x, y, "A"), x, y);
                break;
        }
    }

    calcularPulsaciones(pulsaciones) {

    }


}
