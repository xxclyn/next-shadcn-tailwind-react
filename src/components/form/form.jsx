"use client";

import React from "react";

const defaultContext = {
  formModel: {},
  layout: "horizontal",
  labelAlign: "right",
  colNum: 1,
  labelWidth: "1/4",
};

export const FormContext = React.createContext(defaultContext);

export default function FForm(props) {
  const contextValue = { ...defaultContext, ...props };
  return (
    <FormContext.Provider value={contextValue}>
      <form className="flex flex-wrap">{props.children}</form>
    </FormContext.Provider>
  );
}
