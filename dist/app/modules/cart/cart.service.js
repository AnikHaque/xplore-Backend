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
exports.CartServices = void 0;
const prisma_1 = __importDefault(require("../../instance/prisma"));
const addToCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.createMany({
        data: payload,
    });
    return result;
});
const getAllCart = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = user.id;
    const result = yield prisma_1.default.cart.findMany({
        where: {
            user: {
                id: id,
            },
        },
        include: {
            service: true,
            user: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
const removeCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CartServices = {
    addToCart,
    getAllCart,
    removeCart,
};
