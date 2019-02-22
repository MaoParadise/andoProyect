"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryControllers_1 = __importDefault(require("../controllers/categoryControllers"));
const auth_1 = require("../passport/auth");
class CategoryRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', categoryControllers_1.default.listCategoryMedia);
        this.router.get('/:id', categoryControllers_1.default.getCategoryMedia);
        this.router.post('/search/', categoryControllers_1.default.getCategoryLike);
        this.router.post('/', auth_1.verifyToken, categoryControllers_1.default.createCategoryMedia);
        this.router.post('/preference/', auth_1.verifyToken, categoryControllers_1.default.createPreferencesUser);
        this.router.delete('/:id', auth_1.verifyToken, categoryControllers_1.default.deleteCategoryMedia);
        this.router.put('/:id', auth_1.verifyToken, categoryControllers_1.default.updateCategoryMedia);
    }
}
const categoryRoutes = new CategoryRoutes();
exports.default = categoryRoutes.router;
