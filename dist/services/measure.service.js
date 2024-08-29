"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureService = void 0;
const database_1 = __importDefault(require("../database/database"));
const gemini_service_1 = require("./gemini.service");
class MeasureService {
    constructor() {
        this.geminiService = new gemini_service_1.GeminiService();
    }
    async processMeasure({ image, customer_code, measure_datetime, measure_type }) {
        const geminiResult = await this.geminiService.getMeasureFromImage(image);
        const measure = await database_1.default.measure.create({
            data: {
                customer_code,
                measure_datetime: new Date(measure_datetime),
                measure_type: measure_type.toUpperCase(),
                measure_value: geminiResult.value,
                image_url: geminiResult.image_url,
                has_confirmed: false
            }
        });
        return {
            measure_uuid: measure.id,
            measure_value: measure.measure_value,
            image_url: measure.image_url
        };
    }
    async confirmMeasure(measure_uuid, confirmed_value) {
        const measure = await database_1.default.measure.findUnique({
            where: { id: measure_uuid }
        });
        if (!measure || measure.has_confirmed)
            return false;
        await database_1.default.measure.update({
            where: { id: measure_uuid },
            data: {
                measure_value: confirmed_value,
                has_confirmed: true
            }
        });
        return true;
    }
    async listMeasures(customer_code, measure_type) {
        return database_1.default.measure.findMany({
            where: {
                customer_code,
                measure_type: measure_type ? measure_type.toUpperCase() : undefined
            }
        });
    }
}
exports.MeasureService = MeasureService;
