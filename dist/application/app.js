"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../routes/api");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(api_1.api);
exports.default = app;
