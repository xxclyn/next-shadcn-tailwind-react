"use client";

import {
  useState,
  createContext,
  useImperativeHandle,
  forwardRef,
} from "react";
import { cn } from "@/components/ui/utils/utils";

const defaultContext = {
  gutter: 0,
  layout: "horizontal",
  labelAlign: "right",
  colNum: 1,
  labelWidth: "w-1/4",
  initialValues: {},
};

export const FormContext = createContext(defaultContext);

export default forwardRef((props, ref) => {
  // 收集子组件的公共方法
  let registrations = {};
  const setRegistrations = (id, registration) => {
    registrations[id] = registration;
  };

  let contextValue = { ...defaultContext, ...props, setRegistrations };
  const [formModel, setFormModel] = useState({ ...contextValue.initialValues });
  useImperativeHandle(ref, () => ({
    validate: () => {
      let res = [];
      for (const key in registrations) {
        const itemRes = registrations[key].validate();
        if (!itemRes.status) {
          res.push({ field: key, message: itemRes.message });
        }
      }
      if (res.length > 0) {
        return {
          status: false,
          fields: res,
        };
      } else {
        return { status: true };
      }
    },
  }));
  return (
    <FormContext.Provider value={{ ...contextValue, formModel, setFormModel }}>
      <form className="flex flex-wrap">{props.children}</form>
    </FormContext.Provider>
  );
});

export function Label({ className, children }) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
    >
      {children}
    </label>
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
