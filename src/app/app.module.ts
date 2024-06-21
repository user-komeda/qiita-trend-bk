import { Module } from '@nestjs/common';
import { TopModule } from './top/top.module';
import { DetailModule } from './detail/detail.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [TopModule, DetailModule, CommentModule],
})
export class AppModule {}
