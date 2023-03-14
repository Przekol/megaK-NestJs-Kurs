import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductFromBasketResponse,
} from '../types';
import { ShopService } from '../shop/shop.service';

@Injectable({ scope: Scope.REQUEST })
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService))
    private readonly shopService: ShopService,
  ) {}
  private items: AddProductDto[] = [];

  async add(item: AddProductDto): Promise<AddProductToBasketResponse> {
    const { count, name, id } = item;
    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count < 1 ||
      !(await this.shopService.hasProduct(name))
    ) {
      return {
        isSuccess: false,
      };
    }
    this.items.push(item);

    await this.shopService.addBoughtCounter(id);

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

  list(): ListProductFromBasketResponse {
    return this.items;
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    if (!this.items.every((item) => this.shopService.hasProduct(item.name))) {
      const alternativeBasket = this.items.filter((item) =>
        this.shopService.hasProduct(item.name),
      );
      return { isSuccess: false, alternativeBasket };
    }

    return (
      await Promise.all(
        this.items.map(
          async (item) =>
            (await this.shopService.getPriceOfProduct(item.name)) *
            item.count *
            1.23,
        ),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }

  async countPromo(): Promise<number> {
    return (await this.getTotalPrice()) > 10 ? 1 : 0;
  }
}
