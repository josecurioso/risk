class GameLayer extends Layer {

    constructor(playerAmount) {
        super();
        this.iniciar(playerAmount);
    }

    iniciar(playerAmount) {
        this.mapa = new Mapa(60, 80);

        this.continentes = {
            'A': new Continente("#c26100", "#ff8600", [], 0, "A"),
            'B': new Continente("#064f00", "#109c00", [], 0, "B"),
            'C': new Continente("#0040ae", "#0052f2", [], 0, "C"),
            'D': new Continente("#c2ac04", "#f3dc04", [], 0, "D"),
            'E': new Continente("#c50002", "#fb0002", [], 0, "E"),
            'F': new Continente("#ae0570", "#da0594", [], 0, "F"),
        };

        this.provincias = {
            'A': new Provincia([], "A"),
            'B': new Provincia([], "B"),
            'C': new Provincia([], "C"),
            'D': new Provincia([], "D"),
            'E': new Provincia([], "E"),
            'F': new Provincia([], "F"),
            'G': new Provincia([], "G"),
            'H': new Provincia([], "H"),
            'I': new Provincia([], "I"),
            'J': new Provincia([], "J"),
            'K': new Provincia([], "K"),
            'L': new Provincia([], "L"),
            'M': new Provincia([], "M"),
            'N': new Provincia([], "N"),
            'O': new Provincia([], "O"),
            'P': new Provincia([], "P"),
            'Q': new Provincia([], "Q"),
            'R': new Provincia([], "R"),
            'S': new Provincia([], "S"),
            'T': new Provincia([], "T"),
            'U': new Provincia([], "U"),
            'V': new Provincia([], "V"),
            'W': new Provincia([], "W"),
            'X': new Provincia([], "X"),
            'Y': new Provincia([], "Y"),
            'Z': new Provincia([], "Z"),
        };

        // Configurar jugadores
        this.numeroJugadores = playerAmount;
        this.jugadores = [];
        for(let i=0; i<this.numeroJugadores; i++) {
            this.jugadores.push("Jugador" + i);
        }
        this.jugadores.push(new IA().playerIA);

        this.gestorDeUnidades = new GestorDeUnidades(Object.keys(this.provincias).length, 3);
        this.gestorDeTurnos = new GestorDeTurnos(this.gestorDeTerritorios, this.gestorDeUnidades, this.jugadores);
        this.gestorDeTerritorios = new GestorDeTerritorios();

        this.turnoActual = new Texto(this.gestorDeTurnos.jugadorActual, 600 * 0.45, 320 * 0.925, "20px Arial");
        this.botonAtacar = new Boton(imagenes.attack, 600 * 0.945, 320 * 0.9, true);
        this.botonSummary = new Boton(imagenes.summary, 600 * 0.055, 320 * 0.9, true);
        this.turnOverlay = new Boton(imagenes.turn, 600 * 0.5, 320 * 0.9, false);



        this.clickedProvinces = [];
        this.isPlayerSelecting = false;
        this.gameState = gameStates.gameInit;

        this.cargarMapa("res/" + nivelActual + "_continents.txt", "res/" + nivelActual + "_provinces.txt");
        this.addProvinceInfo("res/" + nivelActual + "_info_provinces.json");
        this.addContinentInfo("res/" + nivelActual + "_info_continents.json");
        this.calculateCentroids();
    }

    actualizar() {
    }

    dibujar() {
        this.mapa.dibujar();
        this.botonAtacar.dibujar();
        this.botonSummary.dibujar();
        this.turnOverlay.dibujar();
        this.turnoActual.dibujar();
        this.drawConnectionsBySea();
    }

    calcularPulsaciones(pulsaciones) {
        console.log("entra")
        for (let i = 0; i < pulsaciones.length; i++) {
            if (pulsaciones[i].tipo === tipoPulsacion.inicio) {
                if(this.gameState !== gameStates.gameInit){
                    let clickedTile = this.mapa.getTileForCoords(pulsaciones[i].x, pulsaciones[i].y);
                    if (clickedTile !== undefined) {
                        console.log("Click en tile: " + clickedTile.px + ", " + clickedTile.py);
                        console.log("   Coords: " + pulsaciones[i].x + ", " + pulsaciones[i].y);
                        console.log("   Continente: " + clickedTile.continente.code);
                        console.log("   Provincia: " + clickedTile.province.code);
                        console.log("   Climate: " + clickedTile.province.climate);
                        console.log("   hasSea? " + clickedTile.province.hasSea);

                        if (this.gameState === gameStates.playerMoving && this.isPlayerSelecting) { //El jugador está seleccionando origen y destino de un movimiento
                            this.clickedProvinces.push(clickedTile.province);
                            if (this.clickedProvinces.length === 2 && this.validateMove(clickedTile[0], clickedTile[1])) {
                                // Show prompt for number of units to move
                            } else {
                                // Show message informing of invalid move
                            }
                        } else if (this.gameState === gameStates.playerAttacking && this.isPlayerSelecting) { //El jugador está seleccionando origen y destino de un ataque
                            this.clickedProvinces.push(clickedTile.province);
                            if (this.clickedProvinces.length === 2 && this.validateAttack(clickedTile[0], clickedTile[1])) {
                                //Show prompt for number of units to attack
                            } else {
                                // Show message informing of invalid attack
                            }
                        }
                    } else {
                        //Aqui irán los clicks en elementos del hud
                        if(this.botonSummary.contienePunto(pulsaciones[i].x, pulsaciones[i].y)){
                            //summary
                            console.log("Button summary clicked");
                        }
                        else if(this.botonAtacar.contienePunto(pulsaciones[i].x, pulsaciones[i].y)){
                            //atacar
                            console.log("Button attack clicked");
                        }
                        else{
                            console.log("Click en agua");
                        }
                    }
                }
                else{ // game init controls

                }
            }
        }
    }

    procesarControles() {
    }

    clickAttack() {
        this.gameState = gameStates.playerAttacking;
        this.isPlayerSelecting = true;
    }

    clickMove() {
        this.gameState = gameStates.playerMoving;
        this.isPlayerSelecting = true;
    }

    validateAttack(provinceA, provinceB) {
        return this.gestorDeTerritorios.validateAttack(provinceA, provinceB);
    }

    validateMove(provinceA, provinceB) {
        return this.gestorDeTerritorios.validateMove(provinceA, provinceB);
    }

    // METODOS DE CARGA Y DIBUJO DE MAPA
    
    cargarMapa(rutaContinentes, rutaProvincias) {
        let ficheroC = new XMLHttpRequest();
        let ficheroP = new XMLHttpRequest();
        ficheroC.open("GET", rutaContinentes, false);
        ficheroP.open("GET", rutaProvincias, false);

        ficheroC.onreadystatechange = function () {
            ficheroP.onreadystatechange = function () {
                let textoC = ficheroC.responseText;
                let textoP = ficheroP.responseText;
                let lineasC = textoC.split('\n');
                let lineasP = textoP.split('\n');
                for (let i = 0; i < lineasC.length; i++) {
                    let lineaC = lineasC[i];
                    let lineaP = lineasP[i];
                    for (let j = 0; j < lineaC.length; j++) {
                        let simboloC = lineaC[j];
                        let simboloP = lineaP[j];
                        //console.log("Coor: " + i + " " + j);
                        this.cargarObjetoMapa(simboloC, simboloP, j, i);
                    }
                }
            }.bind(this);
        }.bind(this);

        ficheroC.send(null);
        ficheroP.send(null);
    }

    cargarObjetoMapa(simboloC, simboloP, x, y) {
        if (this.continentes[simboloC] !== undefined && this.provincias[simboloP] !== undefined) {
            let tile = new Tile(x, y, this.continentes[simboloC], this.provincias[simboloP]);
            if (!this.continentes[simboloC].provincias.includes(this.provincias[simboloP])) {
                this.continentes[simboloC].provincias.push(this.provincias[simboloP]);
            }
            this.provincias[simboloP].tiles.push(tile);
            this.mapa.addTile(tile, x, y);
        }
    }

    calculateCentroids() {
        for (let key in this.provincias)
            if (this.provincias.hasOwnProperty(key)) {
                this.provincias[key].calculateCentroid();
                console.log("Calculated centroid: " + this.provincias[key].centroid.x + " " + this.provincias[key].centroid.y + " (for " + this.provincias[key].code + " province)");
            }
    }

    addContinentInfo(rutaInfo) {
        let ficheroI = new XMLHttpRequest();
        ficheroI.open("GET", rutaInfo, false);
        ficheroI.onreadystatechange = function () {
            let text = ficheroI.responseText;
            let json = JSON.parse(text);
            // console.log(json);
            for (let key in this.continentes) {
                if (this.continentes.hasOwnProperty(key)) {
                    if (this.continentes.hasOwnProperty(key)) {
                        this.continentes[key].bonus = json[key].bonus;
                    }
                }
            }
        }.bind(this);
        ficheroI.send(null);
    }

    addProvinceInfo(rutaInfo) {
        let ficheroI = new XMLHttpRequest();
        ficheroI.open("GET", rutaInfo, false);
        ficheroI.onreadystatechange = function () {
            let text = ficheroI.responseText;
            let json = JSON.parse(text);
            // console.log(json);
            for (let key in this.provincias) {
                if (this.provincias.hasOwnProperty(key)) {
                    if (this.provincias.hasOwnProperty(key)) {
                        this.provincias[key].climate = climates[json[key].climate];
                        this.provincias[key].hasSea = json[key].hasSea;
                        this.provincias[key].connections = json[key].connections;
                    }
                }
            }
        }.bind(this);
        ficheroI.send(null);
    }

    drawConnectionsBySea() {
        for (let key in this.provincias) {
            if (this.provincias.hasOwnProperty(key)) {
                let adj = this.provincias[key].getAdjacentProvincesBySea();
                if (adj.length !== 0) {
                    adj.forEach(p => {
                        // console.log(p);
                        contexto.beginPath();
                        contexto.strokeStyle = "black";
                        contexto.setLineDash([3, 9]);
                        // console.log("Centroid1 (" + this.provincias[key].centroid.x + ", " + this.provincias[key].centroid.y + ") - Centroid2 (" + this.provincias[p].centroid.x + ", " + this.provincias[p].centroid.y + ")");
                        contexto.moveTo(this.provincias[key].centroid.x * tileSize, this.provincias[key].centroid.y * tileSize);
                        contexto.lineTo(this.provincias[p].centroid.x * tileSize, this.provincias[p].centroid.y * tileSize);
                        contexto.stroke();
                    });
                }
            }
        }
    }
}
