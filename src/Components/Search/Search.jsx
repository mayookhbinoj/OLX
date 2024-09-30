import React, { useState, useContext, useEffect } from "react";
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import SearchIcon from "../../assets/SearchIcon";
import CloseIcon from "../../assets/CloseIcon/CloseIcon";
import { useNavigate } from "react-router-dom";
import "./search.css";
import axios from "axios";

function Search() {
  const { allPost, setAllPost } = useContext(AllPostContext);
  const { setPostContent } = useContext(PostContext);
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    ////
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios(
          `https://dummyjson.com/products/search?q=${wordEntered}`
        );
        return response.data.products;
      } catch (error) {
        console.error("Error fetching data", error);
        return [];
      }
    }

    fetchData().then((result) => {
      setFilteredData(result);
    });
  }, [wordEntered]);

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleSearchClick = () => {
    if (filteredData.length === 0) {
      alert(
        "No items found.., please search by product category or product name"
      );
    } else {
      setAllPost(filteredData);
      navigate("/search");
    }
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Find Cars,Mobile,Motorcycles and more..."
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          <div onClick={handleSearchClick}>
            <SearchIcon />
          </div>
          {filteredData.length !== 0 && (
            <div id="clearBtn" onClick={clearInput}>
              <CloseIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
