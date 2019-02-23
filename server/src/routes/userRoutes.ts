import { Router } from 'express';
import userController  from '../controllers/userControllers'
import session from 'express-session'; 
import passport from 'passport';
import cors from 'cors';
import pool from '../database';
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import { isLoggedIn, verifyToken } from '../passport/auth';

class UserRoutes{

    public router: Router =  Router();
    
    

    constructor() {
        this.config();
    }

    config(): void {
        //this.router.get('/', userController.listUser);
        this.router.get('/:id', verifyToken, userController.getUser);
        this.router.get('/alone/:id', verifyToken, userController.getUserAlone);
        this.router.post('/',userController.createUser);
        this.router.delete('/:id', verifyToken, userController.deleteUser);
        this.router.put('/:id', verifyToken, userController.updateUser);


        this.router.post('/auth/user/', cors(), (req, res, next) => {
            req.check('username', 'Username is Required').notEmpty();
            req.check('password', 'Password is Required').notEmpty();
            const errors = req.validationErrors();
            if (errors.length > 0) {
                res.json({message: `The user wasn't validated` , success: true});
            }else{
                req.login;
            }
            passport.authenticate('local.signin', {
              successRedirect: '/api/session/success/'+req.body.username,
              failureRedirect: '/api/session/error',
              failureFlash: true
            })(req, res, next);
          });

        this.router.get('/auth/session/', (req, res, next) =>{
            req.login;
            res.send('hecho ? ');
        });
        
          
    }

}

passport.serializeUser(function(username, done) {
    done(null, username);
});
      
passport.deserializeUser(function(username, done) {
    done(null, username)
});



const userRoutes = new UserRoutes();
export default userRoutes.router;