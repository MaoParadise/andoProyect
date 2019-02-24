import { Request, Response, response } from 'express';

import pool from '../database';
import { json } from 'body-parser';
import passport from 'passport';

const jwt = require('jsonwebtoken');

import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;


import bcrypt from 'bcrypt-nodejs';
import { error } from 'util';


class UserController{

    

    public async listUser(req: Request ,res: Response){
        const category = await pool.query('SELECT EMAIL,USER,PUBLICNAME,URLPROFILEPICTURE,ACTIVEPROFILE from user');
        res.json(category);
    } 

    public async getUser(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const category = 
        await pool.query(`SELECT user.EMAIL,user.USER,user.PUBLICNAME,user.URLPROFILEPICTURE,user.ACTIVEPROFILE,preference.PREFERENCESTRING FROM user INNER JOIN preference ON user.EMAIL = preference.EMAIL WHERE user.EMAIL = '${id}' OR user.USER = '${id}'`);
        console.log(category.length);
        if (category.length > 0) {
            return res.json(category[0]);
        }else{
            const category = await pool.query(`SELECT user.EMAIL,user.USER,user.PUBLICNAME,user.URLPROFILEPICTURE,user.ACTIVEPROFILE FROM user WHERE user.EMAIL = '${id}' OR user.USER = '${id}'`);
            if (category.length > 0) {
                return res.json(category[0]);
            }
        }
        res.status(404).json({ text: "The User doesn't exits", boolean: false });
    }

    public async getUserAlone(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const category = await pool.query(`SELECT user.EMAIL,user.USER,user.PUBLICNAME,user.URLPROFILEPICTURE,user.ACTIVEPROFILE FROM user WHERE user.EMAIL = '${id}' OR user.USER = '${id}'`);
        console.log(category.length);
        if (category.length > 0) {
            return res.json(category[0]);
        }
        res.status(404).json({ text: "The User doesn't exits", boolean: false });
    }


    public async createUser(req: Request ,res: Response): Promise<void>{

        const encrypted = bcrypt.hashSync(req.body.PASSWORD, bcrypt.genSaltSync(10));

        await pool.query(`INSERT INTO user VALUES ('${req.body.EMAIL}', '${req.body.USER}', '${encrypted}', '${req.body.PUBLICNAME}', '${req.body.URLPROFILEPICTURE}', 0)`,(error: Error)=>{
            if(error){
                res.json(
                    {
                        message: 'The User was not created becausa an unexpected error, check if the primary key is not duplicated',
                        success: false
                    }); 
            }else{
                let payload = { subject : req.body.user }
                let token =  jwt.sign(payload, 'MaoParadise')
                res.json(
                {
                    message: 'the User was created',
                    success: true,
                    user: req.body.USER,   
                    token
                }); 
            }
        });

        

            
        
        
    }

    public async updateUser(req: Request ,res: Response): Promise<any>{
        const { id } = req.params;
        await pool.query('UPDATE user set ? WHERE EMAIL = ?', [req.body, id]);
        res.json({message: 'the User was updated'}); 
    }

    public async deleteUser(req: Request ,res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM user WHERE EMAIL = ?', [id]);
        res.json({message: 'The User was deleted'});
    }

}

const userController = new UserController();
export default userController;