import { z, ZodType } from "zod";

export class MataKuliahValidation {
  static readonly REGISTER: ZodType = z.object({
    nama: z.string().min(1),
    kodeUnik: z.string().min(1),
    namaDosen: z.string().min(1),
    linkUrlImage: z.string().min(1),
  });
  static readonly UPDATE: ZodType = z.object({
    nama: z.string().min(1),
    kodeUnik: z.string().min(1),
    namaDosen: z.string().min(1),
    linkUrlImage: z.string().min(1),
  });
}
