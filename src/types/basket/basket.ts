import { ShopItem } from '../../shop/entities/shop-item.entity';

export interface ItemInBasketEntity {
  id: string;
  count: number;
  shopItem: ShopItem;
}
