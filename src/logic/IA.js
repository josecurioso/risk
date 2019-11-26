class IA {

    constructor() {
        this.playerIA = new Jugador("IA", "IA", colores[5].strokeColor, colores[5].fillColor, climates[Math.floor(Math.random() * climates.length)]);
    }

    /*
        Decide wheter the IA attacks other player or recolocates troops
     */
    attackOrMoveTroops() {

    }

    // We can use this two, or the "play" method in "Jugador"

    attack() {

    }

    moveTroops() {

    }
}
