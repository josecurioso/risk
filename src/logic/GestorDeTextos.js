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
        this.written.push(new Texto("[" + jugador.smallTeamCode + "]: " + action, this.whereBase.x, this.whereBase.y + 6 * this.count, "5px Arial", jugador.fillColor));
        this.count++;
    }

    writeGameAction(action) {
        if (this.written.length > this.bufferLength) {
            this.written = [];
            this.count = 0;
        }
        this.written.push(new Texto("[GAME]: " + action, this.whereBase.x, this.whereBase.y + 6 * this.count, "5px Arial", "white"));
        this.count++
    }

    writeTurnActionCustom(where, code, action, color) {
        if (this.written.length > this.bufferLength) {
            this.written = [];
            this.count = 0;
        }
        this.written.push(new Texto("[" + code + "]: " + action, where.x, where.y + 6 * this.count, "5px Arial", color));
        this.count++;
    }
}
