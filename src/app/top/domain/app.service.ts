import { Inject, Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { ItemsData } from 'src/typs/itemsData';

@Injectable()
export class AppService {
  constructor(
    @Inject(AppRepository) private readonly appRepository: AppRepository,
  ) {}
  async getHello(): Promise<ItemsData[]> {
    return this.appRepository.getItems();
  }
}
