"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MahasiswaModel = void 0;
class MahasiswaModel {
    static toResponse(mahasiswa) {
        return {
            id: mahasiswa.id,
            nama: mahasiswa.nama,
            nim: mahasiswa.nim,
            mataKuliahId: mahasiswa.mataKuliahId,
        };
    }
}
exports.MahasiswaModel = MahasiswaModel;
