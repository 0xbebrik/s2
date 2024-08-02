const Router = require("express")
const router = new Router()
const calculatorController = require("../Controllers/calculatorController")

router.get("/all", calculatorController.all)
router.post("/pair", calculatorController.pair)
router.get("/all/admin", calculatorController.allAdmin)
router.get("/excludes", calculatorController.getExcludes)

module.exports = router