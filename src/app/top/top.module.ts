import { AppRepository } from './domain/app.repository';
import { Module } from '@nestjs/common';
import { AppController } from './application/app.controller';
import { AppService } from './domain/app.service';
import { HttpModule } from '@nestjs/axios';
import { AppRepositoryImpl } from './infrastructure/app.repositoryImpl';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: AppRepository, useClass: AppRepositoryImpl },
  ],
})
export class TopModule {}
