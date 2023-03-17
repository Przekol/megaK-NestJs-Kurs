import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShopItem } from '../../shop/entities/shop-item.entity';
import { ItemInBasketEntity } from '../../types';

@Entity()
export class ItemInBasket extends BaseEntity implements ItemInBasketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @OneToOne((type) => ShopItem, (entity) => entity.itemInBasket)
  @JoinColumn()
  shopItem: ShopItem;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
