class Team {

    constructor(fillColor, strokeColor, code) {
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.code = code;
    }

    getStrokeColor() {
        return this.strokeColor;
    }

    getFillColor() {
        return this.fillColor;
    }
}