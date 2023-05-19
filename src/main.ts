import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); // разрешаем кросс-доменные запросы
  app.useStaticAssets(join(__dirname, '..', 'build'));
  // app.get('*', (req: any, res: any) => {
  //   console.log('get');
  // });

  const config = new DocumentBuilder()
    .setTitle('Education API')
    .setDescription('Education')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  // await app.setGlobalPrefix('/api');
}
bootstrap();

//http://localhost:3001/clients

// http://localhost:3001/api_docs

//http://localhost:3001/orders
