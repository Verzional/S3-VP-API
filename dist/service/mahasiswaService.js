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
exports.MahasiswaService = void 0;
const database_1 = require("../application/database");
const responseError_1 = require("../error/responseError");
const mahasiswaValidation_1 = require("../validation/mahasiswaValidation");
const validation_1 = require("../validation/validation");
const mahasiswaModel_1 = require("../model/mahasiswaModel");
class MahasiswaService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(mahasiswaValidation_1.MahasiswaValidation.REGISTER, request);
            const nim = yield database_1.prismaClient.mahasiswa.findFirst({
                where: {
                    nim: registerRequest.nim,
                },
            });
            if (nim) {
                throw new responseError_1.ResponseError(400, "NIM sudah terdaftar");
            }
            const mataKuliah = yield database_1.prismaClient.mataKuliah.findUnique({
                where: {
                    id: registerRequest.mataKuliahId,
                },
            });
            if (!mataKuliah) {
                throw new responseError_1.ResponseError(404, "Mata kuliah tidak ditemukan");
            }
            const mahasiswa = yield database_1.prismaClient.mahasiswa.create({
                data: {
                    nama: registerRequest.nama,
                    nim: registerRequest.nim,
                    mataKuliahId: registerRequest.mataKuliahId
                },
            });
            return mahasiswaModel_1.MahasiswaModel.toResponse(mahasiswa);
        });
    }
    static update(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(mahasiswaValidation_1.MahasiswaValidation.UPDATE, request);
            const existingMahasiswa = yield database_1.prismaClient.mahasiswa.findUnique({
                where: { id },
            });
            if (!existingMahasiswa) {
                throw new responseError_1.ResponseError(404, "Mahasiswa tidak ditemukan");
            }
            if (updateRequest.nim) {
                const nim = yield database_1.prismaClient.mahasiswa.findFirst({
                    where: {
                        nim: updateRequest.nim,
                        NOT: { id },
                    },
                });
                if (nim) {
                    throw new responseError_1.ResponseError(400, "NIM sudah terdaftar");
                }
            }
            if (updateRequest.mataKuliahId) {
                const mataKuliah = yield database_1.prismaClient.mataKuliah.findUnique({
                    where: {
                        id: updateRequest.mataKuliahId,
                    },
                });
                if (!mataKuliah) {
                    throw new responseError_1.ResponseError(404, "Mata kuliah tidak ditemukan");
                }
            }
            const mahasiswa = yield database_1.prismaClient.mahasiswa.update({
                where: { id },
                data: {
                    nama: updateRequest.nama,
                    nim: updateRequest.nim,
                    mataKuliah: updateRequest.mataKuliahId
                        ? {
                            connect: {
                                id: updateRequest.mataKuliahId,
                            },
                        }
                        : undefined,
                },
                include: {
                    mataKuliah: true,
                },
            });
            return mahasiswaModel_1.MahasiswaModel.toResponse(mahasiswa);
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const mahasiswa = yield database_1.prismaClient.mahasiswa.findUnique({
                where: { id },
                include: {
                    mataKuliah: true,
                },
            });
            if (!mahasiswa) {
                throw new responseError_1.ResponseError(404, "Mahasiswa tidak ditemukan");
            }
            return mahasiswaModel_1.MahasiswaModel.toResponse(mahasiswa);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const mahasiswas = yield database_1.prismaClient.mahasiswa.findMany();
            return mahasiswas.map(mahasiswaModel_1.MahasiswaModel.toResponse);
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            const mahasiswas = yield database_1.prismaClient.mahasiswa.findMany({
                include: {
                    mataKuliah: true,
                },
            });
            return mahasiswas.map(mahasiswaModel_1.MahasiswaModel.toResponse);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingMahasiswa = yield database_1.prismaClient.mahasiswa.findUnique({
                where: { id },
            });
            if (!existingMahasiswa) {
                throw new responseError_1.ResponseError(404, "Mahasiswa tidak ditemukan");
            }
            yield database_1.prismaClient.mahasiswa.delete({
                where: { id },
            });
        });
    }
}
exports.MahasiswaService = MahasiswaService;
