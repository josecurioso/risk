class Tile extends Modelo {

    constructor(x, y, continente, provincia) {
        super("", x, y);
        this.px = 0;
        this.py = 0;
        this.continente = continente;
        this.province = provincia; //Represent
        this.tileSize = tileSize;
        this.region = 1;
        this.x *= this.tileSize;
        this.y *= this.tileSize;
        this.isBonus = false;
    }

    dibujar(up, down, left, right) {
        // Box
        contexto.beginPath();
        contexto.strokeStyle = this.getStrokeColor();
        contexto.fillStyle = this.getFillColor();
        if(!(this.getStrokeColor() + " " + this.getFillColor()).includes("#"))
            console.log(this.getStrokeColor() + " " + this.getFillColor());
        contexto.lineWidth = 0.5;
        contexto.rect(
            this.x, this.y,
            this.tileSize,
            this.tileSize);
        contexto.fill();
        contexto.stroke();
        // Edges
        contexto.beginPath();
        contexto.strokeStyle = "black";
        contexto.lineWidth = 1;
        contexto.setLineDash([]);
        let dBU = this.shouldDrawBorder(up);
        let dBD = this.shouldDrawBorder(down);
        let dBL = this.shouldDrawBorder(left);
        let dBR = this.shouldDrawBorder(right);
        if (dBU === 2) {
            contexto.beginPath();
            contexto.strokeStyle = "black";
            contexto.lineWidth = 1;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y);
            contexto.lineTo(this.x + this.tileSize, this.y);
            contexto.stroke();
        }
        else if(dBU === 1) {
            contexto.beginPath();
            contexto.strokeStyle = "black";
            contexto.lineWidth = 0.5;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y);
            contexto.lineTo(this.x + this.tileSize, this.y);
            contexto.stroke();
        }
        if (dBD === 2) {
            contexto.beginPath();
            contexto.strokeStyle = "black";
            contexto.lineWidth = 1;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y + this.tileSize);
            contexto.lineTo(this.x + this.tileSize, this.y + this.tileSize);
            contexto.stroke();
        }
        else if(dBD === 1) {
            contexto.beginPath();
            contexto.strokeStyle = "black";
            contexto.lineWidth = 0.5;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y + this.tileSize);
            contexto.lineTo(this.x + this.tileSize, this.y + this.tileSize);
            contexto.stroke();
        }
        if (dBL === 2) {
            contexto.beginPath();
            contexto.strokeStyle = "black";
            contexto.lineWidth = 1;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y);
            contexto.lineTo(this.x, this.y + this.tileSize);
            contexto.stroke();
        }
        else if(dBL === 1) {
            contexto.beginPath();
            contexto.strokeStyle = "black";
            contexto.lineWidth = 0.5;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y);
            contexto.lineTo(this.x, this.y + this.tileSize);
            contexto.stroke();
        }
        if (dBR === 2) {
            contexto.beginPath();
            contexto.strokeStyle = "black";
            contexto.lineWidth = 1;
            contexto.setLineDash([]);
            contexto.moveTo(this.x + this.tileSize, this.y);
            contexto.lineTo(this.x + this.tileSize, this.y + this.tileSize);
            contexto.stroke();
        }
        else if(dBR === 1) {
            contexto.beginPath();
            contexto.strokeStyle = "black";
            contexto.lineWidth = 0.5;
            contexto.setLineDash([]);
            contexto.moveTo(this.x + this.tileSize, this.y);
            contexto.lineTo(this.x + this.tileSize, this.y + this.tileSize);
            contexto.stroke();
        }
        contexto.stroke();
    }

    shouldDrawBorder(tile) {
        if (tile === null || tile === undefined)
            return 2;
        if(tile.continente.code !== this.continente.code)
            return 2;
        if(tile.province.code !== this.province.code)
            return 1;
        return 0;
    }

    getStrokeColor() {
        //return this.continente.strokeColor;
        if (this.province.owner !== undefined && this.province.owner !== null)
            return this.province.owner.strokeColor;
        else
            return this.continente.strokeColor;
    }

    getFillColor() {
        if(this.isBonus)
            return "#000000";
        //return this.continente.fillColor;
        if(this.province.owner === null)
            return "#ffffff";
        if(this.province.owner !== undefined && this.province.owner !== null) {
            return this.province.owner.fillColor;
        }
        else
            return this.continente.fillColor;
    }

}
