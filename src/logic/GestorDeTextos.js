class GestorDeTextos {

    constructor(whereBase) {
        this.whereBase = whereBase;
        this.bufferLength = 10;
        this.written = [];
        this.count = 0;
    }

    writeTurnAction(jugador, action) {
        if (this.written.length > this.bufferLength) {
            this.written = [];
            this.count = 0;
        }
        this.written.push(new Texto("[" + jugador.smallTeamCode + "]: " + action, this.whereBase.x, this.whereBase.y + 6 * this.count,"5px Arial", jugador.fillColor));
        this.count++;
    }

    writeTurnActionCustom(where, jugador, action) {
        // TODO: genérico
    }
}
