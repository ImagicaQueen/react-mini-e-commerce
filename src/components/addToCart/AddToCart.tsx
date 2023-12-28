import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LayoutWrapper from "../layout/LayoutWrapper";
import { getAddToCartApi } from "../../apis/addToCartApi";
import { DataContext } from "../context/Context";

const AddToCart = () => {
  const navigate = useNavigate();
  const going = () => {
    navigate("/addToCart");
  };

  const addToCart = useContext(DataContext);

  const { addToCartData } = addToCart;
  return (
   <>
    <div
      style={{
        position: "relative",
      }}
    >
      <div style={{ color: "black" }}>
        <i
          style={{ fontSize: "30px" }}
          onClick={() => going()}
          className="bi bi-cart3"
        ></i>
      </div>
      <div
        style={{
          fontWeight: "bolder",
          color: "white",
          width: "18px",
          height: "18px",
          right: 0,
          position: "absolute",
          top: 2,
          backgroundColor: "red",
          // border: "2px solid red",

          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "9px",
        }}
        // style={{ marginTop: "-50px", marginLeft: "12px" }}
      >
        {/* <span
          style={{
            // backgroundColor: "red",
            // border: "2px solid red",
            // borderRadius: "50%",
            // width: "20px",
            // height: "20px",
          }}
        > */}
        {addToCartData.length}
        {/* </span> */}
      </div>
     
    </div>
   </>
     
  );
};

export default AddToCart;
