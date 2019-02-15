"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('por aqui');
        return next();
    }
    return next();
    //return res.json({message: `The User isn't LoggedIn` , success: false});
}
exports.isLoggedIn = isLoggedIn;
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request >:( ');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request >:( ');
    }
    let payload = jwt.verify(token, 'MaoParadise');
    if (!payload) {
        return res.status(401).send('Unauthorized request >:( ');
    }
    req.user = payload.subject;
    next();
}
exports.verifyToken = verifyToken;
