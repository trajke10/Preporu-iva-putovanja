"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const AtractionSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    naziv: String,
    koordinate: {
        latitude: Number,
        longitude: Number
    },
    opis: String,
    drzava: String,
    tip: String,
    ocena: Number,
    slika: String,
    recenzije: Number
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model("AtractionM", AtractionSchema, "atrakcije");
