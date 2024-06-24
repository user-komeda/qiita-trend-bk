import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from '../domain/items.service';
import { ItemsDetailService } from '../../itemsdetail/domain/itemsDetail.service';

@Controller()
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly itemsDetailService: ItemsDetailService,
  ) {}

  @Get()
  getAllItems(): any {
    return this.itemsService.getHello();
  }

  @Get(':id')
  getItem(@Param('id') id: string) {
    return this.itemsDetailService.getDetailItems(id);
  }
}
