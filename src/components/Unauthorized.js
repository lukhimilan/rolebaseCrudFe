import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = (props) => {
  const navigate = useNavigate();

  return (
    <div className="container vw-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="m-auto">
          <h2 className="text-center  mt-3 form-fs fw-bold">
            No authorization found.
          </h2>
          <p className="text-center mt-2 form-fs">
            This page is not publically available
          </p>
        </div>
        <div>
          <button
            className="btn btn-gradient-primary mt-2"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
