import prisma from '../database/database';
import { GeminiService } from './gemini.service';


interface ProcessMeasureDTO {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: string;
}

export class MeasureService {
  private geminiService: GeminiService;

  constructor() {
    this.geminiService = new GeminiService();
  }

  public async processMeasure({ image, customer_code, measure_datetime, measure_type }: ProcessMeasureDTO) {
    const geminiResult = await this.geminiService.getMeasureFromImage(image);

    const measure = await prisma.measure.create({
      data: {
        customer_code,
        measure_datetime: new Date(measure_datetime),
        measure_type: measure_type.toUpperCase() as any,
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

  public async confirmMeasure(measure_uuid: string, confirmed_value: number): Promise<boolean> {
    const measure = await prisma.measure.findUnique({
      where: { id: measure_uuid }
    });

    if (!measure || measure.has_confirmed) return false;

    await prisma.measure.update({
      where: { id: measure_uuid },
      data: {
        measure_value: confirmed_value,
        has_confirmed: true
      }
    });

    return true;
  }

  public async listMeasures(customer_code: string, measure_type?: string) {
    return prisma.measure.findMany({
      where: {
        customer_code,
        measure_type: measure_type ? measure_type.toUpperCase() as any : undefined
      }
    });
  }
}
