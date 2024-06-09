import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dynamoose from 'dynamoose';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';

async function bootstrap() {
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_PREFERRED_REGION,
  });
  dynamoose.aws.ddb.set(ddb);
  dynamoose.aws.ddb.local();
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  await app.listen(3000);
}
bootstrap();
