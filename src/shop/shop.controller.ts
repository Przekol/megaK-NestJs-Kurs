import {
  Controller,
  Delete,
  Get,
  HostParam,
  Inject,
  Param,
  Post,
  Redirect,
  Scope,
} from '@nestjs/common';
import {
  CreateProductResponse,
  GetListOfProductsResponse,
  GetOneProduct,
  GetPaginatedListOfProductsResponse,
} from '../types';
import { ShopService } from './shop.service';

@Controller({
  path: '/shop',
  scope: Scope.REQUEST,
})
export class ShopController {
  onApplicationBootstrap() {
    console.log('Załadowane');
  }

  onApplicationShutdown() {
    console.log('Apka zaraz zniknie');
  }

  constructor(@Inject(ShopService) private readonly shopService: ShopService) {}
  @Get('/:pageNumber')
  getListOfProducts(
    @Param('pageNumber') pageNumber: string,
  ): Promise<GetPaginatedListOfProductsResponse> {
    return this.shopService.getProducts(Number(pageNumber));
  }

  @Get('/find/:searchTerm')
  testFindItem(
    @Param('searchTerm') searchTerm: string,
  ): Promise<GetListOfProductsResponse> {
    return this.shopService.findProducts(searchTerm);
  }

  @Get('/welcome')
  welcome(@HostParam('name') siteName: string) {
    return `Witaj na sklepie ${siteName}`;
  }
  @Get('/:id')
  getOneProduct(@Param('id') id: string): Promise<GetOneProduct> {
    return this.shopService.getOneProduct(id);
  }

  @Get('/test/:age')
  @Redirect()
  testRedirect(@Param('age') age: string) {
    const url = Number(age) > 18 ? '/site' : '/block';
    return {
      url,
      statusCode: 301,
    };
  }

  @Post()
  async createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string): Promise<void> {
    await this.shopService.removeProduct(id);
  }
}
