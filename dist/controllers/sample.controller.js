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
exports.sampleController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const sample_dto_1 = require("../dtos/sample.dto");
const sample_repo_1 = require("../repos/sample.repo");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const samples = yield sample_repo_1.sampleRepo.getAll();
        return res.status(200).json({
            status: true,
            data: samples,
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sample = yield sample_repo_1.sampleRepo.getById(req.params.id);
        if (!sample) {
            return res.status(404).json({
                status: false,
                message: "Sample not found",
            });
        }
        return res.status(200).json({
            status: true,
            data: sample,
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sample = (0, class_transformer_1.plainToClass)(sample_dto_1.AddSampleDto, req.body);
        const errors = yield (0, class_validator_1.validate)(sample);
        if (errors.length > 0) {
            return res.status(400).json({
                status: false,
                message: "Bad Request",
                error: errors,
            });
        }
        const newSample = yield sample_repo_1.sampleRepo.add(sample);
        return res.status(201).json({
            status: true,
            data: newSample,
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sample = (0, class_transformer_1.plainToClass)(sample_dto_1.UpdateSampleDto, req.body);
        const errors = yield (0, class_validator_1.validate)(sample);
        if (errors.length > 0) {
            return res.status(400).json({
                status: false,
                message: "Bad Request",
                error: errors,
            });
        }
        const sampleExists = yield sample_repo_1.sampleRepo.getById(sample.id);
        if (!sampleExists) {
            return res.status(404).json({
                status: false,
                message: "Sample not found",
            });
        }
        const updatedSample = yield sample_repo_1.sampleRepo.update(sample);
        return res.status(200).json({
            status: true,
            data: updatedSample,
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sampleExists = yield sample_repo_1.sampleRepo.getById(req.query.id);
        if (!sampleExists) {
            return res.status(404).json({
                status: false,
                message: "Sample not found",
            });
        }
        yield sample_repo_1.sampleRepo.remove(req.query.id);
        return res.status(200).json({
            status: true,
            message: "Sample deleted successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
});
exports.sampleController = {
    getAll,
    getById,
    create,
    update,
    remove,
};
