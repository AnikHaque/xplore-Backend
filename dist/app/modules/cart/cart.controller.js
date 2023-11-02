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
exports.CartController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ProviceResponse_1 = __importDefault(require("../../../shared/ProviceResponse"));
const cart_service_1 = require("./cart.service");
const AsyncCatch_1 = __importDefault(require("../../../shared/AsyncCatch"));
const addToCart = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartData = req.body;
    const result = yield cart_service_1.CartServices.addToCart(cartData);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cart Added Successful",
        data: result,
    });
}));
const getAllCart = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield cart_service_1.CartServices.getAllCart(user);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cart Fetched Successful",
        data: result,
    });
}));
const removeCart = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const result = yield cart_service_1.CartServices.removeCart(id);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cart Deleted Successful",
        data: result,
    });
}));
exports.CartController = {
    addToCart,
    getAllCart,
    removeCart,
};
