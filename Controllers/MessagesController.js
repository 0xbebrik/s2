const {Messages, User, Chats} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {decode, verify} = require("jsonwebtoken");
const {sendNotification} = require("web-push");
const config = require("../config.json")

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


class TicketsController {

    async createChat(req, res) {
        const {ChatId, startMessage} = req.body
        console.log(ChatId, startMessage)
        await Messages.create({
            text: startMessage,
            role: 'USER',
            userId: 1,
            ticketId: ChatId
        });
        const newMessage = await Messages.findAll({where: {ticketId: ChatId}})
        res.json({success: true, message: newMessage});
    }

    async createMessage(req, res) {
        let userId;
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(200).json({success: false, message: "Не авторизован"})
            }
            const decoded = verify(token,'secret123')
            userId = decoded.id
        } catch (e) {
            userId = 0
        }
        const {ticketId, message, role, passkey} = req.body;
        if (!ticketId || !message) return

        var chat = await Chats.findOne({where: {id: ticketId}})
        if (ticketId === -1 || !chat) {
            const passkey = generateRandomString(10);
            chat = await Chats.create({creator_id: userId, passkey: passkey, creator_ip: req.ip})
            const admin = await User.findOne({where: {email: 'root'}})
            if (config.ChatAlerts) sendNotification(admin.subscription, 'Новый чат создан')
            await Messages.create({text: message, role: role, userId: null, ticketId: chat.id})
            const sign = await jwt.sign({id: chat.id, passkey: passkey}, 'secret123', {expiresIn: '24h'})
            return res.json({success: true, chat_token: sign})
        }else{

            var verify = false

            try {
                jwt.verify(passkey, 'secret123')
                verify = true
            } catch (e) {
                verify = false
            }
            if (verify) {
                if (jwt.decode(passkey, 'secret123')?.passkey === chat?.passkey) {
                    await Messages.create({text: message, role: role, userId: null, ticketId: chat.id})
                    return res.json({success: true})
                }
            }
            else {
                const passkey = generateRandomString(10);
                chat = await Chats.create({creator_id: req.user?.id ? req.user?.id : null, passkey: passkey})
                await Messages.create({text: message, role: role, userId: null, ticketId: chat.id})
                const sign = await jwt.sign({id: chat.id, passkey: passkey}, 'secret123', {expiresIn: '24h'})
                return res.json({success: true, chat_token: sign})
            }
        }


        await Messages.create({
            text: message,
            role: role,
            userId: 1,
            ticketId: ticketId
        });
        const newMessage = await Messages.findAll({where: {ticketId: ticketId}})
        res.json({success: true, message: newMessage});
    }

    async getMessages(req, res) {
        const passkey = req.query.passkey
        let verified = false
        if (passkey === "undefined") return res.json({success: true, messages: []})
        const ticketId = jwt.decode(passkey, 'secret123')?.id
        let chat;
        if (!passkey) return

        try {
            jwt.verify(passkey, 'secret123')
            chat = await Chats.findOne({where: {id: ticketId}})
            verified = true
        } catch (e) {
            verified = false
        }

        if (verified && jwt.decode(passkey, 'secret123')?.passkey === chat.passkey) {
            const messages = await Messages.findAll({where: {ticketId: chat.id}})
            return res.json({success: true, chat: {active: true}, messages: messages})
        }
        return res.json({success: false, chat: {active: false}})
    }
}

module.exports = new TicketsController()