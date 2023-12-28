import React, { Fragment, useState, useEffect, useContext } from "react";
import LayoutWrapper from "../layout/LayoutWrapper";
import { Product } from "../../interfaces/product";
import { getProductApi, deleteProductApi } from "../../apis/productApi";
import Table from "../table/Table";
import { useNavigate } from "react-router-dom";
import PopupDelete from "../category/PopupDelete";
import { DataContext } from "../context/Context";
import {
  getAddToCartApi,
  postAddToCartApi,
  updateAddToCartApi,
} from "../../apis/addToCartApi";

import {
  category,
  categoryData,
  product,
  productData,
} from "../../helper/tableStaticData";
import AddToCart from "../addToCart/AddToCart";

const ListProduct = () => {
  const navigate = useNavigate();
  const { productData, setProductData, addToCartData, setAddToCartData } =
    useContext(DataContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [popupTextProduct, setPopupTextProduct] = useState<string>("");

  const [deletePopup, setDeletePopup] = useState(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    getProductList();
  }, []);

  const handleDelete = (id: number) => {
    setId(id);
    setDeletePopup(true);
    setPopupTextProduct("Are you sure you want to delete this product?");
  };

  const isDeleteRecord = async (id: number) => {
    try {
      let productDataDeleted = await deleteProductApi(id);

      if (productDataDeleted.success) {
        let { data } = await getProductApi();
        setProductData(data);
        setAddToCartData(data);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeletePopup(false);
    }
  };

  const handleCheckCategoryOrProduct = (id: number) => {
    isDeleteRecord(id);
  };

  const handleEdit = async (id: number) => {
    navigate(`/edit/product/${id}`);
  };

  const getProductList = async () => {
    try {
      const findData = await getProductApi();
      if (findData.success) {
        setProductData(findData.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const addCount = async (id: number) => {
    try {
      const addCartData: any = productData.find((ele) => ele.id === id);

      if (addCartData) {
        await postAddToCartApi({
          id: addCartData.id,
          name: addCartData.name,
          title: addCartData.title,
          quantity: 1,
          price: addCartData.price,
          totalPrice: addCartData.price,
          categoryId: addCartData.categoryId,
          productId: addCartData.id,
        });
      }

      const updateAddToCartData = await getAddToCartApi();
      setAddToCartData(updateAddToCartData.data);
      navigate("/addToCart");
    } catch (error) {
      console.error("Error adding count:", error);
    }
  };

  return (
    <Fragment>
      <LayoutWrapper width="85vw">
        <Table
          columns={product}
          data={productData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isProduct={true}
          tableHeading={"Product List"}
          addCount={addCount}
        />
        {deletePopup && (
          <PopupDelete
            isDeleteRecord={isDeleteRecord}
            handleCheckCategoryOrProduct={handleCheckCategoryOrProduct}
            id={id}
            onClose={() => setDeletePopup(false)}
            setIsDisabled={setIsDisabled}
            isDisabled={isDisabled}
            popupTextProduct={popupTextProduct}
          />
        )}
      </LayoutWrapper>
    </Fragment>
  );
};

export default ListProduct;
