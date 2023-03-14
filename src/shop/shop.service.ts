import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { BasketService } from '../basket/basket.service';
import { ShopItemEntity } from '../types';
import { ShopItem } from './entities/shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
  ) {}
  async getProducts(): Promise<ShopItemEntity[]> {
    return await ShopItem.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    return await ShopItem.findOneOrFail({ where: { id } });
  }

  async removeProduct(id: string): Promise<void> {
    await ShopItem.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.price = 50;
    newItem.name = 'Najnowszy ogórek';
    newItem.description = 'Ogórki idealne dla Pań!';

    await newItem.save();

    return newItem;
  }

  async addBoughtCounter(id: string) {
    await ShopItem.update(id, {
      wasEverBought: true,
    });

    const item = await ShopItem.findOneOrFail({ where: { id } });
    item.boughtCounter++;
    await item.save();
  }
}
