import React, {
  useState,
  Fragment,
  ChangeEvent,
  useEffect,
  useContext,
} from "react";
import {
  postCategory,
  getCategory,
  updateCategoryApi,
} from "../../apis/categoryApi";
import {
  Category,
  Name,
  CheckExistNameFunction,
  HandleAddButtonClickFunction,
} from "../../interfaces/category";
import TitleWrapper from "../layout/TitleWrapper";
import { ContextValue } from "../context/Context";
import {
  MDBCard,
  MDBContainer,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";

import PopupCategory from "./PopupCategory";
import PopupName from "./PopupName";
import { DataContext } from "../context/Context";
import ListCategory from "./ListCategory";
import LayoutWrapper from "../layout/LayoutWrapper";

const AddCategory = () => {
  const [category, setCategory] = useState({
    id: 0,
    name: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
  });

  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showNamePopup, setShowNamePopup] = useState<boolean>(false);
  const textCategortMessage: string = "This category name is already exist";

  const navigate = useNavigate();
  const { id } = useParams();
  const { categoryData, setCategoryData } =
    useContext<ContextValue>(DataContext);

  const checkExistName: CheckExistNameFunction = async () => {
    try {
      let { data } = await getCategory();
      let findName = data.some((el: Category) => el.name == category.name);
      console.log(data, "data", findName);
      if (findName) {
        setShowNamePopup(true);
        setCategory(category);
      }
    } catch (error) {
      console.error("name exist:", error);
    }
  };

  const findData = async () => {
    if (id) {
      let { data } = await getCategory();
      const updatedData = data.find((el: Category) => Number(id) === el.id);
      setCategory(updatedData);
    }
  };

  useEffect(() => {
    findData();
  }, []);

  useEffect(() => {
    const containsOnlyDigit = /^[0-9]+$/.test(category.name);
    setButtonDisabled(containsOnlyDigit);
  }, [category.name]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {} as Name;

    if (!category.name) {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleAddCategory = async () => {
    const isValid = validateForm();

    if (isValid) {
      try {
        const { data, success } = await getCategory();
        if (success) {
          const findName: boolean = data.some(
            (el: Category) => el.name === category.name
          );

          if (findName) {
            setShowNamePopup(true);
            return;
          } else {
            const checkPost = await postCategory({
              id: category.id,
              name: category.name,
            });

            if (checkPost.success) {
              navigate("/categories");
            }
          }
          const updatedCategories = await getCategory();
          // setCategory(updatedCategories.data);
          setCategoryData(updatedCategories.data);
        }
      } catch (error) {
        console.log("Error:", error);
        throw error;
      }
    } else {
      console.log("Form has errors.");
    }
  };

  const handleEditCategory = async () => {
    const { data, success } = await getCategory();
    if (success) {
      const findName: boolean = data.some(
        (el: Category) => el.name === category.name
      );

      if (findName) {
        setShowNamePopup(true);
        return;
      } else {
        const checkUpdate = await updateCategoryApi(category.id, {
          id: category.id,
          name: category.name,
        });

        if (checkUpdate.success) {
          navigate(`/categories`);
        }
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (id && category.name) {
        handleEditCategory();
      } else {
        handleAddCategory();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });

    const containsOnlyDigit: boolean = /^[0-9]+$/.test(event.target.value);
    if (containsOnlyDigit) {
      setFormErrors({
        ...formErrors,
        name: "Name cannot contain digits",
      });
    } else {
      setFormErrors({
        ...formErrors,
        name: "",
      });
    }

    setShowPopup(containsOnlyDigit);
  };

  const handleAddButtonClick: HandleAddButtonClickFunction = () => {
    checkExistName();
  };

  return (
    <Fragment>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol
                  md="10"
                  lg="6"
                  className="order-2 order-lg-1 d-flex flex-column align-items-center"
                >
                  {/* <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Add Category
                  </p> */}
                  <TitleWrapper
                    tag="h2"
                    text="Add Category"
                    color="purple"
                    fontWeight="400"
                  />

                  <div className="d-flex flex-row mt-4 align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                      label="add category"
                      id="form1"
                      type="text"
                      className="w-100"
                      name="name"
                      value={category.name}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="error" style={{ color: "red" }}>
                    {formErrors.name}
                  </p>

                  <MDBBtn
                    className="mb-4"
                    size="lg"
                    disabled={isButtonDisabled}
                    onClick={handleAddButtonClick}
                    type="submit"
                  >
                    {id ? "UPDATE" : "ADD"}
                  </MDBBtn>
                </MDBCol>

                <MDBCol
                  md="10"
                  lg="6"
                  className="order-1 order-lg-2 d-flex align-items-center"
                >
                  <MDBCardImage
                    style={{ width: "90%" }}
                    src="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/714OTuxxnfL._AC_UL320_.jpg"
                    fluid
                  />
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      {showPopup && <PopupCategory />}
      <PopupName
        textCategory={textCategortMessage}
        showPopup={showNamePopup}
        handlePopUp={() => setShowNamePopup(true)}
        handleClose={() => setShowNamePopup(false)}
      />
    </Fragment>
  );
};

export default AddCategory;
