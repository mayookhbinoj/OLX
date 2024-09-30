import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contextStore/PostContext";
import { Firebase } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import "./View.css";

function View() {
  const { postContent } = useContext(PostContext);
  const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const { userId } = postContent;
    if (userId === undefined) {
      navigate("/");
    } else {
      Firebase.firestore()
        .collection("OLXusers")
        .where("id", "==", userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
    }
  }, [navigate, postContent]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postContent.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postContent.price}</p>
          <span>{postContent.name}</span>
          <p>{postContent.category}</p>
          <span>{postContent.createdAt}</span>
        </div>
        <div className="productDescription">
          <p className="p-bold">Product Description</p>
          <p>{postContent.description}</p>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p className="p-bold">Seller details</p>
            <p>Name: {userDetails.name}</p>
            <p>Phone: {userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
