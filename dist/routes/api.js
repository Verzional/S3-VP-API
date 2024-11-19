"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const mahasiswaController_1 = require("../controller/mahasiswaController");
const mataKuliahController_1 = require("../controller/mataKuliahController");
exports.api = express_1.default.Router();
exports.api.post('/api/mahasiswa', mahasiswaController_1.MahasiswaController.register);
exports.api.post('/api/mata-kuliah', mataKuliahController_1.MataKuliahController.register);
