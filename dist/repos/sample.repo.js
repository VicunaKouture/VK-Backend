"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleRepo = void 0;
const sample_model_1 = require("../models/sample.model");
const datasource_1 = require("../utils/datasource");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield datasource_1.ds.getRepository(sample_model_1.Sample).find();
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield datasource_1.ds.getRepository(sample_model_1.Sample).findOne({
        where: {
            id,
        },
    });
});
const add = (sample) => __awaiter(void 0, void 0, void 0, function* () {
    return yield datasource_1.ds.getRepository(sample_model_1.Sample).save(sample);
});
const update = (sample) => __awaiter(void 0, void 0, void 0, function* () {
    return yield datasource_1.ds.getRepository(sample_model_1.Sample).save(sample);
});
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield datasource_1.ds.getRepository(sample_model_1.Sample).delete(id);
});
exports.sampleRepo = {
    getAll,
    getById,
    add,
    update,
    remove,
};
