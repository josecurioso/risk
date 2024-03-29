class GestorDeTerritorios {

    constructor(provincias) {
        this.provincias = provincias;
        this.currentPlayer = null;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    setCurrentPlayer(player) {
        this.currentPlayer = player;
    }

    /*
   This method checks:
       * Provinces are connected
       * Province A belongs to current player
       * Province B does NOT belong to current player
   */
    validateAttack(provinceA, provinceB) {
        return (this.provincesConnectedByGround(provinceA, provinceB) || this.provincesConnectedBySea(provinceA, provinceB)) && this.currentPlayerHasProvince(provinceA) && !this.currentPlayerHasProvince(provinceB);
    }

    /*
    This method checks:
        * Provinces are connected
        * Province A belongs to current player
        * Province B also belongs to current player
    */
    validateMove(provinceA, provinceB) {
        return (this.provincesConnectedByGround(provinceA, provinceB) || this.provincesConnectedBySea(provinceA, provinceB)) && this.currentPlayerHasProvince(provinceA) && this.currentPlayerHasProvince(provinceB);
    }

    currentPlayerHasProvince(province) {
        let result = false;
        if (province !== null) {
            this.getCurrentPlayer().conqueredTerritories.forEach(p => {
                if (p.code === province.code) {
                    result = true;
                }
            });
        }
        return result;
    }

    provincesConnectedByGround(provinceA, provinceB) {
        let result1 = false;
        let result2 = false;
        provinceA.getAdjacentProvincesByGround().forEach(p => {
            if (p === provinceB.code) {
                result1 = true;
            }
        });
        provinceB.getAdjacentProvincesByGround().forEach(p => {
            if (p === provinceA.code) {
                result2 = true;
            }
        });
        return result1 && result2;
    }

    provincesConnectedBySea(provinceA, provinceB) {
        let result1 = false;
        let result2 = false;
        provinceA.getAdjacentProvincesBySea().forEach(p => {
            if (p === provinceB.code) {
                result1 = true;
            }
        });
        provinceB.getAdjacentProvincesBySea().forEach(p => {
            if (p === provinceA.code) {
                result2 = true;
            }
        });
        return result1 && result2;
    }

    getProvincesForCodes(codes) {
        let result = [];
        for (let key in provincias) {
            if (provincias.hasOwnProperty(key)) {
                codes.forEach(code => {
                    if (key === code) {
                        result.push(provincias[key]);
                    }
                });
            }
        }
        return result;
    }
}
