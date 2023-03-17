export type AddProductToBasketResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export interface RemoveProductFromBasketResponse {
  isSuccess: boolean;
}

interface OneItemInBasket {
  id: string;
  count: number;
}
export type GetBasketResponse = OneItemInBasket[];

export type GetTotalBasketPriceResponse = number;

export interface GetBasketStatsResponse {
  itemInBasketAvgPrice: number;
  basketAvgTotalPrice: number;
}
