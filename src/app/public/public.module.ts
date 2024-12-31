import { Module } from '@nestjs/common'

import { CommentModule } from './comment/comment.module'
import { ItemsModule } from './items/items.module'
import { LoginModule } from './login/login.module'
import { TagModule } from './tag/tag.module'
import { TagsItemModule } from './tags-item/tagsItens.module'

/**
 *PublicModule
 */
@Module({
  imports: [ItemsModule, CommentModule, TagModule, TagsItemModule, LoginModule],
})
export class PublicModule {}
