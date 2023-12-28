export interface PopupDeleteType {
    isDeleteRecord: Function;
    handleCheckCategoryOrProduct?:Function|any;
    isDeleteRecordProduct?:Function;
    deleteCategoryWithProduct?:Function | any;
    id: number;
    onClose: Function;
    setIsDisabled?: any;
    isDisabled?:boolean;
    popupTextProduct?:string;
    popupText?:string
  }
  