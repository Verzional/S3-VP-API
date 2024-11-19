import { Mahasiswa } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/responseError";
import { MahasiswaValidation } from "../validation/mahasiswaValidation";
import { Validation } from "../validation/validation";
import {
    MahasiswaReqRes,
    toMahasiswaResponse
} from "../model/mahasiswaModel";

export class MahasiswaService {
    static async register(request: MahasiswaReqRes): Promise<MahasiswaReqRes> {
        const registerRequest = Validation.validate(
            MahasiswaValidation.REGISTER,
            request
        )

        const nim = await prismaClient.mahasiswa.findFirst({
            where: {
                nim: registerRequest.nim
            }
        })

        if (nim) {
            throw new ResponseError(400, "NIM sudah terdaftar")
        }

        const mahasiswa = await prismaClient.mahasiswa.create({
            data: {
                nama: registerRequest.nama,
                nim: registerRequest.nim
            }
        })

        return toMahasiswaResponse(mahasiswa)
    }
}