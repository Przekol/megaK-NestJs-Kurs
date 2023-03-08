import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [ShopModule],
  providers: [BasketService],
  controllers: [BasketController],
})
export class BasketModule {}
