class Jugador {

    constructor(teamCode, climate) {
        this.teamCode = teamCode;
        this.climateBonus = climate;
        this.totalUnits = 0;
        this.conqueredTerritories = []; // provincias
        this.conqueredContinets = []; // continents
        this.currentProvince = null; // desde dónde atacas
        this.provinceDefended = null; // si te atacan, desde dónde defiendes
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

    setCurrentProvince(province) {
        this.currentProvince = province;
    }

    conquestProvince(province) {
        province.owner = this.teamCode;
        this.conqueredTerritories.push(province);
    }

    setProvinceDefended(province) {
        this.provinceDefended = province;
    }

    incrementUnits(units, province) {
        if (province.owner === this.teamCode) {
            this.totalUnits += units;
            province.units += units;
        } else {
            console.log("Not the owner, cannot add");
        }
    }

    substractUnits(units, province) {
        if (province.owner === this.teamCode) {
            this.totalUnits -= units;
            province.units -= units;
        } else {
            console.log("Not the owner, cannot substract");
        }
    }
}
