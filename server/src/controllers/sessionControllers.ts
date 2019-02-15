import { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';

class SessionController{

    
    
    public async getSession(request: Request ,res: Response){


        res.json({ text: "The User doesn't exits", boolean: false });
    } 
}

const sessionController = new SessionController();
export default sessionController;