const Router = require("express")
const router = new Router()
const ReviewController = require("../Controllers/ReviewsController")

router.get("/", ReviewController.all)
router.post("/", ReviewController.add)

module.exports = router