class Mapa extends Modelo {

    constructor(sx, sy) {
        super(imagenes.fondo_mar, 0, 0);
        this.sx = sx;
        this.sy = sy;

        this.tiles = new Array(sy);
        for (let i = 0; i < sy; i++) {
            this.tiles[i] = new Array(sx);
        }
    }

    dibujar() {
        this.drawConnectionsBySea();
        for (let y = 0; y < this.sy; y++) {
            for (let x = 0; x < this.sx; x++) {
                let tile = this.tiles[y][x];
                if (tile) {
                    tile.dibujar(
                        x - 1 >= 0 ? this.tiles[y][x - 1] : null,
                        x + 1 < this.sx ? this.tiles[y][x + 1] : null,
                        y - 1 >= 0 ? this.tiles[y - 1][x] : null,
                        y + 1 < this.sy ? this.tiles[y + 1][x] : null
                    );
                }
            }
        }
    }

    addTile(tile, px, py) {
        tile.px = px;
        tile.py = py;
        this.tiles[px][py] = tile;
    }

    getTileForCoords(x, y) {
        let px = Math.ceil(x / tileSize) - 1;
        let py = Math.ceil(y / tileSize) - 1;
        return this.tiles[px][py];
    }

    drawConnectionsBySea() {
        for (let key in provincias) {
            if (provincias.hasOwnProperty(key)) {
                let adj = provincias[key].getAdjacentProvincesBySea();
                if (adj.length !== 0) {
                    adj.forEach(p => {
                        contexto.beginPath();
                        contexto.strokeStyle = "black";
                        contexto.setLineDash([3, 9]);
                        contexto.moveTo(provincias[key].centroid.x * tileSize, provincias[key].centroid.y * tileSize);
                        contexto.lineTo(provincias[p].centroid.x * tileSize, provincias[p].centroid.y * tileSize);
                        contexto.stroke();
                    });
                }
            }
        }
    }
}
