"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryValidator = void 0;
var zod_1 = __importDefault(require("zod"));
exports.QueryValidator = zod_1.default.object({
    category: zod_1.default.string().optional(),
    sort: zod_1.default.enum(['asc', 'desc']).optional(),
    limit: zod_1.default.number().optional(),
});
