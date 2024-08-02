const {Review} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    async all(req, res) {
        var reviews = await Review.findAll()
        return res.json({
            success: true,
            data: reviews.reverse()
        })
    }
    async add(req, res) {
        const {username, content, platform} = req.body
        const review = await Review.create({username, content, platform})
        return res.json({
            success: true,
        })
    }
    async check(req, res) {

    }
}

module.exports = new UserController()