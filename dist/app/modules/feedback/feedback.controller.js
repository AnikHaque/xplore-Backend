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
exports.FeedbackController = void 0;
const AsyncCatch_1 = __importDefault(require("../../../shared/AsyncCatch"));
const ProviceResponse_1 = __importDefault(require("../../../shared/ProviceResponse"));
const http_status_1 = __importDefault(require("http-status"));
const feedback_service_1 = require("./feedback.service");
const createFeedback = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackData = __rest(req.body, []);
    const user = req.user;
    const result = yield feedback_service_1.FeedbackServices.createFeedback(feedbackData, user);
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Thank you for your feedback",
        data: result,
    });
}));
const getFeedback = (0, AsyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_service_1.FeedbackServices.getFeedback();
    (0, ProviceResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Fetch Feedback",
        data: result,
    });
}));
exports.FeedbackController = {
    createFeedback,
    getFeedback,
};
