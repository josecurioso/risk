class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.mapa = new Mapa(60, 80);

        this.cargarMapa("res/"+nivelActual+"_continents.txt");
        //this.cargarMapa("res/"+nivelActual+"_provinces.txt");

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
            case "A":
                this.mapa.addTile(new Tile(x, y, new Team("#c26100", "#ff8600", "A")), x, y);
                break;
            case "B":
                this.mapa.addTile(new Tile(x, y, new Team("#064f00", "#109c00", "B")), x, y);
                break;
            case "C":
                this.mapa.addTile(new Tile(x, y, new Team("#0040ae", "#0052f2", "C")), x, y);
                break;
            case "D":
                this.mapa.addTile(new Tile(x, y, new Team("#c2ac04", "#f3dc04", "D")), x, y);
                break;
            case "E":
                this.mapa.addTile(new Tile(x, y, new Team("#c50002", "#fb0002", "E")), x, y);
                break;
            case "F":
                this.mapa.addTile(new Tile(x, y, new Team("#ae0570", "#da0594", "F")), x, y);
                break;
        }
    }

    calcularPulsaciones(pulsaciones) {

    }
}
