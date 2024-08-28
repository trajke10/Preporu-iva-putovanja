"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            user_1.default.findOne({ korisnickoIme: req.body.korisnickoIme, lozinka: req.body.lozinka }).then(data => {
                res.json(data);
            }).catch(err => {
                console.log(err);
            });
        };
        this.register = (req, res) => {
            user_1.default.findOne({ korisnickoIme: req.body.korisnickoIme }).then(data => {
                if (data != null) {
                    res.json({ message: "Korisnik sa datim korisnickim imenom već postoji" });
                }
                else {
                    new user_1.default({
                        korisnickoIme: req.body.korisnickoIme,
                        lozinka: req.body.lozinka,
                        godine: req.body.godine,
                        lokacija: { lat: req.body.lokacija.lat, lon: req.body.lokacija.lon },
                        listaPosecenihLokacija: []
                    }).save().then(data => {
                        res.json({ message: "OK" });
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.getAllUsers = (req, res) => {
            user_1.default.find({}).then(data => {
                res.json(data);
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.UserController = UserController;
