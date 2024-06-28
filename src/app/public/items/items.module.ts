import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { ItemsDetailRepository } from '../itemsdetail/domain/itemsDetail.repository'
import { ItemsDetailService } from '../itemsdetail/domain/itemsDetail.service'
import { ItemsDetailRepositoryImpl } from '../itemsdetail/infrastructure/itemsDetail.repositoryImpl'

import { ItemsController } from './application/items.controller'
import { ItemsRepository } from './domain/items.repository'
import { ItemsService } from './domain/items.service'
import { ItemsRepositoryImpl } from './infrastructure/items.repositoryImpl'

/**
 * ItemsModule
 */
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
