class GameLayer extends Layer {

    constructor(playerAmount) {
        super();
        this.iniciar(playerAmount);
    }

    iniciar(playerAmount) {
        this.mapa = new Mapa(60, 80);

        this.turnoActual = new Texto("placeholder", 600 * 0.45, 320 * 0.925, "20px Arial");
        this.botonAtacar = new Boton(imagenes.attack, 600 * 0.945, 320 * 0.9, true);
        this.botonSummary = new Boton(imagenes.summary, 600 * 0.055, 320 * 0.9, true);
        this.botonDice = new Boton(imagenes.dice, 600 * 0.175, 320 * 0.9, true);
        this.turnOverlay = new Boton(imagenes.turn, 600 * 0.5, 320 * 0.9, false);

        // Troops Dialog
        let dialogX = 0.5;
        let dialogY = 0.5;
        this.tDialogBackground = new Boton(imagenes.tDialogBackground, 600 * dialogX, 320 * dialogY, false);
        this.tDialogAdd = new Boton(imagenes.tDialogAdd, 600 * (dialogX+0.12), 320 * (dialogY+0.11), true);
        this.tDialogRemove = new Boton(imagenes.tDialogRemove, 600 * (dialogX+0.18), 320 * (dialogY+0.11), true);
        this.tDialogOk = new Boton(imagenes.tDialogOk, 600 * dialogX, 320 * (dialogY+0.08), true);

        // Configurar jugadores
        this.numeroJugadores = playerAmount;
        this.jugadores = [];
        for(let i=0; i<this.numeroJugadores; i++) {
            this.jugadores.push(new Jugador("Jugador" + i));
        }
        this.jugadores.push(new IA().playerIA);

        //Configurar gestores
        this.gestorDeUnidades = new GestorDeUnidades(Object.keys(provincias).length, 3);
        this.gestorDeTurnos = new GestorDeTurnos(this.gestorDeTerritorios, this.gestorDeUnidades, this.jugadores, this.turnoActual);
        this.gestorDeTerritorios = new GestorDeTerritorios();

        this.gestorDeTurnos.changePlayer();

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

        // Dialogo tropas
        this.tDialogBackground.dibujar();
        this.tDialogAdd.dibujar();
        this.tDialogRemove.dibujar();
        this.tDialogOk.dibujar();
    }

    calcularPulsaciones(pulsaciones) {
        this.botonAtacar.pulsado = false;
        this.botonSummary.pulsado = false;
        let tilePulsada = false;


        for (let i = 0; i < pulsaciones.length; i++) {
            if (pulsaciones[i].tipo === tipoPulsacion.inicio) {
                let t = this.mapa.getTileForCoords(pulsaciones[i].x, pulsaciones[i].y);
                if (t !== undefined) {
                    tilePulsada = true;
                    clickedTile = t;
                }
                if(this.botonSummary.contienePunto(pulsaciones[i].x, pulsaciones[i].y)){
                        this.botonSummary.pulsado = true;
                        controles.showSummary = true;
                }
                else if(this.botonAtacar.contienePunto(pulsaciones[i].x, pulsaciones[i].y)){
                    this.botonAtacar.pulsado = true;
                    controles.attackMode = true;
                }
                else{
                    console.log("Click en agua");
                }
            }
        }


        if(!this.botonSummary.pulsado)
            controles.showSummary = false;
        if(!this.botonAtacar.pulsado)
            controles.attackMode = false;
        if(!tilePulsada) {
            controles.tileClick = false;
        }
    }

    procesarControles() {
        if(controles.attackMode){
            this.gameState = gameStates.playerAttacking;
            this.isPlayerSelecting = true;
        }
        if(controles.tileClick) {
            console.log("Click en tile: " + clickedTile.px + ", " + clickedTile.py);
            console.log("   Continente: " + clickedTile.continente.code);
            console.log("   Provincia: " + clickedTile.province.code);
            console.log("   Climate: " + clickedTile.province.climate);
            console.log("   hasSea? " + clickedTile.province.hasSea);

            if(clickedTile.isBonus && this.gameState !== gameStates.playerAttacking) {
                // Player is farming
            }
            else if (this.gameState === gameStates.playerAttacking && this.isPlayerSelecting) { //El jugador está seleccionando origen y destino de un ataque
                this.clickedProvinces.push(clickedTile.province);
                if (this.clickedProvinces.length === 2 && this.gestorDeTerritorios.validateAttack(clickedTile[0], clickedTile[1])) {
                    //Show prompt for number of units to attack

                    // once finished
                    this.clickedProvinces = [];
                } else {
                    // Show message informing of invalid attack
                }
            }
            else {
                this.gameState = gameStates.playerMoving;
                this.isPlayerSelecting = true; //El jugador está seleccionando origen y destino de un movimiento
                this.clickedProvinces.push(clickedTile.province);
                if (this.clickedProvinces.length === 2) {
                    if (this.gestorDeTerritorios.validateMove(clickedTile[0], clickedTile[1])) {
                        // Show prompt for number of units to move

                        // once finished
                        this.clickedProvinces = [];
                    }
                    else {
                    // Show message informing of invalid move
                    }
                }
            }
        }


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
