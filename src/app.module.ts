import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { BasketModule } from './basket/basket.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ShopModule, BasketModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
