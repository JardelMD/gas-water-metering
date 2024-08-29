import express from 'express';
import dotenv from 'dotenv';
import MeasureRoutes from './routes/measure.routes';


dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/measure', MeasureRoutes);
  }
}

export default new App().app;
