import { MataKuliah } from "@prisma/client";

export interface MataKuliahReqRes {
    id? : number
    nama: string
    kodeUnik: string
    namaDosen: string
    linkUrlImage: string
}

export function toMataKuliahResponse(mataKuliah: MataKuliah): MataKuliahReqRes {
    return {
        id: mataKuliah.id,
        nama: mataKuliah.nama,
        kodeUnik: mataKuliah.kodeUnik,
        namaDosen: mataKuliah.namaDosen,
        linkUrlImage: mataKuliah.linkUrlImage
    }
}