const Router = require("express")
const router = new Router()
const statisticsController = require("../Controllers/statiscticsController")

router.get("/", statisticsController.main)

module.exports = router