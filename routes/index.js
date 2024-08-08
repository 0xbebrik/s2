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
const isAuth = require('../middleware/isAuth')
const {Settings} = require("../models/models");
router.use("/user", userRouter)
router.use("/news", newsRouter)
router.use("/reviews", reviewsRouter)
router.use("/calculator", calculatorRouter)
router.use("/tickets", ticketRouter)
router.use("/admin", adminRouter)
router.use("/statistics", statistics)
router.get("/bestpairs", bestPairsController.getBestPairs)
router.get("/tp", async (req, res) => {
    const value = await Settings.findOne({where: {name: "tp"}})
    res.json({value: JSON.parse(value.value)})
})

router.get("/settings", async (req, res) => {
    const tg = await Settings.findOne({where: {name: "tg"}})
    const email = await Settings.findOne({where: {name: "email"}})
    res.json({data: {tg: tg.value, email: email.value}})
})



module.exports = router