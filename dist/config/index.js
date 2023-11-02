"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt: {
        salt: process.env.SALT,
    },
    jwt: {
        secret: process.env.SECRET,
        expiresIn: process.env.EXPIRES_IN,
        refresh_secret: process.env.REFRESH_SECRET,
        refresh_expiresIn: process.env.REFRESH_EXPIRES_IN,
    },
};
