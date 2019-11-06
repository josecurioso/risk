class Tile extends Modelo {

    constructor(x, y, equipo) {
        super("", x, y);
        this.equipo = equipo;
        this.tileSize = 8;
        this.x *= this.tileSize;
        this.y *= this.tileSize;
    }

    dibujar(up, down, left, right) {
        // Box
        contexto.beginPath();
        contexto.strokeStyle = this.getStrokeColor();
        contexto.fillStyle = this.getFillColor();
        contexto.rect(
            this.x, this.y,
            this.tileSize,
            this.tileSize);
        contexto.fill();
        contexto.stroke();
        // Edges
        contexto.beginPath();
        contexto.strokeStyle = "black";
        if (this.shouldDrawBorder(up)) {
            contexto.moveTo(this.x, this.y);
            contexto.lineTo(this.x + this.tileSize, this.y);
        }
        if (this.shouldDrawBorder(down)) {
            contexto.moveTo(this.x, this.y + this.tileSize);
            contexto.lineTo(this.x + this.tileSize, this.y + this.tileSize);
        }
        if (this.shouldDrawBorder(left)) {
            contexto.moveTo(this.x, this.y);
            contexto.lineTo(this.x, this.y + this.tileSize);
        }
        if (this.shouldDrawBorder(right)) {
            contexto.moveTo(this.x + this.tileSize, this.y);
            contexto.lineTo(this.x + this.tileSize, this.y + this.tileSize);
        }
        contexto.stroke();
    }

    shouldDrawBorder(tile) {
        if (tile === null || tile === undefined)
            return true;
        return tile.equipo.code !== this.equipo.code;
    }

    getStrokeColor() {
        return this.equipo.getStrokeColor();
    }

    getFillColor() {
        return this.equipo.getFillColor();
    }

}
