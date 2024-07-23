"use client";

import React, { useState, createContext } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const defaultContext = {
  formModel: {},
  gutter: 0,
  layout: "horizontal",
  labelAlign: "right",
  colNum: 1,
  labelWidth: "w-1/4",
  initialValues: {},
};

export const FormContext = createContext(defaultContext);

export default function FForm(props) {
  let contextValue = { ...defaultContext, ...props };
  let [formModel, setFormModel] = useState({ ...contextValue.initialValues });
  return (
    <FormContext.Provider value={{ ...contextValue, formModel, setFormModel }}>
      <form className="flex flex-wrap">{props.children}</form>
    </FormContext.Provider>
  );
}

export function FormItem({ wrapperProps, labelProps, children }) {
  return (
    <div className={wrapperProps.className}>
      {labelProps.label && (
        <Label className={labelProps.className}>
          {labelProps.label}
          {labelProps.labelAlign !== "vertical" && "："}
        </Label>
      )}
      <div className="flex-1">
        {children}
        <div
          className={cn(
            "text-sm font-medium text-destructive mt-0.5 pl-0.5 h-5 leading-5 transition-all duration-300 opacity-0 relative bottom-2",
            labelProps.error && "opacity-1 bottom-0"
          )}
        >
          {labelProps.error}
        </div>
      </div>
    </div>
  );
}
