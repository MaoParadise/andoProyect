import { Request, Response } from 'express';

import pool from '../database';
import { json } from 'body-parser';

class MediaController{

    public async listMedia(req: Request ,res: Response){
        const media = await pool.query('SELECT * from media');
        res.json(media);
    } 

    public async getMediaLike(req: Request, res: Response): Promise<any> {
        const query = req.body.query;
        const media = await pool.query(`SELECT * FROM media WHERE media.TITLE LIKE '%${query}%' LIMIT 6`);
        console.log(media.length);
        if (media.length ==  0) {
            return res.status(404).json({ text: "The Media doesn't exits", boolean: false });
        }
        res.json(media);
        
    }

    public async createUpload(req: Request ,res: Response): Promise<void>{
        const email = req.body.email;
        const media = req.body.media;
        const numberEpisode = req.body.episode;
        const quality = req.body.quality;

        pool.query(`INSERT INTO upload VALUES ('${media.IDMEDIA}', '${email}', '${numberEpisode}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), '1')`,(error: Error)=>{
            if(error){
                res.json(
                    {
                        message: 'The Upload can not be becausa an unexpected error, check if the primary key is not duplicated ---',
                        success: false,
                        error: error
                    }); 
            }else{
                res.json(
                 {
                     message: 'the upload and the first Embed frame are Up !',
                     success: true 
                 }); 
            }
        }); 
    }

    public async createFrame(req: Request ,res: Response): Promise<void>{
        const id = req.body.id;
        const email = req.body.email;
        const numberEpisode = req.body.numberEpisode;
        const embedFrame = req.body.embedFrame;
        const quality = req.body.quality;
        console.log(`INSERT INTO embedframe
        VALUES (NULL, '${id}', '${email}', '${numberEpisode}',
        '${embedFrame}', NULL, '${quality}', '1')`);
        await pool.query(`INSERT INTO embedframe
                        VALUES (NULL, '${id}', '${email}', '${numberEpisode}',
                        '${embedFrame}', NULL, '${quality}', '1')`,(error: Error)=>{
            if(error){
                res.json(
                    {
                        message: 'The embed frame was not created becausa an unexpected error, check if the primary key is not duplicated',
                        success: false
                    }); 
            }else{
                res.json(
                {
                    message: 'the Embed frame was created',
                    success: true
                }); 
            }
        });    
    }

    public async updateFrame(req: Request ,res: Response): Promise<any>{
        const id = req.body.id;
        const embedFrame = req.body.embedFrame;
        const quality = req.body.quality;
        await pool.query(`UPDATE embedframe SET EMBEDFRAME = '${embedFrame}', QUALITY = '${quality}' WHERE embedframe.IDFRAME = ${id}`,(error: Error)=>{
            if(error){
                res.json(
                    {
                        message: 'The embed frame was not updated becausa an unexpected error',
                        success: false
                    }); 
            }else{
                res.json(
                {
                    message: 'the Embed frame was updated',
                    test: `UPDATE embedframe SET EMBEDFRAME = '${embedFrame}', QUALITY = '${quality}' WHERE embedframe.IDFRAME = ${id}`,
                    success: true
                }); 
            }
        });    
    }

    public async getMediaLibrary(req: Request, res: Response): Promise<any> {
        const {email} = req.params;
        const media = await pool.query(`SELECT * FROM media INNER JOIN upload ON media.IDMEDIA = upload.IDMEDIA WHERE upload.EMAIL = '${email}'`);
        console.log(media.length);
        if (media.length ==  0) {
            return res.status(404).json({ message: "The User dont have medias in the library", boolean: false });
        }
        res.json(media);
        
    }

    public async getEmbedFrames(req: Request, res: Response): Promise<any> {
        const id = req.body.id;
        const email = req.body.email;
        const numberEpisode = req.body.numberEpisode;
        const media = await pool.query(`SELECT * FROM (upload INNER JOIN embedframe 
            ON upload.IDMEDIA = embedframe.IDMEDIA AND upload.EMAIL = embedframe.EMAIL
            AND upload.NUMBEREPISODE = embedframe.NUMBEREPISODE)
            WHERE embedframe.IDMEDIA = '${id}' AND embedframe.EMAIL = '${email}' AND embedframe.NUMBEREPISODE = '${numberEpisode}' `);
        console.log(media.length);
        if (media.length ==  0) {
            return res.status(404).json({ message: "The request media dont have any embed frame to see", boolean: false });
        }
        res.json(media);
    }

    public async getPublicEmbedFrames(req: Request, res: Response): Promise<any> {
        const id = req.body.id;
        const numberEpisode = req.body.numberEpisode;
        const media = await pool.query(`SELECT * FROM (upload INNER JOIN embedframe
            ON upload.IDMEDIA = embedframe.IDMEDIA AND upload.EMAIL = embedframe.EMAIL 
            AND upload.NUMBEREPISODE = embedframe.NUMBEREPISODE) 
            WHERE embedframe.IDMEDIA = '${id}' AND embedframe.NUMBEREPISODE = '${numberEpisode}' ORDER BY upload.DATEUPLOAD ASC`);
        console.log(media.length);
        if (media.length ==  0) {
            return res.status(404).json({ message: "The request media dont have any embed frame to see", boolean: false });
        }
        res.json(media);
    }


    public async deleteEmbedFrames(req: Request ,res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM embedframe WHERE IDFRAME = ?', [id]);
        res.json({message: 'The Frame was deleted'});
    }

}

const mediaController = new MediaController();
export default mediaController;