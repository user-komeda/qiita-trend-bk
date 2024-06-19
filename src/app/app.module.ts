import { Module } from '@nestjs/common';
import { TopModule } from './top/top.module';
import { DetailModule } from './detail/detail.module';

@Module({
  imports: [TopModule, DetailModule],
})
export class AppModule {}
