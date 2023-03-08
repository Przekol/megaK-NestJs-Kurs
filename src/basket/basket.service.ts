import { Inject, Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { AddProductToBasketResponse } from '../types';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class BasketService {
  constructor(@Inject(ShopService) private readonly shopService: ShopService) {}
  private items: Product[] = [];

  add(item: AddProductDto): AddProductToBasketResponse {
    const { name, count } = item;
    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count < 1 ||
      !this.shopService.hasProducts(name)
    ) {
      return {
        isSuccess: false,
      };
    }

    this.items.push(item);

    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }

  remove(index: number) {
    const { items } = this;
    if (index < 0 || index >= items.length) {
      return { isSuccess: false };
    }
    items.splice(index, 1);
    return { isSuccess: true };
  }
}
