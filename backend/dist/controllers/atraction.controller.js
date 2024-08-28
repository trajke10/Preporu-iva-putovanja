"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtractionController = void 0;
const atrakcija_1 = __importDefault(require("../models/atrakcija"));
const user_1 = __importDefault(require("../models/user"));
const mongodb_1 = require("mongodb");
class AtractionController {
    constructor() {
        this.getAllAtractions = (req, res) => {
            atrakcija_1.default.find({}).then(data => {
                res.json(data);
            }).catch(err => {
                console.log(err);
            });
        };
        this.rateLocation = (req, res) => {
            atrakcija_1.default.findOne({ _id: new mongodb_1.ObjectId(req.body._id) }).then(data => {
                if (data != null && data.recenzije != null && data.ocena != null) {
                    atrakcija_1.default.findOneAndUpdate({ _id: new mongodb_1.ObjectId(req.body._id) }, { $set: { recenzije: data.recenzije + 1, ocena: (data.ocena * data.recenzije + req.body.ocena) / (data.recenzije + 1) } }, { new: true }).then(data2 => {
                        if (req.body.ocena > 5) {
                            user_1.default.updateOne({ korisnickoIme: req.body.korisnickoIme }, { $push: { listaPosecenihLokacija: new mongodb_1.ObjectId(req.body._id) } }).then(data => {
                                res.json(data2);
                            }).catch(err => {
                                console.log(err);
                            });
                        }
                        else {
                            res.json(data2);
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.AtractionController = AtractionController;
