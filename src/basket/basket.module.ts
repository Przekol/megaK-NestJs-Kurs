import { forwardRef, Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ShopModule } from 'src/shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemInBasket } from './entities/item-in-basket.entity';

@Module({
  imports: [
    forwardRef(() => ShopModule),
    TypeOrmModule.forFeature([ItemInBasket]),
  ],
  providers: [BasketService],
  controllers: [BasketController],
  exports: [BasketService],
})
export class BasketModule {}
