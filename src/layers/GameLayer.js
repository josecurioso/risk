class GameLayer extends Layer {

    constructor(playerAmount) {
        super();
        this.iniciar(playerAmount);
    }

    iniciar(playerAmount) {
        this.mapa = new Mapa(60, 80);

        // Configurar jugadores
        this.numeroJugadores = playerAmount;
        this.jugadores = [];
        for (let i = 0; i < this.numeroJugadores; i++) {
            this.jugadores.push(new Jugador("Jugador" + i, climates[Math.floor(Math.random() * climates.length)]));
        }
        this.jugadores.push(new IA().playerIA);

        this.gestorDeUnidades = new GestorDeUnidades(Object.keys(provincias).length, 3);
        this.gestorDeTurnos = new GestorDeTurnos(this.gestorDeTerritorios, this.gestorDeUnidades, this.jugadores);
        this.gestorDeTerritorios = new GestorDeTerritorios();

        this.turnoActual = new Texto(this.gestorDeTurnos.jugadorActual, 600 * 0.45, 320 * 0.925, "20px Arial");
        this.botonAtacar = new Boton(imagenes.attack, 600 * 0.945, 320 * 0.9, true);
        this.botonSummary = new Boton(imagenes.summary, 600 * 0.055, 320 * 0.9, true);
        this.botonDice = new Boton(imagenes.dice, 600 * 0.175, 320 * 0.9, true);
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
        this.botonDice.dibujar();
        this.drawConnectionsBySea();
    }

    calcularPulsaciones(pulsaciones) {
        for (let i = 0; i < pulsaciones.length; i++) {
            if (pulsaciones[i].tipo === tipoPulsacion.inicio) {
                if (this.gameState !== gameStates.gameInit) {
                    let clickedTile = this.mapa.getTileForCoords(pulsaciones[i].x, pulsaciones[i].y);
                    if (clickedTile !== undefined) {
                        console.log("Click en tile: " + clickedTile.px + ", " + clickedTile.py);
                        console.log("   Coords: " + pulsaciones[i].x + ", " + pulsaciones[i].y);
                        console.log("   Continente: " + clickedTile.continente.code);
                        console.log("   Provincia: " + clickedTile.province.code);
                        console.log("   Climate: " + clickedTile.province.climate);
                        console.log("   hasSea? " + clickedTile.province.hasSea);

                        if (this.gameState === gameStates.playerMoving && this.isPlayerSelecting) { // El jugador está seleccionando origen y destino de un movimiento
                            this.clickedProvinces.push(clickedTile.province);
                            if (this.clickedProvinces.length === 2 && this.validateMove(clickedTile[0], clickedTile[1])) {
                                // Show prompt for number of units to move
                            } else {
                                // Show message informing of invalid move
                            }
                        } else if (this.gameState === gameStates.playerAttacking && this.isPlayerSelecting) { // El jugador está seleccionando origen y destino de un ataque
                            this.clickedProvinces.push(clickedTile.province);
                            if (this.clickedProvinces.length === 2 && this.validateAttack(clickedTile[0], clickedTile[1])) {
                                //Show prompt for number of units to attack
                            } else {
                                // Show message informing of invalid attack
                            }
                        }
                    } else {
                        //Aqui irán los clicks en elementos del hud
                        if (this.botonSummary.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                            //summary
                            console.log("Button summary clicked");
                        } else if (this.botonAtacar.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                            //atacar
                            console.log("Button attack clicked");
                            this.clickAttack();
                        } else {
                            console.log("Click en agua");
                        }
                    }
                } else { // game init controls

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
        if (continentes[simboloC] !== undefined && provincias[simboloP] !== undefined) {
            let tile = new Tile(x, y, continentes[simboloC], provincias[simboloP]);
            if (!continentes[simboloC].provincias.includes(provincias[simboloP])) {
                continentes[simboloC].provincias.push(provincias[simboloP]);
            }
            provincias[simboloP].tiles.push(tile);
            this.mapa.addTile(tile, x, y);
        }
    }

    calculateCentroids() {
        for (let key in provincias)
            if (provincias.hasOwnProperty(key)) {
                provincias[key].calculateCentroid();
                // console.log("Calculated centroid: " + provincias[key].centroid.x + " " + provincias[key].centroid.y + " (for " + provincias[key].code + " province)");
            }
    }

    addContinentInfo(rutaInfo) {
        let ficheroI = new XMLHttpRequest();
        ficheroI.open("GET", rutaInfo, false);
        ficheroI.onreadystatechange = function () {
            let text = ficheroI.responseText;
            let json = JSON.parse(text);
            // console.log(json);
            for (let key in continentes) {
                if (continentes.hasOwnProperty(key)) {
                    if (continentes.hasOwnProperty(key)) {
                        continentes[key].bonus = json[key].bonus;
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
            for (let key in provincias) {
                if (provincias.hasOwnProperty(key)) {
                    if (provincias.hasOwnProperty(key)) {
                        provincias[key].climate = climates[json[key].climate];
                        provincias[key].hasSea = json[key].hasSea;
                        provincias[key].connections = json[key].connections;
                    }
                }
            }
        }.bind(this);
        ficheroI.send(null);
    }

    drawConnectionsBySea() {
        for (let key in provincias) {
            if (provincias.hasOwnProperty(key)) {
                let adj = provincias[key].getAdjacentProvincesBySea();
                if (adj.length !== 0) {
                    adj.forEach(p => {
                        // console.log(p);
                        contexto.beginPath();
                        contexto.strokeStyle = "black";
                        contexto.setLineDash([3, 9]);
                        // console.log("Centroid1 (" + provincias[key].centroid.x + ", " + provincias[key].centroid.y + ") - Centroid2 (" + provincias[p].centroid.x + ", " + provincias[p].centroid.y + ")");
                        contexto.moveTo(provincias[key].centroid.x * tileSize, provincias[key].centroid.y * tileSize);
                        contexto.lineTo(provincias[p].centroid.x * tileSize, provincias[p].centroid.y * tileSize);
                        contexto.stroke();
                    });
                }
            }
        }
    }
}
