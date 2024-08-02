const {currency, bestPair} = require("../models/models");

class bestpairsController {
    async getBestPairs(req, res) {
        const data = []

        const pairs = await bestPair.findAll()
        for (let i = 0; i < pairs.length; i++) {
            const from = await currency.findOne({where: {id: pairs[i].from}})
            const to = await currency.findOne({where: {id: pairs[i].to}})
            data.push({id: pairs[i].id, from: from, to: to, from_value: pairs[i].from_value, to_value: pairs[i].to_value})
        }

        return res.json(data)
    }
}

module.exports = new bestpairsController()