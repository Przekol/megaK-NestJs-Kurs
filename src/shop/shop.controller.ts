import {
  Controller,
  Get,
  HostParam,
  Inject,
  Param,
  Redirect,
  Scope,
} from '@nestjs/common';
import { GetListOfProductsResponse } from '../types';
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
  @Get('/')
  getListOfProducts(): GetListOfProductsResponse {
    return this.shopService.getProducts();
  }

  @Get('/welcome')
  welcome(@HostParam('name') siteName: string) {
    return `Witaj na sklepie ${siteName}`;
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
}
