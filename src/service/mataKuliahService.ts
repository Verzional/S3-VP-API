import { MataKuliah } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/responseError";
import { MataKuliahValidation } from "../validation/mataKuliahValidation";
import { Validation } from "../validation/validation";
import {
    MataKuliahReqRes,
    toMataKuliahResponse
} from "../model/mataKuliahModel";

export class MataKuliahService {
    static async register(request: MataKuliahReqRes): Promise<MataKuliahReqRes> {
        const registerRequest = Validation.validate(
            MataKuliahValidation.REGISTER,
            request
        )

        const kodeUnik = await prismaClient.mataKuliah.findFirst({
            where: {
                kodeUnik: registerRequest.kodeUnik
            }
        })

        if (kodeUnik) {
            throw new ResponseError(400, "Kode unik sudah terdaftar")
        }

        const mataKuliah = await prismaClient.mataKuliah.create({
            data: {
                nama: registerRequest.nama,
                kodeUnik: registerRequest.kodeUnik,
                namaDosen: registerRequest.namaDosen,
                linkUrlImage: registerRequest.linkUrlImage
            }
        })

        return toMataKuliahResponse(mataKuliah)
    }
}