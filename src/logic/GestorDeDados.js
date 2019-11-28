class GestorDeDados {

    constructor() {
    }

    throwDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    play(dicesAttacker, dicesDefender, bonusAttacker, bonusDefender) {
        let throwsAttacker = [0, 0, 0];
        let throwsDefender = [0, 0];
        let result = [0, 0]; // (units lost) pos 0: attacker, pos 1: defender

        console.log("Num dices (ATTK, DEF): " + "(" + dicesAttacker + ", " + dicesDefender + ")");

        function comp(a, b) {
            return a - b;
        }

        for (let i = 0; i < dicesAttacker; i++) {
            throwsAttacker[i] = this.throwDice();
            if (bonusAttacker !== 0) {
                throwsAttacker[i] += bonusAttacker;
            }
        }
        throwsAttacker = throwsAttacker.sort(comp);
        console.log("THR-ATTK: " + throwsAttacker);

        for (let i = 0; i < dicesDefender; i++) {
            throwsDefender[i] = this.throwDice();
            if (bonusDefender !== 0) {
                throwsDefender[i] += bonusDefender;
            }
        }
        throwsDefender = throwsDefender.sort(comp);
        console.log("THR-DEF: " + throwsDefender);

        for (let j = 0; j < dicesDefender; j++) {
            if (throwsDefender[j] >= throwsAttacker[j]) {
                result[0] += 1;
            } else {
                result[1] += 1;
            }
        }
        console.log("To substract (ATTK, DEF): " + result);
        return result;
    }
}
