import { forwardRef, Module } from '@nestjs/common';
import { BasketModule } from 'src/basket/basket.module';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from './entities/shop-item.entity';

@Module({
  imports: [
    forwardRef(() => BasketModule),
    TypeOrmModule.forFeature([ShopItem]),
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
