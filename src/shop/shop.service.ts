import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { BasketService } from '../basket/basket.service';
import { GetPaginatedListOfProductsResponse, ShopItemEntity } from '../types';
import { ShopItem } from './entities/shop-item.entity';
import { ShopItemDetails } from './entities/shop-item-details.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
  ) {}
  async getProducts(
    currentPage: number = 1,
  ): Promise<GetPaginatedListOfProductsResponse> {
    const maxPerPage = 5;

    const [items, count] = await ShopItem.findAndCount({
      relations: ['details', 'sets'],
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const pagesCount = Math.ceil(count / maxPerPage);

    return {
      items,
      pagesCount,
    };
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).items.some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).items.find((item) => item.name === name)
      .price;
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

    const details = new ShopItemDetails();
    details.color = 'green';
    details.width = 20;
    await details.save();

    newItem.details = details;
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

  async findProducts(searchTerm: string): Promise<ShopItemEntity[]> {
    console.log(searchTerm);
    return await ShopItem.find({
      select: ['id', 'price'],
      where: {
        name: searchTerm,
      },
      order: {
        price: 'ASC',
      },
    });
  }
}
