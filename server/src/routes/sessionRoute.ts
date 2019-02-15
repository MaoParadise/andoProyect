import { Router } from 'express';
import session from 'express-session';

const jwt = require('jsonwebtoken');
import { isLoggedIn, verifyToken } from '../passport/auth';


class SessionRoutes{

    public router: Router =  Router();
    public user: string = '';

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/logout', (req, res) => {
            req.logOut();
            res.json({message: `The User is logout` , success: false});
        });

        this.router.get('/profile', verifyToken, (req, res) => {
            res.json({message: `The User is LoggedIn` , success: true});
        });

        this.router.get('/success/:username', isLoggedIn, (req, res) => {
            const { user } = req.params;
            let payload = { subject : user}
            let token = jwt.sign(payload, 'MaoParadise')
            res.json(
                {message: `The User is LoggedIn` , 
                success: true, 
                user: req.params.username, 
                token});
        });

        this.router.get('/error', (req, res) => {
            res.json({message: `The User isn't validated ` , success: false});
        });
    }


    

}

const sessionRoutes = new SessionRoutes();
export default sessionRoutes.router;