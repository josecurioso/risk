class BattleLayer extends Layer {

    constructor(resultCode) {
        super();
        this.iniciar();
        this.resultCode = resultCode; // 1 attacker wins, 2 defender wins, 3 draw
    }

    iniciar() {
        // Fondos
        this.fondo = new Fondo(imagenes.fondo_mar, 0, 0);

        // Timeout
        this.timeout = 4 * 30; // 4 segundos
    }

    startKilling() {
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
            this.attackerTroops = this.loadUnits(8, false);
            this.defenderTroops = this.loadUnits(2, true);
        } else if (this.ratio >= 2 && this.ratio < 3) {
            this.attackerTroops = this.loadUnits(7, false);
            this.defenderTroops = this.loadUnits(3, true);
        } else if (this.ratio > 1 && this.ratio < 2) {
            this.attackerTroops = this.loadUnits(6, false);
            this.defenderTroops = this.loadUnits(4, true);
        } else if (this.ratio === 1) {
            this.attackerTroops = this.loadUnits(5, false);
            this.defenderTroops = this.loadUnits(5, true);
        } else if (this.ratio < 1) {
            this.attackerTroops = this.loadUnits(4, false);
            this.defenderTroops = this.loadUnits(6, true);
        }
    }

    loadUnits(units, isLeft) {
        let result = [];
        for (let i = 0; i < units; i++) {
            let x = !isLeft ? Math.floor(Math.random() * 260) + 20 : Math.floor(Math.random() * 260) + 320;
            let y = Math.floor(Math.random() * 280) + 20;
            result.push(new Soldado(x, y, isLeft));
        }
        return result;
    }

    actualizar() {
        this.timeout--;
        this.attackerTroops.forEach(t => {
            t.actualizar();
        });
        this.defenderTroops.forEach(t => {
            t.actualizar();
        });
        if (this.timeout === 10) {
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
