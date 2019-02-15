import { Request, Response } from 'express';

import pool from '../database';
import { json } from 'body-parser';


class StateMediaController{

    public async listStateMedia(req: Request ,res: Response){
        const statemedia = await pool.query('SELECT * from statemedia');
        res.json(statemedia);
    } 

    public async getStateMedia(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const statemedia = await pool.query('SELECT * FROM statemedia WHERE IDSTATEMEDIA = ?', [id]);
        console.log(statemedia.length);
        if (statemedia.length > 0) {
            return res.json(statemedia[0]);
        }
        res.status(404).json({ text: "The State doesn't exits" });
    }

    public async createStateMedia(req: Request ,res: Response): Promise<void>{
        await pool.query('INSERT INTO statemedia set ?', [req.body])
        res.json({message: 'State Saved '});
    }

    public async updateStateMedia(req: Request ,res: Response): Promise<any>{
        const { id } = req.params;
        await pool.query('UPDATE statemedia set ? WHERE IDSTATEMEDIA = ?', [req.body, id]);
        res.json({message: 'the State was updated'}); 
    }

    public async deleteStateMedia(req: Request ,res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM statemedia WHERE IDSTATEMEDIA = ?', [id]);
        res.json({message: 'The State was deleted'});
    }


}

const stateMediaController = new StateMediaController();
export default stateMediaController;