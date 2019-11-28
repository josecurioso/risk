class Texto {

    constructor(valor, x, y, sizeFont, colorFont) {
        this.valor = valor;
        this.x = x;
        this.y = y;
        if (sizeFont === undefined || sizeFont === null) {
            this.sizeFont = "20px Arial";
        }
        if (colorFont === undefined || colorFont === null) {
            this.colorFont = "white";
        }
        this.sizeFont = sizeFont;
        this.colorFont = colorFont;
    }

    dibujar() {
        contexto.font = this.sizeFont;
        contexto.fillStyle = this.colorFont;
        contexto.textAlign = "left";
        contexto.fillText(this.valor, this.x, this.y);
    }

}
