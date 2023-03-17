import { Controller, Get, Inject, Scope } from '@nestjs/common';
import { GetListOfProductsResponse } from '../types';
import { ShopService } from './shop.service';

@Controller({
  path: '/shop',
  scope: Scope.REQUEST,
})
export class ShopController {
  constructor(@Inject(ShopService) private readonly shopService: ShopService) {}
  @Get('/')
  getShopList(): Promise<GetListOfProductsResponse> {
    return this.shopService.getItems();
  }
}
