import React from "react";
import "./Alert.scss";

const Alert = ({ type, message }) => {
  return <div className={`alert ${type}`}>{message}</div>;
};

export default Alert;