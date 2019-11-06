class Jugador {

    constructor(teamCode) {
        this.teamCode = teamCode;
        this.valueOneUnits = [];
        this.valueThreeUnits = [];
        this.valueFiveUnits = [];
        this.totalUnits = 0;
        this.conqueredTerritories = []; // provincias
        this.conqueredContinets = []; // continents
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
}
