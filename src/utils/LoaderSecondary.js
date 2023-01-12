import React from "react";
import "../styles/LoaderSecondary.scss";

const LoaderSecondary = ({ when }) => {
  if (when) {
    return (
      <div className="exampleSecondary">
        <div className="blockSecondary">
          <div className="itemSecondary"></div>
          <div className="itemSecondary"></div>
          <div className="itemSecondary"></div>
          <div className="itemSecondary"></div>
          <div className="itemSecondary"></div>
          <div className="itemSecondary"></div>
          <div className="itemSecondary"></div>
          <div className="itemSecondary"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoaderSecondary;
