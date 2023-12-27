const http = require("http")
const EventsManager = require("./data/fs/events.manager.js")

const events = new EventsManager("./data/fs/events.json")
events.createEvent({name: "fnaf", place: "showcase"})

const server = http.createServer()

const PORT = 8080
const ready = () =>console.log("Servidor listo en "+PORT)

server.listen(PORT, ready)