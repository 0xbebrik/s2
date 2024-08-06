const {currency, ExchangeRate} = require('../models/models')
const config = require("../config.json")
const fs = require('fs')
const courses = require("../valuta.json")
const xml2js = require("xml2js");


const update = () => {
    fs.writeFile("config.json", JSON.stringify(config, null, 2), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}


class CalculatorController {


    async all(req, res) {
        const currencies = await currency.findAll()
        return res.json({success: true, data: currencies})
    }

    async allAdmin(req, res) {
        const currencies = await currency.findAll()
        const ExchangeRates = await ExchangeRate.findAll()
        return res.json({success: true, currencies: currencies, rates: ExchangeRates})
    }

    async pair(req, res){
        const {from, to} = req.body

        if (!from || !to) {
            return res.status(400).json({success: false, message: 'Incorrect input data'})
        }

        let fromRow = await currency.findOne({where: {id: from}})
        let toRow
        if (fromRow.accepted.length === 0) {
            fromRow = await currency.findOne({where: {id: 1}})
        }

        if (fromRow.accepted.includes(to)) {
            toRow = await currency.findOne({where: {id: to}})
        }else{
            toRow = await currency.findOne({where: {id: fromRow.accepted[0]}})
        }
        if (!fromRow || !toRow) {
            return res.status(400).json({success: false, message: 'Incorrect input data'})
        }



        // var coursee = await ExchangeRate.findOne({where: {from_currency: from, to_currency: to}})
        // if (!coursee) {
        //  const   coursee = 1.641570699538095e-7
        // }
        console.log(fromRow.shortName, toRow.shortName)
        // const re = await ExchangeRate.findOne({where: {from_currency: fromRow.id, to_currency: toRow.id}})
        // const stream_id1 = this.getKeyByValue(jjson.exchanges.currencies.aliases, fromRow.shortName)
        const stream_id1 = Object.keys(courses.exchanges.currencies.aliases).find(key => courses.exchanges.currencies.aliases[key] === fromRow.shortName)
        const stream_id2 = Object.keys(courses.exchanges.currencies.aliases).find(key => courses.exchanges.currencies.aliases[key] === toRow.shortName)

        const exclude = await ExchangeRate.findOne({where: {from_currency: fromRow.id, to_currency: toRow.id}})
        //
        var coursee

        fs.readFile("./valuta.xml", 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            xml2js.parseString(data, (err, result) => {
                coursee = result.rates.item.find(obj => obj.from[0].toUpperCase() === fromRow.shortName.toUpperCase() && obj.to[0].toUpperCase() === toRow.shortName.toUpperCase())


                let courseStr = coursee?.in[0] !== "1" ?
                    coursee?.out[0] + " " + toRow?.currency + " = " + coursee?.in[0] + " " + fromRow?.currency :
                    coursee?.in[0] + " " + fromRow?.currency + " = " + coursee?.out[0] + " " + toRow?.currency

                if (coursee?.in === undefined){
                    courseStr = "1 " + fromRow?.currency + " = " + exclude.rate + " " + toRow?.currency
                }


                const test = {
                    from: {
                        courseStr: courseStr,
                        id: fromRow.id,
                        currency: fromRow.currency,
                        name: fromRow.FullName,
                        shortName: fromRow.shortName,
                        icon: fromRow.Icon,
                        accepted: fromRow.accepted || [],
                        input: fromRow.input,
                        minValue: fromRow.min,
                        maxValue: fromRow.max
                    },
                    to: {
                        id: toRow.id,
                        currency: toRow.currency,
                        name: toRow.FullName,
                        shortName: toRow.shortName,
                        icon: toRow.Icon,
                        input: toRow.input,
                        course: coursee?.in[0] !== "1" ? 1 / coursee?.in[0] : parseFloat(coursee?.out[0]),
                        reserv: toRow.reserv
                    }
                }
                if (exclude && exclude.rate){
                    test.to.course = exclude.rate
                }

                return res.json({success: true, data: test})
            })
        })

    }

    async getExcludes(req, res) {
        const excludes = await ExchangeRate.findAll()
        const currencies = await currency.findAll()
        return res.json({success: true, data: {excludees: excludes, currencies: currencies}, settings: config})
    }
}

module.exports = new CalculatorController()