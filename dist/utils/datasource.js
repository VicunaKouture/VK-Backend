"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ds = void 0;
const config_1 = require("../config/config");
const typeorm_1 = require("typeorm");
const sample_model_1 = require("../models/sample.model");
exports.ds = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.DB_HOST,
    port: config_1.DB_PORT,
    username: config_1.DB_USERNAME,
    password: config_1.DB_PASSWORD,
    database: config_1.DATABASE,
    entities: [sample_model_1.Sample],
    logging: true,
    synchronize: true,
});
