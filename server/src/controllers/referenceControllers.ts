import { Request, Response } from 'express';

import pool from '../database';
import { json } from 'body-parser';


class ReferenceController{
    public async getReferencesMEDIA(req: Request, res: Response): Promise<any> {
        const IDMEDIA = req.body.IDMEDIA;
        const EMAIL = req.body.EMAIL;
        const reference = await pool.query(`SELECT * FROM referenceupload WHERE IDMEDIA = ? AND EMAIL = ?`, [IDMEDIA,EMAIL]);
        console.log(reference.length);
        if (reference.length > 0) {
            return res.json(reference[0]);
        }
        res.status(404).json({ text: "The Reference doesn't exits" });
    }

    public async insertReferenceMedia(req: Request ,res: Response): Promise<void>{
        await pool.query(`INSERT INTO referenceupload VALUES ('${req.body.IDMEDIA}', '${req.body.EMAIL}', '${req.body.REFERENCEUPLOADSTRING}')`);
        res.json({message: 'Reference Saved '});
    }

    public async updateReferenceMedia(req: Request ,res: Response): Promise<any>{
        await pool.query(`UPDATE referenceupload SET REFERENCEUPLOADSTRING = '${req.body.REFERENCEUPLOADSTRING}' WHERE referenceupload.IDMEDIA = ${req.body.IDMEDIA} AND referenceupload.EMAIL = '${req.body.EMAIL}'`);
        res.json({message: 'the Reference was updated'}); 
    }

}

const referenceController = new ReferenceController();
export default referenceController;