class Provincia {

    constructor(tiles, code) {
        this.tiles = tiles;
        this.code = code;
        this.climate = null;
        this.hasSea = null;
        this.connections = null;
        this.owner = null;
        this.units = 0;
        this.hasFarm = [false, "", 0, 0]; // true si hay granja, el valor representa el tipo, cuánto se va a sumar y la tile que se muestra
        this.unitsSign = null;
        this.highlight = false;
    }

    setUnits(unidades) {
        this.units = unidades;
        this.unitsSign.valor = this.units;
    }

    addUnits(unidades) {
        this.units = this.units + unidades;
        this.unitsSign.valor = this.units;
    }

    calculateCentroid() {
        let points = [];
        for (let i = 0; i < this.tiles.length; i++) {
            let point = {
                x: this.tiles[i].px,
                y: this.tiles[i].py,
            };
            points.push(point);
        }
        this.centroid = this.getPointsCentroid(points);
    }

    getPointsCentroid(points) {
        let centroid = {x: 0, y: 0};
        let bX = 0, bY = 0;
        let sX = 150, sY = 150;
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            if (point.x < sX)
                sX = point.x;
            if (point.x > bX)
                bX = point.x;
            if (point.y < sY)
                sY = point.y;
            if (point.y > bY)
                bY = point.y;
        }
        let meanX = ((bX - sX) / 2) + sX;
        let meanY = ((bY - sY) / 2) + sY;

        let minDist = 500;
        for (let i = 0; i < points.length; i++) {
            points[i].dist = Math.sqrt(Math.pow(points[i].x - meanX, 2) + Math.pow(points[i].y - meanY, 2));
            if (points[i].dist < minDist) {
                centroid.x = points[i].x;
                centroid.y = points[i].y;
                minDist = points[i].dist;
            }
        }
        return centroid;
    }

    getAdjacentProvincesByGround() {
        let result = [];
        this.connections.forEach(p => {
            if (!p.includes("-")) {
                result.push(p);
            }
        });
        return result;
    }

    getAdjacentProvincesBySea() {
        let result = [];
        this.connections.forEach(p => {
            if (p.includes("-")) {
                p = p.substring(0, p.length - 1);
                result.push(p);
            }
        });
        return result;
    }

    locateFarm() {
        this.tiles[this.hasFarm[3]].isBonus = false;
        if (this.hasFarm[0] === true) {
            this.hasFarm[3] = Math.round(Math.random() * (this.tiles.length-1));
            while (this.tiles[this.hasFarm[3]].px === this.centroid.x && this.tiles[this.hasFarm[3]].py === this.centroid.y) {
                this.hasFarm[3] = Math.round(Math.random() * (this.tiles.length-1));
            }
            this.tiles[this.hasFarm[3]].isBonus = true;
            switch(this.hasFarm[1]) {
                case "civilians":
                    this.tiles[this.hasFarm[3]].farmIcon = new FondoSVG(imagenes.farm_civilians, 600 * 0.22, 320 * 0.955, 3, 6);
                    break;
                case "horses":
                    this.tiles[this.hasFarm[3]].farmIcon = new FondoSVG(imagenes.farm_horses, 600 * 0.22, 320 * 0.955, 7, 6);
                    break;
                case "wood":
                    this.tiles[this.hasFarm[3]].farmIcon = new FondoSVG(imagenes.farm_wood, 600 * 0.22, 320 * 0.955, 6, 4);
                    break;
            }
        }
    }
}
