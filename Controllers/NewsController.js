const {News} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Op} = require("sequelize")

class UserController {
    async all(req, res){
        const news = await News.findAll({order: [['createdAt', 'ASC']]});
        return res.json({success:true, news: news.reverse()})

    }

    async create(req, res){
        const {title, content, image} = req.body
        const news = await News.create({title, content, image})
        return res.json({success:true, news: news})
    }

    async delete(req, res) {
        const {id} = req.params
        console.log(id)
        var news = await News.destroy({where: {id}})
        var newss = await News.findAll({
            attributes: ['image', 'title', 'createdAt', 'id']
        })
        return res.json({success:true, news: newss})
    }
    async search(req, res) {
        const searchh = req.body.search
        if (searchh !== undefined) {
            var news = await News.findAll({
                where: {
                    [Op.or]: [
                        {title: {[Op.like]: `%${searchh}%`}},
                        {content: {[Op.like]: `%${searchh}%`}}
                    ]
                }
            })
        }else{
            var news = await News.findAll({
                order: [['createdAt', 'DESC']]
            })
        }
        return res.json({success:true, news: news.reverse(), se: searchh})
    }
    async changeVisibility(req, res) {
        const {id, value} = req.body
        var news = await News.update({hidden: value}, {where: {id}})
        return res.json({success:true})
    }

    async getOne(req, res) {
        const {id} = req.params
        var news = await News.findOne({where: {id}})
        var lastNews = await News.findAll({
            limit: 6,
            attributes: ['title', 'createdAt', 'id'],
            order: [['createdAt', 'DESC']],
        })
        return res.json({success:true, news: news, last: lastNews})
    }
}

module.exports = new UserController()