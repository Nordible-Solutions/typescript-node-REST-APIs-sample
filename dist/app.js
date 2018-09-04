"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const battleRoutes_1 = require("./routes/battleRoutes");
const mongoose = require("mongoose");
class App {
    constructor() {
        this.battleRoutes = new battleRoutes_1.Routes();
        this.mongoUrl = process.env.MONGOURL ? process.env.MONGOURL || 'mongodb://localhost:27017/battlesDB' : ;
        this.app = express();
        this.config();
        this.battleRoutes.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, function (err) {
            if (err)
                throw err;
        });
        mongoose.connection.on('connected', function () { console.log('Mongoose connected'); });
        mongoose.connection.on('error', function () { console.log('Mongoose connection error'); });
        mongoose.connection.on('disconnected', function () { console.log('Mongoose connection disconnected'); });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map