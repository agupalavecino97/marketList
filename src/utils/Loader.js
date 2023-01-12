import React from "react";
import "../styles/Loader.scss";

const Loader = ({ when }) => {
  if (when) {
    return (
      <div className="example">
        <div className="block">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default Loader;
