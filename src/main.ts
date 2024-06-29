import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { DEFAULT_PORT } from './const'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  await app.listen(DEFAULT_PORT)
}
bootstrap()
