"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequest = void 0;
class ValidateRequest {
    static validate(req, res, next) {
        const { image, customer_code, measure_datetime, measure_type } = req.body;
        if (!image || !customer_code || !measure_datetime || !measure_type) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Todos os campos são obrigatórios"
            });
        }
        else {
            next();
        }
    }
}
exports.ValidateRequest = ValidateRequest;
