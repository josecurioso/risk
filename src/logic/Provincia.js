class Provincia {

    constructor(tiles, code) {
        this.tiles = tiles;
        this.code = code;
        this.climate = null;
        this.hasSea = null;
        this.connections = null;
    }

    calculateMidPosition() {
        let maxX, maxY = Number.MIN_VALUE;
        let minX, minY = Number.MAX_VALUE;
        let midX, midY = 0;

        this.tiles.forEach(t => {
            if (t.x > maxX) {
                maxX = t.x;
            } else if (t.x < minX) {
                minX = t.x;
            }

            if (t.y > maxY) {
                maxY = t.y;
            } else if (t.y < minY) {
                minY = t.y;
            }
        });

        midX = (minX + maxX) / 2;
        midY = (minY + maxY) / 2;

        return [midX, midY];
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
}
