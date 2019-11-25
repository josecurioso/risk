class GestorDeEventos {

    constructor(provincias, gestorDeTurnos, rutaInfo) {
        this.provincias = provincias;
        this.gestorDeTurnos = gestorDeTurnos;
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
            for (let key in json["negativeBonuses"]) {
                if (json["negativeBonuses"].hasOwnProperty(key)) {
                    this.negativeBonuses.set(key, json["negativeBonuses"][key]);
                }
            }
            for (let key in json["positiveBonuses"]) {
                if (json["positiveBonuses"].hasOwnProperty(key)) {
                    this.positiveBonuses.set(key, json["positiveBonuses"][key]);
                }
            }
            for (let key in json["farm"]) {
                if (json["farm"].hasOwnProperty(key)) {
                    this.farming.set(key, json["farm"][key]);
                }
            }
        }.bind(this);
        ficheroI.send(null);
    }

    randomEvents() {
        let tsunamis = Math.floor(Math.random() * 101);
        let otherNegatives = Math.floor(Math.random() * 101);
        let positives = Math.floor(Math.random() * 101);
        let farming = Math.floor(Math.random() * 101);

        let player = this.gestorDeTurnos.getCurrentPlayer();
        let provinceCode = player.conqueredTerritories[Math.floor(Math.random() * player.conqueredTerritories.length)];
        let province = this.provincias[provinceCode];
        let event = null;

        if(tsunamis >= 95) {
            if(province.hasSea) {
                this.triggerEvent(player, "tsunami", province);
            }
        } else if (otherNegatives >= 90) {
            let arr = Array.from(this.negativeBonuses);
            event = arr[Math.floor(Math.random() * arr.length)];
            this.triggerEvent(player, event, province);
        } else if (positives >= 80) {
            let arr = Array.from(this.positiveBonuses);
            event = arr[Math.floor(Math.random() * arr.length)];
            this.triggerEvent(player, event, province);
        } else if (farming >= 95) {
            let arr = Array.from(this.farming);
            event = arr[Math.floor(Math.random() * arr.length)];
            this.triggerEvent(player, event, province);
        }
    }

    triggerEvent(player, event, province) {
        console.log("Lanzando evento aleatorio (" + event + ") para... " + player.code);
        if(this.negativeBonuses.has(event)) {
            player.substractUnits(province.units - province.units * this.negativeBonuses[event][0], province);
        } else if (this.positiveBonuses.has(event)) {
            player.incrementUnits(province.units + province.units * this.negativeBonuses[event][0], province);
        } else if(this.farming.has(event)) {
            if(!province.hasFarm[0]) {
                province.hasFarm = [true, this.farming[event]];
                province.locateFarm();
            } else {
                console.log("There is already a farm");
            }
        } else {
            console.log("No event defined");
        }
    }
}
