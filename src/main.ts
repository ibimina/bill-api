import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Bill Api')
    .setDescription('The bill API documentation')
    .setVersion('1.0')
    .addTag('bill')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    // customCss: ".swagger-ui .topbar { display: none }",
    customCss: `.topbar-wrapper img {content:url('../../assets/logo.svg'); width:300px; height:auto;} .swagger-ui .topbar { background-color: white; }`,
    customSiteTitle: 'Bill API',
    //customfavIcon: "/assets/favicon.ico",
  };
  SwaggerModule.setup('api', app, document, customOptions);
  await app.listen(4000);
}
bootstrap();
