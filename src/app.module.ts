import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { BasketModule } from './basket/basket.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ShopModule, BasketModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
