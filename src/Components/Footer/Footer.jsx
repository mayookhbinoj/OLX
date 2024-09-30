import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="">
        <div className="row px-4">
          <div className="col-md-4">
            <div className="heading">
              <p>POPULAR LOCATIONS</p>
            </div>
            <div className="list">
              <ul>
                <li>Kolkata</li>
                <li>Mumbai</li>
                <li>Chennai</li>
                <li>Pune</li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="heading">
              <p>ABOUT US</p>
            </div>
            <div className="list">
              <ul>
                <li>About OLX Group</li>
                <li>Careers</li>
                <li>Contact Us</li>
                <li>OLXPeople</li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="heading">
              <p>OLX</p>
            </div>
            <div className="list">
              <ul>
                <li>Help</li>
                <li>Sitemap</li>
                <li>Legal & Privacy information</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer text-center mt-4 d-block">
          <div className="d-flex justify-content-between">
            <p>Help - Sitemap</p>
            <p>All rights reserved © 2006-2024 OLX</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
