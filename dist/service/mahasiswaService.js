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
                    nim: registerRequest.nim
                }
            });
            if (nim) {
                throw new responseError_1.ResponseError(400, "NIM sudah terdaftar");
            }
            const mahasiswa = yield database_1.prismaClient.mahasiswa.create({
                data: {
                    nama: registerRequest.nama,
                    nim: registerRequest.nim
                }
            });
            return (0, mahasiswaModel_1.toMahasiswaResponse)(mahasiswa);
        });
    }
}
exports.MahasiswaService = MahasiswaService;
