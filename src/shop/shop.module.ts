import { forwardRef, Module } from '@nestjs/common';
import { BasketModule } from 'src/basket/basket.module';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from './entities/shop-item.entity';
import { ShopItemDetails } from './entities/shop-item-details.entity';
import { ShopSet } from './entities/shop-set.entity';

@Module({
  imports: [
    forwardRef(() => BasketModule),
    TypeOrmModule.forFeature([ShopItem, ShopItemDetails, ShopSet]),
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
