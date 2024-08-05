const express = require('express');
const app = express();
const routes = require('./routes');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const {Visits} = require("./models/models");
const cookieParser = require("cookie-parser");
const isAuth = require('./middleware/isAuth');
var path = require('path');
var public = path.join(__dirname, 'public');
app.set("trust proxy", true);
app.use(cors());

app.use(cookieParser());

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use('/api', routes);


app.get("/admin/*",  (req, res) => {
    res.sendFile("/root/s2/public/panel.html");
});

app.get('*', (req, res) => {

    res.sendFile("/root/s2/public/index.html");
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
app.listen(8000,() => {
    console.log('Server started on port 4000');
})
