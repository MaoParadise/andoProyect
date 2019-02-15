"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeControllers_1 = __importDefault(require("../controllers/typeControllers"));
class TypeRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', typeControllers_1.default.listTypesMedia);
        this.router.get('/:id', typeControllers_1.default.getTypesMedia);
        this.router.post('/', typeControllers_1.default.createTypesMedia);
        this.router.delete('/:id', typeControllers_1.default.deleteTypesMedia);
        this.router.put('/:id', typeControllers_1.default.updateTypesMedia);
    }
}
const typeRoutes = new TypeRoutes();
exports.default = typeRoutes.router;
