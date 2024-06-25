import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TagsItemController } from './application/tagsItem.controller';
import { TagsItemService } from './domain/tagsItem.service';
import { TagsItemRepositoryImpl } from './infrastructure/tagsItem.repositoryImpl';
import { TagsItemRepository } from './domain/tagsItem.repository';
@Module({
  imports: [HttpModule],
  controllers: [TagsItemController],
  providers: [
    TagsItemService,
    { provide: TagsItemRepository, useClass: TagsItemRepositoryImpl },
  ],
})
export class TagsItemModule {}
