import React from "react";
import "../styles/LoaderButton.scss";

const LoaderButton = ({ when }) => {
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

export default LoaderButton;
