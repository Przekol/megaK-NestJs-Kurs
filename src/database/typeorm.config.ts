import { DataSource } from 'typeorm';
import { ShopItem } from '../shop/entities/shop-item.entity';
import { nazwaMigracji1678869681416 } from '../../migrations/1678869681416-nazwaMigracji';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'megak_nestjs_kurs',
  entities: [ShopItem],
  migrations: [nazwaMigracji1678869681416],
});
