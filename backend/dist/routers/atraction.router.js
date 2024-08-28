"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const atraction_controller_1 = require("../controllers/atraction.controller");
const atractionRouter = express_1.default.Router();
atractionRouter.route('/getAllAtractions').get((req, res) => new atraction_controller_1.AtractionController().getAllAtractions(req, res));
atractionRouter.route('/rateLocation').post((req, res) => new atraction_controller_1.AtractionController().rateLocation(req, res));
exports.default = atractionRouter;
