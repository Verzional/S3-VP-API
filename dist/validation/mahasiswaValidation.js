"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MahasiswaValidation = void 0;
const zod_1 = require("zod");
class MahasiswaValidation {
}
exports.MahasiswaValidation = MahasiswaValidation;
MahasiswaValidation.REGISTER = zod_1.z.object({
    nama: zod_1.z.string().min(1),
    nim: zod_1.z.string().min(1).max(20),
    mataKuliahId: zod_1.z.number().int().positive()
});
MahasiswaValidation.UPDATE = zod_1.z.object({
    nama: zod_1.z.string().min(1).optional(),
    nim: zod_1.z.string().min(1).max(20).optional(),
    mataKuliahId: zod_1.z.number().int().positive().optional()
});
