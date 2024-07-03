import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { DEFAULT_PORT } from './const'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))
  await app.listen(DEFAULT_PORT)
}
bootstrap()
