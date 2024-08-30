import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MeasureType } from 'src/resources/measure/entities/measure.entity';
import { GoogleAIFileManager } from '@google/generative-ai/server';

import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';

import { convertResultToNumber } from './utils/convertResultToNumber';

type GenerativeAiServiceRequest = {
  type: MeasureType;
  image: string;
};

type GenerativeAiServiceResponse = {
  result: number;
  imageUri: string;
};

@Injectable()
export class GenerativeAiService {
  async exec({
    type,
    image,
  }: GenerativeAiServiceRequest): Promise<GenerativeAiServiceResponse> {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

      const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

      const imageBuffer = Buffer.from(image, 'base64');

      const tempFilePath = join(__dirname, 'tempfile.jpg');
      writeFileSync(tempFilePath, imageBuffer);

      const uploadResponse = await fileManager.uploadFile(tempFilePath, {
        mimeType: 'image/jpeg',
        displayName: `Medidor de Agua ${Math.floor(Math.random() * 100)}`,
      });

      unlinkSync(tempFilePath);

      const imageB64 = {
        inlineData: {
          data: image,
          mimeType: 'image/jpeg',
        },
      };

      const getResponse = await fileManager.getFile(uploadResponse.file.name);

      const prompt = `This is an image of a ${type} meter. Extract the corresponding reading. 
                    Enter the type of meter and the value of the reading. Always write in this format, 
                    without periods or commas: Reading: *`;

      const result = await model.generateContent([prompt, imageB64]);

      return {
        result: convertResultToNumber(result.response.text()),
        imageUri: getResponse.uri,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        `Erro na comunicação com a LLM: ${error.statusText}`,
      );
    }
  }
}
