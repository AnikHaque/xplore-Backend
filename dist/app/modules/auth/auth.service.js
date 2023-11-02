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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../instance/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const JwtHandler_1 = require("../../../handler/JwtHandler");
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, signupData = __rest(payload, ["password"]);
    const hash = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt.salt));
    payload.password = hash;
    const result = yield prisma_1.default.user.create({
        data: payload,
        select: {
            id: true,
            name: true,
            role: true,
            email: true,
            image: true,
            password: false,
            phone: true,
            address: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Your Account Not Found");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.password, isExistUser.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password Not Match");
    }
    const { id, email, role } = isExistUser;
    const accessToken = JwtHandler_1.JwtHelpers.createToken({ id, email, role }, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
    const refreshToken = JwtHandler_1.JwtHelpers.createToken({ id, email, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expiresIn);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifyUser;
    try {
        verifyUser = JwtHandler_1.JwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized");
    }
    const isExistUser = yield prisma_1.default.user.findUnique({
        where: {
            id: verifyUser.id,
        },
    });
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Your Account Not Found");
    }
    const { id, email, role } = isExistUser;
    const accessToken = JwtHandler_1.JwtHelpers.createToken({ id, email, role }, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
    return {
        accessToken,
    };
});
exports.AuthService = { signUp, login, refreshToken };
