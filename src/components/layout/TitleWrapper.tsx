import React from "react";

interface Props {
  text: string;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  color: "crimson" | "blue" | "purple" | "black";
  fontWeight: "400" | "800";
}

const TitleWrapper = ({ text, tag, color, fontWeight }: Props) => {
  const Tag = tag || "h1";
  return <Tag style={{ color, fontWeight }}>{text}</Tag>;
};

export default TitleWrapper;
