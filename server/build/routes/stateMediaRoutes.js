"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StateMediaControllers_1 = __importDefault(require("../controllers/StateMediaControllers"));
class StateMediaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', StateMediaControllers_1.default.listStateMedia);
        this.router.get('/:id', StateMediaControllers_1.default.getStateMedia);
        this.router.post('/', StateMediaControllers_1.default.createStateMedia);
        this.router.delete('/:id', StateMediaControllers_1.default.deleteStateMedia);
        this.router.put('/:id', StateMediaControllers_1.default.updateStateMedia);
    }
}
const stateMediaRoutes = new StateMediaRoutes();
exports.default = stateMediaRoutes.router;
