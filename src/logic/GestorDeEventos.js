class GestorDeEventos {

    constructor(rutaInfo) {
        this.rutaInfo = rutaInfo;
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
        // Muestreo estocástico
        let tsunamis = Math.floor(Math.random() * 101);
        let otherNegatives = Math.floor(Math.random() * 101);
        let positives = Math.floor(Math.random() * 101);
        let farming = Math.floor(Math.random() * 101);


        let player = currentPlayer;
        let randomProvinceCode = player.conqueredTerritories[Math.floor(Math.random() * player.conqueredTerritories.length)];
        //let province = provincias["A"];
        let province = provincias[randomProvinceCode];
        let event = null;

        if(tsunamis >= 95 && province.hasSea) {
            let event = this.negativeBonuses["tsunami"];
            this.triggerEvent(player, event, province, "tsunami");
        }else if (otherNegatives >= 90) {
            let selectedEventKey = Object.keys(this.negativeBonuses)[1+Math.floor(Math.random() * (Object.keys(this.negativeBonuses).length-1))];
            event = this.negativeBonuses[selectedEventKey];
            this.triggerEvent(player, event, province, selectedEventKey);
        }
        if (positives >= 80) {
            let selectedEventKey = Object.keys(this.positiveBonuses)[Math.floor(Math.random() * (Object.keys(this.positiveBonuses).length-1))];
                event = this.positiveBonuses[selectedEventKey];
            this.triggerEvent(player, event, province, selectedEventKey);
        }
        if (farming >= 0) {
            let selectedEventKey = Object.keys(this.farming)[Math.floor(Math.random() * (Object.keys(this.farming).length))];
                event = this.farming[selectedEventKey];
            this.triggerEvent(player, event, province, selectedEventKey);
        }
    }

    triggerEvent(player, event, province, eventKey) {
        console.log("Lanzando evento aleatorio (" + event + ") para... " + player.teamCode);
        if(Object.keys(this.negativeBonuses).includes(eventKey)) {
            player.substractUnits(province.units * event[0], province);
        } else if (Object.keys(this.positiveBonuses).includes(eventKey)) {
            player.incrementUnits(province.units * event[0], province);
        } else if(Object.keys(this.farming).includes(eventKey)) {
            if(!province.hasFarm[0]) {
                console.log("Farm set");
                province.hasFarm[0] = true;
                province.hasFarm[1] = event;
                province.locateFarm();
            } else {
                console.log("There is already a farm");
            }
        } else {
            console.log("No event defined");
        }
    }
}
