import { PROD } from './config.prod'
import { LOCAL } from './config.dev'

class Config {
    public config;
    constructor() {
        if (process.env.NODE_ENV === 'PROD') {
            this.config = PROD;
        } else {
            this.config = LOCAL;
        }
    }
}

export default new Config().config;