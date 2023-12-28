
import React from "react";

interface Props {
  children: React.ReactNode;
  width: "15vw" | "85vw";
}

const LayoutWrapper = ({ children, width }: Props) => {
  return <div style={{ width: width }}>{children}</div>;
};

export default LayoutWrapper;



