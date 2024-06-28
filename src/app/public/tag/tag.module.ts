import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { TagController } from './application/tag.controller'
import { TagRepository } from './domain/tag.repository'
import { TagService } from './domain/tag.service'
import { TagRepositoryImpl } from './infrastructure/tag.repositoryImpl'

/**
 * TagModule
 */
@Module({
  imports: [HttpModule],
  controllers: [TagController],
  providers: [
    TagService,
    { provide: TagRepository, useClass: TagRepositoryImpl },
  ],
})
export class TagModule {}
