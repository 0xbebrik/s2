const {User, currency, Ticket, Invite, Visits} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var config = require('../config.json')
const { v4: uuidv4 } = require('uuid');
const sequelize = require("../db");
const {Op} = require("sequelize");

function parseCookies (request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}


class UserController {
    async registration(req, res) {

        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect input data'
            })
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.status(400).json({success: false, message: 'User with this email already exists'})
        }
        let ref = {}
        const hashPassword = await bcrypt.hash(password, 3)
        if (parseCookies(req)?.ref !== undefined) {
            ref = await Invite.findOne({where: {code: parseCookies(req).ref}})
        }
        const user = await User.create({email, password: hashPassword, ip: req.ip, invation_id: ref?.id || 0})
        const token = jwt.sign({id: user.id}, 'secret123', {expiresIn: '1h'})
        await user.save()
        return res.status(200).json({success: true, token: token})
    }

    async login(req, res) {
        const {email, password} = req.body
        console.log(email, password)
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(200).json({success: false, message: 'User not found'})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({success: false, message: 'Wrong password'})
        }
        await User.update({ip: req.ip}, {where: {id: user.id}})
        const token = jwt.sign({id: user.id}, 'secret123', {expiresIn: '24h'})
        return res.json({success: true, token: token})
    }

    async all(req, res) {
        console.log("connect")
        const users = await User.findAll({include: [Ticket]})
        return res.json({success: true, data: users})
    }

    async getme(req, res) {
        if (req.user) {
            const user = await User.findOne({where: {id: req.user.id}})
            if (!user) return res.json({success: false})
            await User.update({ip: req.ip}, {where: {id: user.id}})
            if (user.role === 'admin') return res.json({success: true, data: user, to: "../admin/tickets", email: user.email})
            return res.json({success: true, data: req.user, email: user.email, role: user.role})
        }
        return res.json({success: false})
        }

    async subscription(req, res) {
        const id = req.user.id
        console.log(id)
        const subscription = req.body
        const user = await User.findOne({where: {id}})
        if (!user) return res.json({success: false, message: 'User not found'})
        if (!subscription) return res.json({success: false, message: 'Subscription not found'})
        await User.update({subscription: subscription}, {where: {id: user.id}})
        return res.json({success: true, data: user.subscription})
    }

    async delete(req, res) {
        const id = req.params.id
        const user = await User.findOne({where: {id}})
        if (!user) return res.json({success: false, message: 'User not found'})
        await User.destroy({where: {id: user.id}})
        return res.json({success: true})
    }

    async requestWallet(req, res){
        const id = req.body.id
        await Ticket.update({requested: true}, {where: {id: id}})
        return res.json({success: true})
    }

    async getMyRefs(req, res){
        const id = req.user.id
        let refs = await Invite.findAll({where: {creator: id}})
        if (refs.length === 0) {
            await Invite.create({creator: id, code: uuidv4()})
            refs = await Invite.findAll({where: {creator: id}})
        }
        return res.json({success: true, data: refs})
    }

    async getChatSettings(req, res){
        config = require("../config.json")
        return res.json({success: true, OpAvatar: config.Op_avatar, OpName: config.Op_name, ChatAlerts: config.ChatAlerts})
    }

    async stat(req, res) {
        const id = req.user.id

        const period = "week"

        let startDate = 1721836019000
        let endDate = Date.now()
        let now = new Date();

        switch (period) {
            case "week":
                startDate = now.setDate(now.getDate() - 7);
                endDate = Date.now()
                break
            case "month":
                startDate = now.setDate(now.getDate() - 31);
                endDate = Date.now()
                break
            default:
                return res.json({success: false})
        }


        let ref = await Invite.findOne({where: {creator: id}})
        if (!ref) {
            ref = await Invite.create({creator: id, code: uuidv4()})
        }
        const visits = await Visits.findAll({
            attributes: [
                'ip',
                [sequelize.fn('COUNT', sequelize.col('ip')), 'count'],
                [sequelize.fn('MIN', sequelize.col('createdAt')), 'firstVisit']
            ],
            group: ['ip'],
            where: {
                ref: ref.code,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        })

        const users = await User.findAll({
            where: {
                invation_id: id,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        })

        const tickets = await Ticket.findAll({
            where: {
                invation: ref.code,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        })

        const globalData = {
            visits: {
                count: visits.length,
                percent: 61.4
            },
            registrations: {
                count: users.length,
                percent: -17.4
            },
            tickets: {
                count: tickets.length,
                percent: 5.14
            }
        }




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
                    ref: ref.code,
                    createdAt: {
                        [Op.between]: [no, to]
                    }
                }
            })

            const users = await User.findAll({
                where: {
                    invation_id: id,
                    createdAt: {
                        [Op.between]: [no, to]
                    }
                }
            })

            const tickets = await Ticket.findAll({
                where: {
                    invation: ref.code,
                    createdAt: {
                        [Op.between]: [no, to]
                    }
                }
            })
            resultt = {
                name: currentDate.toLocaleDateString(),
                asd: "asd",
                visits: visits.length,
                regitrations: users.length,
                tickets: tickets.length
            }
            data.push(resultt)
            currentDate.setDate(currentDate.getDate() + 1);
        }




        return res.json({success: true, data: {globalData, data}})
    }

    async changePassword(req, res) {
        const {oldPassword, newPassword} = req.body
        console.log(oldPassword, newPassword)
        const user = await User.findOne({where: {id: req.user.id}})
        const hashPassword = await bcrypt.hash(newPassword, 3)
        const comparePassword = bcrypt.compareSync(oldPassword, user.password)
        if (!comparePassword) {
            return res.status(400).json({success: false, message: 'Wrong password'})
        }
        await User.update({password: hashPassword}, {where: {id: user.id}})
        return res.json({success: true})
    }
}

module.exports = new UserController()