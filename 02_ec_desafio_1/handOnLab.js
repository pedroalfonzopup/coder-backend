class EventManager {
    // Propiedad Estatica
    static events = []

    // Propiedades Privadas
    static #perGain = 0.3
    static #totalGain = 0

    constructor(data) {
        this.id = EventManager.events.length === 0 ? 1 : EventManager.events[EventManager.events.length-1].id+1
        this.name = data.name
        this.price = data.price || 10
        this.capacity = data.capacity || 50
        this.date = data.date || new Date()
        EventManager.events.push(this)
    }
    create(data) {
        const event = {
            id: EventManager.events.length === 0 ? 1 : EventManager.events[EventManager.events.length-1].id+1,
            name: data.name,
            price: data.price || 10,
            capacity: data.capacity || 50,
            date: data.date || new Date()
        }
        EventManager.events.push(event)
    }
    read() {
        return EventManager.events
    }
    readById(id) {
        return EventManager.events.find((each) => each.id === Number(id))
    }
    soldTicket(quantity, eventId) {
        const event = this.readById(eventId) //Guardo el evento A modificar
        event.capacity = event.capacity - quantity
        // Sumo la cantidad por el precio de cada ticket y multiplicarlo por la ganancia de cada ticket
        EventManager.#totalGain = EventManager.#totalGain + quantity*event.price*EventManager.#perGain
        return true
    }
    getGain() {
        return EventManager.#totalGain
    }
}





const events = new EventManager({
    name: "Five Night's at Freddy's",
    place: "showcase"
})
Events.create({
    name: "Lord of the Rings",
    place: "showcase"
})
Events.create({
    name: "Barbie",
    place: "showcase"
})
Events.create({
    name: "The Block",
    place: "showcase"
})

console.log(EventManager.events)
events.soldTicket(3, 1)
events.soldTicket(8, 2)

console.log(events.read(2))

console.log(events.getGain())