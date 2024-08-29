import { Request, Response } from 'express';
import { MeasureService } from '../services/measure.service';


export class MeasureController {
  private measureService: MeasureService;

  constructor() {
    this.measureService = new MeasureService();
  }

  public uploadMeasure = async (req: Request, res: Response): Promise<Response> => {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          error_code: "SERVER_ERROR",
          error_description: error.message
        });
      } else {
        return res.status(500).json({
          error_code: "SERVER_ERROR",
          error_description: "Erro desconhecido."
        });
      }
    }
  };

  public confirmMeasure = async (req: Request, res: Response): Promise<Response> => {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          error_code: "SERVER_ERROR",
          error_description: error.message
        });
      } else {
        return res.status(500).json({
          error_code: "SERVER_ERROR",
          error_description: "Erro desconhecido."
        });
      }
    }
  };

  public listMeasures = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { customer_code } = req.params;
      const { measure_type } = req.query;

      const measures = await this.measureService.listMeasures(customer_code, measure_type as string | undefined);

      if (measures.length === 0) {
        return res.status(404).json({
          error_code: "MEASURES_NOT_FOUND",
          error_description: "Nenhuma leitura encontrada"
        });
      }

      return res.status(200).json({ customer_code, measures });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          error_code: "SERVER_ERROR",
          error_description: error.message
        });
      } else {
        return res.status(500).json({
          error_code: "SERVER_ERROR",
          error_description: "Erro desconhecido."
        });
      }
    }
  };
}
