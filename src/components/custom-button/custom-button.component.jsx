import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ isGoogleSignIn, children, inverted, ...other }) => (
  <button
    className={`${inverted ? "inverted" : ""} ${
      isGoogleSignIn ? "google-sign-in" : ""
    } custom-button`}
    {...other}
  >
    {children}
  </button>
);

export default CustomButton;
