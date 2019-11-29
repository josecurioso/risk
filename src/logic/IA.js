class IA {

    constructor() {
        this.playerIA = new Jugador("IA", "IA", colores[5].strokeColor, colores[5].fillColor, climates[Math.floor(Math.random() * climates.length)]);
        this.gestorDeTerritorios = null;
        this.gestorDeTurnos = null;
    }

    // Decide wheter the IA attacks other player or recolocates troops
    attackOrMoveTroops() {
        this.placeBonus();
        let attackP = Math.floor(Math.random() * 100);
        if (attackP >= 75) {
            this.attack();
        } else {
            let num = Math.floor(Math.random() * 10) + 1;
            while(num>0) {
                this.moveTroops();
                num--;
            }
            this.gestorDeTurnos.changePlayer();
        }
    }

    placeBonus() {
        let provinces = this.playerIA.conqueredTerritories;
        let rdP = provinces[Math.floor(Math.random() * provinces.length)];
        this.gestorDeTurnos.placeBonusUnits(rdP);
    }

    attack() {
        let provinces = this.playerIA.conqueredTerritories;
        let possibleAttack = [false, "", ""]; // si se puede o no atacar, la provincia desde, la provincia hasta
        let tries = 5;

        while (tries >= 0) {
            let rdP = provinces[Math.floor(Math.random() * provinces.length)];
            let totalAdjacentProvinces = rdP.getAdjacentProvincesByGround().concat(rdP.getAdjacentProvincesBySea());
            totalAdjacentProvinces = this.gestorDeTerritorios.getProvincesForCodes(totalAdjacentProvinces);
            for (let i = 0; i < totalAdjacentProvinces.length; i++) {
                if (totalAdjacentProvinces[i].owner.teamCode !== this.playerIA.teamCode) {
                    possibleAttack = [true, rdP, totalAdjacentProvinces[i]];
                    break;
                }
            }
            tries--;
        }
        if (possibleAttack[0]) {
            let result = 2;
            while (result === 2) {
                result = this.gestorDeTurnos.attack(possibleAttack[1], possibleAttack[2], possibleAttack[1].units - 1);
            }
            this.gestorDeTurnos.changePlayer();
        }
    }

    moveTroops() {
        let provinces = this.playerIA.conqueredTerritories;
        let possibleMove = [false, "", ""]; // si se puede o no mover, la provincia desde, la provincia hasta
        let tries = 5;

        while (tries >= 0) {
            let rdP = provinces[Math.floor(Math.random() * provinces.length)];
            let totalAdjacentProvinces = rdP.getAdjacentProvincesByGround().concat(rdP.getAdjacentProvincesBySea());
            totalAdjacentProvinces = this.gestorDeTerritorios.getProvincesForCodes(totalAdjacentProvinces);
            for (let i = 0; i < totalAdjacentProvinces.length; i++) {
                if (totalAdjacentProvinces[i].owner.teamCode === this.playerIA.teamCode) {
                    possibleMove = [true, rdP, totalAdjacentProvinces[i]];
                    break;
                }
            }
            tries--;
        }
        if (possibleMove[0]) {
            this.gestorDeTurnos.move(possibleMove[1], possibleMove[2], Math.floor(possibleMove[1].units / 2));
        }
    }
}
