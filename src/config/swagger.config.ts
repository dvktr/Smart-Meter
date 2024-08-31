import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('Documentação API - Smart Meter')
  .setDescription('Bem-vindo à documentação da API Smart Meter.')
  .setVersion('1.0')
  .build();
