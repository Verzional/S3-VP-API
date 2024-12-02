"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MataKuliahModel = void 0;
class MataKuliahModel {
    static toResponse(mataKuliah) {
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
exports.MataKuliahModel = MataKuliahModel;
