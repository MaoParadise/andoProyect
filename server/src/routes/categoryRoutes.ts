import { Router } from 'express';
import categoryController  from '../controllers/categoryControllers'

class CategoryRoutes{

    public router: Router =  Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', categoryController.listCategoryMedia);
        this.router.get('/:id', categoryController.getCategoryMedia);
        this.router.post('/',categoryController.createCategoryMedia);
        this.router.delete('/:id', categoryController.deleteCategoryMedia);
        this.router.put('/:id', categoryController.updateCategoryMedia);
        
    }
}

const categoryRoutes = new CategoryRoutes();
export default categoryRoutes.router;