"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const axios_1 = __importDefault(require("axios"));
class GeminiService {
    async getMeasureFromImage(image) {
        try {
            const response = await axios_1.default.post('https://api.google.dev/gemini/vision/v1/extract', { image }, {
                headers: {
                    'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            throw new Error('Erro ao integrar com o Google Gemini.');
        }
    }
}
exports.GeminiService = GeminiService;
