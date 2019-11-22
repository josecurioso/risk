class Jugador {

    constructor(teamCode) {
        this.teamCode = teamCode;
        this.valueOneUnits = [];
        this.valueThreeUnits = [];
        this.valueFiveUnits = [];
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
        if(province.owner === this.teamCode) {
            this.totalUnits += units;
            province.units += units;
        } else {
            console.log("Not the owner, cannot add");
        }
    }

    substractUnits(units, province) {
        if(province.owner === this.teamCode) {
            this.totalUnits -= units;
            province.units -= units;
        } else {
            console.log("Not the owner, cannot substract");
        }

        // this.totalUnits -= units;
        // for (let i = 0; i < this.valueOneUnits.length; i++) {
        //     if (this.valueOneUnits[i].province === province) {
        //         if (units > 0) {
        //             i = i - 1;
        //             this.valueOneUnits.splice(i, 1);
        //             units--;
        //         } else {
        //             break;
        //         }
        //     }
        // }
        // if (units > 0) {
        //     for (let i = 0; i < this.valueThreeUnits.length; i++) {
        //         if (this.valueThreeUnits[i].province === province) {
        //             if (units > 0) {
        //                 i = i - 1;
        //                 this.valueThreeUnits.splice(i, 1);
        //                 units -= 3;
        //             } else {
        //                 break;
        //             }
        //         }
        //     }
        // }
        // if (units > 0) {
        //     for (let i = 0; i < this.valueFiveUnits.length; i++) {
        //         if (this.valueFiveUnits[i].province === province) {
        //             if (units > 0) {
        //                 i = i - 1;
        //                 this.valueFiveUnits.splice(i, 1);
        //                 units -= 5;
        //             } else {
        //                 break;
        //             }
        //         }
        //     }
        // }
    }
}
