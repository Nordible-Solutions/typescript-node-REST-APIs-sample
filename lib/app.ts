import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/battleRoutes'
import * as mongoose from "mongoose";

class App {
    public app: express.Application;
    public battleRoutes: Routes = new Routes();
    public mongoUrl: string = process.env.MONGOURL ? process.env.MONGOURL || 'mongodb://localhost:27017/battlesDB';

    constructor() {
        this.app = express();
        this.config();
        this.battleRoutes.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, function (err) {
            if (err) throw err;
        });

        mongoose.connection.on('connected', function () { console.log('Mongoose connected') });
        mongoose.connection.on('error', function () { console.log('Mongoose connection error') });
        mongoose.connection.on('disconnected', function () { console.log('Mongoose connection disconnected') });
    }
}

export default new App().app;