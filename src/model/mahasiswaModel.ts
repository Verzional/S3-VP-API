import {Mahasiswa} from "@prisma/client"

export interface MahasiswaReqRes {
    id? : number
    nama: string
    nim: string
}

export function toMahasiswaResponse(mahasiswa: Mahasiswa): MahasiswaReqRes {
    return {
        id: mahasiswa.id,
        nama: mahasiswa.nama,
        nim: mahasiswa.nim
    }
}