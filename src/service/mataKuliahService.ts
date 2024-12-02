import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/responseError";
import { MataKuliahValidation } from "../validation/mataKuliahValidation";
import { Validation } from "../validation/validation";
import {
  MataKuliahModel,
  MataKuliahRequest,
  MataKuliahResponse,
} from "../model/mataKuliahModel";

export class MataKuliahService {
  static async register(
    request: MataKuliahRequest
  ): Promise<MataKuliahResponse> {
    const registerRequest = Validation.validate(
      MataKuliahValidation.REGISTER,
      request
    );

    const kodeUnik = await prismaClient.mataKuliah.findFirst({
      where: {
        kodeUnik: registerRequest.kodeUnik,
      },
    });

    if (kodeUnik) {
      throw new ResponseError(400, "Kode unik sudah terdaftar");
    }

    const mataKuliah = await prismaClient.mataKuliah.create({
      data: registerRequest,
    });

    return MataKuliahModel.toResponse(mataKuliah);
  }

  static async update(
    id: number,
    request: Partial<MataKuliahRequest>
  ): Promise<MataKuliahResponse> {
    const updateRequest = Validation.validate(
      MataKuliahValidation.UPDATE,
      request
    );

    const existingMataKuliah = await prismaClient.mataKuliah.findUnique({
      where: { id },
    });

    if (!existingMataKuliah) {
      throw new ResponseError(404, "Mata kuliah tidak ditemukan");
    }

    if (updateRequest.kodeUnik) {
      const kodeUnik = await prismaClient.mataKuliah.findFirst({
        where: {
          kodeUnik: updateRequest.kodeUnik,
          NOT: { id },
        },
      });

      if (kodeUnik) {
        throw new ResponseError(400, "Kode unik sudah terdaftar");
      }
    }

    const mataKuliah = await prismaClient.mataKuliah.update({
      where: { id },
      data: updateRequest,
    });

    return MataKuliahModel.toResponse(mataKuliah);
  }

  static async get(id: number): Promise<MataKuliahResponse> {
    const mataKuliah = await prismaClient.mataKuliah.findUnique({
      where: { id },
      include: { mahasiswa: true },
    });

    if (!mataKuliah) {
      throw new ResponseError(404, "Mata kuliah tidak ditemukan");
    }

    return MataKuliahModel.toResponse(mataKuliah);
  }

  static async list(): Promise<MataKuliahResponse[]> {
    const mataKuliahs = await prismaClient.mataKuliah.findMany({
      include: { mahasiswa: true },
    });

    return mataKuliahs.map(MataKuliahModel.toResponse);
  }

  static async delete(id: number): Promise<void> {
    const existingMataKuliah = await prismaClient.mataKuliah.findUnique({
      where: { id },
    });

    if (!existingMataKuliah) {
      throw new ResponseError(404, "Mata kuliah tidak ditemukan");
    }

    await prismaClient.mataKuliah.delete({
      where: { id },
    });
  }
}
