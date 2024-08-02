const {Review, Visits} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    async main(req, res) {
        Visits.create({
            ip: req.ip,
            url: req.originalUrl,
            ref: req.cookies?.ref || " "
        }).then(() => {
            res.send("ok")
        })
    }
}

module.exports = new UserController()