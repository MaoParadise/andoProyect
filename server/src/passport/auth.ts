
const jwt = require('jsonwebtoken');

export function isLoggedIn (req:any , res:any, next:any) {
    if (req.isAuthenticated()) {
        console.log('por aqui')
        return next();
    }
    
    return next();
    //return res.json({message: `The User isn't LoggedIn` , success: false});
}

export function verifyToken(req: any, res: any, next: any){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request >:( ')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request >:( ')
    }
    let payload = jwt.verify(token, 'MaoParadise');
    if(!payload) {
        return res.status(401).send('Unauthorized request >:( ')
    }
    req.user = payload.subject;
    next();
}


