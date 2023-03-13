import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ShopItemEntity } from './types';
import { BasketService } from '../basket/basket.service';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
  ) {}
  getProducts(): ShopItemEntity[] {
    return [
      {
        name: 'Ogórki kiszone',
        description: 'Bardzo dobre ogórki',
        price: 4,
      },
      {
        name: 'Ogórki Super',
        description: 'Jeszcze lepsze ogórki',
        price: 6 - this.basketService.countPromo(),
      },
      {
        name: 'Ogórki afrykańskie',
        description: 'Ogórki z dalekiej krainy',
        price: 8 - this.basketService.countPromo(),
      },
    ];
  }

  hasProducts(name: string): boolean {
    return this.getProducts().some((item) => item.name === name);
  }

  getPriceOfProduct(name: string): number {
    return this.getProducts().find((item) => item.name === name).price;
  }
}
