import { Request, Response, NextFunction } from "express";
import { MahasiswaService } from "../service/mahasiswaService";

export class MahasiswaController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MahasiswaService.register(req.body);
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
      const result = await MahasiswaService.update(id, req.body);
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
      const result = await MahasiswaService.get(id);
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
      const result = await MahasiswaService.list();
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
      await MahasiswaService.delete(id);
      res.status(200).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}
