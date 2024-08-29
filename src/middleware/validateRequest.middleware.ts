import { Request, Response, NextFunction } from 'express';

export class ValidateRequest {
  public static validate(req: Request, res: Response, next: NextFunction): void {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    if (!image || !customer_code || !measure_datetime || !measure_type) {
      res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Todos os campos são obrigatórios"
      });
    } else {
      next();
    }
  }
}
