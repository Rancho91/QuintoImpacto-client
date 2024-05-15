/* eslint-disable react/prop-types */
import React from "react";
import "./styles.css";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="custom-tabpanel"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <section className="custom-tabpanel-children-container">{children}</section>
      )}
    </div>
  );
};

export default CustomTabPanel;
