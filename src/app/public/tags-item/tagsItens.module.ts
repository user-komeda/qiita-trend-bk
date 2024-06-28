import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { TagsItemController } from './application/tagsItem.controller'
import { TagsItemRepository } from './domain/tagsItem.repository'
import { TagsItemService } from './domain/tagsItem.service'
import { TagsItemRepositoryImpl } from './infrastructure/tagsItem.repositoryImpl'
/**
 *TagsItemModule
 */
@Module({
  imports: [HttpModule],
  controllers: [TagsItemController],
  providers: [
    TagsItemService,
    { provide: TagsItemRepository, useClass: TagsItemRepositoryImpl },
  ],
})
export class TagsItemModule {}
