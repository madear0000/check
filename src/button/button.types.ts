import React from "react";

export type buttonSize = "sm" | "md" | "lg";

export type buttonVariant = "solid" | "outline" | "ghost" ;

export interface buttonProps {
  sizeOfButton?: buttonSize;

  variant?: buttonVariant;

  isDisabled?: boolean;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonProps
  extends React.HTMLProps<HTMLButtonElement>,
    buttonProps {}

