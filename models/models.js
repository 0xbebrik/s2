const sequelize = require('../db');
const {DataTypes} = require('sequelize');



const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    ip: {type: DataTypes.STRING},
    invation_id: {type: DataTypes.INTEGER},
    blocked: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    subscription: {type: DataTypes.JSON, allowNull: true},

});

const Requisite = sequelize.define("requisite", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    currency: {type: DataTypes.INTEGER},
    wallet: {type: DataTypes.STRING},
    active: {type: DataTypes.BOOLEAN, defaultValue: false},
})

const currency = sequelize.define('currencies', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    shortName: {type: DataTypes.STRING},
    FullName: {type: DataTypes.STRING},
    Icon: {type: DataTypes.STRING},
    Type: {type: DataTypes.STRING},
    reserv: {type: DataTypes.DOUBLE},
    currency: {type: DataTypes.STRING},
    input: {type: DataTypes.STRING},
    min: {type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0},
    max: {type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0},
    accepted: {type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: []},
})

const ExchangeRate = sequelize.define('ExchangeRate', {
    from_currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    to_currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rate: {
        type: DataTypes.DECIMAL(18, 10),
        allowNull: false,
    },
});

const Ticket = sequelize.define('ticket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    from_Value: {type: DataTypes.DOUBLE},
    to_Value: {type: DataTypes.DOUBLE},
    invation: {type: DataTypes.STRING},
    step: {type: DataTypes.INTEGER, defaultValue: 0},
    from_currency: {type: DataTypes.INTEGER},
    to_currency: {type: DataTypes.INTEGER},
    FIO: {type: DataTypes.STRING, defaultValue: ''},
    cardNumber: {type: DataTypes.STRING, defaultValue: ''},
    btcAdress: {type: DataTypes.STRING, defaultValue: ''},
    requested: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    wallet: {type: DataTypes.STRING},
    timer_end: {type: 'TIMESTAMP'},
})

const News = sequelize.define('News', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
    hidden: {type: DataTypes.BOOLEAN, defaultValue: false},
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    platform: {type: DataTypes.STRING},
})


const Messages = sequelize.define('msgs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    text: {type: DataTypes.STRING},
})

const Statistics = sequelize.define('stats', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    visits: {type: DataTypes.INTEGER},
    registrations: {type: DataTypes.INTEGER},
})

const Invite = sequelize.define('invite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING},
    creator: {type: DataTypes.INTEGER},
})

const bestPair = sequelize.define('bestPairs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    from: {type: DataTypes.INTEGER},
    to: {type: DataTypes.INTEGER},
    from_value: {type: DataTypes.DOUBLE},
    to_value: {type: DataTypes.DOUBLE}
})

const Chats = sequelize.define('chats', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    passkey: {type: DataTypes.STRING},
    creator_ip: {type: DataTypes.STRING},
    creator_id: {type: DataTypes.INTEGER},
})

const Visits = sequelize.define('visits', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ip: {type: DataTypes.STRING},
    ref: {type: DataTypes.STRING}
})


Ticket.hasMany(Messages)
Messages.belongsTo(Ticket)

User.hasMany(Ticket)
Ticket.belongsTo(User)

User.hasMany(Messages)
Messages.belongsTo(User)

module.exports = {User, Ticket, currency, News, Review, ExchangeRate, Messages, Statistics, Invite, Requisite, bestPair, Chats, Visits};

