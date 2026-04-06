export interface Meals {
  user_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface UpdateMeals extends Meals {
  is_available: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_halal: boolean;
  is_gluten_free: boolean;
  is_feature: boolean;
}

export type SearchMeals<T> = {
  [k in keyof T]: T[k] | undefined;
} & {
  min_price: number | undefined;
  max_price: number | undefined;
  price_order: "asc" | "desc" | undefined;
  search: string | undefined;
  pageNumber: number;
  limitNumber: number;
  skip: number;
};
