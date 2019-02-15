import { Request, Response } from 'express';

import pool from '../database';
import { json } from 'body-parser';


class TypeController{

    public async listTypesMedia(req: Request ,res: Response){
        const types = await pool.query('SELECT * from type');
        res.json(types);
    } 

    public async getTypesMedia(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const type = await pool.query('SELECT * FROM type WHERE IDTYPE = ?', [id]);
        console.log(type.length);
        if (type.length > 0) {
            return res.json(type[0]);
        }
        res.status(404).json({ text: "The Type doesn't exits" });
    }

    public async createTypesMedia(req: Request ,res: Response): Promise<void>{
        await pool.query('INSERT INTO type set ?', [req.body])
        res.json({message: 'Type Saved '});
    }

    public async updateTypesMedia(req: Request ,res: Response): Promise<any>{
        const { id } = req.params;
        await pool.query('UPDATE type set ? WHERE IDTYPE = ?', [req.body, id]);
        res.json({message: 'the Type was updated'}); 
    }

    public async deleteTypesMedia(req: Request ,res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM type WHERE IDTYPE = ?', [id]);
        res.json({message: 'The Type was deleted'});
    }


}

const typeController = new TypeController();
export default typeController;