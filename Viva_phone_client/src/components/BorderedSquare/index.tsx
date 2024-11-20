import React, { useState } from "react";

interface Props {
  children: JSX.Element;
}

export const BorderedSquare = ({ children }: Props) => {
  return (
    <div
      style={{ border: "1px solid grey", borderRadius: "5px", padding: "20px" }}
    >
      {children}
    </div>
  );
};
