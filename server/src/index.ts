import express, { Application, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session'; 
import validator from 'express-validator';

//validador por medio de json web token

const jwt = require('jsonwebtoken');

// validador por medio de passport
import passport from 'passport';
import passportLocal from "passport-local";
var cookieParser = require('cookie-parser')
const LocalStrategy = passportLocal.Strategy;


// Import of the routes
import indexRoutes from './routes/indexRoutes';
import typeRoutes from './routes/typeRoutes';
import categoryRoutes from './routes/categoryRoutes';
import stateMediaRoutes from './routes/stateMediaRoutes';
import userRoutes from './routes/userRoutes';
import mediaRoutes from './routes/mediaRoutes';
import referenceRoutes from './routes/referenceRoutes';

//test
import sessionRoutes from './routes/sessionRoute';
import { method } from 'bluebird';


class Server {

    public app: Application;

    constructor() {
        
        this.app = express();
        this.config();
        this.routes();
        require('./passport/local-auth');
    }

    config(): void {
        this.app.set('json spaces', 4);
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        //this.app.use(cors({credentials: true, origin: 'http://127.0.0.1:4200'}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser("SAME_SECRET"));
        this.app.use(session({
            secret: 'MaoParadise',
            resave: false,
            saveUninitialized: false,
            cookie: 
            { 
                httpOnly:true, 
                secure: false 
            }
        }));
        
        this.app.use(passport.initialize());
        this.app.use(passport.session()); 
        this.app.use(validator());

    }

    routes(): void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/types',typeRoutes);
        this.app.use('/api/categorys',categoryRoutes);
        this.app.use('/api/reference',referenceRoutes);
        this.app.use('/api/stateMedia',stateMediaRoutes);
        this.app.use('/api/users',userRoutes);
        this.app.use('/api/session',sessionRoutes);
        this.app.use('/api/media',mediaRoutes)
    }
    


    start(): void{
        this.app.listen(this.app.get('port'), () =>{
            console.log('server on port', this.app.get('port'));
        });
    }

    

    

}





const server = new Server();
server.start();