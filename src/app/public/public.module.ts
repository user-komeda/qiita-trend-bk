import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule, CommentModule, TagModule],
})
export class PublicModule {}
