import {Mahasiswa} from "@prisma/client"

export interface MahasiswaRequest {
    nama: string
    nim: string
    mataKuliahId: number
}

export interface MahasiswaResponse {
    id: number
    nama: string
    nim: string
    mataKuliahId: number
}

export function toMahasiswaResponse(mahasiswa: Mahasiswa): MahasiswaResponse {
    return {
        id: mahasiswa.id,
        nama: mahasiswa.nama,
        nim: mahasiswa.nim,
        mataKuliahId: mahasiswa.mataKuliahId
    }
}