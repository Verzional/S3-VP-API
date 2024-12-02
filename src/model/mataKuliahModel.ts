import { MataKuliah, Mahasiswa } from "@prisma/client";
import { MahasiswaResponse } from "./mahasiswaModel";

export interface MataKuliahRequest {
    nama: string;
    kodeUnik: string;
    namaDosen: string;
    linkUrlImage: string;
}

export interface MataKuliahResponse {
    id: number;
    nama: string;
    kodeUnik: string;
    namaDosen: string;
    linkUrlImage: string;
    mahasiswa?: MahasiswaResponse[];
}

export class MataKuliahModel {
    static toResponse(mataKuliah: MataKuliah & { mahasiswa?: Mahasiswa[] }): MataKuliahResponse {
        return {
            id: mataKuliah.id,
            nama: mataKuliah.nama,
            kodeUnik: mataKuliah.kodeUnik,
            namaDosen: mataKuliah.namaDosen,
            linkUrlImage: mataKuliah.linkUrlImage,
            mahasiswa: mataKuliah.mahasiswa 
        };
    }
}