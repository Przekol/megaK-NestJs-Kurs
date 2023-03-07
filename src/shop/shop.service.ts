import { Injectable } from '@nestjs/common';
import { ShopItem } from './types';

@Injectable()
export class ShopService {
  getProducts(): ShopItem[] {
    return [
      {
        name: 'Ogórki kiszone',
        description: 'Bardzo dobre ogórki',
        price: 4,
      },
      {
        name: 'Ogórki Super',
        description: 'Jeszcze lepsze ogórki',
        price: 6,
      },
      {
        name: 'Ogórki afrykańskie',
        description: 'Ogórki z dalekiej krainy',
        price: 8,
      },
    ];
  }
}
