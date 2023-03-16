import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Entity()
export class ShopSet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @ManyToMany((type) => ShopItem, (entity) => entity.sets)
  items: ShopItem[];
}
