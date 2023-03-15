import { ShopItemEntity } from './shop';
import { ShopItem } from '../../shop/entities/shop-item.entity';

export type GetListOfProductsResponse = ShopItemEntity[];
export type GetOneProduct = ShopItemEntity;
export type CreateProductResponse = ShopItemEntity;
export interface GetPaginatedListOfProductsResponse {
  items: ShopItem[];
  pagesCount: number;
}
