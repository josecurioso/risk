class Tile extends Modelo {

    constructor(x, y, continente, provincia) {
        super("", x, y);
        this.continente = continente;
        this.province = provincia; //Represent
        this.tileSize = 8;
        this.region = 1;
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
        return tile.continente.code !== this.continente.code || tile.province.code !== this.province.code;
    }

    getStrokeColor() {
        return this.continente.strokeColor;
    }

    getFillColor() {
        return this.continente.fillColor;
    }

}
