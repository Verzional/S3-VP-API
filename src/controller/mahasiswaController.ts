import {Request, Response, NextFunction} from 'express';
import {MahasiswaService} from '../service/mahasiswaService';
import {MahasiswaReqRes} from '../model/mahasiswaModel';

export class MahasiswaController{
    static async register(req: Request, res: Response, next: NextFunction){
        try{
            const mahasiswa = await MahasiswaService.register(req.body as MahasiswaReqRes);
            res.status(201).json(mahasiswa);
        }catch(err){
            next(err);
        }
    }
}