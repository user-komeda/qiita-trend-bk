import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { ItemsModule } from './public/items/items.module';
import path from 'path';
import { CommentModule } from './public/comment/comment.module';
import { TagModule } from './public/tag/tag.module';
const routes: Routes = [
  {
    path: '/admin',
    module: AdminModule,
  },
  {
    path: '/public',
    module: PublicModule,
    children: [
      {
        path: 'items',
        module: ItemsModule,
        children: [
          {
            path: ':itemsId/comments',
            module: CommentModule,
          },
        ],
      },
      {
        path: 'tags',
        module: TagModule,
      },
    ],
  },
];

@Module({
  imports: [PublicModule, AdminModule, RouterModule.register(routes)],
})
export class AppModule {}
