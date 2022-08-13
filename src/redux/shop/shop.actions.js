import { createAction } from "./../../utils/createAction";
import { SHOP_ACTION_TYPES } from "./shop.types";

export const setProductsData = (categoryMap) =>
  createAction(SHOP_ACTION_TYPES.SET_PRODUCTS_DATA, categoryMap);
