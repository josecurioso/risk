class GestorDeTextos {

    constructor(where) {
        this.where = where;
        this.bufferLength = 10;
        this.written = 0;
    }

    writeTurnAction(jugador, action) {
        if(this.written > this.bufferLength) {
            this.where.valor = "";
            this.written = 0;
        }
        this.where.valor += "[" + jugador + "]:" + action + "\n";
        this.written++;
    }

    writeTurnActionCustom(where, jugador, action) {
        if(this.written > this.bufferLength) {
            this.where.valor = "";
            this.written = 0;
        }
        where.valor = "[" + jugador + "]:" + action;
        this.written++;
    }
}
