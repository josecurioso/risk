class GestorDeTextos {

    constructor(whereBase) {
        this.whereBase = whereBase;
        this.bufferLength = 10;
        this.written = [];
    }

    writeTurnAction(jugador, action) {
        if (this.written.length > this.bufferLength) {
            this.written = [];
        }
        this.written.push(new Texto("[" + jugador + "]:" + action, this.whereBase.x + 5, this.whereBase.y + 5,"5px Arial"));
    }

    writeTurnActionCustom(where, jugador, action) {
        // TODO: genérico
    }
}
