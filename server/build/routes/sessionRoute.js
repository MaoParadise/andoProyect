"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt = require('jsonwebtoken');
const auth_1 = require("../passport/auth");
class SessionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.user = '';
        this.config();
    }
    config() {
        this.router.get('/logout', (req, res) => {
            req.logOut();
            res.json({ message: `The User is logout`, success: false });
        });
        this.router.get('/profile', auth_1.verifyToken, (req, res) => {
            res.json({ message: `The User is LoggedIn`, success: true });
        });
        this.router.get('/success/:username', auth_1.isLoggedIn, (req, res) => {
            const { user } = req.params;
            let payload = { subject: user };
            let token = jwt.sign(payload, 'MaoParadise');
            res.json({ message: `The User is LoggedIn`,
                success: true,
                user: req.params.username,
                token });
        });
        this.router.get('/error', (req, res) => {
            res.json({ message: `The User isn't validated `, success: false });
        });
    }
}
const sessionRoutes = new SessionRoutes();
exports.default = sessionRoutes.router;
