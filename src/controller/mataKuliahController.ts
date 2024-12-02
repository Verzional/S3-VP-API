import { Request, Response, NextFunction } from "express";
import { MataKuliahService } from "../service/mataKuliahService";

export class MataKuliahController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MataKuliahService.register(req.body);
      res.status(201).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await MataKuliahService.update(id, req.body);
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await MataKuliahService.get(id);
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MataKuliahService.list();
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await MataKuliahService.delete(id);
      res.status(200).json({
        status: "success",
        message: "Mata kuliah berhasil dihapus",
      });
    } catch (error) {
      next(error);
    }
  }
}
