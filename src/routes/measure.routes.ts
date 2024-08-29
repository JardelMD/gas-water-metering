import { Router } from 'express';
import { MeasureController } from '../controllers/measure.controller';
import { ValidateRequest } from '../middleware/validateRequest.middleware';


export class MeasureRoutes {
  public router: Router;
  private measureController: MeasureController;

  constructor() {
    this.router = Router();
    this.measureController = new MeasureController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/upload', ValidateRequest.validate, this.measureController.uploadMeasure);
    this.router.patch('/confirm', this.measureController.confirmMeasure);
    this.router.get('/:customer_code/list', this.measureController.listMeasures);
  }
}

export default new MeasureRoutes().router;
