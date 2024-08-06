const {Ticket, currency, User, Requisite} = require('../models/models')
const config = require("../config.json")
const jwt = require("jsonwebtoken");

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

class TicketsController {

    async createTicket(req, res) {
        let data = req.body
        let user = await User.findOne({where: {id: req.user.id}})
        let token
        if (config.auth_mode === 0) {
            user = await User.create({email: data.email, password: "temp123814", ip: req.ip, invation_id: parseCookies(req).ref || 0})
        }
        let wallet = await Requisite.findOne({where: {currency: data.from_currency}})
        if (wallet) wallet = wallet.wallet || null
        const id = await Ticket.create({wallet: wallet, ...data, userId: user ? user.id : null, invation: parseCookies(req).ref || 0, step: wallet ? 1 : 0})

        res.json({success: true, id: id.id, token: token, user: user ? user : null});
    }
    async getTickets(req, res) {
        const tickets = await Ticket.findAll({limit: 5, order: [ [ 'createdAt', 'DESC' ]]})
        if (!tickets) return res.json({success: false})
        for (let ticket of tickets) {
            const from_currency = await currency.findOne({where: {id: ticket.from_currency}})
            const to_currency = await currency.findOne({where: {id: ticket.to_currency}})
            const user = await User.findOne({where: {id: ticket.userId}})
            ticket.from_currency = from_currency
            ticket.to_currency = to_currency
            ticket.userId = user
        }
        return res.json({success: true, tickets: tickets})
    }

    async getTicket(req, res) {
        const {id} = req.params
        const ticket = await Ticket.findOne({where: {id}})
        if (!ticket) return res.json({success: false})
        const from_currency = await currency.findOne({where: {id: ticket.from_currency}})
        const to_currency = await currency.findOne({where: {id: ticket.to_currency}})
        const user = await User.findOne({where: {id: ticket.userId}})
        ticket.from_currency = from_currency
        ticket.to_currency = to_currency
        ticket.User = user
        return res.json({success: true, ticket: ticket})
    }

    async getMyTickets(req, res) {
        const tickets = await Ticket.findAll({where: {userId: req.user.id}})
        if (!tickets) return res.json({success: false})
        for (let ticket of tickets) {
            const from_currency = await currency.findOne({where: {id: ticket.from_currency}})
            const to_currency = await currency.findOne({where: {id: ticket.to_currency}})
            ticket.from_currency = from_currency
            ticket.to_currency = to_currency
        }
        return res.json({success: true, tickets: tickets.reverse()})
    }
}

module.exports = new TicketsController()