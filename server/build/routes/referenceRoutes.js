"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const referenceControllers_1 = __importDefault(require("../controllers/referenceControllers"));
class ReferenceRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/get/', referenceControllers_1.default.getReferencesMEDIA);
        this.router.post('/insert/', referenceControllers_1.default.insertReferenceMedia);
        this.router.put('/update/', referenceControllers_1.default.updateReferenceMedia);
    }
}
const referenceRoutes = new ReferenceRoutes();
exports.default = referenceRoutes.router;
