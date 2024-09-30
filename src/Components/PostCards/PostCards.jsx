import React, { useContext } from "react";
import Heart from "../../assets/Heart";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../contextStore/PostContext";
import "./postcards.css";

function PostCards({ product, index }) {
  const { setPostContent } = useContext(PostContext);

  const navigate = useNavigate();

  return (
    <div
      className="card"
      key={product.id}
      onClick={() => {
        setPostContent(product);
        navigate("/view");
      }}
    >
      <div className="favorite">
        <Heart />
      </div>
      <div className="image">
        <img src={product.images[0]} alt="" />
      </div>
      <div className="content">
        <p className="rate">&#x20B9; {product.price}</p>
        <span className="category"> {product.category} </span>
        <p className=""> {product.name}</p>
      </div>
      <div className="date">
        <span className="text-truncate">{product.description}</span>
      </div>
    </div>
  );
}

export default PostCards;
