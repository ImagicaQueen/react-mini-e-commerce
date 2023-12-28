import React, { Fragment, useContext, useState } from "react";
import { Link,NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../context/Context";
import { getCategory } from "../../apis/categoryApi";
import { ContextValue } from "../../interfaces/product";
import { Category } from "../../interfaces/category";
import { postAddToCartApi, getAddToCartApi } from "../../apis/addToCartApi";
import "./CustomLink.css"

interface LinkProps {
  name: string;
  path: string;
}

const CustomLink = () => {
  const { categoryData, productData, setAddToCartData } =
    useContext<ContextValue>(DataContext);
  const navigate = useNavigate();
  const [link, setLink] = useState<Array<LinkProps>>([
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Add Category",
      path: "/add/category",
    },
    {
      name: "Add Product",
      path: "/add/product",
    },
    {
      name: "Category",
      path: "/categories",
    },
    {
      name: "Products",
      path: "/products",
    },
  ]);

 

  //   useEffect(() => {
  //     const getProductCategory = async () => {
  //       try {
  //         const { data } = await getCategory();
  //         addNewLinks(data);
  //       } catch (error) {
  //         console.error("Error", error);
  //       }
  //     };
  //     getProductCategory();
  //   }, [categoryData]);
  // console.log(link)
  //   const addNewLinks = (data: any) => {
  //     console.log('data -------', data)
  //     for (const i of data) {
  //       setLink([...link, { name: i.name, path: `/${i.name}` }]);
  //     }
  //   };

  return (
    <Fragment>
      {link.map((link: LinkProps, index: number) => (
        <Link
          key={index}
          to={link.path}
          style={{ color: "white", fontWeight: 600 }}
        >
          {link.name}
        </Link>
      ))}

      {categoryData &&
        categoryData.map((categorys: Category, index: number) => (
          <NavLink
            key={index}
            to={`/category/${categorys.name}`}
            style={{
              color: "white",
              fontWeight: 600,
              
              // backgroundColor: "orange",
            }}
          >
            {categorys.name}
          </NavLink>
        ))}


    </Fragment>
  );
};

export default CustomLink;
