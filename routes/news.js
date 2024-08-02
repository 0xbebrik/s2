const Router = require("express")
const router = new Router()
const NewsController = require("../Controllers/NewsController")

router.get("/", NewsController.all)
router.post("/", NewsController.create)
router.get("/:id", NewsController.getOne)
router.delete("/:id", NewsController.delete)
router.post("/search", NewsController.search)
router.post("/change_visibility", NewsController.changeVisibility)
module.exports = router