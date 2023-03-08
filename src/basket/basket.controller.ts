import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { BasketService } from './basket.service';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductFromBasketResponse,
  RemoveProductFromBasketResponse,
} from '../types';
import { RemoveProductDto } from './dto/remove-product.dto';

@Controller('basket')
export class BasketController {
  constructor(
    @Inject(BasketService) private readonly basketService: BasketService,
  ) {}
  @Post('/')
  addProductToBasket(@Body() item: AddProductDto): AddProductToBasketResponse {
    return this.basketService.add(item);
  }

  @Delete('/:index')
  removeProductFromBasket(
    @Param() { index }: RemoveProductDto,
  ): RemoveProductFromBasketResponse {
    return this.basketService.remove(Number(index));
  }

  @Get('/')
  listProductInBasket(): ListProductFromBasketResponse {
    return this.basketService.list();
  }

  @Get('/total-price')
  getTotalPrice(): GetTotalPriceResponse {
    return this.basketService.getTotalPrice();
  }
}
