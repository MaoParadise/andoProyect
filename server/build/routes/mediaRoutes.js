"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mediaControllers_1 = __importDefault(require("../controllers/mediaControllers"));
const auth_1 = require("../passport/auth");
class MediaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', mediaControllers_1.default.listMedia);
        this.router.post('/search/', auth_1.verifyToken, mediaControllers_1.default.getMediaLike);
        this.router.post('/upload/', auth_1.verifyToken, mediaControllers_1.default.createUpload);
        this.router.post('/uploadEmbed/', auth_1.verifyToken, mediaControllers_1.default.createFrame);
        this.router.put('/updateEmbed/', auth_1.verifyToken, mediaControllers_1.default.updateFrame);
        this.router.get('/library/:email', mediaControllers_1.default.getMediaLibrary);
        this.router.post('/embed/', auth_1.verifyToken, mediaControllers_1.default.getEmbedFrames);
    }
}
const mediaRoutes = new MediaRoutes();
exports.default = mediaRoutes.router;
