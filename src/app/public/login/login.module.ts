import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { LoginController } from './application/login.controller'
import { LoginService } from './domain/login.service'

/**
 * ItemsModule
 */
@Module({
  imports: [HttpModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
