import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [ShopModule, BasketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
