import { Router } from 'express';
import categoryController  from '../controllers/categoryControllers';
import { isLoggedIn, verifyToken } from '../passport/auth';
class CategoryRoutes{

    public router: Router =  Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', categoryController.listCategoryMedia);
        this.router.get('/:id', categoryController.getCategoryMedia);
        this.router.post('/search/', categoryController.getCategoryLike)
        this.router.post('/', verifyToken, categoryController.createCategoryMedia);
        this.router.post('/preference/', verifyToken, categoryController.createPreferencesUser);
        this.router.post('/get/preference/', verifyToken, categoryController.getPreferences);
        this.router.delete('/:id', verifyToken, categoryController.deleteCategoryMedia);
        this.router.put('/:id', verifyToken, categoryController.updateCategoryMedia);
        this.router.put('/preference/:id', verifyToken, categoryController.updatePreferences);
        
    }
}

const categoryRoutes = new CategoryRoutes();
export default categoryRoutes.router;