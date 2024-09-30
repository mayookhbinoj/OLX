import React, { useEffect, useState } from "react";
import DynamicPosts from "../DynamicPosts/DynamicPosts";

import "./Banner.css";
import axios from "axios";

function Banner() {
  let [category, setCategory] = useState();
  let [list, setList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios(
          "https://dummyjson.com/products/category-list"
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching data", error);
        return [];
      }
    }
    fetchData().then((result) => {
      setList(result);
    });
  }, []);

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="otherQuickOptions">
            {list.map(
              (category, index) =>
                index < 8 && (
                  <span key={index} onClick={() => setCategory(category)}>
                    {category}
                  </span>
                )
            )}
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
      {category != null && <DynamicPosts category={category} />}
    </div>
  );
}

export default Banner;
