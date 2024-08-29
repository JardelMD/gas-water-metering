"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureRoutes = void 0;
const express_1 = require("express");
const measure_controller_1 = require("../controllers/measure.controller");
const validateRequest_middleware_1 = require("../middleware/validateRequest.middleware");
class MeasureRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.measureController = new measure_controller_1.MeasureController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/upload', validateRequest_middleware_1.ValidateRequest.validate, this.measureController.uploadMeasure);
        this.router.patch('/confirm', this.measureController.confirmMeasure);
        this.router.get('/:customer_code/list', this.measureController.listMeasures);
    }
}
exports.MeasureRoutes = MeasureRoutes;
exports.default = new MeasureRoutes().router;
