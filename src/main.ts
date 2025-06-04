import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Minitok API')
    .setDescription('Documentação da API da Minitok')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // /api é a rota da documentação

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
