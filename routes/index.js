const Router = require("express")
const router = new Router()
const userRouter = require("./user")
const newsRouter = require("./news")
const reviewsRouter = require("./reviews")
const calculatorRouter = require("./calculator")
const ticketRouter = require("./tickets")
const bestPairsController = require("../Controllers/bestpairsController")
const adminRouter = require("./admin")
const statistics = require("./statistics")
router.use("/user", userRouter)
router.use("/news", newsRouter)
router.use("/reviews", reviewsRouter)
router.use("/calculator", calculatorRouter)
router.use("/tickets", ticketRouter)
router.use("/admin", adminRouter)
router.use("/statistics", statistics)
router.get("/bestpairs", bestPairsController.getBestPairs)



module.exports = router