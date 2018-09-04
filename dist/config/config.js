"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_prod_1 = require("./config.prod");
const config_dev_1 = require("./config.dev");
class Config {
    constructor() {
        if (process.env.NODE_ENV === 'PROD') {
            this.config = config_prod_1.PROD;
        }
        else {
            this.config = config_dev_1.LOCAL;
        }
    }
}
exports.default = new Config().config;
//# sourceMappingURL=config.js.map