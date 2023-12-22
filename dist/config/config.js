"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = Number(process.env.DB_PORT);
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DATABASE = process.env.DATABASE;