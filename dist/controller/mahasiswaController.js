"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MahasiswaController = void 0;
const mahasiswaService_1 = require("../service/mahasiswaService");
class MahasiswaController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield mahasiswaService_1.MahasiswaService.register(req.body);
                res.status(201).json({
                    status: "success",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield mahasiswaService_1.MahasiswaService.update(id, req.body);
                res.status(200).json({
                    status: "success",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield mahasiswaService_1.MahasiswaService.get(id);
                res.status(200).json({
                    status: "success",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield mahasiswaService_1.MahasiswaService.list();
                res.status(200).json({
                    status: "success",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield mahasiswaService_1.MahasiswaService.delete(id);
                res.status(200).json({
                    status: "success",
                    data: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.MahasiswaController = MahasiswaController;
