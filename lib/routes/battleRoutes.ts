import { Request, Response } from 'express';
import { battleController } from '../controllers/battleController';

export class Routes {

    bc = new battleController();

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
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