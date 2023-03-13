import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ShopItemEntity } from '../types';

@Entity()
export class ShopItem implements ShopItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    length: 1000,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price: number;
}
