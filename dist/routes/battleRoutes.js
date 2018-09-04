"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battleController_1 = require("../controllers/battleController");
class Routes {
    constructor() {
        this.bc = new battleController_1.battleController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send('Welcome to battles API');
        });
        app.route('/login')
            .post(this.bc.LoginBattlesAPI);
        app.use(this.bc.VerifyToken);
        //returns list(array) of all the places where battle has taken place
        app.route('/list')
            .get(this.bc.ListAllBattles);
        //returns total number of battle occurred.
        app.route('/count')
            .get(this.bc.CountAllBattles);
        app.route('/stats')
            .get(this.bc.GetBattleStats);
        //return list of battles according to query params
        //'attacker_king' or 'defender_king' was 'king'
        //type
        //location
        app.route('/search')
            .get(this.bc.BattleSearch);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=battleRoutes.js.map