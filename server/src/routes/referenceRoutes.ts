import { Router } from 'express';
import referenceController  from '../controllers/referenceControllers';
import { isLoggedIn, verifyToken } from '../passport/auth';
class ReferenceRoutes{

    public router: Router =  Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/get/', referenceController.getReferencesMEDIA);
        this.router.post('/insert/', referenceController.insertReferenceMedia);
        this.router.put('/update/', referenceController.updateReferenceMedia);
    }
}

const referenceRoutes = new ReferenceRoutes();
export default referenceRoutes.router;