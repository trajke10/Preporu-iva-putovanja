"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    korisnickoIme: String,
    lozinka: String,
    godine: Number,
    lokacija: {
        lat: Number,
        lon: Number
    },
    listaPosecenihLokacija: (Array)
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model("UserM", UserSchema, "korisnici");
