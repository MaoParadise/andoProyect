"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryControllers_1 = __importDefault(require("../controllers/categoryControllers"));
class CategoryRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', categoryControllers_1.default.listCategoryMedia);
        this.router.get('/:id', categoryControllers_1.default.getCategoryMedia);
        this.router.post('/', categoryControllers_1.default.createCategoryMedia);
        this.router.delete('/:id', categoryControllers_1.default.deleteCategoryMedia);
        this.router.put('/:id', categoryControllers_1.default.updateCategoryMedia);
    }
}
const categoryRoutes = new CategoryRoutes();
exports.default = categoryRoutes.router;
