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
exports.googleAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const user_repo_1 = require("../repos/user.repo");
const serverUrl = process.env.SERVER_URL;
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
const googleLogin = new passport_google_oauth2_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({
        email: profile.email,
    }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
    const data = {};
    try {
        const oldUser = yield user_repo_1.userRepo.getByEmail(profile.email);
        if (oldUser) {
            data.user = oldUser;
            data.token = token;
            return done(null, data);
        }
    }
    catch (err) {
        console.log(err.message);
    }
    try {
        const newUser = new user_model_1.User();
        newUser.email = profile.email;
        newUser.name = profile.displayName;
        const user = yield user_repo_1.userRepo.register(newUser);
        data.user = user;
        data.token = token;
        return done(null, data);
    }
    catch (err) {
        console.log(err.message);
    }
}));
passport_1.default.use(googleLogin);
const authenticate = passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
});
const googleCallback = passport_1.default.authenticate("google", {
    failureRedirect: "/",
    session: false,
});
exports.googleAuth = {
    authenticate,
    googleCallback,
};
