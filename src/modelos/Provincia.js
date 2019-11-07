class Provincia {

    constructor(tiles, code) {
        this.tiles = tiles;
        this.code = code;
    }

    calculateMidPosition() {
        let maxX, maxY = Number.MIN_VALUE;
        let minX, minY = Number.MAX_VALUE;
        let midX, midY = 0;

        this.tiles.forEach(t => {
            if(t.x > maxX) {
                maxX = t.x;
            } else if (t.x < minX) {
                minX = t.x;
            }

            if(t.y > maxY) {
                maxY = t.y;
            } else if (t.y < minY) {
                minY = t.y;
            }
        });

        midX = (minX + maxX) / 2;
        midY = (minY + maxY) / 2;

        return [midX, midY];
    }
}
