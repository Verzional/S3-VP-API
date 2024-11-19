"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMahasiswaResponse = toMahasiswaResponse;
function toMahasiswaResponse(mahasiswa) {
    return {
        id: mahasiswa.id,
        nama: mahasiswa.nama,
        nim: mahasiswa.nim
    };
}
