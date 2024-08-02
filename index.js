const express = require('express');
const app = express();
const routes = require('./routes');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const {Visits} = require("./models/models");
const cookieParser = require("cookie-parser");
var path = require('path');
var public = path.join(__dirname, 'public');
app.use(cors());

app.use(cookieParser());

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use('/api', routes);


app.get("/admin/*", (req, res) => {
    res.sendFile("/root/server/public/panel.html");
});

app.get('*', (req, res) => {

    res.sendFile("/root/server/public/index.html");
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start();
app.listen(80, "77.83.175.76", () => {
    console.log('Server started on port 4000');
})
