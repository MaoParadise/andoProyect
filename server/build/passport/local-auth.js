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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const localStrategy = passport_local_1.default.Strategy;
const database_1 = __importDefault(require("../database"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
passport_1.default.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => __awaiter(this, void 0, void 0, function* () {
    const rows = yield database_1.default.query(`SELECT * FROM user WHERE user.EMAIL = '${username}' OR user.USER = '${username}'`);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = yield bcrypt_nodejs_1.default.compareSync(password, user.PASSWORD);
        if (validPassword) {
            console.log(user);
            done(null, user);
        }
        else {
            done(null, false);
        }
    }
    else {
        return done(null, false);
    }
})));
passport_1.default.serializeUser((EMAIL, done) => {
    done(null, EMAIL);
});
passport_1.default.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
    const rows = yield database_1.default.query('SELECT * FROM user WHERE EMAIL = ?', [id]);
    done(null, rows[0]);
}));
