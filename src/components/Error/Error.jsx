import React from "react";
import Navbar from "../Navbar/Navbar";

const Error = () => {
  return (
    <>
      <Navbar />
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <img src="./Images/404-error.jpg" className="img-fluid" alt="sss" />
      </div>
    </>
  );
};

export default Error;
