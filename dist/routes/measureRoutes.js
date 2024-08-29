"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureRoutes = void 0;
const express_1 = require("express");
const measureController_1 = require("../controllers/measureController");
const validateRequest_1 = require("../middleware/validateRequest");
class MeasureRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.measureController = new measureController_1.MeasureController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/upload', validateRequest_1.ValidateRequest.validate, this.measureController.uploadMeasure);
        this.router.patch('/confirm', this.measureController.confirmMeasure);
        this.router.get('/:customer_code/list', this.measureController.listMeasures);
    }
}
exports.MeasureRoutes = MeasureRoutes;
exports.default = new MeasureRoutes().router;
