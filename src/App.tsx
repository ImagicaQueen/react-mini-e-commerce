import React, { Fragment, useContext } from "react";
// import Table from "./components/table/Table";
import "./App.css";
import { Route, Routes, useParams } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";
import AddCategory from "./components/category/AddCategory";
import AddProduct from "./components/product/AddProduct";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import ListCategory from "./components/category/ListCategory";
import ListProduct from "./components/product/ListProduct";
import CategoryDetail from "./components/category/CategoryDetail";
import AddToCart from "./components/addToCart/AddToCart";
import CartTable from "./components/addToCart/CartTable";
import { DataContext } from "./components/context/Context";

function App() {
  const { name } = useParams();
  const { addToCartData, setAddToCartData } = useContext(DataContext);

  // let result = addToCartData.reduce(function (acc: number, obj: any) {
  //   return (
  //     acc +
  //     (typeof obj.totalPrice === "string"
  //       ? parseFloat(obj.totalPrice)
  //       : obj.totalPrice)
  //   );
  // }, 0);

  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <LayoutWrapper width={"15vw"}>
          <Sidebar />
        </LayoutWrapper>
        {/* <CartTable/> */}

        <LayoutWrapper width="85vw">
          <div>
            <div
              className="addToCart"
              style={{
                textAlign: "right",
                marginBottom: "-90px",
                marginRight: "25px",
              }}
            >
              <AddToCart />
            </div>
          </div>
          <div style={{ marginTop: "60px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add/category" element={<AddCategory />} />
              <Route path="/edit/category/:id" element={<AddCategory />} />
              <Route path="/add/product" element={<AddProduct />} />
              <Route path="/edit/product/:id" element={<AddProduct />} />
              <Route path="/category/:name" element={<CategoryDetail />} />

              <Route path="/categories" element={<ListCategory />} />
              <Route path="/products" element={<ListProduct />} />
              <Route path="/addToCart" element={<CartTable />} />
            </Routes>
          </div>
        
        </LayoutWrapper>
       
      </div>
    </Fragment>
  );
}

export default App;
