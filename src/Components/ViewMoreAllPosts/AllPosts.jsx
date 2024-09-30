import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AllPostContext } from "../../contextStore/AllPostContext";
import Pagination from "../Pagination/Pagination";
import PostCards from "../PostCards/PostCards";
import "./allposts.css";

function AllPosts() {
  const { allPost } = useContext(AllPostContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (allPost.length === 0) {
      navigate("/");
    }
  }, [allPost, navigate]);

  let [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 8;
  let indexOfLastProduct = currentPage * itemsPerPage;
  let indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  let showTheseItems = allPost.slice(
    indexOfFirstProduct,
    indexOfFirstProduct + itemsPerPage
  );

  let displayThesePosts = showTheseItems.map((product, index) => (
    <div className="all-post-card" key={index}>
      <PostCards product={product} index={index} />
    </div>
  ));

  return (
    <>
      {allPost.length !== 0 ? (
        <div className="display-all-parent">
          <div className="container-allpost">{displayThesePosts}</div>
          <Pagination setCurrentPage={setCurrentPage} />
        </div>
      ) : null}
    </>
  );
}

export default AllPosts;
