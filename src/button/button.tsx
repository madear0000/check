import React from "react";
import styles from "./Button.module.css"; 
import { ButtonProps } from "./button.types";

const Button: React.FC<ButtonProps> = (props) => {
  const { isDisabled, onClick, sizeOfButton = "md", variant = "solid", children, ...restProps } =
    props;

  const classNames = [
    styles.button,
    styles[sizeOfButton], 
    styles[variant],
    isDisabled && styles.disabled, 
  ]
    .join(" "); 

  return (
    <button
      className={classNames}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
