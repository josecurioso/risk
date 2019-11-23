class Texto {

    constructor(valor, x, y, sizeFont) {
        this.valor = valor;
        this.x = x;
        this.y = y;
        if(sizeFont === undefined || sizeFont === null){
            this.sizeFont = "20px Arial";
        }
        this.sizeFont = sizeFont;
    }

    dibujar() {
        contexto.font = this.sizeFont;
        contexto.fillStyle = "white";
        contexto.textAlign = "left";
        contexto.fillText(this.valor, this.x, this.y);
    }

}
