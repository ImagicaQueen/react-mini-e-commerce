import React, {
  Fragment,
  useContext,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import TitleWrapper from "../layout/TitleWrapper";
import {
  getProductApi,
  postProductApi,
  updateCategoryApi,
} from "../../apis/productApi";
import { updateAddToCartApi, getAddToCartApi } from "../../apis/addToCartApi";
import {
  Product,
  ErrorType,
  ContextValue,
  CheckExistNameFunction,
  HandleAddButtonClickFunction,
  ValidateFormType,
} from "../../interfaces/product";
import { Category } from "../../interfaces/category";

import { useNavigate, useParams } from "react-router-dom";
import { StoreCategoryType } from "../../interfaces/product";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { DataContext } from "../context/Context";
import PopupCategory from "../category/PopupCategory";
import PopupName from "../category/PopupName";
import { category } from "../../helper/tableStaticData";
import { AddToCart } from "../../interfaces/add-to-cart";

const AddProduct = () => {
  const {
    productData,
    setProductData,
    categoryData,
    addToCartData,
    setAddToCartData,
  } = useContext<ContextValue>(DataContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<ErrorType>({
    name: "",
    title: "",
    price: "",
  });
  const [product, setProduct] = useState<any>({
    id: 0,
    name: "",
    price: 0,
    title: "",
    categoryId: 0,
  });

  const [storeCategoryId, setStoreCategoryId] = useState<number | null>(null);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showNamePopup, setShowNamePopup] = useState<boolean>(false);

  const textProductCategortMessage = `This name already exist for this category`;

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCateId = e.target.value;

    let categoryId = parseInt(selectedCateId, 10);

    setProduct({
      ...product,
      categoryId,
    });
    setStoreCategoryId(categoryId);
  };

  const handleAddProduct = async () => {
    const isValid: boolean = validateForm();

    if (isValid) {
      try {
        const { data, success } = await getProductApi();
        if (success) {
          const findName: boolean = data.some(
            (el: Product) =>
              el.name === product.name && el.categoryId === product.categoryId
          );
          if (findName) {
            setShowNamePopup(true);
            return;
          } else {
            const checkPost = await postProductApi({
              id: product.id,
              name: product.name,
              title: product.title,
              price: product.price,
              categoryId: product.categoryId,
            });

            if (checkPost.success) {
              navigate("/products");
            }
            const updatedProducts = await getProductApi();
            setProductData(updatedProducts.data);
          }
        }
      } catch (error) {
        console.log("Error: from catch", error);
        throw error;
      }
    } else {
      console.log("Form has errors.");
    }
  };

  const handleEditProduct = async () => {
    const checkUpdate = await updateCategoryApi(product.id, {
      id: product.id,
      name: product.name,
      price: product.price,
      title: product.title,
      categoryId: product.categoryId,
    });

    await updateAddToCartApi(product.id, {
      id: product.id,
      name: product.name,
      title: product.title,
      quantity: 1,
      price: product.price,
      totalPrice: product.price,
      categoryId: product.categoryId,
    });
    const updateAddToCartData = await getAddToCartApi();
    setAddToCartData(updateAddToCartData.data);

    if (checkUpdate.success) {
      navigate(`/products`);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (id && product.name && product.price && product.title) {
        handleEditProduct();
      } else if (storeCategoryId) {
        handleAddProduct();
      } else {
        alert("Choose category first");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const findData = async () => {
    if (id) {
      let { data } = await getProductApi();
      const updatedData = data.find((el: Product) => Number(id) === el.id);
      setProduct(updatedData);
    }
  };

  useEffect(() => {
    findData();
  }, []);

  useEffect(() => {
    const containsOnlyDigit = /^[0-9]+$/.test(product.name);
    setButtonDisabled(containsOnlyDigit);
  }, [product.name]);

  useEffect(() => {
    const containsOnlyChar = /^[A-Za-z]+$/.test(
      product.price?.toString() || ""
    );
    setButtonDisabled(containsOnlyChar);
  }, [product.price]);

  const validateForm: ValidateFormType = () => {
    let valid = true;
    const newErrors = {} as ErrorType;

    if (!product.name) {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

    if (!product.title) {
      newErrors.title = "Title is required";
      valid = false;
    } else {
      newErrors.title = "";
    }

    if (!product.price) {
      newErrors.price = "Price is required";
      valid = false;
    } else {
      newErrors.price = "";
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === "name" || event.target.name === "title") {
      let containsOnlyDigit: boolean = /^\d+$/.test(event.target.value);

      setFormErrors({
        ...formErrors,
        [event.target.name]: containsOnlyDigit
          ? `${event.target.name} cannot contain digits1`
          : "",
      });
    }
    if (event.target.name === "price") {
      let containsOnlyChar: boolean = /^[A-Za-z]+$/.test(event.target.value);

      setFormErrors({
        ...formErrors,
        [event.target.name]: containsOnlyChar
          ? `${event.target.name} cannot contain characters`
          : "",
      });
    }
  };
  return (
    <Fragment>
      <MDBContainer fluid>
        <form onSubmit={handleSubmit}>
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="8">
              <MDBCard className="my-4 rounded-3" style={{ maxWidth: "580px" }}>
                <MDBCardImage
                  src="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/S/al-eu-726f4d26-7fdb/90a4c4da-6e85-4969-8166-dee3443a7054._CR0,0,1200,628_SX430_QL70_.jpg"
                  className="w-98 rounded-top"
                  alt="Sample photo"
                />

                <MDBCardBody className="px-5">
                  <TitleWrapper
                    tag="h2"
                    text="Add Products"
                    color="black"
                    fontWeight="400"
                  />
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Product Name"
                        id="form3"
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                      />
                      <p className="error" style={{ color: "red" }}>
                        {formErrors.name}
                      </p>
                    </MDBCol>
                    <MDBCol md="6">
                      <select
                        style={{ width: "100%", padding: "7px 0px" }}
                        onChange={handleCategoryChange}
                        value={product.categoryId}
                      >
                        <option label="select category"></option>
                        {categoryData?.map(
                          (categoryV: Category, index: number) => (
                            <option
                              key={index}
                              value={categoryV.id}
                              label={categoryV.name}
                            >
                              {categoryV.name}
                            </option>
                          )
                        )}
                      </select>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Product Price"
                        id="form3"
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                      />
                      <p className="error" style={{ color: "red" }}>
                        {formErrors.price}
                      </p>{" "}
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Product Title"
                        id="form3"
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                      />
                      <p className="error" style={{ color: "red" }}>
                        {formErrors.title}
                      </p>
                    </MDBCol>
                  </MDBRow>

                  <MDBBtn
                    color="success"
                    className="mb-4"
                    size="lg"
                    type="submit"
                    disabled={isButtonDisabled}
                  >
                    {id ? "UPDATE" : "ADD"}
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
      {showPopup && <PopupCategory />}
    
      <PopupName
        text={textProductCategortMessage}
        showPopup={showNamePopup}
        handlePopUp={() => setShowNamePopup(true)}
        handleClose={() => setShowNamePopup(false)}
      />
    </Fragment>
  );
};

export default AddProduct;
