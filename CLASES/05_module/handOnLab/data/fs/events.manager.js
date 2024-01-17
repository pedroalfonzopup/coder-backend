const fs = require("fs")
const crypto = require("crypto")


class EventsManager {
    static #perGain = 0.3
    static #totalGain = 0
    init() {
        const exist = fs.existsSync("./data/fs/events.json")
        //ES SICRONO PORQUE ESTO DEBE SUCEDER SI O SI PRIMERO
        console.log(exist)
        if(!exist) {
            const path = "./data/fs/events.json"
            const data = JSON.stringify([])
            fs.writeFileSync(path, data)
        }
    }
    constructor() {
        this.init()
    }
    async createEvent(data) {
        try {
            const event = {
                id: crypto.randomBytes(12).toString("hex"),
                name: data.name,
                place: data.place,
                price: data.price || 10,
                capacity: data.capacity || 50,
                date: data.date || new Date()
            } 
            //console.log(event)

            const eventsFile = JSON.parse( await fs.promises.readFile( "./data/fs/events.json","utf-8"))
            eventsFile.push(event)
            const eventsJson = JSON.stringify(eventsFile, null, 2)

            await fs.promises.writeFile("./data/fs/events.json", eventsJson,)
            return event.id

        } catch (error) {
            return error.message
        }
    }
}


module.exports = EventsManager