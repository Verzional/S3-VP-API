import express from 'express';
import {MahasiswaController} from '../controller/mahasiswaController';
import {MataKuliahController} from '../controller/mataKuliahController';

export const api = express.Router();

api.post('/api/mahasiswa', MahasiswaController.register);
api.put('/api/mahasiswa/:id', MahasiswaController.update);
api.get('/api/mahasiswa/:id', MahasiswaController.get);
api.get('/api/mahasiswa', MahasiswaController.list);
api.delete('/api/mahasiswa/:id', MahasiswaController.delete);

api.post('/api/mata-kuliah', MataKuliahController.register);
api.put('/api/mata-kuliah/:id', MataKuliahController.update);
api.get('/api/mata-kuliah/:id', MataKuliahController.get);
api.get('/api/mata-kuliah', MataKuliahController.list);
api.delete('/api/mata-kuliah/:id', MataKuliahController.delete);