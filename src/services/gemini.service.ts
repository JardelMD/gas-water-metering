import axios from 'axios';

export class GeminiService {
  public async getMeasureFromImage(image: string): Promise<{ value: number, image_url: string }> {
    try {
      const response = await axios.post(
        'https://api.google.dev/gemini/vision/v1/extract',
        { image },
        {
          headers: {
            'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      throw new Error('Erro ao integrar com o Google Gemini.');
    }
  }
}
