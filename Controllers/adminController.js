const {Statistics, currency, Requisite, Ticket, ExchangeRate, Review, bestPair, Chats, Messages, User, Visits, Invite} = require("../models/models")
const {Op, Sequelize, literal, fn, col} = require("sequelize");
const valuta = require("../valuta.json")
let config = require("../config.json")
const fs = require("fs");
const {query} = require("express");
const xml2js = require('xml2js');
const webpush = require("web-push");
const sequelize = require("../db");



const VAPID = {
    publicKey: "BFNR9RQ7tcWMQxUOsChorckfUT3ghkctLEalE7tbBTyFD-zC20WjVXVb-3_H7GKIVKRLJ6itQ-3fQpBnRBzAySg",
    privateKey: "GYcMgxxyH_Hghz5z60KqibjZaO6iPNR3Hzt0fcXK2dw"
}

webpush.setVapidDetails(
    "mailto: antoshienok08@gmail.com",
    VAPID.publicKey,
    VAPID.privateKey
)






const update = () => {
    fs.writeFile("config.json", JSON.stringify(config, null, 2), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}

class bestpairsController {


    async stat(req, res) {
        const startDate = 1721836019000
        const endDate = new Date()


        var data = [
        ];

        let currentDate = new Date(startDate);
        const end = new Date(endDate);
        let resultt

        for (let i = 0; currentDate <= end; i++) {
            const no = currentDate.setHours(0,0,0,0)
            const to = new Date(currentDate).setHours(23,59,59,999)
            const visits = await Visits.findAll({
                attributes: [
                    'ip',
                    [sequelize.fn('COUNT', sequelize.col('ip')), 'count'],
                    [sequelize.fn('MIN', sequelize.col('createdAt')), 'firstVisit']
                ],
                group: ['ip'],
                where: {
                    createdAt: {
                        [Op.between]: [no, to]
                    }
                }
            })

            const users = await User.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [no, to]
                    }
                }
            })

            const tickets = await Ticket.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [no, to]
                    }
                }
            })
            resultt = {
                name: currentDate.toLocaleDateString(),
                visits: visits.length,
                regitrations: users.length,
                tickets: tickets.length
            }
            data.push(resultt)
            currentDate.setDate(currentDate.getDate() + 1);
        }




        return res.json({success: true, data: data})
    }
    // async stat(req, res) {
    //     const startDate = 1721748987 // Начальная дата периода
    //     const endDate = 1722364587 // Конечная дата периода
    //
    //     if (!startDate || !endDate) {
    //         return res.status(400).json({ error: 'startDate and endDate are required' });
    //     }
    //
    //     // Создаем временной ряд дат
    //     const dates = [];
    //
    // }

    async vaults(req, res) {
        res.json({ data: valuta, settings: config});
    }

    async requisites(req, res) {
        const data = await Requisite.findAll()
        const currencies = await currency.findAll()
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < currencies.length; j++) {
                if (data[i].currency === currencies[j].id) {
                    data[i].currency = currencies[j]
                }
            }
        }
        return res.json({data: data})
    }

    async createRequisites(req, res) {
        const {currency, wallet, active} = req.body
        const data = await Requisite.create({currency, wallet, active})
        return res.json({data: data})
    }

    async editRequisites(req, res) {
        const {id, currency, wallet, active} = req.body
        const data = await Requisite.update({currency, wallet, active}, {where: {id}})
        return res.json({data: data})
    }

    async deleteRequisites(req, res) {
        const {id} = req.body
        const data = await Requisite.destroy({where: {id}})
        return res.json({data: data})
    }

    async requests(req, res){
        const data = await Ticket.findAll()
        const currencies = await currency.findAll()
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < currencies.length; j++) {
                if (data[i].from_currency === currencies[j].id) {
                    data[i].from_currency = currencies[j]
                }
                if (data[i].to_currency === currencies[j].id) {
                    data[i].to_currency = currencies[j]
                }
            }
        }
        return res.json({data: data})
    }

    async send(req,res){
        const {id, wallet, timer_end} = req.body
        const data = await Ticket.update({wallet: wallet, requested: false, timer_end: (new Date(timer_end))}, {where: {id}})
        return res.json({data: data})
    }
    async saveCourses(req, res) {
        config.use_Excludes = req.body.use_Excludes
        update()
        return res.json({success: true})
    }

    async editExcludes(req, res){
        const {id, from, to, rate} = req.body
        const data = await ExchangeRate.update({from_currency: from, to_currency: to, rate: rate}, {where: {id}})
        return res.json({data: data})
    }

    async editVaults(req, res) {
        const value = req.body
        const data = await currency.update({...value}, {where: {id: value.id}})
        return res.json({data: data})
    }

    async createVault(req, res) {
        const {FullName, Icon, Type, Currency, reserv, min, max, input} = req.body
        const data = await currency.create({FullName, Icon, Type, Currency, reserv, min, max, input})
        return res.json({data: data})
    }

    async createExclude(req, res) {
        const {from, to, rate} = req.body
        const data = await ExchangeRate.create({from_currency: from, to_currency: to, rate: rate})
        return res.json({data: data})
    }
    async deleteExclude(req, res) {
        const id = req.query.id
        const data = await ExchangeRate.destroy({where: {id}})
        return res.json({data: data})
    }
    async update(req, res) {
        config.last_update = Date.now()
        update()
        fs.readFile("./valuta.xml", 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            xml2js.parseString(data, (err, result) => {
                return res.json({data: result})
            })
        })
    }

    async addReview(req, res) {
        const {username, platform, content} = req.body
        const review = await Review.create({username, platform, content})
        return res.json({
            success: true,
        })
    }
    async editReview(req, res) {
        const {id, username, platform, content} = req.body
        const review = await Review.update({username, platform, content}, {where: {id}})
        return res.json({
            success: true,
        })
    }
    async deleteReview(req, res) {
        const {id} = req.body
        const review = await Review.destroy({where: {id}})
        return res.json({
            success: true,
        })
    }

    async createBestPairs(req, res) {
        const {from, to, from_value, to_value} = req.body
        const data = await bestPair.create({from: from, to: to, from_value: from_value, to_value: to_value})
        return res.json({data: data})
    }

    async editBestPairs(req, res) {
        const {id, from, to, from_value, to_value} = req.body
        const data = await bestPair.update({from: from, to: to, from_value: from_value, to_value: to_value}, {where: {id}})
        return res.json({data: data})
    }

    async deleteBestPairs(req, res) {
        const {id} = req.body
        const data = await bestPair.destroy({where: {id}})
        return res.json({data: data})
    }

    async getChats(req, res) {
        const data = await Chats.findAll()
        return res.json({data: data})
    }

    async getAdminMessages(req, res) {
        const {chatId} = req.body
        const data = await Messages.findAll({where: {ticketId: chatId}})
        return res.json({data: data})
    }

    async createMessage(req, res) {
        const {text, chatId} = req.body
        const data = await Messages.create({text, role: 'admin', ticketId: chatId})
        return res.json({data: data})
    }

    async deleteUser(req, res) {
        const {id} = req.body
        const data = await User.destroy({where: {id}})
        return res.json({data: data})
    }

    async sendAlertToUser(req, res) {
        const {id, text, title} = req.body
        const subscription = await User.findOne({where: {id: id}})
        webpush
            .sendNotification(subscription.subscription, text)
        return res.json({success: true})

    }

    async subscription(req, res) {
        const {data} = req.body
        await User.update({subscription: data}, {where: {email: "root"}})
        return res.json({success: true})
    }

    async blockUser(req, res) {
        const {id} = req.body
        const {blocked} = await User.findOne({where: {id: id}})

        const data = await User.update({blocked: !blocked}, {where: {id: id}})
        return res.json({data: data})
    }

    async setWorker(req, res) {
        const {id, worker} = req.body
        const data = await User.update({role: worker}, {where: {id: id}})
        return res.json({data: data})
    }

    async saveSettings(req, res) {
        const configg = {
            ...config,
            ...req.body
        }
        config = configg
        update()
        return res.json({success: true})
    }

    async getSettings(req, res) {
        return res.json({data: config})
    }

    async setStep(req, res) {
        const {id, step} = req.body
        const data = await Ticket.update({step: step}, {where: {id: id}})
        return res.json({data: data})
    }

    async deleteVault(req, res) {
        const {id} = req.body
        const data = await currency.destroy({where: {id}})
        const currencies = await currency.findAll()
        const updated = await Promise.all(currencies.map(async (record) => {
            const updatedArray = record.accepted.filter((item) => item !== id);
            return await record.update({ accepted: updatedArray });
        }));
        await ExchangeRate.destroy({where: {from_currency: id}})
        await ExchangeRate.destroy({where: {to_currency: id}})
        return res.json({data: data})
    }


 }

module.exports = new bestpairsController()