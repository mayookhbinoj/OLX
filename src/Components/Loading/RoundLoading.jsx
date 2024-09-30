import React from "react";
import "./roundloading.css";
function RoundLoading() {
  return (
    <div className="round-loader-container  bg-transparent">
      <div className="round-loader">
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default RoundLoading;
