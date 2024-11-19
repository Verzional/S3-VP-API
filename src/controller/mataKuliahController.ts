import { Request, Response, NextFunction } from "express";
import { MataKuliahService } from "../service/mataKuliahService";
import { MataKuliahReqRes } from "../model/mataKuliahModel";

export class MataKuliahController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const mataKuliah = await MataKuliahService.register(req.body as MataKuliahReqRes);
            res.status(201).json(mataKuliah);
        } catch (err) {
            next(err);
        }
    }
}