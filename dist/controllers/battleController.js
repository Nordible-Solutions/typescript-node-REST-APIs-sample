"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const battleModels_1 = require("../models/battleModels");
const battles = mongoose.model('battles', battleModels_1.battleSchema);
class battleController {
    BattleSearch(req, res) {
        let query = {};
        let king = req.query.king;
        if (king) {
            let kingsQuery = {
                $or: [{ attacker_king: king },
                    { defender_king: king }
                ]
            };
            query = Object.assign({}, query, kingsQuery);
        }
        let type = req.query.type;
        if (type) {
            let typeQuery = {
                battle_type: type
            };
            query = { $and: [query, typeQuery] };
        }
        let location = req.query.location;
        if (location) {
            let locationQuery = {
                $or: [{ region: location },
                    { location: location }
                ]
            };
            query = { $and: [query, locationQuery] };
        }
        let attacker = req.query.attacker;
        if (attacker) {
            let attackerQuery = {
                $or: [{ attacker_1: attacker },
                    { attacker_2: attacker },
                    { attacker_3: attacker },
                    { attacker_4: attacker }]
            };
            query = { $and: [query, attackerQuery] };
        }
        let defender = req.query.attacker;
        if (defender) {
            let defenderQuery = {
                $or: [{ defender_1: attacker },
                    { defender_2: attacker },
                    { defender_3: attacker },
                    { defender_4: attacker }]
            };
            query = { $and: [query, defenderQuery] };
        }
        battles.find(query, (err, allBattles) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(allBattles);
        });
    }
    GetBattleStats(req, res) {
        battles.aggregate([
            {
                $facet: {
                    q: [
                        { $match: { attacker_king: { $exists: true, $nin: ["", null] } } },
                        { $count: "total" }
                    ],
                    q0: [
                        { $match: { defender_king: { $exists: true, $nin: ["", null] } } },
                        { $count: "total" }
                    ],
                    q1: [
                        { $match: { region: { $exists: true, $nin: ["", null] } } },
                        { $count: "total" }
                    ],
                    q2: [
                        { $match: { name: { $exists: true, $nin: ["", null] } } },
                        { $count: "total" }
                    ],
                    q3: [
                        { $match: { attacker_outcome: 'win' } },
                        { $count: "total" }
                    ],
                    q4: [
                        { $match: { attacker_outcome: 'loss' } },
                        { $count: "total" }
                    ],
                    q5: [
                        {
                            $group: {
                                _id: null,
                                unique: { $addToSet: "$battle_type" }
                            }
                        }
                    ],
                    q6: [
                        {
                            $group: {
                                _id: null,
                                average: { $avg: "$defender_size" },
                                min: { $min: "$defender_size" },
                                max: { $max: "$defender_size" },
                            }
                        }
                    ],
                }
            },
            {
                $project: {
                    q: { $arrayElemAt: ["$q", 0] },
                    q0: { $arrayElemAt: ["$q0", 0] },
                    q1: { $arrayElemAt: ["$q1", 0] },
                    q2: { $arrayElemAt: ["$q2", 0] },
                    q3: { $arrayElemAt: ["$q3", 0] },
                    q4: { $arrayElemAt: ["$q4", 0] },
                    q5: { $arrayElemAt: ["$q5", 0] },
                    q6: { $arrayElemAt: ["$q6", 0] }
                }
            },
            {
                $project: {
                    "most_active.attacker_king": { $ifNull: ["$q1.total", 0] },
                    "most_active.defender_king": { $ifNull: ["$q2.total", 0] },
                    "most_active.region": { $ifNull: ["$q1.total", 0] },
                    "most_active.name": { $ifNull: ["$q2.total", 0] },
                    "attacker_outcome.win": { $ifNull: ["$q3.total", 0] },
                    "attacker_outcome.loss": { $ifNull: ["$q4.total", 0] },
                    "battle_type": "$q5.unique",
                    "defender_size.average": "$q6.average",
                    "defender_size.min": "$q6.min",
                    "defender_size.max": "$q6.max",
                }
            }
        ])
            .exec((err, battles) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(battles);
        });
    }
    CountAllBattles(req, res) {
        battles.count({}, (err, count) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(count);
        });
    }
    ListAllBattles(req, res) {
        battles.find({}, (err, allBattles) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(allBattles);
        });
    }
}
exports.battleController = battleController;
//# sourceMappingURL=battleController.js.map