import { MataKuliah } from "@prisma/client";

export interface MataKuliahRequest {
    nama: string
    kodeUnik: string
    namaDosen: string
    linkUrlImage: string
}

export interface MataKuliahResponse {
    id: number
    nama: string
    kodeUnik: string
    namaDosen: string
    linkUrlImage: string
}

// export function toMataKuliahResponse(mataKuliah: MataKuliah): MataKuliahReqRes {
//     return {
//         nama: mataKuliah.nama,
//         kodeUnik: mataKuliah.kodeUnik,
//         namaDosen: mataKuliah.namaDosen,
//         linkUrlImage: mataKuliah.linkUrlImage
//     }
// }