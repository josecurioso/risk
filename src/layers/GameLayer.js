class GameLayer extends Layer {

    constructor(playerAmount) {
        super();
        this.iniciar(playerAmount);
    }

    iniciar(playerAmount) {
        // Mapa
        this.fondoMar = new FondoSVG(imagenes.fondo_mar, 600, 320, 600, 320);
        this.mapa = new Mapa(60, 80);

        // Game HUD
        this.summaryOverlay = new FondoSVG(imagenes.messages, 600 * 0.22, 320 * 0.955, 125, 93);
        this.summaryTextBase = new Texto("", 600 * 0.025, 320 * 0.71, "5px Arial", "white");
        this.turnOverlay = new FondoSVG(imagenes.turn, 600 * 0.65, 320 * 0.955, 130, 30);
        this.turnoActual = new Texto("placeholder", 600 * 0.47, 320 * 0.925, "20px Arial", "white");
        this.botonAtacar = new BotonSVG(imagenes.attack, 600 * 0.725, 320 * 0.965, 36, 36, true, 29);
        this.botonDice = new BotonSVG(imagenes.dice, 600 * 0.42, 320 * 0.96, 36, 36, false);
        this.unitNumbers = [];

        // Troops Dialog
        let dialogX = 0.5;
        let dialogY = 0.5;
        this.tDialogBackground = new FondoSVG(imagenes.tDialogBackground, 600 * (dialogX + 0.25), 320 * (dialogY + 0.17), 290, 111);
        this.tDialogAdd = new BotonSVG(imagenes.boton_add, 600 * (dialogX + 0.141), 320 * (dialogY + 0.11), 28, 28, true, 14);
        this.tDialogRemove = new BotonSVG(imagenes.boton_remove, 600 * (dialogX + 0.21), 320 * (dialogY + 0.11), 28, 28, true, 14);
        this.tDialogOk = new BotonSVG(imagenes.tDialogOk, 600 * (dialogX + 0.05), 320 * (dialogY + 0.125), 46, 46, true, 23);
        this.tDialogTPA = new Texto(10, 600 * (dialogX - 0.17), 320 * (dialogY - 0.06), "20px Arial", "white");
        this.tDialogTPB = new Texto(10, 600 * (dialogX + 0.12), 320 * (dialogY - 0.06), "20px Arial", "white");

        // Configurar jugadores
        this.numeroJugadores = playerAmount;
        this.jugadores = [];
        for(let i = 0; i < this.numeroJugadores; i++)
            this.jugadores.push(new Jugador("Jugador " + i,"J" + i, colores[i].strokeColor, colores[i].fillColor, climates[Math.floor(Math.random() * climates.length)]));
        this.jugadores.push(new IA().playerIA);

        // Configurar gestores
        this.gestorDeUnidades = new GestorDeUnidades(Object.keys(provincias).length, 3);
        this.gestorDeTextos = new GestorDeTextos(this.summaryTextBase);
        this.gestorDeEventos = new GestorDeEventos("res/0_info_bonus.json", this.gestorDeTextos);
        this.gestorDeEventos.loadEventsFile();
        this.gestorDeTerritorios = new GestorDeTerritorios(provincias);
        this.gestorDeTurnos = new GestorDeTurnos(this.gestorDeTerritorios, this.gestorDeUnidades, this.gestorDeTextos, this.gestorDeEventos, this.jugadores, this.turnoActual, this.summaryTextBase);

        // Reparto inicial de provincias
        this.gestorDeTurnos.initialTurnDraw();

        // Manejo de seleccion de provincias (mover/atacar)
        this.clickedProvinces = [];
        this.isPlayerSelecting = false;

        // Estado del juego
        this.gameState = gameStates.turnBase;
        //this.gameState = gameStates.gameInit;

        // Estado de la UI
        this.UIState = UIStates.map;

        // carga del mapa y la información añadida
        this.cargarMapa("res/" + nivelActual + "_continents.txt", "res/" + nivelActual + "_provinces.txt");
        this.addProvinceInfo("res/" + nivelActual + "_info_provinces.json");
        this.addContinentInfo("res/" + nivelActual + "_info_continents.json");
        this.calculateCentroids();
        this.attachUnitSigns();
        this.setInitialUnits();
    }

    actualizar() {
    }

    dibujar() {
        this.fondoMar.dibujar();
        this.mapa.dibujar();
        this.botonAtacar.dibujar();
        this.summaryOverlay.dibujar();
        this.gestorDeTextos.written.forEach(t => t.dibujar());
        this.turnOverlay.dibujar();
        this.turnoActual.dibujar();
        this.botonDice.dibujar();
        this.unitNumbers.forEach((x) => x.dibujar());

        // Dialogo tropas
        if (this.UIState === UIStates.troopsDialog) {
            this.tDialogBackground.dibujar();
            this.tDialogAdd.dibujar();
            this.tDialogRemove.dibujar();
            this.tDialogOk.dibujar();
            this.tDialogTPA.dibujar();
            this.tDialogTPB.dibujar();
        }
    }

    calcularPulsaciones(pulsaciones) {
        this.botonAtacar.pulsado = false;
        this.botonDice.pulsado = false;
        this.tDialogOk.pulsado = false;
        this.tDialogAdd.pulsado = false;
        this.tDialogRemove.pulsado = false;
        let tilePulsada = false;

        this.gestorDeTerritorios.setCurrentPlayer(this.gestorDeTurnos.getCurrentPlayer());

        for (let i = 0; i < pulsaciones.length; i++) {
            if (pulsaciones[i].tipo === tipoPulsacion.inicio) {
                if (this.UIState === UIStates.troopsDialog) {
                    if (this.tDialogOk.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                        this.tDialogOk.pulsado = true;
                        controles.tDialogOk = true;
                    }
                    if (this.tDialogAdd.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                        this.tDialogAdd.pulsado = true;
                        controles.tDialogAdd = true;
                    }
                    if (this.tDialogRemove.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                        this.tDialogRemove.pulsado = true;
                        controles.tDialogRemove = true;
                    }
                } else if (this.UIState === UIStates.map) {
                    let t = this.mapa.getTileForCoords(pulsaciones[i].x, pulsaciones[i].y);
                    if (t !== undefined) {
                        tilePulsada = true;
                        controles.tileClick = true;
                        clickedTile = t;
                    } else if (this.botonAtacar.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                        this.botonAtacar.pulsado = true;
                        controles.attackButton = true;
                    } else if (this.botonDice.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                        this.botonDice.pulsado = true;
                        controles.diceButton = true;
                        this.gestorDeTurnos.changePlayer(); // for testing xd
                    } else {
                        console.log("Click en agua");
                    }
                } else {
                    console.log("UI is in non-interactive state")
                }
            }
        }

        if (!this.botonAtacar.pulsado)
            controles.attackButton = false;
        if (!this.botonDice.pulsado)
            controles.diceButton = false;
        if (!this.tDialogOk.pulsado)
            controles.tDialogOk = false;
        if (!this.tDialogAdd.pulsado)
            controles.tDialogAdd = false;
        if (!this.tDialogRemove.pulsado)
            controles.tDialogRemove = false;
        if (!tilePulsada) {
            controles.tileClick = false;
        }
    }

    procesarControles() {
        if (this.UIState === UIStates.troopsDialog) {
            if (controles.tDialogOk) {
                if (this.gameState === gameStates.playerAttacking) {
                    let troopsToSend = this.tDialogTPB.valor;
                    this.gestorDeTurnos.attack(this.clickedProvinces[0], this.clickedProvinces[1], troopsToSend);
                } else if (this.gameState === gameStates.playerMoving) {
                    let troopsToMove = this.tDialogTPB.valor - this.tDialogTPBOriginal;
                    this.gestorDeTurnos.move(this.clickedProvinces[0], this.clickedProvinces[1], troopsToMove);
                }
                this.clickedProvinces = [];
                this.UIState = UIStates.map;
                controles.tDialogOk = false;
            }
            if (controles.tDialogAdd) {
                if (this.tDialogTPA.valor > 0) {
                    this.tDialogTPA.valor--;
                    this.tDialogTPB.valor++;
                }
                controles.tDialogAdd = false;
            }
            if (controles.tDialogRemove) {
                if (this.tDialogTPB.valor > 0) {
                    this.tDialogTPB.valor--;
                    this.tDialogTPA.valor++;
                }

                controles.tDialogRemove = false;
            }
        } else {
            if (controles.attackButton) {
                console.log("Attack button press");
                // Two liens should be here
                this.gameState = gameStates.playerAttacking;
                this.isPlayerSelecting = true;

                // Testing code
                //this.UIState = UIStates.troopsDialog;
                //this.gestorDeTurnos.changePlayer();
                //provincias['A'].setUnits(10);

                controles.attackButton = false;
            }
            if (controles.diceButton) {
                console.log("Dice button press");

                // Testing code
                //this.UIState = UIStates.troopsDialog;

                controles.diceButton = false;
            }
            if (controles.tileClick) {
                console.log("Click en tile: " + clickedTile.px + ", " + clickedTile.py);
                console.log("\tContinente: " + clickedTile.continente.code);
                console.log("\tProvincia: " + clickedTile.province.code);
                console.log("\tOwner: " + clickedTile.province.owner);

                if (clickedTile.isBonus && this.gameState !== gameStates.playerAttacking && this.gameState !== gameStates.playerMoving) {
                    this.gestorDeTurnos.farm(this.gestorDeTurnos.getCurrentPlayer(), clickedTile);
                    this.clickedProvinces = [];
                } else if (this.gameState === gameStates.playerAttacking && this.isPlayerSelecting) { //El jugador está seleccionando origen y destino de un ataque
                    this.clickedProvinces.push(clickedTile.province);
                    if (this.clickedProvinces.length === 2 && this.gestorDeTerritorios.validateAttack(this.clickedProvinces[0], this.clickedProvinces[1])) {
                        //Show prompt for number of units to attack
                        this.tDialogTPA.valor = this.clickedProvinces[0].units;
                        this.tDialogTPB.valor = 0;
                        this.UIState = UIStates.troopsDialog;
                    } else {
                        // Show message informing of invalid attack
                    }
                } else {
                    this.gameState = gameStates.playerMoving;
                    this.isPlayerSelecting = true; //El jugador está seleccionando origen y destino de un movimiento
                    this.clickedProvinces.push(clickedTile.province);
                    if (this.clickedProvinces.length === 2) {
                        if (this.gestorDeTerritorios.validateMove(this.clickedProvinces[0], this.clickedProvinces[1])) {
                            // Show prompt for number of units to move
                            this.tDialogTPA.valor = this.clickedProvinces[0].units;
                            this.tDialogTPB.valor = this.clickedProvinces[1].units;
                            this.tDialogTPBOriginal = this.clickedProvinces[1].units;
                                this.UIState = UIStates.troopsDialog;
                        } else {
                            // Show message informing of invalid move
                        }
                    }
                }
                controles.tileClick = false;
            }
        }
    }

    // METODOS DE CARGA DE MAPA

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

    attachUnitSigns() {
        for (let key in provincias)
            if (provincias.hasOwnProperty(key)) {
                let sign = new Texto(0, (provincias[key].centroid.x * 8) + 1, (provincias[key].centroid.y * 8) + 5.5, "bold 5px Arial", "black");
                this.unitNumbers.push(sign);
                provincias[key].unitsSign = sign;
            }
    }


    setInitialUnits() {
        for (let key in provincias) {
            if (provincias.hasOwnProperty(key)) {
                provincias[key].setUnits(3);
            }
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


}
