export interface Category {
  id: number;
  name: string;
}

export interface Name {
  name: string;
}

export interface CategoryContextValue {
  categoryData: Category[];
  setCategoryData: (value: Category[]) => void;
}

export type CheckExistNameFunction = () => void;

export type HandleAddButtonClickFunction = () => void;

export type handleSubmitType = () => void;
