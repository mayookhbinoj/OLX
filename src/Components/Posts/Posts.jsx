import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import BarLoading from "../Loading/BarLoading";
import PostCards from "../PostCards/PostCards";

import { AllPostContext } from "../../contextStore/AllPostContext";

function Posts() {
  const { setAllPost } = useContext(AllPostContext);
  let [posts, setPosts] = useState([]);

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        let response = await axios("https://dummyjson.com/products?limit=20");
        return response.data.products;
      } catch (error) {
        console.error("Error fetching data", error);
        return [];
      }
    }

    fetchData().then((result) => {
      setPosts(result);
      setAllPost(result);
      setLoading(false);
    });
  }, [setAllPost]);

  let quickMenuCards = posts.map((product, index) => {
    return (
      <div className="quick-menu-cards" key={index}>
        {" "}
        <PostCards product={product} index={index} />{" "}
      </div>
    );
  });

  return (
    <div className=" ">
      {posts && (
        <div className="moreView mt-3 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="font-weight-bold">Fresh recommendations</span>
            <Link to="./viewmore">
              <span className="text-primary">View more</span>
            </Link>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {loading ? <BarLoading /> : quickMenuCards}
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
