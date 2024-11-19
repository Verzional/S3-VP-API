import express from 'express';
import {MahasiswaController} from '../controller/mahasiswaController';
import {MataKuliahController} from '../controller/mataKuliahController';

export const api = express.Router();

api.post('/api/mahasiswa', MahasiswaController.register);
api.post('/api/mata-kuliah', MataKuliahController.register);