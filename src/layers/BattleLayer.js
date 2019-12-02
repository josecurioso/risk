class BattleLayer extends Layer {

    constructor(resultCode, climate, jugadorA, jugadorB) {
        super();
        this.resultCode = resultCode; // 1 attacker wins, 2 defender wins, 3 draw
        this.climate = climate;
        this.jugadorA = jugadorA;
        this.jugadorB = jugadorB;
        this.iniciar();
    }

    iniciar() {
        // Fondos
        switch (this.climate) {
            case "desert":
                this.fondo = new FondoSVG(imagenes.desert, 600, 320, 600, 320);
                break;
            case "tropical":
                this.fondo = new FondoSVG(imagenes.tropical, 600, 320, 600, 320);
                break;
            case "snowy":
                this.fondo = new FondoSVG(imagenes.snowy, 600, 320, 600, 320);
                break;
            case "oceanic":
                this.fondo = new FondoSVG(imagenes.forest, 600, 320, 600, 320);
                break;
        }

        // Timeout
        this.timeout = 5 * 30; // 5 segundos
    }

    startKilling() {
        console.log(this.resultCode);
        switch (this.resultCode) {
            case 1:
                this.kill(this.defenderTroops);
                break;
            case 2:
                this.kill(this.attackerTroops);
                break;
            case 3:
                this.kill(this.defenderTroops);
                this.kill(this.attackerTroops);
                break;
        }
    }

    kill(troops) {
        troops.forEach(t => {
            t.morir();
        });
    }

    setBattleTroops(attackerTroopsCount, defenderTroopsCount) {
        this.attackerTroopsCount = attackerTroopsCount;
        this.defenderTroopsCount = defenderTroopsCount;
        this.ratio = this.attackerTroopsCount / this.defenderTroopsCount;
        this.attackerTroops = [];
        this.defenderTroops = [];

        if (this.ratio >= 3) {
            this.attackerTroops = this.loadUnits(8, false, true);
            this.defenderTroops = this.loadUnits(2, true, false);
        } else if (this.ratio >= 2 && this.ratio < 3) {
            this.attackerTroops = this.loadUnits(7, false, true);
            this.defenderTroops = this.loadUnits(3, true, false);
        } else if (this.ratio > 1 && this.ratio < 2) {
            this.attackerTroops = this.loadUnits(6, false, true);
            this.defenderTroops = this.loadUnits(4, true, false);
        } else if (this.ratio === 1) {
            this.attackerTroops = this.loadUnits(5, false, true);
            this.defenderTroops = this.loadUnits(5, true, false);
        } else if (this.ratio < 1) {
            this.attackerTroops = this.loadUnits(4, false, true);
            this.defenderTroops = this.loadUnits(6, true, false);
        }
    }

    loadUnits(units, isLeft, isAtt) {
        let result = [];
        for (let i = 0; i < units; i++) {
            let x = !isLeft ? Math.floor(Math.random() * 260) + 20 : Math.floor(Math.random() * 260) + 320;
            let y = Math.floor(Math.random() * 280) + 20;
            isAtt ? result.push(new Soldado(x, y, isLeft, this.jugadorA)) : result.push(new Soldado(x, y, isLeft, this.jugadorB));
        }
        return result;
    }

    actualizar() {
        this.attackerTroops.forEach(t => {
            t.actualizar();
        });
        this.defenderTroops.forEach(t => {
            t.actualizar();
        });

        this.timeout--;
        if (this.timeout === 44) {
            this.startKilling();
        }
        if (this.timeout === 0) {
            layer = gameLayer;
        }
    }

    dibujar() {
        this.fondo.dibujar();
        this.attackerTroops.forEach(t => {
            t.dibujar();
        });
        this.defenderTroops.forEach(t => {
            t.dibujar();
        });
    }
}
