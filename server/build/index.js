"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const express_validator_1 = __importDefault(require("express-validator"));
//validador por medio de json web token
const jwt = require('jsonwebtoken');
// validador por medio de passport
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
var cookieParser = require('cookie-parser');
const LocalStrategy = passport_local_1.default.Strategy;
// Import of the routes
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const typeRoutes_1 = __importDefault(require("./routes/typeRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const stateMediaRoutes_1 = __importDefault(require("./routes/stateMediaRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const mediaRoutes_1 = __importDefault(require("./routes/mediaRoutes"));
//test
const sessionRoute_1 = __importDefault(require("./routes/sessionRoute"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
        require('./passport/local-auth');
    }
    config() {
        this.app.set('json spaces', 4);
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        //this.app.use(cors({credentials: true, origin: 'http://127.0.0.1:4200'}));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cookieParser("SAME_SECRET"));
        this.app.use(express_session_1.default({
            secret: 'MaoParadise',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: false
            }
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        this.app.use(express_validator_1.default());
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/types', typeRoutes_1.default);
        this.app.use('/api/categorys', categoryRoutes_1.default);
        this.app.use('/api/stateMedia', stateMediaRoutes_1.default);
        this.app.use('/api/users', userRoutes_1.default);
        this.app.use('/api/session', sessionRoute_1.default);
        this.app.use('/api/media', mediaRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
