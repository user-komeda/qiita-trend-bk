import { ItemsRepository } from './domain/items.repository';
import { Module } from '@nestjs/common';
import { ItemsController } from './application/items.controller';
import { ItemsService } from './domain/items.service';
import { HttpModule } from '@nestjs/axios';
import { ItemsRepositoryImpl } from './infrastructure/items.repositoryImpl';
import { ItemsDetailService } from '../itemsdetail/domain/itemsDetail.service';
import { ItemsDetailRepository } from '../itemsdetail/domain/itemsDetail.repository';
import { ItemsDetailRepositoryImpl } from '../itemsdetail/infrastructure/itemsDetail.repositoryImpl';

@Module({
  imports: [HttpModule],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    ItemsDetailService,
    { provide: ItemsRepository, useClass: ItemsRepositoryImpl },
    { provide: ItemsDetailRepository, useClass: ItemsDetailRepositoryImpl },
  ],
})
export class ItemsModule {}
