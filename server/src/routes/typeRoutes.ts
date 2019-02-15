import { Router } from 'express';
import typeController  from '../controllers/typeControllers'

class TypeRoutes{

    public router: Router =  Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', typeController.listTypesMedia);
        this.router.get('/:id', typeController.getTypesMedia);
        this.router.post('/',typeController.createTypesMedia);
        this.router.delete('/:id', typeController.deleteTypesMedia);
        this.router.put('/:id', typeController.updateTypesMedia);
        
    }
}

const typeRoutes = new TypeRoutes();
export default typeRoutes.router;