import { Router } from 'express';
import stateMediaController  from '../controllers/StateMediaControllers'

class StateMediaRoutes{

    public router: Router =  Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', stateMediaController.listStateMedia);
        this.router.get('/:id', stateMediaController.getStateMedia);
        this.router.post('/',stateMediaController.createStateMedia);
        this.router.delete('/:id', stateMediaController.deleteStateMedia);
        this.router.put('/:id', stateMediaController.updateStateMedia);
        
    }
}

const stateMediaRoutes = new StateMediaRoutes();
export default stateMediaRoutes.router;