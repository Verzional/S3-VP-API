import { Mahasiswa, MataKuliah } from "@prisma/client";

export interface MahasiswaRequest {
    nama: string;
    nim: string;
    mataKuliahId: number;
}

export interface MahasiswaResponse {
    id: number;
    nama: string;
    nim: string;
    mataKuliahId: number;
}

export class MahasiswaModel {
    static toResponse(mahasiswa: Mahasiswa & { mataKuliah?: MataKuliah }): MahasiswaResponse {
        return {
            id: mahasiswa.id,
            nama: mahasiswa.nama,
            nim: mahasiswa.nim,
            mataKuliahId: mahasiswa.mataKuliahId,
        };
    }
}