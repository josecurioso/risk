class GestorDeEventos {

    constructor(rutaInfo, gestorDeTextos) {
        this.rutaInfo = rutaInfo;
        this.gestorDeTextos = gestorDeTextos;
        this.negativeBonuses = new Map();
        this.positiveBonuses = new Map();
        this.farming = new Map();
    }

    loadEventsFile() {
        let ficheroI = new XMLHttpRequest();
        ficheroI.open("GET", this.rutaInfo, false);
        ficheroI.onreadystatechange = function () {
            let text = ficheroI.responseText;
            let json = JSON.parse(text);
            // console.log(json);
            this.negativeBonuses = json["negativeBonuses"];
            this.positiveBonuses = json["positiveBonuses"];
            this.farming = json["farm"];
        }.bind(this);
        ficheroI.send(null);
    }

    randomEvents(currentPlayer) {
        // Probabilidades
        let tsunamis = Math.floor(Math.random() * 101); // 5%
        let otherNegatives = Math.floor(Math.random() * 101); // 10%
        let positives = Math.floor(Math.random() * 101); // 20%
        let farming = Math.floor(Math.random() * 101); // 5%

        console.log("Probabilities: (T, " + tsunamis + ") - (N, " + otherNegatives + ") - (P, " + positives + ") - (F, " + farming + ")");

        tsunamis = 100;

        let player = currentPlayer;
        let province = player.conqueredTerritories[0]; //player.conqueredTerritories[Math.floor(Math.random() * player.conqueredTerritories.length)];
        let event = null;

        // Negative effects
        if (tsunamis >= 95 && province.hasSea) {
            event = "tsunami";
            this.triggerEvent(player, event, province);
        }
        if (otherNegatives >= 90) {
            let eventKeys = Object.keys(this.negativeBonuses);
            event = eventKeys[Math.floor(Math.random() * eventKeys.length)];
            this.triggerEvent(player, event, province);
        }

        // Positive effects
        if (positives >= 80) {
            let eventKeys = Object.keys(this.positiveBonuses);
            event = eventKeys[Math.floor(Math.random() * eventKeys.length)];
            this.triggerEvent(player, event, province);
        }
        if (farming >= 95) {
            let eventKeys = Object.keys(this.farming);
            event = eventKeys[Math.floor(Math.random() * eventKeys.length)];
            this.triggerEvent(player, event, province);
        }
    }

    triggerEvent(player, event, province) {
        // to substract/add
        let percentage = null;
        if (Object.keys(this.negativeBonuses).includes(event)) {
            percentage = Math.round(province.units * this.negativeBonuses[event][0]);

            // At least substract 1 if it has at least 2 remaining
            let msg = percentage < 1 ? (province.units > 1 ? (player.substractUnits(1, province), percentage = 1) : true) : false;
            this.gestorDeTextos.writeTurnAction(player, event.toUpperCase() + " - IN PROVINCE: " + province.code + " (-" + percentage + "u)");

            // Minimum one unit warning
            msg ? this.gestorDeTextos.writeTurnAction(player, "Only one unit survives!") : null;
            player.substractUnits(Math.round(province.units * this.negativeBonuses[event][0]), province);
        } else if (Object.keys(this.positiveBonuses).includes(event)) {
            percentage = Math.round(province.units * this.positiveBonuses[event][0]);

            // At least add 1
            percentage < 1 ? (player.incrementUnits(1, province), percentage = 1) : null;
            this.gestorDeTextos.writeTurnAction(player, event.toUpperCase() + " - IN PROVINCE: " + province.code + " (+" + percentage + "u)");
            player.incrementUnits(Math.round(province.units * this.positiveBonuses[event][0]), province);
        } else if (Object.keys(this.farming).includes(event)) {
            if (!province.hasFarm[0]) {
                console.log("Farm set");
                province.hasFarm[0] = true;
                province.hasFarm[1] = event;
                province.hasFarm[2] = this.farming[event];
                province.locateFarm();
            } else {
                console.log("There is already a farm");
            }
        } else {
            console.log("No event defined");
        }
    }
}
