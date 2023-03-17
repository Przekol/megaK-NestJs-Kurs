import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { BasketService } from './basket.service';
import {
  AddProductToBasketResponse,
  GetBasketResponse,
  GetTotalBasketPriceResponse,
  RemoveProductFromBasketResponse,
} from '../types';

@Controller('basket')
export class BasketController {
  constructor(
    @Inject(BasketService) private readonly basketService: BasketService,
  ) {}
  @Post('/')
  addProductToBasket(
    @Body() product: AddItemDto,
  ): Promise<AddProductToBasketResponse> {
    return this.basketService.add(product);
  }

  @Delete('/all')
  clearBasket(): Promise<void> {
    return this.basketService.clearBasket();
  }

  @Delete('/:id')
  removeProduct(
    @Param('id') id: string,
  ): Promise<RemoveProductFromBasketResponse> {
    return this.basketService.remove(id);
  }

  @Get('/')
  getBasket(): Promise<GetBasketResponse> {
    return this.basketService.getAll();
  }

  @Get('/total-price')
  getTotalBasketPrice(): Promise<GetTotalBasketPriceResponse> {
    return this.basketService.getTotalPrice();
  }
}
