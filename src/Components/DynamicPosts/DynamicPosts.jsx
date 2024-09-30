import React, { useContext, useEffect, useState } from "react";
import "./dynamicposts.css";
import { AllPostContext } from "../../contextStore/AllPostContext";
import PostCards from "../PostCards/PostCards";
import { Link } from "react-router-dom";
import axios from "axios";

function DynamicPosts({ category }) {
  // const { allPost } = useContext(AllPostContext);
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios(
          `https://dummyjson.com/products/category/${category}`
        );
        return response.data.products;
      } catch (error) {
        console.error("Error fetching data", error);
        return [];
      }
    }

    fetchData().then((result) => {
      setAllPost(result);
    });
  }, [category]);
  let displayCards = allPost.map((product, index) => {
    return <PostCards product={product} index={index} key={index} />;
  });

  return (
    <>
      {category !== "null" && (
        <div>
          <div className="moreView">
            <div className="heading d-flex justify-content-between align-items-center mb-2">
              <span>{category}</span>
              <Link to="./viewmore">
                <span>View more</span>
              </Link>
            </div>
            <div className="cards d-flex flex-wrap gap-2">{displayCards}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default DynamicPosts;
