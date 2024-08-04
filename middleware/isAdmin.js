const jwt = require("jsonwebtoken");
const {User} = require("../models/models");
module.exports = function (req, res, next) {

    let verify
    console.log(req.headers.authorization)
    try {
        verify = jwt.verify(req.headers.authorization.split(' ')[1], "secret123")
    }catch {
        return res.status(401)
    }

    User.findOne({where: {id: verify.id, role: "admin"}}).then(user => {
        if (user) {
            next()
        } else {
            return res.status(401)
        }
    })
}