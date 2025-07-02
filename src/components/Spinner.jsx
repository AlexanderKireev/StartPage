import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Spinner = () => (
  <RotatingLines
    animationDuration="2"
    ariaLabel="loading"
    height="100"
    strokeColor="grey"
    strokeWidth="3"
    width="100"
  />
);

export default Spinner;
