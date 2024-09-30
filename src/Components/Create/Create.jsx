import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext } from "../../contextStore/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Create = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className=" d-flex justify-content-between align-items-center gap-2 flex-column  ">
      <Header />

      <div className="col-3 bg-light border p-3 my-5 ">
        <form>
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input form-control"
            type="text"
            id="name"
            name="Name"
            required
          />
          <br />
          <label htmlFor="category">Category:</label>
          <select
            name="Category"
            id="category"
            className="input form-control"
            required
          >
            <option value="">Select Category</option>
            <option value="Cars">Cars</option>
            <option value="Cameras & Lenses">Cameras & Lenses</option>
            <option value="Computers & Laptops">Computers & Laptops</option>
            <option value="Mobile Phones">Mobile Phones</option>
            <option value="Motorcycles">Motorcycles</option>
            <option value="Tablets">Tablets</option>
          </select>
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input form-control"
            type="number"
            id="price"
            name="Price"
            required
          />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <input
            className="input form-control"
            type="text"
            id="description"
            name="Description"
            required
          />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" />
          <br />
          <input type="file" className="form-control" />
          <br />
          <button className="uploadBtn btn btn-primary">
            upload and Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Create;
