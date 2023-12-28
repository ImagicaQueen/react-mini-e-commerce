import React, { Fragment, useContext, useEffect, useState } from "react";
import Table from "../table/Table";
import { product } from "../../helper/tableStaticData";
import LayoutWrapper from "../layout/LayoutWrapper";
import { DataContext } from "../context/Context";
import { useParams, useNavigate } from "react-router-dom";
import { getCategory } from "../../apis/categoryApi";
import { getProductApi, deleteProductApi } from "../../apis/productApi";
import { Product } from "../../interfaces/product";
import { Category } from "../../interfaces/category";
import PopupDelete from "./PopupDelete";
import { getAddToCartApi, postAddToCartApi } from "../../apis/addToCartApi";

const CategoryDetail = () => {
  const { name } = useParams();
  const { categoryData, setCategoryData, productData,setAddToCartData } =
    useContext(DataContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [popupTextProduct, setPopupTextProduct] = useState<string>("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [id, setId] = useState<number>(0);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductCategory();
  }, [name]);

  const navigate = useNavigate();

  const getProductCategory = async () => {
    try {
      const { data } = await getCategory();
      const findCategoryName = data.find((ele: Category) => {
        return ele.name === name;
      });
      const productLists = await getProductApi();

      const findProductsName = productLists.data.filter((ele: Product) => {
        return ele.categoryId === findCategoryName.id;
      });
      if (findProductsName) {
        setProducts(findProductsName);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleDelete = (id: number) => {
    setId(id);
    setDeletePopup(true);
    setPopupTextProduct("Are you sure you want to delete this product");
  };

  const isDeleteRecord = async (id: number) => {
    try {
      let productDataDeleted = await deleteProductApi(id);

      if (productDataDeleted.success) {
        let { data } = await getProductApi();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setDeletePopup(false);
    }
  };

  const handleCheckCategoryOrProduct = (id: number) => {
    isDeleteRecord(id);
  };

  const deleteCategoryWithProduct = () => {
    console.log("inside detail delete");
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/product/${id}`);
  };

  const getProductList = async () => {
    try {
      const findData = await getProductApi();
      if (findData.success) {
        setProducts(findData.data);
      }
      //   navigate(`/category/${name}`);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

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
          data={products}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isProduct={true}
          tableHeading={"Product List"}
          deleteCategoryWithProduct={deleteCategoryWithProduct}
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

export default CategoryDetail;
