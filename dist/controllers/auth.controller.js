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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const auth_dto_1 = require("../dtos/auth.dto");
const user_repo_1 = require("../repos/user.repo");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, class_transformer_1.plainToClass)(auth_dto_1.RegisterUserDto, req.body);
        const errors = yield (0, class_validator_1.validate)(user);
        if (errors.length > 0) {
            return res.status(400).json({
                status: false,
                message: "Bad Request",
                error: errors,
            });
        }
        const existingUser = yield user_repo_1.userRepo.getByEmail(user.email);
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "Bad Request",
                error: "Email already exists",
            });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(user.password, salt);
        user.password = hashedPassword;
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.TOKEN_SECRET);
        const newUser = yield user_repo_1.userRepo.register(user);
        return res.status(201).json({
            status: true,
            data: newUser,
            token: token,
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, class_transformer_1.plainToClass)(auth_dto_1.LoginUserDto, req.body);
        const errors = yield (0, class_validator_1.validate)(user);
        if (errors.length > 0) {
            return res.status(400).json({
                status: false,
                message: "Bad Request",
                error: errors,
            });
        }
        const existingUser = yield user_repo_1.userRepo.getByEmail(user.email);
        if (!existingUser) {
            return res.status(400).json({
                status: false,
                message: "Bad Request",
                error: "Email does not exist",
            });
        }
        const validPassword = yield bcryptjs_1.default.compare(user.password, existingUser.password);
        if (!validPassword) {
            return res.status(400).json({
                status: false,
                message: "Bad Request",
                error: "Invalid password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.TOKEN_SECRET);
        return res.status(200).json({
            status: true,
            data: existingUser,
            token: token,
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
exports.authController = {
    register,
    login,
};
