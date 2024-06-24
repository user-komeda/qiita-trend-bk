import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TagController } from './application/tag.controller';
import { TagService } from './domain/tag.service';
import { TagRepository } from './domain/tag.repository';
import { TagRepositoryImpl } from './infrastructure/tag.repositoryImpl';

@Module({
  imports: [HttpModule],
  controllers: [TagController],
  providers: [
    TagService,
    { provide: TagRepository, useClass: TagRepositoryImpl },
  ],
})
export class TagModule {}
