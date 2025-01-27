import React from "react";
import "./../styles/components/_errorPage.scss";

const ErrorPage: React.FC = () => {
  return (
    <div className="container">
      <img
        className="image"
        src="/under_construction.png"
        alt="under construction"
      />
      <h1 className="message">Coming Soon!!</h1>
    </div>
  );
};

export default ErrorPage;
