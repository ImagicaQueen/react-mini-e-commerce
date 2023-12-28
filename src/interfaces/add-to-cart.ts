
export interface AddToCart  {
  id: number;
  name: string;
  title?: string;
  quantity?: number;
  price?:number;
  totalPrice?: number; 
  categoryId?:number;
  productId?:number;
}

export interface CartTableDataProps {
  productAddToCartData: AddToCart[];
}

export interface CartTableProps {
  cartTableHeader: string[];
  cartTableData: AddToCart[];
}
