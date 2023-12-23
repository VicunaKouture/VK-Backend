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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_repo_1 = require("../repos/user.repo");
const { ExtractJwt } = passport_jwt_1.default;
const JwtStrategy = passport_jwt_1.default.Strategy;
passport_1.default.use("checkJWT", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET,
}, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = String(jwtPayload.email);
        const user = yield user_repo_1.userRepo.getByEmail(email);
        return done(null, user);
    }
    catch (error) {
        return done(null, false, {
            message: error.message || "Something went wrong with your token",
        });
    }
})));
exports.default = passport_1.default;
