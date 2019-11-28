class Jugador {

    constructor(teamCode, smallTeamCode, strokeColor, fillColor, climate) {
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
    }

    calculateTotalPoints() {
        let points = 0;
        this.conqueredTerritories.forEach(t => points++);
        this.conqueredContinets.forEach(c => points += c.bonus);
        return points;
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
