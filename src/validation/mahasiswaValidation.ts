import {z, ZodType} from "zod";

export class MahasiswaValidation {
    static readonly REGISTER: ZodType = z.object({
        nama: z.string().min(1),
        nim: z.string().min(1).max(20)
    });
}