import { Controller, Get, Param } from '@nestjs/common';
import { DetailService } from '../domain/detail.service';

@Controller('details')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}
  @Get(':id')
  index(@Param('id') id: string) {
    console.log(id);
    return this.detailService.getDetailItems(id);
  }
}
