"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const passport_local_1 = __importDefault(require("passport-local"));
const LocalStrategy = passport_local_1.default.Strategy;
const auth_1 = require("../passport/auth");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.get('/', userController.listUser);
        this.router.get('/:id', auth_1.verifyToken, userControllers_1.default.getUser);
        this.router.post('/', userControllers_1.default.createUser);
        this.router.delete('/:id', auth_1.verifyToken, userControllers_1.default.deleteUser);
        this.router.put('/:id', auth_1.verifyToken, userControllers_1.default.updateUser);
        this.router.post('/auth/user/', cors_1.default(), (req, res, next) => {
            req.check('username', 'Username is Required').notEmpty();
            req.check('password', 'Password is Required').notEmpty();
            const errors = req.validationErrors();
            if (errors.length > 0) {
                res.json({ message: `The user wasn't validated`, success: true });
            }
            else {
                req.login;
            }
            passport_1.default.authenticate('local.signin', {
                successRedirect: '/api/session/success/' + req.body.username,
                failureRedirect: '/api/session/error',
                failureFlash: true
            })(req, res, next);
        });
        this.router.get('/auth/session/', (req, res, next) => {
            req.login;
            res.send('hecho ? ');
        });
    }
}
passport_1.default.serializeUser(function (username, done) {
    done(null, username);
});
passport_1.default.deserializeUser(function (username, done) {
    done(null, username);
});
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
