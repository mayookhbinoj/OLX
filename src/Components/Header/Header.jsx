import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import SearchIcon from "../../assets/SearchIcon";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import Search from "../Search/Search";
import LocationSelector from "../Search/LocationSelector";

function Header() {
  const { allPost } = useContext(AllPostContext);
  const { setPostContent } = useContext(PostContext);
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleSelectedSearch = (value) => {
    setPostContent(value);
    navigate("/view");
  };

  const handleEmptyClick = () => {
    alert("No items found.., please search by product name");
  };

  const { user } = useContext(AuthContext);

  const logoutHandler = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={() => navigate("/")}>
          <OlxLogo></OlxLogo>
        </div>

      
        <div className="productSearch">
          <Search />
        </div>

        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            user.displayName
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>
        {user && (
          <span onClick={logoutHandler} className="logout-span">
            Logout
          </span>
        )}

        <Link to="/create">
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
