import { Router } from 'express';
import mediaController  from '../controllers/mediaControllers'
import { isLoggedIn, verifyToken } from '../passport/auth';

class MediaRoutes{

    public router: Router =  Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', mediaController.listMedia );

        this.router.post('/search/', verifyToken, mediaController.getMediaLike);

        this.router.post('/upload/', verifyToken, mediaController.createUpload);

        this.router.post('/uploadEmbed/', verifyToken, mediaController.createFrame);

        this.router.get('/library/:email', mediaController.getMediaLibrary);

        this.router.post('/embed/', verifyToken, mediaController.getEmbedFrames);
        
    }
}

const mediaRoutes = new MediaRoutes();
export default mediaRoutes.router;