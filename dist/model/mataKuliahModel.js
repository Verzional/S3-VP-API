"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMataKuliahResponse = toMataKuliahResponse;
function toMataKuliahResponse(mataKuliah) {
    return {
        id: mataKuliah.id,
        nama: mataKuliah.nama,
        kodeUnik: mataKuliah.kodeUnik,
        namaDosen: mataKuliah.namaDosen,
        linkUrlImage: mataKuliah.linkUrlImage
    };
}
