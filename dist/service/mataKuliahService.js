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
exports.MataKuliahService = void 0;
const database_1 = require("../application/database");
const responseError_1 = require("../error/responseError");
const mataKuliahValidation_1 = require("../validation/mataKuliahValidation");
const validation_1 = require("../validation/validation");
const mataKuliahModel_1 = require("../model/mataKuliahModel");
class MataKuliahService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(mataKuliahValidation_1.MataKuliahValidation.REGISTER, request);
            const kodeUnik = yield database_1.prismaClient.mataKuliah.findFirst({
                where: {
                    kodeUnik: registerRequest.kodeUnik,
                },
            });
            if (kodeUnik) {
                throw new responseError_1.ResponseError(400, "Kode unik sudah terdaftar");
            }
            const mataKuliah = yield database_1.prismaClient.mataKuliah.create({
                data: registerRequest,
            });
            return mataKuliahModel_1.MataKuliahModel.toResponse(mataKuliah);
        });
    }
    static update(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(mataKuliahValidation_1.MataKuliahValidation.UPDATE, request);
            const existingMataKuliah = yield database_1.prismaClient.mataKuliah.findUnique({
                where: { id },
            });
            if (!existingMataKuliah) {
                throw new responseError_1.ResponseError(404, "Mata kuliah tidak ditemukan");
            }
            if (updateRequest.kodeUnik) {
                const kodeUnik = yield database_1.prismaClient.mataKuliah.findFirst({
                    where: {
                        kodeUnik: updateRequest.kodeUnik,
                        NOT: { id },
                    },
                });
                if (kodeUnik) {
                    throw new responseError_1.ResponseError(400, "Kode unik sudah terdaftar");
                }
            }
            const mataKuliah = yield database_1.prismaClient.mataKuliah.update({
                where: { id },
                data: updateRequest,
            });
            return mataKuliahModel_1.MataKuliahModel.toResponse(mataKuliah);
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const mataKuliah = yield database_1.prismaClient.mataKuliah.findUnique({
                where: { id },
                include: { mahasiswa: true },
            });
            if (!mataKuliah) {
                throw new responseError_1.ResponseError(404, "Mata kuliah tidak ditemukan");
            }
            return mataKuliahModel_1.MataKuliahModel.toResponse(mataKuliah);
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            const mataKuliahs = yield database_1.prismaClient.mataKuliah.findMany({
                include: { mahasiswa: true },
            });
            return mataKuliahs.map(mataKuliahModel_1.MataKuliahModel.toResponse);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingMataKuliah = yield database_1.prismaClient.mataKuliah.findUnique({
                where: { id },
            });
            if (!existingMataKuliah) {
                throw new responseError_1.ResponseError(404, "Mata kuliah tidak ditemukan");
            }
            yield database_1.prismaClient.mataKuliah.delete({
                where: { id },
            });
        });
    }
}
exports.MataKuliahService = MataKuliahService;
