import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { ItemsModule } from './items/items.module';
import { TagsItemModule } from './tags-item/tagsItens.module';

@Module({
  imports: [ItemsModule, CommentModule, TagModule, TagsItemModule],
})
export class PublicModule {}
