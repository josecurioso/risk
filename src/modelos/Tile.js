class Tile extends Modelo {

    constructor(x, y, continente, provincia) {
        super("", x, y);
        this.px = 0;
        this.py = 0;
        this.continente = continente;
        this.province = provincia; //Represent
        this.tileSize = tileSize;
        this.x *= this.tileSize;
        this.y *= this.tileSize;
        this.isBonus = false;
    }

    dibujar(up, down, left, right) {
        // Box
        contexto.beginPath();
        contexto.strokeStyle = this.getStrokeColor();
        contexto.fillStyle = this.getFillColor();
        if (!(this.getStrokeColor() + " " + this.getFillColor()).includes("#"))
            console.log(this.getStrokeColor() + " " + this.getFillColor());
        contexto.lineWidth = 0.5;
        contexto.rect(
            this.x, this.y,
            this.tileSize,
            this.tileSize);
        contexto.fill();
        contexto.stroke();
        // Edges
<<<<<<< Updated upstream
=======
        contexto.beginPath();
        contexto.strokeStyle = highlight ? "yellow" : "black";
        contexto.lineWidth = 1;
        contexto.setLineDash([]);
>>>>>>> Stashed changes
        let dBU = this.shouldDrawBorder(up);
        let dBD = this.shouldDrawBorder(down);
        let dBL = this.shouldDrawBorder(left);
        let dBR = this.shouldDrawBorder(right);
<<<<<<< Updated upstream
        if (dBU.val) {
=======
        if (dBU === 2) {
            contexto.beginPath();
            contexto.strokeStyle = highlight || (up === null || up === undefined) ? false : up.province.highlight ? "yellow" : "black";
            contexto.lineWidth = 1;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y);
            contexto.lineTo(this.x + this.tileSize, this.y);
            contexto.stroke();
        } else if (dBU === 1) {
>>>>>>> Stashed changes
            contexto.beginPath();
            contexto.strokeStyle = dBU.lineColor;
            contexto.lineWidth = dBU.lineWidth;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y);
            contexto.lineTo(this.x + this.tileSize, this.y);
            contexto.stroke();
        }
        if (dBD.val) {
            contexto.beginPath();
            contexto.strokeStyle = dBD.lineColor;
            contexto.lineWidth = dBD.lineWidth;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y + this.tileSize);
            contexto.lineTo(this.x + this.tileSize, this.y + this.tileSize);
            contexto.stroke();
<<<<<<< Updated upstream
        }
        if (dBL.val) {
=======
        } else if (dBD === 1) {
>>>>>>> Stashed changes
            contexto.beginPath();
            contexto.strokeStyle = dBL.lineColor;
            contexto.lineWidth = dBL.lineWidth;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y);
            contexto.lineTo(this.x, this.y + this.tileSize);
            contexto.stroke();
<<<<<<< Updated upstream
        }
        if (dBR.val) {
            contexto.beginPath();
            contexto.strokeStyle = dBR.lineColor;
            contexto.lineWidth = dBR.lineWidth;
=======
        } else if (dBL === 1) {
            contexto.beginPath();
            contexto.strokeStyle = highlight || (left === null || left === undefined) ? false : left.province.highlight ? "yellow" : "black";
            contexto.lineWidth = 0.5;
            contexto.setLineDash([]);
            contexto.moveTo(this.x, this.y);
            contexto.lineTo(this.x, this.y + this.tileSize);
            contexto.stroke();
        }
        if (dBR === 2) {
            contexto.beginPath();
            contexto.strokeStyle = highlight || (right === null || right === undefined) ? false : right.province.highlight ? "yellow" : "black";
            contexto.lineWidth = 1;
            contexto.setLineDash([]);
            contexto.moveTo(this.x + this.tileSize, this.y);
            contexto.lineTo(this.x + this.tileSize, this.y + this.tileSize);
            contexto.stroke();
        } else if (dBR === 1) {
            contexto.beginPath();
            contexto.strokeStyle = highlight || (right === null || right === undefined) ? false : right.province.highlight ? "yellow" : "black";
            contexto.lineWidth = 0.5;
>>>>>>> Stashed changes
            contexto.setLineDash([]);
            contexto.moveTo(this.x + this.tileSize, this.y);
            contexto.lineTo(this.x + this.tileSize, this.y + this.tileSize);
            contexto.stroke();
        }
    }

    shouldDrawBorder(tile) {
<<<<<<< Updated upstream
        if (tile === null || tile === undefined) {
            if (this.province.highlight)
                return {'val' : true, 'lineWidth': 1, 'lineColor': "yellow"};
            return {'val' : true, 'lineWidth': 1, 'lineColor': "black"};
        }
        if (tile.continente.code !== this.continente.code) {
            if (this.province.highlight || tile.province.highlight)
                return {'val' : true, 'lineWidth': 1, 'lineColor': "yellow"};
            return {'val' : true, 'lineWidth': 1, 'lineColor': "black"};
        }
        if (tile.province.code !== this.province.code) {
            if (this.province.highlight || tile.province.highlight)
                return {'val' : true, 'lineWidth': 0.5, 'lineColor': "yellow"};
            return {'val' : true, 'lineWidth': 0.5, 'lineColor': "black"};
        }
        return {'val' : false};
=======
        if (tile === null || tile === undefined)
            return 2;
        if (tile.continente.code !== this.continente.code)
            return 2;
        if (tile.province.code !== this.province.code)
            return 1;
        return 0;
>>>>>>> Stashed changes
    }

    getStrokeColor() {
        //return this.continente.strokeColor;
        if (this.province.owner !== undefined && this.province.owner !== null)
            return this.province.owner.strokeColor;
        else
            return this.continente.strokeColor;
    }

    getFillColor() {
        if (this.isBonus)
            return "#000000";
        //return this.continente.fillColor;
        if (this.province.owner === null)
            return "#ffffff";
        if (this.province.owner !== undefined && this.province.owner !== null) {
            return this.province.owner.fillColor;
        } else
            return this.continente.fillColor;
    }

}
