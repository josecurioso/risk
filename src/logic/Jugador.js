class Jugador {

    constructor(teamCode, smallTeamCode, strokeColor, fillColor, climate, fondoBoton, soldado_izquierda, soldado_derecha, dispararIzquierda, derrotaIzquierda, dispararDerecha, derrotaDerecha) {
        this.teamCode = teamCode;
        this.smallTeamCode = smallTeamCode;
        this.climateBonus = climate;
        this.totalUnits = 0;
        this.conqueredTerritories = []; // provincias
        this.conqueredContinets = []; // continents
        this.currentProvince = null; // desde dónde atacas
        this.provinceDefended = null; // si te atacan, desde dónde defiendes
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.fondoBoton = new FondoSVG(fondoBoton, 600 * 0.725, 320 * 0.965, 36, 36);
        this.soldado_izquierda = soldado_izquierda;
        this.soldado_derecha = soldado_derecha;
        this.dispararIzquierda = dispararIzquierda;
        this.derrotaIzquierda = derrotaIzquierda;
        this.dispararDerecha = dispararDerecha;
        this.derrotaDerecha = derrotaDerecha;
    }

    calculateTotalPoints() {
        let points = 0;
        this.conqueredTerritories.forEach(t => points++);
        this.conqueredContinets.forEach(c => points += c.bonus);
        return points;
    }

    dibujarFondoBoton(boton) {
        this.fondoBoton.x = boton.x;
        this.fondoBoton.y = boton.y;
        this.fondoBoton.dibujar();
    }

    getConqueredTerritoriesCount() {
        return this.conqueredTerritories.length;
    }

    lossProvince(province) {
        province.owner = null;
        for (let i = 0; i < this.conqueredTerritories.length; i++) {
            if (province.code === this.conqueredTerritories[i].code) {
                this.conqueredTerritories.splice(i, 1);
            }
        }
    }

    conquestProvince(province) {
        province.owner = this;
        this.conqueredTerritories.push(province);
    }

    incrementUnits(units, province) {
        if (province.owner.teamCode === this.teamCode) {
            this.totalUnits += units;
            province.setUnits(province.units + units);
        } else {
            console.log("Not the owner, cannot add");
        }
    }

    substractUnits(units, province) {
        if (province.owner.teamCode === this.teamCode) {
            this.totalUnits -= units;
            province.setUnits(province.units - units);
        } else {
            console.log("Not the owner, cannot substract");
        }
    }
}
