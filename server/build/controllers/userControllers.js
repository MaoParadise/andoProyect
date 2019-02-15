"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const jwt = require('jsonwebtoken');
const passport_local_1 = __importDefault(require("passport-local"));
const LocalStrategy = passport_local_1.default.Strategy;
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
class UserController {
    listUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield database_1.default.query('SELECT EMAIL,USER,PUBLICNAME,URLPROFILEPICTURE,ACTIVEPROFILE from user');
            res.json(category);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const category = yield database_1.default.query(`SELECT EMAIL,USER,PUBLICNAME,URLPROFILEPICTURE,ACTIVEPROFILE FROM user WHERE user.EMAIL = '${id}' OR user.USER = '${id}'`);
            console.log(category.length);
            if (category.length > 0) {
                return res.json(category[0]);
            }
            res.status(404).json({ text: "The User doesn't exits", boolean: false });
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const encrypted = bcrypt_nodejs_1.default.hashSync(req.body.PASSWORD, bcrypt_nodejs_1.default.genSaltSync(10));
            yield database_1.default.query(`INSERT INTO user VALUES ('${req.body.EMAIL}', '${req.body.USER}', '${encrypted}', '${req.body.PUBLICNAME}', '${req.body.URLPROFILEPICTURE}', 0)`, (error) => {
                if (error) {
                    res.json({
                        message: 'The User was not created becausa an unexpected error, check if the primary key is not duplicated',
                        success: false
                    });
                }
                else {
                    let payload = { subject: req.body.user };
                    let token = jwt.sign(payload, 'MaoParadise');
                    res.json({
                        message: 'the User was created',
                        success: true,
                        user: req.body.USER,
                        token
                    });
                }
            });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE user set ? WHERE EMAIL = ?', [req.body, id]);
            res.json({ message: 'the User was updated' });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM user WHERE EMAIL = ?', [id]);
            res.json({ message: 'The User was deleted' });
        });
    }
}
const userController = new UserController();
exports.default = userController;
