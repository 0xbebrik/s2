const {verify} = require("jsonwebtoken");
module.exports = function (req, res, next) {
    if (req.method == "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(200).json({success: false, message: "Не авторизован"})
        }
        const decoded = verify(token,'secret123')
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({success: false, message: "Не авторизован"})
    }
}