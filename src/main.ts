import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configuración de vistas (por ejemplo, EJS, Handlebars, etc.)
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // 👉 Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación Swagger para mi proyecto NestJS')
    .setVersion('1.0')
    .addTag('API') // Puedes usar varios tags para agrupar endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(3000);
  console.log(`🚀 Aplicación corriendo en http://localhost:3000`);
  console.log(`📚 Swagger disponible en http://localhost:3000/api`);
}
bootstrap();
