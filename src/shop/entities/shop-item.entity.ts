import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShopItemEntity } from '../../types';
import { ItemInBasket } from '../../basket/entities/item-in-basket.entity';

@Entity()
export class ShopItem extends BaseEntity implements ShopItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 1000,
  })
  description: string;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
  })
  price: number;

  @OneToOne((type) => ItemInBasket, (entity) => entity.shopItem)
  itemInBasket: ItemInBasket;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
