import React, { Fragment, useState, useEffect, useContext } from "react";
import { Category } from "../../interfaces/category";
import {
  getCategory,
  deleteCategory,
  updateCategoryApi,
} from "../../apis/categoryApi";
import { category } from "../../helper/tableStaticData";
import Table from "../table/Table";
import PopupDelete from "./PopupDelete";
import { useNavigate } from "react-router-dom";
import TitleWrapper from "../layout/TitleWrapper";
import LayoutWrapper from "../layout/LayoutWrapper";
import { DataContext } from "../context/Context";
import { Product } from "../../interfaces/product";
import { deleteProductApi, getProductApi } from "../../apis/productApi";
import CategoryProductDelete from "./CategoryProductDelete";

const ListCategory = () => {
  // const [categoryData, setCategoryData] = useState<Category[]>([]);
  const { categoryData, setCategoryData, productData } =
    useContext(DataContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>("");

  const [deletePopup, setDeletePopup] = useState(false);
  const [deletePopupCate, setDeletePopupCate] = useState(false);

  const [id, setId] = useState<number>(0);

  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    setId(id);
    setDeletePopup(true);
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

  const isDeleteRecord = async (id: number) => {
    try {
      let deleteCategoryData = await deleteCategory(id);
      if (deleteCategoryData.success) {
        let { data } = await getCategory();
        setCategoryData(data);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setDeletePopup(false);
    }
  };


  const isDeleteRecordData = (categoryId: number) => {
    setId(categoryId);
    setDeletePopup(true);
    setPopupText(
      "Are you sure you want to delete the category and its products"
    );
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
        setCategoryData(data);
        console.log("Category and associated products deleted successfully.");
      } else {
        console.error("Failed to delete category and associated products.");
      }
    } catch (error: any) {
      console.error("Error during deletion:", error.message);
    }
    finally {
      setDeletePopup(false);
    }
  };

  const handleCheckCategoryOrProduct = (id: number) =>{

      const findCategoryContainsProduct = productData.find((ele)=>{
       return ele.categoryId === id
      })
     if(findCategoryContainsProduct){
      deleteCategoryWithProduct(id)
     }
     else{
      isDeleteRecord(id)
     }
  }

  const handleEdit = async (id: number) => {
    navigate(`/edit/category/${id}`);
  };

  const getProductCategory = async () => {
    try {
      const findData = await getCategory();
      if (findData.success) {
        setCategoryData(findData.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    getProductCategory();
  }, []);

  return (
    <Fragment>
      <LayoutWrapper width="85vw">
        <Table
          columns={category}
          data={categoryData}
          handleDelete={handleDelete}
          deleteCategoryWithProduct={deleteCategoryWithProduct}
          isDeleteRecordData={isDeleteRecordData}
          handleEdit={handleEdit}
          tableHeading={"Category List"}
          isConfirm={true}
        />
        {deletePopup && (
          <PopupDelete
          
            handleCheckCategoryOrProduct={handleCheckCategoryOrProduct}
            isDeleteRecord={isDeleteRecord}
            id={id}
            onClose={() => setDeletePopup(false)}
            setIsDisabled={setIsDisabled}
            isDisabled={isDisabled}
            popupText={popupText}
            deleteCategoryWithProduct={deleteCategoryWithProduct}
          />
        )}


        {/* {deletePopupCate && (
          <CategoryProductDelete
            isDeleteRecordData={isDeleteRecordData}
            id={id}
            onClose={() => setDeletePopup(false)}
            setIsDisabled={setIsDisabled}
            isDisabled={isDisabled}
            popupText={popupText}
            deleteCategoryWithProduct={deleteCategoryWithProduct}
          />
        )} */}
      </LayoutWrapper>
    </Fragment>
  );
};

export default ListCategory;
