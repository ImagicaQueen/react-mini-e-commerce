import React, { Fragment, useState, useContext, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { AddToCart, CartTableDataProps } from "../../interfaces/add-to-cart";
import {
  deleteAddToCartApi,
  getAddToCartApi,
  updateAddToCartApi,
} from "../../apis/addToCartApi";
// import {get} from "../../interfaces/add-to-cart"
import Button from "react-bootstrap/Button";
import { DataContext } from "../context/Context";
import {
  productAddToCart,
  productAddToCartData,
} from "../../helper/tableStaticData";
import PopupDelete from "../category/PopupDelete";

const CartTable = () => {
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>("");


  const { addToCartData, setAddToCartData } = useContext(DataContext);

  let result = addToCartData.reduce(function (acc: number, obj: any) {
    return (
      acc +
      (typeof obj.totalPrice === "string"
        ? parseFloat(obj.totalPrice)
        : obj.totalPrice)
    );
  }, 0);
  const handleEditAddToCart = async (id: number,quantityType:string) => {

    try {
      const addCartData:any = addToCartData.find((ele) => ele.id === id);
      
      const quantity:any = quantityType === "inc" ? addCartData?.quantity+1 : addCartData?.quantity-1

      if (addCartData && quantity>0) {
        await updateAddToCartApi(addCartData.id, {
          id: addCartData.id,
          name: addCartData.name,
          title: addCartData.title,
          quantity: quantity,
          price: addCartData.price,
          totalPrice: quantity*(addCartData.price),
          categoryId: addCartData.categoryId,
          productId: addCartData.id,
        });
      }

      const updateAddToCartData = await getAddToCartApi();
      setAddToCartData(updateAddToCartData.data);
    } catch (error) {
      console.error("Error adding count:", error);
    }
  };

  const handleDelete = (id: number) => {
    setId(id);
    setDeletePopup(true);
    setPopupText("Are you sure you want to delete this add to cart product?");
  };

  const isDeleteRecord = async (id: number) => {
    try {
      let productDataDeleted = await deleteAddToCartApi(id);

      if (productDataDeleted.success) {
        let { data } = await getAddToCartApi();
        setAddToCartData(data);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeletePopup(false);
    }
  };

  const handleCheckCategoryOrProduct = (id: number) =>{
    isDeleteRecord(id)

  //   const findCategoryContainsProduct = productData.find((ele)=>{
  //    return ele.categoryId === id
  //   })
  //  if(findCategoryContainsProduct){
  //   deleteCategoryWithProduct(id)
  //  }
  //  else{
  //   isDeleteRecord(id)
  //  }
}


  return (
    <Fragment>
      <MDBTable striped style={{ marginTop: "100px" }}>
        <MDBTableHead>
          <tr>
            {productAddToCart.map((item: string) => (
              <th style={{ fontWeight: "600", fontSize: "16px" }} key={item}>
                {item}
              </th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {addToCartData.map((data, index: number) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.title}</td>
              <td>{data.quantity}</td>
              <td>{data.price}</td>
              <td>{data.totalPrice}</td>
              <td>
                <Button
                  onClick={() => handleEditAddToCart(data.id,"inc")}
                  variant="success"
                >
                  <i className="bi bi-plus-circle"></i>
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => handleEditAddToCart(data.id,"dec")}
                  variant="danger"
                >
                  <i className="bi bi-dash-circle"></i>
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    handleDelete(data.id);
                  }}
                  variant="info"
                >
                  remove
                </Button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <div style={{ marginTop: "100px",marginLeft:"800px" ,display:"flex"}}>
          <h3><span style={{color:"#d8504d",fontWeight:"800"}}>Total Amount :</span> {result} </h3>
        </div>
      {deletePopup && (
        <PopupDelete
          isDeleteRecord={isDeleteRecord}
          handleCheckCategoryOrProduct={handleCheckCategoryOrProduct}
          id={id}
          onClose={() => setDeletePopup(false)}
          setIsDisabled={setIsDisabled}
          isDisabled={isDisabled}
          popupText={popupText}
        />
      )}
    </Fragment>
  );
};

export default CartTable;
