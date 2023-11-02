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
exports.UserController = void 0;
const AsyncCatch_1 = __importDefault(require("../../../shared/AsyncCatch"));
const user_service_1 = require("./user.service");
const ProviceResponse_1 = __importDefault(require("../../../shared/ProviceResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const user_constants_1 = require("./user.constants");
const getUserProfile = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.userServices.getUserProfile(user);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Profile Get Successful",
        data: result,
    });
}));
const getAllUser = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pagOptions = (0, pick_1.default)(req.query, user_constants_1.userPaginationOptions);
    const filters = (0, pick_1.default)(req.query, user_constants_1.userFilterableFields);
    const result = yield user_service_1.userServices.getAllUser(pagOptions, filters);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All User Fetched Successful",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleUserById = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.getSingleUserById(id);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Get Successful",
        data: result,
    });
}));
const updateSingleUserById = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = __rest(req.body, []);
    const result = yield user_service_1.userServices.updateSingleUserById(id, updatedData);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Update Successful",
        data: result,
    });
}));
const updateUser = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = __rest(req.body, []);
    const user = req.user;
    const result = yield user_service_1.userServices.updateUser(userData, user);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Profile Update Successful",
        data: result,
    });
}));
const updateRole = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    const result = yield user_service_1.userServices.updateRole(id, { role });
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Role Update Successful",
        data: result,
    });
}));
const deleteUser = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.deleteUser(id);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Deleted Successful",
        data: result,
    });
}));
exports.UserController = {
    getUserProfile,
    updateUser,
    getAllUser,
    updateRole,
    getSingleUserById,
    updateSingleUserById,
    deleteUser,
};
