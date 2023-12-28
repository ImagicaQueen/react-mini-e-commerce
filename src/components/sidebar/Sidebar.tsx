import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CustomLink from "./CustomLink";

const Sidebar = () => {
  return (
    <Fragment>
      <div
        className="w3-sidebar w3-bar-block"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "30px",
          height: "100vh",
          position: "fixed",
          backgroundColor: "black",
          lineHeight: "3rem",
          alignItems: "center",
          overflowY: "scroll",
        }}
      >
        <CustomLink />
      </div>
    </Fragment>
  );
};

export default Sidebar;
