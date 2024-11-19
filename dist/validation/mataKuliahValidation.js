"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MataKuliahValidation = void 0;
const zod_1 = require("zod");
class MataKuliahValidation {
}
exports.MataKuliahValidation = MataKuliahValidation;
MataKuliahValidation.REGISTER = zod_1.z.object({
    nama: zod_1.z.string().min(1),
    kodeUnik: zod_1.z.string().min(1),
    namaDosen: zod_1.z.string().min(1),
    linkUrlImage: zod_1.z.string().min(1)
});
