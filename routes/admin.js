const Router = require("express")
const router = new Router()
const adminController = require("../Controllers/adminController")

router.get("/stat", adminController.stat)
router.get("/requisites", adminController.requisites)
router.post("/requisites/create", adminController.createRequisites)
router.post("/requisites/edit", adminController.editRequisites)
router.post("/requisites/delete", adminController.deleteRequisites)
router.post("/reviews/create", adminController.addReview)
router.post("/reviews/edit", adminController.editReview)
router.post("/reviews/delete", adminController.deleteReview)
router.post("/messages/send", adminController.createMessage)
router.post("/messages", adminController.getAdminMessages)
router.post("/bestpairs/create", adminController.createBestPairs)
router.post("/bestpairs/edit", adminController.editBestPairs)
router.post("/user/alert", adminController.sendAlertToUser)
router.post("/bestpairs/delete", adminController.deleteBestPairs)

router.post("/vaults/create", adminController.createVault)

router.post("/step", adminController.setStep)

router.post("/user/delete", adminController.deleteUser)
router.post("/user/block", adminController.blockUser)
router.post("/user/worker", adminController.setWorker)

router.post("/chat_settings", adminController.saveSettings)

router.get("/settings", adminController.getSettings)

router.get("/chats", adminController.getChats)
router.get("/vaults", adminController.vaults)
router.post("/subscription", adminController.subscription)
router.get("/requests", adminController.requests)
router.post("/courses/save", adminController.saveCourses)
router.post("/requests/send", adminController.send)
router.post("/excludes/edit", adminController.editExcludes)
router.post("/excludes/create", adminController.createExclude)
router.delete("/excludes/delete/", adminController.deleteExclude)
router.post("/courses/update", adminController.update)
router.post("/vaults/edit", adminController.editVaults)
router.post("/vaults/delete", adminController.deleteVault)



module.exports = router