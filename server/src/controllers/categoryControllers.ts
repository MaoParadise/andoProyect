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
        const insertObj = req.body;
        let insertString = `INSERT INTO preference VALUES `
        for(let i = 0; i < insertObj.length; i++){
            if(i == insertObj.length-1){
                insertString = insertString + `('${insertObj[i].EMAIL}', ${insertObj[i].IDCATEGORY}, CURRENT_TIMESTAMP)`
            }else{
                insertString = insertString + `('${insertObj[i].EMAIL}', ${insertObj[i].IDCATEGORY}, CURRENT_TIMESTAMP),`
            }
        }
        console.log(insertString);
        //await pool.query(insertString);
        res.json({message: 'Preferences Saved '});
    }

    public async makePreferencesUser(req: Request ,res: Response): Promise<void>{
        const insertObj = req.body;
        let insertString = `INSERT INTO category VALUES `
         for(let i = 0; i < insertObj.length; i++){
             if(i == insertObj.length-1){
                 insertString = insertString + `( NULL ,'${insertObj[i].NAMECATEGORY}', '${insertObj[i].NAMECATEGORY}', '${insertObj[i].INSERTMETHOD}')`
            }else{
                 insertString = insertString + `( NULL ,'${insertObj[i].NAMECATEGORY}', '${insertObj[i].NAMECATEGORY}', '${insertObj[i].INSERTMETHOD}'),`
             }
         }
        //console.log(insertString);
        await pool.query(insertString);
        res.json({message: 'Paquet Category Saved '});
    }
    
 

}

const categoryController = new CategoryController();
export default categoryController;