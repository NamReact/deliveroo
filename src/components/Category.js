import React from "react";

const Category = props => {
  return <h3 id={"body" + props.category}>{props.category}</h3>;
};

export default Category;
