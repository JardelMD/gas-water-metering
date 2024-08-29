"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureController = void 0;
const measure_service_1 = require("../services/measure.service");
class MeasureController {
    constructor() {
        this.uploadMeasure = async (req, res) => {
            try {
                const { image, customer_code, measure_datetime, measure_type } = req.body;
                const { measure_value, image_url, measure_uuid } = await this.measureService.processMeasure({
                    image,
                    customer_code,
                    measure_datetime,
                    measure_type
                });
                return res.status(200).json({ image_url, measure_value, measure_uuid });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === 'INVALID_DATA') {
                        res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Dados fornecidos são inválidos' });
                    }
                    else if (error.message === 'DOUBLE_REPORT') {
                        res.status(409).json({ error_code: 'DOUBLE_REPORT', error_description: 'Leitura do mês já realizada' });
                    }
                    else {
                        res.status(500).json({ error_code: 'INTERNAL_ERROR', error_description: error.message });
                    }
                }
            }
        };
        this.confirmMeasure = async (req, res) => {
            try {
                const { measure_uuid, confirmed_value } = req.body;
                await this.measureService.confirmMeasure(measure_uuid, confirmed_value);
                return res.status(200).json({ success: true });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === 'INVALID_DATA') {
                        res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Dados fornecidos são inválidos' });
                    }
                    else if (error.message === 'MEASURE_NOT_FOUND') {
                        res.status(404).json({ error_code: 'MEASURE_NOT_FOUND', error_description: 'Leitura não encontrada' });
                    }
                    else if (error.message === 'CONFIRMATION_DUPLICATE') {
                        res.status(409).json({ error_code: 'CONFIRMATION_DUPLICATE', error_description: 'Leitura já confirmada' });
                    }
                    else {
                        res.status(500).json({ error_code: 'INTERNAL_ERROR', error_description: error.message });
                    }
                }
            }
        };
        this.listMeasures = async (req, res) => {
            try {
                const { customer_code } = req.params;
                const { measure_type } = req.query;
                const measures = await this.measureService.listMeasures(customer_code, measure_type);
                return res.status(200).json({ customer_code, measures });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === 'INVALID_TYPE') {
                        res.status(400).json({ error_code: 'INVALID_TYPE', error_description: 'Tipo de medição não permitido' });
                    }
                    else if (error.message === 'MEASURES_NOT_FOUND') {
                        res.status(404).json({ error_code: 'MEASURES_NOT_FOUND', error_description: 'Nenhuma leitura encontrada' });
                    }
                    else {
                        res.status(500).json({ error_code: 'INTERNAL_ERROR', error_description: 'Erro interno do servidor' });
                    }
                }
            }
        };
        this.measureService = new measure_service_1.MeasureService();
    }
}
exports.MeasureController = MeasureController;
