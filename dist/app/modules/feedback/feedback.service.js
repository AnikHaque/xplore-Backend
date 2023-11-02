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
exports.FeedbackServices = void 0;
const prisma_1 = __importDefault(require("../../instance/prisma"));
const createFeedback = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.create({
        data: Object.assign(Object.assign({}, payload), { userId: user.id }),
    });
    return result;
});
const getFeedback = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.findMany({
        include: {
            user: true,
        },
    });
    return result;
});
exports.FeedbackServices = {
    createFeedback,
    getFeedback,
};
