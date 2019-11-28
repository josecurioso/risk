class GestorDeUnidades {

    constructor(totalProvincias, minUnits) {
        this.totalProvincias = totalProvincias;
        this.unitsRatioMap = this.calculateRatioOfUnitsPerAmmountOfProvincias(minUnits);
    }

    calculateRatioOfUnitsPerAmmountOfProvincias(minUnits) {
        let unitsRatioMap = new Map();
        let max = this.totalProvincias;
        let min = Math.round(this.totalProvincias / 4);
        let step = 0;
        for (let i = 0; i < max; i++) {
            if (i <= min) {
                unitsRatioMap.set(i, minUnits);
            } else {
                if (step >= 2) {
                    step = 0;
                    minUnits++;
                }
                step++;
                unitsRatioMap.set(i, minUnits);
            }
        }
        return unitsRatioMap;
    }

    calculateUnitsToBeAdded(playerTerritories) {
        return this.unitsRatioMap.get(playerTerritories);
    }
}
