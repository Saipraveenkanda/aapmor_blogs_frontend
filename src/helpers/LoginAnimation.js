import React from "react";
import "./loginanimation.css";

const LoginAnimation = ({ top, left, right, bottom }) => {
  return (
    /* From Uiverse.io by Dennyhml */
    <div
      id="loginAnimation"
      className="login-animation-container"
      style={{
        position: "absolute",
        display: "flex",
      }}
    >
      <div className="bubble">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="bubble">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="bubble">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="bubble">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="bubble">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="bubble">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoginAnimation;
