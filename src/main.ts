import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  const version = '/api';
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Project')
    .setDescription('The ProjectTest API')
    .setVersion('1.0')
    .addTag('ProjectTest')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('api', app, document);
  // app.setGlobalPrefix(version); // định cấu hình phiên bản
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.useGlobalPipes(new ValidationPipe()); //điểm cuối được bảo vệ khỏi nhận dữ liệu không chính xác
  await app.listen(3000);
  console.log(
    `Example app listening on port http://localhost:${port}${version}`,
    //${version}
  );
}
bootstrap();
