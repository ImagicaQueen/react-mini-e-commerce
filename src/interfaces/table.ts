import { Product } from "./product";

export interface TableProps {
  handleEdit: Function;
  handleDelete: Function;
  isDeleteRecordData?:Function|any;
  setPopupText?:string;
  // deleteCategoryWithProduct?: (value:any) => void;
  deleteCategoryWithProduct?:any;
  addCount?:any;
  columns: string[];
  data: Product[];
  isProduct?: boolean;
  isConfirm?:boolean;
  tableHeading: string;
  productData?:[];
}
