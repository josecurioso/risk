class Mapa extends Modelo {

    constructor(sx, sy) {
        super(imagenes.fondo_mar, 0, 0);
        this.sx = sx;
        this.sy = sy;

        this.tiles = new Array(sy);
        for(let i = 0; i < sy; i++) {
            this.tiles[i] = new Array(sx);
        }
    }

    dibujar() {
        super.dibujar();
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
        this.tiles[px][py] = tile;
    }
}
