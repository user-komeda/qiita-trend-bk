import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DetailController } from './application/detail.controller';
import { DetailService } from './domain/detail.service';
import { DetailRepository } from './domain/detail.repository';
import { DetailRepositoryImpl } from './infrastructure/detail.repositoryImpl';

@Module({
  imports: [HttpModule],
  controllers: [DetailController],
  providers: [
    DetailService,
    { provide: DetailRepository, useClass: DetailRepositoryImpl },
  ],
})
export class DetailModule {}
