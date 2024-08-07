const Router = require("express")
const router = new Router()
const TicketsController = require("../Controllers/TicketsController")
const MessagesController = require("../Controllers/MessagesController")
const isAuth = require('../middleware/isAuth')

router.post("/admin/messages/create", MessagesController.createMessage)
router.post("/messages/create", MessagesController.createMessage)
router.get("/getMy", isAuth, TicketsController.getMyTickets)
router.get("/messages/", MessagesController.getMessages)
router.post("/create", isAuth, TicketsController.createTicket)
router.get("/", TicketsController.getTickets)
router.get("/:id", TicketsController.getTicket)
router.post("/next_step", TicketsController.nextStep)


module.exports = router