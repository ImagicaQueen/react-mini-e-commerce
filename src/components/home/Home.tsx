import React, { Fragment, useState, useEffect, useContext } from "react";
import Table from "../table/Table";
import { getCategory, deleteCategory } from "../../apis/categoryApi";
import PopupDelete from "../category/PopupDelete";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/Context";
import { getProductApi, deleteProductApi } from "../../apis/productApi";
import {
  category,
  categoryData,
  product,
  productData,
} from "../../helper/tableStaticData";
import LayoutWrapper from "../layout/LayoutWrapper";
import ListCategory from "../category/ListCategory";
import CartTable from "../addToCart/CartTable";
import { getAddToCartApi, postAddToCartApi } from "../../apis/addToCartApi";

const Home = () => {
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>("");
  const [popupTextProduct, setPopupTextProduct] = useState<string>("");

  const [tableDataDelteType, setTableDataDelteType] = useState<
    "category" | "product"
  >("category");
  const navigate = useNavigate();
  const {
    categoryData,
    setCategoryData,
    productData,
    setProductData,
    setAddToCartData,
  } = useContext(DataContext);

  useEffect(() => {
    getProductCategory();
    getProduct();
  }, []);

  const getProductCategory = async () => {
    const findData = await getCategory();
    setCategoryData(findData.data);
  };

  const getProduct = async () => {
    const findData = await getProductApi();

    setProductData(findData.data);
  };

  const handleEditCategory = async (id: number) => {
    navigate(`/edit/category/${id}`);
  };

  const handleEditProduct = async (id: number) => {
    navigate(`/edit/product/${id}`);
  };

  const handleDeleteCategory = (id: number) => {
    setId(id);
    setDeletePopup(true);
    setTableDataDelteType("category");

    let respon = productData.some((el) => {
      return el.categoryId === id;
    });

    if (respon) {
      setIsDisabled(true);
      setPopupText(
        "You can't delete this category!! In this category product is already exists."
      );
    } else {
      setPopupText("Are you sure you want to delete this category ?? ");
    }
  };

  const handleDeleteProduct = (id: number) => {
    setId(id);
    setDeletePopup(true);
    setTableDataDelteType("product");
    setPopupText("Are you sure you want to delete this product");
  };

  const isDeleteRecordData = (categoryId: number) => {
    setId(categoryId);
    setDeletePopup(true);
    setPopupText(
      "Are you sure you want to delete the category and its products"
    );
  };

  const isDeleteRecord = async (
    id: number,
    deleteType: "category" | "product"
  ) => {
    try {
      if (deleteType === "category") {
        let deleteCategoryData = await deleteCategory(id);
        console.log("deleteCategoryData", deleteCategoryData);

        if (deleteCategoryData.success) {
          let getCategoryApi = await getCategory();
          setCategoryData(getCategoryApi.data);
        }
      } else {
        let productDataDeleted = await deleteProductApi(id);
        console.log("productDataDeleted", productDataDeleted);

        if (productDataDeleted.success) {
          let { data } = await getProductApi();
          console.log("Updated category data:", data);
          setProductData(data);
        }
      }
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setDeletePopup(false);
    }
  };

  const deleteCategoryWithProduct = async (categoryId: number) => {
    try {
      const productIdsToDelete = productData
        .filter((product) => product.categoryId === categoryId)
        .map((product) => product.id);

      for (const productId of productIdsToDelete) {
        await deleteProductApi(productId);
      }

      const deleteCategoryData = await deleteCategory(categoryId);

      if (deleteCategoryData.success) {
        const { data } = await getCategory();
        const getProductdata = await getProductApi();

        setCategoryData(data);
        setProductData(getProductdata.data);
        console.log("Category and associated products deleted successfully.");
      } else {
        console.error("Failed to delete category and associated products.");
      }
    } catch (error: any) {
      console.error("Error during deletion:", error.message);
    } finally {
      setDeletePopup(false);
    }
  };

  const handleCheckCategoryOrProduct = (
    id: number,
    deleteType: "category" | "product"
  ) => {
    const findCategoryContainsProduct = productData.find((ele) => {
      return ele.categoryId === id;
    });

    if (findCategoryContainsProduct) {
      deleteCategoryWithProduct(id);
    } else {
      isDeleteRecord(id, deleteType);
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
          columns={category}
          data={categoryData}
          handleDelete={handleDeleteCategory}
          handleEdit={handleEditCategory}
          deleteCategoryWithProduct={deleteCategoryWithProduct}
          isDeleteRecordData={isDeleteRecordData}
          tableHeading={"Category List"}
          // deleteCategoryWithProduct={deleteCategoryWithProduct}
          isConfirm={true}
        />
        <Table
          columns={product}
          data={productData}
          handleDelete={handleDeleteProduct}
          handleEdit={handleEditProduct}
          isProduct={true}
          tableHeading={"Product List"}
          addCount={addCount}
          // isAddProduct={true}
        />
      </LayoutWrapper>

      {deletePopup && (
        <PopupDelete
          isDeleteRecord={(id: number) =>
            isDeleteRecord(id, tableDataDelteType)
          }
          handleCheckCategoryOrProduct={handleCheckCategoryOrProduct}
          id={id}
          onClose={() => setDeletePopup(false)}
          setIsDisabled={setIsDisabled}
          isDisabled={isDisabled}
          popupText={popupText}
          popupTextProduct={popupTextProduct}
          deleteCategoryWithProduct={deleteCategoryWithProduct}
        />
      )}
    </Fragment>
  );
};

export default Home;
