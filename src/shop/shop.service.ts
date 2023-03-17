import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { BasketService } from '../basket/basket.service';
import { GetListOfProductsResponse } from '../types';
import { ShopItem } from './entities/shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
  ) {}
  async getItems(): Promise<GetListOfProductsResponse> {
    return ShopItem.find();
  }

  async getOneItem(id: string): Promise<ShopItem> {
    return ShopItem.findOne({ where: { id } });
  }
}
