import { Request, Response } from 'express';

import pool from '../database';
import { json } from 'body-parser';


class CategoryController{

    public async listCategoryMedia(req: Request ,res: Response){
        const category = await pool.query('SELECT * from category');
        res.json(category);
    } 

    public async getCategoryMedia(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const category = await pool.query('SELECT * FROM category WHERE IDCATEGORY = ?', [id]);
        console.log(category.length);
        if (category.length > 0) {
            return res.json(category[0]);
        }
        res.status(404).json({ text: "The Category doesn't exits" });
    }

    public async createCategoryMedia(req: Request ,res: Response): Promise<void>{
        await pool.query('INSERT INTO category set ?', [req.body])
        res.json({message: 'Category Saved '});
    }

    public async updateCategoryMedia(req: Request ,res: Response): Promise<any>{
        const { id } = req.params;
        await pool.query('UPDATE category set ? WHERE IDCATEGORY = ?', [req.body, id]);
        res.json({message: 'the Category was updated'}); 
    }

    public async deleteCategoryMedia(req: Request ,res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM category WHERE IDCATEGORY = ?', [id]);
        res.json({message: 'The Category was deleted'});
    }

    public async getCategoryLike(req: Request, res: Response): Promise<any> {
        const query = req.body.query;
        const media = await pool.query(`SELECT * FROM category WHERE category.NAMECATEGORY LIKE '%${query}%' OR category.DESCRIPTIONCATEGORY LIKE '%${query}%' LIMIT 6`);
        console.log(media.length);
        if (media.length ==  0) {
            //return res.status(404).json({ text: "The Category doesn't exits", boolean: false });
        }
        res.json(media);
    }

    public async createPreferencesUser(req: Request ,res: Response): Promise<void>{
        await pool.query(`INSERT INTO preference VALUES ('${req.body.email}', '${req.body.data}', CURRENT_TIMESTAMP)`);
        res.json({message: 'Preferences Saved '});
    }

    public async updatePreferences(req: Request ,res: Response): Promise<any>{
        const { id } = req.params;
        await pool.query('UPDATE preference set ? WHERE EMAIL = ?', [req.body, id]);
        res.json({message: 'the Preferences was updated'}); 
    }

    public async getPreferences(req: Request ,res: Response){
        const query = req.body.query;
        const preferences = await pool.query(`SELECT * from preference WHERE EMAIL = '${query}'`);
        res.json(preferences);
    }
    


}

const categoryController = new CategoryController();
export default categoryController;