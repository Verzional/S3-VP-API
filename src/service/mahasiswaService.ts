import { prismaClient } from "../application/database";
import { ResponseError } from "../error/responseError";
import { MahasiswaValidation } from "../validation/mahasiswaValidation";
import { Validation } from "../validation/validation";
import {
  MahasiswaModel,
  MahasiswaRequest,
  MahasiswaResponse,
} from "../model/mahasiswaModel";

export class MahasiswaService {
  static async register(request: MahasiswaRequest): Promise<MahasiswaResponse> {
    const registerRequest = Validation.validate(
      MahasiswaValidation.REGISTER,
      request
    );

    const nim = await prismaClient.mahasiswa.findFirst({
      where: {
        nim: registerRequest.nim,
      },
    });

    if (nim) {
      throw new ResponseError(400, "NIM sudah terdaftar");
    }

    const mataKuliah = await prismaClient.mataKuliah.findUnique({
      where: {
        id: registerRequest.mataKuliahId,
      },
    });

    if (!mataKuliah) {
      throw new ResponseError(404, "Mata kuliah tidak ditemukan");
    }

    const mahasiswa = await prismaClient.mahasiswa.create({
      data: {
        nama: registerRequest.nama,
        nim: registerRequest.nim,
        mataKuliahId: registerRequest.mataKuliahId
      },
    });

    return MahasiswaModel.toResponse(mahasiswa);
  }

  static async update(
    id: number,
    request: Partial<MahasiswaRequest>
  ): Promise<MahasiswaResponse> {
    const updateRequest = Validation.validate(
      MahasiswaValidation.UPDATE,
      request
    );

    const existingMahasiswa = await prismaClient.mahasiswa.findUnique({
      where: { id },
    });

    if (!existingMahasiswa) {
      throw new ResponseError(404, "Mahasiswa tidak ditemukan");
    }

    if (updateRequest.nim) {
      const nim = await prismaClient.mahasiswa.findFirst({
        where: {
          nim: updateRequest.nim,
          NOT: { id },
        },
      });

      if (nim) {
        throw new ResponseError(400, "NIM sudah terdaftar");
      }
    }

    if (updateRequest.mataKuliahId) {
      const mataKuliah = await prismaClient.mataKuliah.findUnique({
        where: {
          id: updateRequest.mataKuliahId,
        },
      });

      if (!mataKuliah) {
        throw new ResponseError(404, "Mata kuliah tidak ditemukan");
      }
    }

    const mahasiswa = await prismaClient.mahasiswa.update({
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

    return MahasiswaModel.toResponse(mahasiswa);
  }

  static async get(id: number): Promise<MahasiswaResponse> {
    const mahasiswa = await prismaClient.mahasiswa.findUnique({
      where: { id },
      include: {
        mataKuliah: true,
      },
    });

    if (!mahasiswa) {
      throw new ResponseError(404, "Mahasiswa tidak ditemukan");
    }

    return MahasiswaModel.toResponse(mahasiswa);
  }

  static async getAll(): Promise<MahasiswaResponse[]> {
    const mahasiswas = await prismaClient.mahasiswa.findMany({
      include: {
        mataKuliah: true,
      },
    });

    return mahasiswas.map(MahasiswaModel.toResponse);
  }

  static async delete(id: number): Promise<void> {
    const existingMahasiswa = await prismaClient.mahasiswa.findUnique({
      where: { id },
    });

    if (!existingMahasiswa) {
      throw new ResponseError(404, "Mahasiswa tidak ditemukan");
    }

    await prismaClient.mahasiswa.delete({
      where: { id },
    });
  }
}
