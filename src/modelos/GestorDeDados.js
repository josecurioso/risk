class GestorDeDados {

    constructor() {
    }

    throwDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    play(dicesAttacker, dicesDefender) {
        let throwsAttacker = [0,0,0];
        let throwsDefender = [0,0];
        let result = [0,0]; // (units lost) pos 0: attacker, pos 1: defender

        for(let i = 0; i < dicesAttacker; i++) {
            throwsAttacker[i] = this.throwDice();
        }
        throwsAttacker.sort();

        for(let i = 0; i < dicesDefender; i++) {
            throwsDefender[i] = this.throwDice();
        }
        throwsDefender.sort();

        for(let j = 0; j < dicesDefender; j++) {
            if(throwsDefender[j] >= throwsAttacker[j]) {
                result[0] += 1;
            } else {
                result[1] += 1;
            }
        }
        return result;
    }
}
