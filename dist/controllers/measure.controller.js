"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureController = void 0;
const measure_service_1 = require("../services/measure.service");
class MeasureController {
    constructor() {
        this.uploadMeasure = async (req, res) => {
            try {
                const { image, customer_code, measure_datetime, measure_type } = req.body;
                // Certifique-se de que `processMeasure` está definido corretamente no MeasureService
                const { measure_value, image_url, measure_uuid } = await this.measureService.processMeasure({
                    image,
                    customer_code,
                    measure_datetime,
                    measure_type
                });
                return res.status(200).json({ measure_uuid, measure_value, image_url });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
                        error_code: "SERVER_ERROR",
                        error_description: error.message
                    });
                }
                else {
                    return res.status(500).json({
                        error_code: "SERVER_ERROR",
                        error_description: "Erro desconhecido."
                    });
                }
            }
        };
        this.confirmMeasure = async (req, res) => {
            try {
                const { measure_uuid, confirmed_value } = req.body;
                const result = await this.measureService.confirmMeasure(measure_uuid, confirmed_value);
                if (!result) {
                    return res.status(404).json({
                        error_code: "MEASURE_NOT_FOUND",
                        error_description: "Leitura não encontrada"
                    });
                }
                return res.status(200).json({ success: true });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
                        error_code: "SERVER_ERROR",
                        error_description: error.message
                    });
                }
                else {
                    return res.status(500).json({
                        error_code: "SERVER_ERROR",
                        error_description: "Erro desconhecido."
                    });
                }
            }
        };
        this.listMeasures = async (req, res) => {
            try {
                const { customer_code } = req.params;
                const { measure_type } = req.query;
                const measures = await this.measureService.listMeasures(customer_code, measure_type);
                if (measures.length === 0) {
                    return res.status(404).json({
                        error_code: "MEASURES_NOT_FOUND",
                        error_description: "Nenhuma leitura encontrada"
                    });
                }
                return res.status(200).json({ customer_code, measures });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
                        error_code: "SERVER_ERROR",
                        error_description: error.message
                    });
                }
                else {
                    return res.status(500).json({
                        error_code: "SERVER_ERROR",
                        error_description: "Erro desconhecido."
                    });
                }
            }
        };
        this.measureService = new measure_service_1.MeasureService();
    }
}
exports.MeasureController = MeasureController;
