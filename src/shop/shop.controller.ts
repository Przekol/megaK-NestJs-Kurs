import { Controller, Get, Inject } from '@nestjs/common';
import { GetListOfProductsResponse } from '../types';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private readonly shopService: ShopService) {}
  @Get('/')
  getListOfProducts(): GetListOfProductsResponse {
    return this.shopService.getProducts();
  }
}
